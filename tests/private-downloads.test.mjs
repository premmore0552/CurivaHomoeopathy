import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const firebaseConfig = JSON.parse(readFileSync(new URL('../firebase-applet-config.json', import.meta.url), 'utf8'));
const { privateKey } = generateKeyPairSync('rsa', {
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
  assert.match(url.searchParams.get('X-Goog-Signature') || '', /^[a-f0-9]{128}$/);
});

test('private download rejects traversal paths and expired signed URL dates', () => {
  assert.throws(() => createSignedDownloadUrl('../private.pdf'), /invalid/i);
  assert.throws(() => createSignedDownloadUrl('resources/test.pdf', 60, new Date(Date.now() - 120_000)), /expired/i);
});

test('private storage availability fails closed until the configured private object exists', async () => {
  await assert.rejects(assertPrivateDownloadAvailable('resources/not-uploaded.pdf'), /Private download object is not available/);
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
