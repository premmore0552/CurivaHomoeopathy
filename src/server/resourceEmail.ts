import crypto from 'node:crypto';

export type PaidResourceEmail = {
  orderId: string;
  to: string;
  resourceTitle: string;
  downloadUrl: string;
  amount: number;
  currency: string;
};

export function isResourceEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.RESOURCE_EMAIL_FROM);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });
}

/**
 * Sends a paid-resource delivery email through Resend.
 * The deterministic idempotency key prevents duplicate emails during webhook/callback races.
 */
export async function sendPaidResourceEmail(email: PaidResourceEmail): Promise<'sent' | 'not-configured'> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESOURCE_EMAIL_FROM;
  if (!apiKey || !from) return 'not-configured';

  const target = new URL(email.downloadUrl);
  if (target.protocol !== 'https:' || target.hostname !== 'storage.googleapis.com') {
    throw new Error('Refusing to email a non-private-storage download link');
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.to) || email.to.length > 200) {
    throw new Error('Paid resource email recipient is invalid');
  }

  const title = escapeHtml(email.resourceTitle);
  const link = escapeHtml(email.downloadUrl);
  const amount = `${email.currency} ${(email.amount / 100).toFixed(2)}`;
  const body = {
    from,
    to: [email.to],
    subject: `Your Curiva download: ${email.resourceTitle}`,
    text: `Your payment was verified. Download ${email.resourceTitle} here: ${email.downloadUrl}\\n\\nThis secure link expires soon. Keep your payment ID for support.`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033"><h1>Payment verified</h1><p>Your payment of ${amount} for <strong>${title}</strong> has been verified.</p><p><a href="${link}">Download your Curiva resource</a></p><p>This private download link expires after a limited time. Keep your Razorpay payment ID for support.</p><p>Curiva Homoeopathy</p></div>`,
  };
  const idempotencyKey = `curiva-resource-${crypto.createHash('sha256').update(email.orderId).digest('hex').slice(0, 40)}`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    console.error('Resource email provider rejected delivery:', response.status);
    throw new Error(`Resource email delivery failed (HTTP ${response.status})`);
  }
  return 'sent';
}
