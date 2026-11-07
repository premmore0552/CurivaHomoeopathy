import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');

const html = read('../index.html');
const cspFile = read('../netlify.toml');
const profile = read('../src/pages/Profile.tsx');
const rules = read('../firestore.rules');
const firebase = read('../src/lib/firebase.ts');
const analytics = read('../src/lib/analytics.ts');
const consent = read('../src/components/CookieConsent.tsx');
const app = read('../src/App.tsx');
const policy = read('../src/pages/PrivacyPolicy.tsx');
const server = read('../server.ts');
const paidOrderStore = read('../src/server/paidOrderStore.ts');
const themeInit = read('../public/curiva-theme-init.js');
const runtime = read('../public/curiva-runtime.js');

function getCsp() {
  const match = cspFile.match(/Content-Security-Policy\s*=\s*"([^"]+)"/);
  assert.ok(match, 'an enforced Content-Security-Policy header must exist');
  return match[1];
}

test('production HTML shell has no inline JavaScript or inline style blocks', () => {
  assert.doesNotMatch(html, /<script\s*>/i);
  assert.doesNotMatch(html, /<style\s*>/i);
  assert.match(html, /src="\/curiva-theme-init\.js"/);
  assert.match(html, /src="\/curiva-runtime\.js"/);
  assert.match(html, /name="curiva-app-version"/);
  assert.match(runtime, /name="curiva-app-version"/);
  assert.match(themeInit, /localStorage/);
});

test('Content Security Policy blocks inline scripts, eval, object embeds and framing', () => {
  const csp = getCsp();
  assert.match(csp, /default-src 'self'/);
  assert.match(csp, /script-src-attr 'none'/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /base-uri 'self'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(csp, /upgrade-insecure-requests/);
  const scriptSource = csp.match(/(?:^|; )script-src ([^;]+)/)?.[1] || '';
  assert.ok(scriptSource.includes("'self'"));
  assert.doesNotMatch(scriptSource, /'unsafe-inline'|'unsafe-eval'/);
  assert.match(csp, /https:\/\/\*\.razorpay\.com/);
  assert.match(csp, /https:\/\/apis\.google\.com/);
});

test('API middleware limits request bodies, rate limits API traffic and disables API caching', () => {
  assert.match(server, /app\.disable\('x-powered-by'\)/);
  assert.match(server, /app\.use\('\/api', globalApiRateLimiter\)/);
  assert.match(server, /max:\s*240/);
  assert.match(server, /limit:\s*'64kb'/);
  assert.match(server, /Cache-Control', 'no-store, max-age=0, must-revalidate'/);
});

test('server-side diagnostics never emit raw provider exceptions', () => {
  assert.match(server, /function logSafeServerError/);
  assert.match(server, /safeServerErrorCode/);
  assert.doesNotMatch(server, /console\.error\([^\n]*, error\)/);
  assert.doesNotMatch(server, /console\.error\([^\n]*\.message/);
  assert.doesNotMatch(server, /console\.warn\([^\n]*errText/);
  assert.doesNotMatch(server, /console\.log\([^\n]*sanitizedMsg/);
});

test('simulated case logs warn against patient data and support real owner deletion', () => {
  assert.match(profile, /never enter real patient information/i);
  assert.match(profile, /Never include details from a real patient/i);
  assert.match(profile, /await deleteDoc\(doc\(db, 'kits', logId\)\)/);
  assert.match(rules, /allow update: if false;/);
  const kitRule = rules.slice(rules.indexOf('match \/kits\/{kitId}'), rules.indexOf('// --- Collection: Screenings'));
  assert.match(kitRule, /allow get: if isOwner\(resource\.data\.userId\) \|\| isAdmin\(\)/);
  assert.match(kitRule, /allow delete: if isOwner\(resource\.data\.userId\) \|\| isAdmin\(\)/);
  assert.match(rules, /data\.keys\(\)\.hasOnly\(\[/);
  assert.match(rules, /data\.notes\.size\(\) <= 1200/);
});

test('administrator membership must be active and appointment administration requires verified email', () => {
  assert.match(rules, /function hasActiveAdminMembership\(\)/);
  assert.match(rules, /\.data\.active == true/);
  assert.match(server, /!identity\.emailVerified \|\| !appointmentAdminUids\(\)\.includes\(identity\.uid\)/);
  assert.match(server, /if \(!identity\.emailVerified\)/);
  assert.match(paidOrderStore, /emailVerified: user\.emailVerified === true/);
});

test('client error logs do not include account identity or raw error messages', () => {
  const handler = firebase.slice(firebase.indexOf('export function handleFirestoreError'), firebase.indexOf('// Safe connection check for Firestore'));
  assert.doesNotMatch(handler, /authInfo|providerInfo|currentUser\?\.uid|currentUser\?\.email/);
  assert.doesNotMatch(handler, /error:\s*errMsg/);
  assert.match(handler, /collectionPath/);
  assert.match(handler, /Please retry/);
});

test('analytics is opt-in, event-allowlisted and excludes sensitive/free-text fields', () => {
  assert.match(analytics, /curiva-analytics-consent/);
  assert.match(analytics, /!== 'accepted'/);
  assert.match(analytics, /ALLOWED_EVENTS/);
  assert.match(analytics, /prompt\|query\|search\|message\|clinical\|patient/);
  assert.doesNotMatch(analytics, /console\.log/);
  assert.match(consent, /Only necessary storage/);
  assert.match(consent, /Allow optional analytics/);
  assert.match(consent, /Privacy settings/);
  assert.match(app, /<CookieConsent \/>/);
});

test('privacy notice describes case logs, sensitive mock screening data and optional analytics', () => {
  assert.match(policy, /Simulated academic case logs/);
  assert.match(policy, /Mock screening assessment data/);
  assert.match(policy, /Optional analytics are off by default/);
  assert.match(policy, /The form and database rules do not provide automated detection or redaction/);
});
