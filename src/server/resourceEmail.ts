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
  const emailParts = email.to.trim().split('@');
  const domain = emailParts[1] || '';
  const hasWhitespace = [...email.to].some((character) => character.charCodeAt(0) <= 32);
  if (
    email.to.length > 200 ||
    emailParts.length !== 2 ||
    !emailParts[0] ||
    !domain.includes('.') ||
    domain.startsWith('.') ||
    domain.endsWith('.') ||
    hasWhitespace
  ) {
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


async function sendAppointmentEmail(input: {
  to: string;
  subject: string;
  text: string;
  html: string;
  idempotencySeed: string;
}): Promise<'sent' | 'not-configured'> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESOURCE_EMAIL_FROM;
  if (!apiKey || !from) return 'not-configured';
  const parts = input.to.trim().split('@');
  const domain = parts[1] || '';
  if (parts.length !== 2 || !parts[0] || !domain.includes('.') || /\s/.test(input.to) || input.to.length > 200) {
    throw new Error('Appointment notification recipient email is invalid');
  }
  const idempotencyKey = `curiva-${crypto.createHash('sha256').update(input.idempotencySeed).digest('hex').slice(0, 48)}`;
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html,
    }),
  });
  if (!response.ok) {
    console.error('Resend rejected appointment email:', response.status);
    throw new Error(`Appointment email delivery failed (HTTP ${response.status})`);
  }
  return 'sent';
}

function escapeEmailHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[character] || character));
}

export async function sendAppointmentRequestNotification(input: {
  requestId: string;
  to: string;
  requesterName: string;
  requesterEmail: string;
  phoneNumber: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
}): Promise<'sent' | 'not-configured'> {
  const h = escapeEmailHtml;
  const text = [
    'A new appointment request was saved.',
    `Request ID: ${input.requestId}`,
    `Requester: ${input.requesterName || 'Not provided'}`,
    `Email: ${input.requesterEmail || 'Not provided'}`,
    `Phone: ${input.phoneNumber || 'Not provided'}`,
    `Service: ${input.serviceType}`,
    `Preferred time: ${input.preferredDate}, ${input.preferredTime} (${input.timezone})`,
    'This is a request, not a confirmed booking.',
  ].join('\n');
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033"><h1>New appointment request</h1><p><strong>Request ID:</strong> ${h(input.requestId)}</p><p><strong>Requester:</strong> ${h(input.requesterName || 'Not provided')}</p><p><strong>Email:</strong> ${h(input.requesterEmail || 'Not provided')}</p><p><strong>Phone:</strong> ${h(input.phoneNumber || 'Not provided')}</p><p><strong>Service:</strong> ${h(input.serviceType)}</p><p><strong>Preferred time:</strong> ${h(input.preferredDate + ' · ' + input.preferredTime + ' · ' + input.timezone)}</p><p>This is a request, not a confirmed booking.</p></div>`;
  return sendAppointmentEmail({
    to: input.to,
    subject: `New Curiva appointment request: ${input.requestId}`,
    text,
    html,
    idempotencySeed: `appointment-request:${input.requestId}`,
  });
}

export async function sendAppointmentStatusNotification(input: {
  requestId: string;
  to: string;
  requesterName: string;
  status: string;
  adminResponse: string;
  confirmedDateTime?: string;
  confirmedTimeZone?: string;
}): Promise<'sent' | 'not-configured'> {
  const h = escapeEmailHtml;
  const dateText = input.confirmedDateTime
    ? `${input.confirmedDateTime.replace('T', ' ')} (${input.confirmedTimeZone || 'clinic time'})`
    : '';
  const text = [
    `Hello ${input.requesterName || 'there'},`,
    `Your Curiva appointment request (${input.requestId}) status is now: ${input.status}.`,
    dateText ? `Confirmed clinic time: ${dateText}` : '',
    input.adminResponse ? `Message from the clinic: ${input.adminResponse}` : '',
    'Please contact the clinic through its official contact channel if you need to clarify this change.',
  ].filter(Boolean).join('\n');
  const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#172033"><p>Hello ${h(input.requesterName || 'there')},</p><p>Your Curiva appointment request (${h(input.requestId)}) status is now <strong>${h(input.status)}</strong>.</p>${dateText ? `<p><strong>Confirmed clinic time:</strong> ${h(dateText)}</p>` : ''}${input.adminResponse ? `<p>Message from the clinic: ${h(input.adminResponse)}</p>` : ''}<p>Please contact the clinic through its official contact channel if you need to clarify this change.</p></div>`;
  return sendAppointmentEmail({
    to: input.to,
    subject: `Curiva appointment request update: ${input.status}`,
    text,
    html,
    idempotencySeed: `appointment-status:${input.requestId}:${input.status}:${input.confirmedDateTime || ''}:${input.adminResponse || ''}`,
  });
}
