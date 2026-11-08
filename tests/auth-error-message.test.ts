import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  getGoogleAuthErrorCode,
  getGoogleAuthErrorMessage,
  shouldUseGoogleRedirectFallback,
} from '../src/lib/authErrorMessage.ts';

test('extracts only safe Firebase Auth error codes', () => {
  assert.equal(getGoogleAuthErrorCode({ code: 'auth/unauthorized-domain' }), 'auth/unauthorized-domain');
  assert.equal(getGoogleAuthErrorCode({ code: 'not-an-auth-code' }), '');
  assert.equal(getGoogleAuthErrorCode(new Error('internal details')), '');
  assert.equal(getGoogleAuthErrorCode(null), '');
});

test('uses redirect fallback only when the app and Firebase auth helper share an origin', () => {
  const popupBlocked = { code: 'auth/popup-blocked' };
  const unsupported = { code: 'auth/operation-not-supported-in-this-environment' };
  const firebaseDomain = 'gen-lang-client-0830179867.firebaseapp.com';

  assert.equal(shouldUseGoogleRedirectFallback(popupBlocked, firebaseDomain, firebaseDomain), true);
  assert.equal(shouldUseGoogleRedirectFallback(unsupported, firebaseDomain, firebaseDomain), true);
  assert.equal(shouldUseGoogleRedirectFallback(popupBlocked, 'deploy-preview-65--curivahomoeopathy.netlify.app', firebaseDomain), false);
  assert.equal(shouldUseGoogleRedirectFallback(unsupported, 'curiva.web.app', firebaseDomain), false);
  assert.equal(shouldUseGoogleRedirectFallback(popupBlocked, 'localhost', firebaseDomain), false);
  const previewHost = 'deploy-preview-65--curivahomoeopathy.netlify.app';
  const productionHost = 'curivahomoeopathy.netlify.app';
  assert.equal(shouldUseGoogleRedirectFallback(popupBlocked, previewHost, previewHost), true);
  assert.equal(shouldUseGoogleRedirectFallback(unsupported, productionHost, productionHost), true);
  assert.equal(shouldUseGoogleRedirectFallback({ code: 'auth/popup-closed-by-user' }, firebaseDomain, firebaseDomain), false);
  assert.equal(shouldUseGoogleRedirectFallback({ code: 'auth/unauthorized-domain' }, firebaseDomain, firebaseDomain), false);
});

test('provides actionable messages for common Google sign-in errors', () => {
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/unauthorized-domain' }), /exact site hostname/i);
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/popup-blocked' }), /allow pop-ups/i);
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/operation-not-supported-in-this-environment' }), /same origin/i);
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/network-request-failed' }), /network error/i);
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/invalid-api-key' }), /web API key/i);
  assert.match(getGoogleAuthErrorMessage({ code: 'auth/firebase-app-check-token-is-invalid' }), /App Check/i);
});

test('does not expose raw provider exception messages to the UI', () => {
  const error = Object.assign(new Error('private provider detail, email or token'), { code: 'auth/internal-error' });
  const message = getGoogleAuthErrorMessage(error);
  assert.match(message, /Identity Toolkit request/i);
  assert.doesNotMatch(message, /private provider detail|email or token/i);
});

test('sanitizes unknown provider codes before displaying them', () => {
  const message = getGoogleAuthErrorMessage({ code: 'auth/something-new' });
  assert.match(message, /auth\/something-new/);
  assert.doesNotMatch(getGoogleAuthErrorMessage({ code: '<script>alert(1)</script>' }), /script/);
});
