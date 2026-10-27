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

let cachedToken: { serviceAccount: string; scope: string; token: string; expiresAt: number } | null = null;

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

async function getAccessToken(serviceAccount: ServiceAccount, scope = 'https://www.googleapis.com/auth/datastore'): Promise<string> {
  if (cachedToken && cachedToken.serviceAccount === serviceAccount.client_email && cachedToken.scope === scope && cachedToken.expiresAt > Date.now() + 60_000) {
    return cachedToken.token;
  }

  const base64url = (value: string) => Buffer.from(value).toString('base64url');
  const issuedAt = Math.floor(Date.now() / 1000);
  const signingInput = [
    base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' })),
    base64url(JSON.stringify({
      iss: serviceAccount.client_email,
      scope,
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
    scope,
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
function getPrivateBucket(): string {
  const bucket = process.env.CURIVA_PRIVATE_DOWNLOAD_BUCKET?.trim();
  if (!bucket || bucket.length < 3 || bucket.length > 222 || bucket.includes('/') || bucket.includes(String.fromCharCode(92)) || [...bucket].some((character) => character.charCodeAt(0) <= 32)) {
    throw new Error('CURIVA_PRIVATE_DOWNLOAD_BUCKET is not configured correctly');
  }
  return bucket;
}

function safeObjectPath(objectPath: string): string {
  if (
    typeof objectPath !== 'string' ||
    objectPath.length < 1 ||
    objectPath.length > 1024 ||
    objectPath.startsWith('/') ||
    objectPath.includes(String.fromCharCode(92)) ||
    objectPath.split('/').some((part) => !part || part === '.' || part === '..')
  ) {
    throw new Error('Private download object path is invalid');
  }
  return objectPath;
}

const rfc3986 = (value: string) => encodeURIComponent(value).replace(/[!'()*]/g, (character) =>
  '%' + character.charCodeAt(0).toString(16).toUpperCase()
);
const sha256Hex = (value: string) => crypto.createHash('sha256').update(value).digest('hex');

/**
 * Confirms the PDF exists in a configured, private Cloud Storage bucket before accepting payment.
 * The service account needs storage.objects.get access; the bucket must not grant public access.
 */
export async function assertPrivateDownloadAvailable(objectPath: string): Promise<void> {
  const safePath = safeObjectPath(objectPath);
  const bucket = getPrivateBucket();
  const serviceAccount = getServiceAccount();
  const accessToken = await getAccessToken(serviceAccount, 'https://www.googleapis.com/auth/devstorage.read_only');
  const url = `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(safePath)}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    throw new Error(`Private download object is not available (HTTP ${response.status})`);
  }
  const metadata = await response.json() as { size?: string; contentType?: string; name?: string };
  if (metadata.name !== safePath || !metadata.size || Number(metadata.size) <= 0) {
    throw new Error('Private download object is empty or did not match the configured path');
  }
  if (metadata.contentType && !['application/pdf', 'application/octet-stream'].includes(metadata.contentType)) {
    throw new Error('Private download object is not a PDF-compatible file');
  }
}

/**
 * Creates a V4 signed URL for a private Cloud Storage object.
 * URLs are time-limited (default one hour) and never stored in the public web bundle.
 */
export function createSignedDownloadUrl(
  objectPath: string,
  expiresSeconds = 3600,
  issuedAt = new Date(),
): string {
  const safePath = safeObjectPath(objectPath);
  const bucket = getPrivateBucket();
  const serviceAccount = getServiceAccount();

  if (!Number.isInteger(expiresSeconds) || expiresSeconds < 60 || expiresSeconds > 604800) {
    throw new Error('Signed download URL expiry must be between 60 seconds and 7 days');
  }
  const issuedAtMs = issuedAt.getTime();
  if (!Number.isFinite(issuedAtMs) || issuedAtMs > Date.now() + 60_000) {
    throw new Error('Signed download URL issue time is invalid');
  }
  if (Date.now() >= issuedAtMs + expiresSeconds * 1000) {
    throw new Error('Signed download URL issue time is expired');
  }

  const date = issuedAt.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const dateStamp = date.slice(0, 8);
  const scope = `${dateStamp}/auto/storage/goog4_request`;
  const encodedPath = safePath.split('/').map(rfc3986).join('/');
  const canonicalUri = `/${rfc3986(bucket)}/${encodedPath}`;
  const credential = `${serviceAccount.client_email}/${scope}`;
  const parameters: Array<[string, string]> = [
    ['X-Goog-Algorithm', 'GOOG4-RSA-SHA256'],
    ['X-Goog-Credential', credential],
    ['X-Goog-Date', date],
    ['X-Goog-Expires', String(expiresSeconds)],
    ['X-Goog-SignedHeaders', 'host'],
  ];
  const canonicalQuery = parameters
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${rfc3986(key)}=${rfc3986(value)}`)
    .join('&');
  const canonicalRequest = [
    'GET',
    canonicalUri,
    canonicalQuery,
    'host:storage.googleapis.com',
    '',
    'host',
    'UNSIGNED-PAYLOAD',
  ].join('\n');
  const stringToSign = [
    'GOOG4-RSA-SHA256',
    date,
    scope,
    sha256Hex(canonicalRequest),
  ].join('\n');
  const signature = crypto.sign('RSA-SHA256', Buffer.from(stringToSign), serviceAccount.private_key).toString('hex');
  return `https://storage.googleapis.com${canonicalUri}?${canonicalQuery}&X-Goog-Signature=${signature}`;
}

export async function getPaidOrderEmailStatus(orderId: string): Promise<string | undefined> {
  const serviceAccount = getServiceAccount();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  const token = await getAccessToken(serviceAccount);
  const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(serviceAccount.project_id)}/databases/${encodeURIComponent(databaseId)}/documents/orders/${encodeURIComponent(orderId)}`;
  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (response.status === 404) return undefined;
  if (!response.ok) throw new Error('Unable to read paid-order email status');
  return fieldString(await response.json(), 'emailDeliveryStatus');
}

export async function updatePaidOrderEmailStatus(orderId: string, status: 'sent' | 'failed' | 'expired'): Promise<void> {
  const serviceAccount = getServiceAccount();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  const token = await getAccessToken(serviceAccount);
  const url = new URL(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(serviceAccount.project_id)}/databases/${encodeURIComponent(databaseId)}/documents/orders/${encodeURIComponent(orderId)}`);
  url.searchParams.append('updateMask.fieldPaths', 'emailDeliveryStatus');
  url.searchParams.append('updateMask.fieldPaths', 'emailUpdatedAt');
  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: {
        emailDeliveryStatus: { stringValue: status },
        emailUpdatedAt: { timestampValue: new Date().toISOString() },
      },
    }),
  });
  if (!response.ok) throw new Error('Unable to update paid-order email status');
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
    emailDeliveryStatus: { stringValue: 'pending' },
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


/** Server-only OAuth token for a specific Google API scope. */
export async function getServerAccessToken(scope = 'https://www.googleapis.com/auth/datastore'): Promise<string> {
  return getAccessToken(getServiceAccount(), scope);
}

function appointmentDocumentUrl(collectionName: string, documentId: string): string {
  if (!/^[A-Za-z][A-Za-z0-9_-]{0,99}$/.test(collectionName)) {
    throw new Error('Firestore collection name is invalid');
  }
  if (!documentId || documentId.length > 512 || documentId.includes('/')) {
    throw new Error('Firestore document ID is invalid');
  }
  const serviceAccount = getServiceAccount();
  const databaseId = process.env.FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(serviceAccount.project_id)}/databases/${encodeURIComponent(databaseId)}/documents/${encodeURIComponent(collectionName)}/${encodeURIComponent(documentId)}`;
}

export async function getFirestoreDocument(collectionName: string, documentId: string): Promise<any | null> {
  const token = await getServerAccessToken('https://www.googleapis.com/auth/datastore');
  const response = await fetch(appointmentDocumentUrl(collectionName, documentId), {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Firestore read failed (HTTP ${response.status})`);
  return response.json();
}

export async function patchFirestoreDocument(
  collectionName: string,
  documentId: string,
  fields: Record<string, any>,
  updatePaths: string[],
  deletePaths: string[] = [],
  expectedUpdateTime?: string,
): Promise<any> {
  const token = await getServerAccessToken('https://www.googleapis.com/auth/datastore');
  const url = new URL(appointmentDocumentUrl(collectionName, documentId));
  for (const fieldPath of [...new Set([...updatePaths, ...deletePaths])]) {
    url.searchParams.append('updateMask.fieldPaths', fieldPath);
  }
  if (expectedUpdateTime) url.searchParams.set('currentDocument.updateTime', expectedUpdateTime);
  const response = await fetch(url.toString(), {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields }),
  });
  if (!response.ok) throw new Error(`Firestore update failed (HTTP ${response.status})`);
  return response.json();
}
