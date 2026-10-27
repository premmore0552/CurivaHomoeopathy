import crypto from 'node:crypto';
import firebaseConfig from '../../firebase-applet-config.json';

type ServiceAccount = {
  project_id: string;
  client_email: string;
  private_key: string;
};

export type PaidOrder = {
  orderId: string;
  paymentId: string;
  userId: string;
  userEmail: string;
  resourceId: string;
  resourceTitle: string;
  amount: number;
  currency: string;
};

type FirebaseIdentity = { uid: string; email: string | null };

let cachedToken: { serviceAccount: string; token: string; expiresAt: number } | null = null;

function getServiceAccount(): ServiceAccount {
  const encoded = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!encoded) throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not configured');

  let parsed: Partial<ServiceAccount>;
  try {
    parsed = JSON.parse(encoded) as Partial<ServiceAccount>;
  } catch {
    throw new Error('FIREBASE_SERVICE_ACCOUNT_JSON is not valid JSON');
  }

  if (!parsed.project_id || !parsed.client_email || !parsed.private_key) {
    throw new Error('Firebase service account is missing required fields');
  }
  if (parsed.project_id !== firebaseConfig.projectId) {
    throw new Error('Firebase service account project does not match the app project');
  }

  return {
    project_id: parsed.project_id,
    client_email: parsed.client_email,
    private_key: parsed.private_key.replace(/\\n/g, '\n'),
  };
}

export function isPaidOrderStoreConfigured(): boolean {
  try {
    getServiceAccount();
    return true;
  } catch {
    return false;
  }
}

async function getAccessToken(serviceAccount: ServiceAccount): Promise<string> {
  if (cachedToken && cachedToken.serviceAccount === serviceAccount.client_email && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const base64url = (value: string) => Buffer.from(value).toString('base64url');
  const issuedAt = Math.floor(Date.now() / 1000);
  const signingInput = [
    base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
    base64url(JSON.stringify({
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: 'https://oauth2.googleapis.com/token',
      iat: issuedAt,
      exp: issuedAt + 3600,
    })),
  ].join('.');
  const signature = crypto.sign(
    'RSA-SHA256',
    Buffer.from(signingInput),
    serviceAccount.private_key,
  ).toString('base64url');
  const assertion = signingInput + '.' + signature;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });
  const tokenJson = await tokenResponse.json() as { access_token?: string; expires_in?: number };
  if (!tokenResponse.ok || !tokenJson.access_token) {
    throw new Error('Google OAuth did not issue a Firestore access token');
  }

  cachedToken = {
    serviceAccount: serviceAccount.client_email,
    token: tokenJson.access_token,
    expiresAt: Date.now() + Math.max(60, tokenJson.expires_in ?? 3600) * 1000,
  };
  return tokenJson.access_token;
}

export async function verifyFirebaseIdToken(idToken: string): Promise<FirebaseIdentity> {
  const apiKey = process.env.FIREBASE_WEB_API_KEY || firebaseConfig.apiKey;
  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(apiKey)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    },
  );

  const payload = await response.json() as {
    users?: Array<{ localId?: string; email?: string }>;
  };
  const user = payload.users?.[0];
  if (!response.ok || !user?.localId) {
    throw new Error('Firebase authentication token could not be verified');
  }
  return { uid: user.localId, email: user.email ?? null };
}

function fieldString(document: any, name: string): string | undefined {
  const value = document?.fields?.[name]?.stringValue;
  return typeof value === 'string' ? value : undefined;
}

/**
 * Record captured payments by Razorpay order ID, using a server-only service account.
 * A conditional create and matching-existing-record check make verification retries idempotent.
 */
export async function persistPaidOrder(order: PaidOrder): Promise<'created' | 'already-recorded'> {
  const serviceAccount = getServiceAccount();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  const accessToken = await getAccessToken(serviceAccount);
  const documentUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(serviceAccount.project_id)}/databases/${encodeURIComponent(databaseId)}/documents/orders/${encodeURIComponent(order.orderId)}`;
  const now = new Date().toISOString();
  const fields = {
    userId: { stringValue: order.userId },
    userEmail: { stringValue: order.userEmail },
    resourceId: { stringValue: order.resourceId },
    resourceTitle: { stringValue: order.resourceTitle },
    paymentId: { stringValue: order.paymentId },
    orderId: { stringValue: order.orderId },
    status: { stringValue: 'paid' },
    amount: { integerValue: String(order.amount) },
    currency: { stringValue: order.currency },
    createdAt: { timestampValue: now },
    updatedAt: { timestampValue: now },
  };

  const createResponse = await fetch(`${documentUrl}?currentDocument.exists=false`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
  if (createResponse.ok) return 'created';

  // If a verification request was retried, accept only the exact same paid order.
  // Never overwrite another payment or silently issue multiple entitlements.
  const existingResponse = await fetch(documentUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (existingResponse.ok) {
    const existing = await existingResponse.json();
    if (
      fieldString(existing, 'status') === 'paid' &&
      fieldString(existing, 'orderId') === order.orderId &&
      fieldString(existing, 'paymentId') === order.paymentId &&
      fieldString(existing, 'resourceId') === order.resourceId &&
      fieldString(existing, 'userId') === order.userId
    ) {
      return 'already-recorded';
    }
    throw new Error('A different paid order already exists for this Razorpay order ID');
  }

  throw new Error(`Firestore could not persist the verified order (HTTP ${createResponse.status})`);
}
