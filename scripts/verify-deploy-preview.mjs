#!/usr/bin/env node
/**
 * Low-risk deploy-preview smoke checks.
 *
 * These probes verify that Netlify routes to the Express Function and that
 * security/validation gates are reachable. They do not create payments, call
 * Gemini, send email, write Firestore records, or confirm appointments.
 */
import process from 'node:process';

const suppliedBase = process.argv[2] || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL;
if (!suppliedBase) {
  console.error('Usage: npm run verify:deploy-preview -- https://deploy-preview-N--site.netlify.app');
  process.exit(2);
}

let baseUrl;
try {
  baseUrl = new URL(suppliedBase);
} catch {
  console.error('Provide a valid deploy-preview URL.');
  process.exit(2);
}
if (baseUrl.protocol !== 'https:') {
  console.error('Deploy-preview URL must use HTTPS.');
  process.exit(2);
}
if (!baseUrl.hostname.endsWith('--curivahomoeopathy.netlify.app')) {
  console.error('Use a Curiva Netlify deploy permalink or deploy-preview URL; the production site alias is intentionally rejected.');
  process.exit(2);
}

const results = [];
async function request(path, options = {}) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: 'manual',
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
    signal: AbortSignal.timeout(15000),
  });
  const contentType = response.headers.get('content-type') || '';
  const text = await response.text();
  let json = null;
  if (/application\/json/i.test(contentType)) {
    try { json = JSON.parse(text); } catch { /* reported below */ }
  }
  return { response, contentType, text, json };
}

function pass(name, detail) {
  results.push({ name, ok: true, detail });
}
function fail(name, detail) {
  results.push({ name, ok: false, detail });
}

try {
  // Verify the same-origin Firebase helper proxy resolves to Firebase's helper
  // JavaScript instead of falling through to the SPA shell.
  const authHelper = await request('/__/auth/iframe.js');
  if (
    authHelper.response.status === 200 &&
    /(?:application|text)\\/javascript/i.test(authHelper.contentType) &&
    authHelper.text.length > 100
  ) {
    pass('GET /__/auth/iframe.js', '200 JavaScript; same-origin Firebase auth helper proxy is reachable');
  } else {
    fail('GET /__/auth/iframe.js', `expected 200 JavaScript from Firebase helper; got ${authHelper.response.status} ${authHelper.contentType}`);
  }

  const posts = await request('/api/posts');
  if (posts.response.status === 200 && /application\/json/i.test(posts.contentType) && Array.isArray(posts.json)) {
    pass('GET /api/posts', `200 JSON; ${posts.json.length} posts`);
  } else {
    fail('GET /api/posts', `expected 200 JSON array; got ${posts.response.status} ${posts.contentType}`);
  }

  const appointmentConfig = await request('/api/appointments/config');
  if (
    appointmentConfig.response.status === 200 &&
    appointmentConfig.json &&
    typeof appointmentConfig.json.calendarConfigured === 'boolean' &&
    typeof appointmentConfig.json.notificationsConfigured === 'boolean'
  ) {
    pass('GET /api/appointments/config', `200 JSON; calendarConfigured=${appointmentConfig.json.calendarConfigured}; notificationsConfigured=${appointmentConfig.json.notificationsConfigured}`);
  } else {
    fail('GET /api/appointments/config', `expected 200 JSON with integration flags; got ${appointmentConfig.response.status} ${appointmentConfig.contentType}`);
  }

  // No consent header means this must stop before any external AI provider call.
  const aiGate = await request('/api/gemini/curiva-care', {
    method: 'POST',
    body: JSON.stringify({ prompt: 'Explain the Organon as an academic study topic.' }),
  });
  if (aiGate.response.status === 428 && aiGate.json) {
    pass('POST /api/gemini/curiva-care (no consent)', '428 consent gate; external provider is not called');
  } else {
    fail('POST /api/gemini/curiva-care (no consent)', `expected 428 JSON; got ${aiGate.response.status} ${aiGate.contentType}`);
  }

  // Invalid email is rejected before resource lookup, storage access or order creation.
  const orderValidation = await request('/api/create-razorpay-order', {
    method: 'POST',
    body: JSON.stringify({ resourceId: 'Homoeopathy-modalities-cheat-sheet', email: 'not-an-email' }),
  });
  if (orderValidation.response.status === 400 && /valid email/i.test(orderValidation.json?.error || '')) {
    pass('POST /api/create-razorpay-order (invalid email)', '400 validation response; no payment order is created');
  } else {
    fail('POST /api/create-razorpay-order (invalid email)', `expected 400 validation response; got ${orderValidation.response.status} ${orderValidation.contentType}`);
  }

  // A fake signature can never authorize a payment. 400 = signature rejected;
  // 503 = route is present but the preview has no webhook secret configured.
  const webhook = await request('/api/razorpay-webhook', {
    method: 'POST',
    headers: { 'x-razorpay-signature': '0'.repeat(64) },
    body: JSON.stringify({
      event: 'payment.captured',
      payload: { payment: { entity: { id: 'pay_smoke_test', order_id: 'order_smoke_test' } } },
    }),
  });
  if ([400, 503].includes(webhook.response.status) && webhook.json) {
    pass('POST /api/razorpay-webhook (fake signature)', webhook.response.status === 400
      ? '400 invalid signature rejected'
      : '503 route reachable; webhook secret is not configured in this deploy context');
  } else {
    fail('POST /api/razorpay-webhook (fake signature)', `expected 400 or 503 JSON; got ${webhook.response.status} ${webhook.contentType}`);
  }
} catch (error) {
  fail('Deploy-preview request', error instanceof Error ? error.message : 'Unknown network error');
}

for (const result of results) {
  console.log(`${result.ok ? 'PASS' : 'FAIL'}  ${result.name}: ${result.detail}`);
}
const failed = results.filter(result => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed against ${baseUrl.origin}`);
if (failed.length) process.exitCode = 1;
