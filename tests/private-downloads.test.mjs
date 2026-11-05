import assert from 'node:assert/strict';
import { generateKeyPairSync, verify as verifySignature, createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const firebaseConfig = JSON.parse(readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf8'));
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
  publicKeyEncoding: { type: 'spki', format: 'pem' },
});

process.env.FIREBASE_SERVICE_ACCOUNT_JSON = JSON.stringify({
  project_id: firebaseConfig.projectId,
  client_email: 'curiva-ci-signer@example.test',
  private_key: privateKey,
});
process.env.CURIVA_PRIVATE_DOWNLOAD_BUCKET = 'curiva-private-ci-bucket';

const { createSignedDownloadUrl, assertPrivateDownloadAvailable } = await import('../.netlify-build/server/paidOrderStore.mjs');
const { sendPaidResourceEmail } = await import('../.netlify-build/server/resourceEmail.mjs');

test('private download URL is a time-limited GCS signed URL, never a public Drive link', () => {
  const url = new URL(createSignedDownloadUrl('resources/test-guide.pdf', 3600));
  assert.equal(url.hostname, 'storage.googleapis.com');
  assert.equal(url.pathname, '/curiva-private-ci-bucket/resources/test-guide.pdf');
  assert.equal(url.searchParams.get('X-Goog-Algorithm'), 'GOOG4-RSA-SHA256');
  assert.equal(url.searchParams.get('X-Goog-Expires'), '3600');
  const signature = url.searchParams.get('X-Goog-Signature') || '';
  assert.match(signature, /^[a-f0-9]{512}$/);

  const encodedQuery = [...url.searchParams.entries()]
    .filter(([key]) => key !== 'X-Goog-Signature')
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value).replace(/[!'()*]/g, (ch) => '%' + ch.charCodeAt(0).toString(16).toUpperCase())}`)
    .join('&');
  const date = url.searchParams.get('X-Goog-Date');
  assert.match(date || '', /^\d{8}T\d{6}Z$/);
  const credential = url.searchParams.get('X-Goog-Credential') || '';
  const scope = credential.split('/').slice(1).join('/');
  const canonicalRequest = [
    'GET',
    url.pathname,
    encodedQuery,
    'host:storage.googleapis.com',
    '',
    'host',
    'UNSIGNED-PAYLOAD',
  ].join('\n');
  const stringToSign = [
    'GOOG4-RSA-SHA256',
    date,
    scope,
    createHash('sha256').update(canonicalRequest).digest('hex'),
  ].join('\n');
  assert.equal(verifySignature('RSA-SHA256', Buffer.from(stringToSign), publicKey, Buffer.from(signature, 'hex')), true);
});

test('private download rejects traversal paths and expired signed URL dates', () => {
  assert.throws(() => createSignedDownloadUrl('../private.pdf'), /invalid/i);
  assert.throws(() => createSignedDownloadUrl('resources/test.pdf', 60, new Date(Date.now() - 120_000)), /expired/i);
});

test('private storage availability fails closed until the configured private object exists', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input);
    if (url.startsWith('https://oauth2.googleapis.com/token')) {
      return new Response(JSON.stringify({ access_token: 'test-access-token', expires_in: 3600 }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ error: { message: 'Object not found' } }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  };
  try {
    await assert.rejects(assertPrivateDownloadAvailable('resources/not-uploaded.pdf'), /HTTP 404/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('resource delivery email does not claim success when the provider is not configured', async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.RESOURCE_EMAIL_FROM;
  assert.equal(await sendPaidResourceEmail({
    orderId: 'order_test',
    to: 'student@example.test',
    resourceTitle: 'Test Guide',
    downloadUrl: 'https://storage.googleapis.com/curiva-private-ci-bucket/resources/test.pdf?signature=redacted',
    amount: 12000,
    currency: 'INR',
  }), 'not-configured');
});
