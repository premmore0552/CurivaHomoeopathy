import test from 'node:test';
import assert from 'node:assert/strict';
import {
  AI_ACADEMIC_CONSENT_VERSION,
  hasAiAcademicConsent,
  containsPotentialPrivateHealthInformation,
  validateAcademicAiText
} from '../src/server/aiPrivacyGuard.ts';

test('AI consent requires the exact versioned acknowledgement', () => {
  assert.equal(hasAiAcademicConsent(AI_ACADEMIC_CONSENT_VERSION), true);
  assert.equal(hasAiAcademicConsent('true'), false);
  assert.equal(hasAiAcademicConsent(undefined), false);
});

test('privacy guard rejects common contact and identifier patterns', () => {
  assert.equal(containsPotentialPrivateHealthInformation('Contact me at reader@example.com'), true);
  assert.equal(containsPotentialPrivateHealthInformation('Call +91 9876543210'), true);
  assert.equal(containsPotentialPrivateHealthInformation('ABHA: 1234-5678-9012'), true);
  assert.equal(containsPotentialPrivateHealthInformation('MRN: ABCD-12345'), true);
});

test('privacy guard rejects first-person and record-like health narratives', () => {
  assert.equal(containsPotentialPrivateHealthInformation('My symptoms started yesterday.'), true);
  assert.equal(containsPotentialPrivateHealthInformation('Patient name: Example Person'), true);
  assert.equal(containsPotentialPrivateHealthInformation('Please interpret this lab report.'), true);
  assert.equal(containsPotentialPrivateHealthInformation('Explain the history of homoeopathic philosophy.'), false);
});

test('academic text validation enforces types and bounded length', () => {
  assert.deepEqual(validateAcademicAiText(''), { ok: false, reason: 'invalid' });
  assert.deepEqual(validateAcademicAiText('x'.repeat(10), 5), { ok: false, reason: 'too-long' });
  assert.deepEqual(validateAcademicAiText('my patient has a headache'), { ok: false, reason: 'sensitive' });
  assert.deepEqual(validateAcademicAiText('Explain the Organon in simple terms.'), { ok: true, text: 'Explain the Organon in simple terms.' });
});
