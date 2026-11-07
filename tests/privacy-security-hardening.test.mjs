import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const indexHtml = read('../index.html');
const netlify = read('../netlify.toml');
const serviceWorker = read('../public/sw.js');
const firebaseClient = read('../src/lib/firebase.ts');
const appBootstrap = read('../src/appBootstrap.ts');
const studyToolkit = read('../src/context/StudyToolkitContext.tsx');
const userService = read('../src/services/userService.ts');
const profilePage = read('../src/pages/Profile.tsx');
const questionService = read('../src/services/questionService.ts');
const firestoreRules = read('../firestore.rules');
const server = read('../server.ts');
const aiGuard = read('../src/server/aiPrivacyGuard.ts');
const askPage = read('../src/pages/AskHomoeopath.tsx');
const aiCanvas = read('../src/components/MateriaMedicaCanvas.tsx');
const analytics = read('../src/lib/analytics.ts');
const contactPage = read('../src/pages/Contact.tsx');
const newsletter = read('../src/components/LeadCapture.tsx');
const privacyPolicy = read('../src/pages/PrivacyPolicy.tsx');
const securityPolicy = read('../SECURITY.md');
const controls = read('../docs/PRIVACY_SECURITY_CONTROLS.md');
const safeHtml = read('../src/components/SafeHtmlContent.tsx');
const hairGuide = read('../src/pages/HairFallGuide.tsx');
const cbcGuide = read('../src/pages/CbcHandbook.tsx');
const adminLinkAudit = read('../src/pages/AdminLinkAudit.tsx');
const nativeAndroidScript = read('../scripts/apply-native-android.mjs');
const nativeAndroidVerifier = read('../scripts/verify-native-android.mjs');
const nativeMainActivity = read('../native-android/MainActivity.kt');

test('HTML has no inline scripts or embedded styles; boot assets are same-origin', () => {
  const scriptTags = [...indexHtml.matchAll(/<script\b([^>]*)>/gi)].map(match => match[1]);
  assert.ok(scriptTags.length >= 3);
  for (const attributes of scriptTags) {
    assert.match(attributes, /\bsrc\s*=/i);
    assert.doesNotMatch(attributes, /\bon[a-z]+\s*=/i);
  }
  assert.doesNotMatch(indexHtml, /<style\b/i);
  assert.match(indexHtml, /\/theme-init\.js/);
  assert.match(indexHtml, /\/boot\.css/);
  assert.match(indexHtml, /\/src\/main\.tsx/);
});

test('production CSP blocks inline JavaScript and unsafe embedding', () => {
  const policy = netlify.split('\n').find(line => line.includes('Content-Security-Policy ='));
  assert.ok(policy);
  const scriptDirective = policy.split(';').find(directive => directive.trim().startsWith('script-src ')) || '';
  assert.ok(scriptDirective.includes("script-src 'self'"));
  assert.ok(scriptDirective.includes('https://checkout.razorpay.com'));
  assert.doesNotMatch(scriptDirective, /unsafe-inline/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /frame-ancestors 'none'/);
  assert.match(policy, /base-uri 'self'/);
  assert.match(policy, /upgrade-insecure-requests/);
  assert.match(netlify, /for = "\/api\/\*"/);
  assert.match(netlify, /Cache-Control = "private, no-store/);
});

test('service worker caches only public static resources and excludes sensitive routes', () => {
  const cacheAssets = serviceWorker.match(/const ASSETS_TO_CACHE = \[([\s\S]*?)\];/);
  assert.ok(cacheAssets);
  assert.doesNotMatch(cacheAssets[1], /['"]\/['"]|index\.html/);
  assert.match(serviceWorker, /SENSITIVE_PATH/);
  assert.match(serviceWorker, /\\.netlify/);
  assert.match(serviceWorker, /profile/);
  assert.match(serviceWorker, /admin/);
  assert.match(serviceWorker, /request\.headers\.has\('authorization'\)/);
  assert.match(serviceWorker, /request\.headers\.has\('cookie'\)/);
  assert.match(serviceWorker, /request\.destination/);
  assert.match(serviceWorker, /request\.headers\.get\('accept'\).*text\/html/);
  assert.match(serviceWorker, /response\.headers\.get\('cache-control'\)/);
  assert.match(serviceWorker, /response\.headers\.has\('set-cookie'\)/);
  assert.match(serviceWorker, /vary === '\*'/);
  assert.doesNotMatch(serviceWorker, /cache\.put\(event\.request/);
});

test('AI endpoints have a stricter shared Netlify edge quota ahead of the general API limit', () => {
  const geminiStart = netlify.indexOf('from = "/api/gemini/*"');
  const apiStart = netlify.indexOf('from = "/api/*"');
  assert.ok(geminiStart >= 0, 'Gemini edge rate limit must exist');
  assert.ok(apiStart > geminiStart, 'the specific Gemini redirect must precede the general API redirect');

  const nextAfterGemini = netlify.indexOf('[[redirects]]', geminiStart + 1);
  const geminiRule = netlify.slice(geminiStart, nextAfterGemini === -1 ? netlify.length : nextAfterGemini);
  assert.match(geminiRule, /to = "\/\.netlify\/functions\/api\/gemini\/:splat"/);
  assert.match(geminiRule, /window_limit = 12/);
  assert.match(geminiRule, /window_size = 60/);
  assert.match(geminiRule, /aggregate_by = \["ip", "domain"\]/);

  const nextAfterApi = netlify.indexOf('[[redirects]]', apiStart + 1);
  const apiRule = netlify.slice(apiStart, nextAfterApi === -1 ? netlify.length : nextAfterApi);
  assert.match(apiRule, /window_limit = 120/);
  assert.match(apiRule, /window_size = 60/);
  assert.match(apiRule, /aggregate_by = \["ip", "domain"\]/);
});

test('Firebase App Check is supported for web when an environment site key is configured', () => {
  assert.match(firebaseClient, /initializeAppCheck/);
  assert.match(firebaseClient, /ReCaptchaEnterpriseProvider/);
  assert.match(firebaseClient, /ReCaptchaV3Provider/);
  assert.match(firebaseClient, /VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY/);
  assert.ok(firebaseClient.indexOf('new ReCaptchaEnterpriseProvider') < firebaseClient.indexOf('new ReCaptchaV3Provider'));
  assert.match(firebaseClient, /VITE_FIREBASE_APPCHECK_SITE_KEY/);
  assert.match(firebaseClient, /isTokenAutoRefreshEnabled: true/);
  assert.match(firebaseClient, /!Capacitor\.isNativePlatform\(\)/);
  assert.match(firebaseClient, /firebaseAppCheckConfigured/);
});

test('native Android does not register the website service worker', () => {
  assert.match(appBootstrap, /Capacitor\.isNativePlatform\(\)/);
  assert.match(appBootstrap, /registerPublicStaticServiceWorker/);
  assert.match(appBootstrap, /import\.meta\.env\.DEV/);
});

test('free-text study toolkit is session-local and no longer syncs to Firestore', () => {
  assert.match(studyToolkit, /sessionStorage/);
  assert.match(studyToolkit, /curiva-study-toolkit-v2-session/);
  assert.doesNotMatch(studyToolkit, /studyToolkitProgress|runTransaction|onSnapshot|setDoc|updateDoc/);
  assert.match(studyToolkit, /clearLegacyPersistentWorkspace/);
  assert.match(studyToolkit, /includeLegacyGuestKeys/);
});

test('native Android preferences are excluded from cloud backup and device transfer', () => {
  assert.match(nativeAndroidScript, /android:allowBackup/);
  assert.match(nativeAndroidScript, /android:fullBackupContent/);
  assert.match(nativeAndroidScript, /android:dataExtractionRules/);
  assert.match(nativeAndroidScript, /curiva_backup_rules\.xml/);
  assert.match(nativeAndroidScript, /curiva_data_extraction_rules\.xml/);
  assert.match(nativeAndroidScript, /device-transfer/);
  assert.match(nativeAndroidVerifier, /android:allowBackup="false"/);
  assert.match(nativeAndroidVerifier, /Android 12\+ cloud backup and device-transfer rules are missing/);
});

test('native Android exposes an explicit local-data reset and warns against patient data', () => {
  assert.match(nativeMainActivity, /Erase all local study data/);
  assert.match(nativeMainActivity, /prefs\.edit\(\)\.clear\(\)\.apply\(\)/);
  assert.match(nativeMainActivity, /Never enter real patient information/);
  assert.match(nativeMainActivity, /filter \{ character -> !Character\.isISOControl\(character\) \}\.take\(40\)/);
});

test('profile and bookmarks do not persist browsing or free-text study data to Firestore', () => {
  assert.match(userService, /sessionStorage/);
  assert.match(userService, /async trackActivity\(_type: string, _details: string\)/);
  assert.match(userService, /async toggleBookmark/);
  assert.doesNotMatch(userService, /collection\(db,\s*['"]kits['"]|collection\(db,\s*['"]screenings['"]/);
  assert.doesNotMatch(profilePage, /collection\(db,\s*['"]kits['"]|collection\(db,\s*['"]screenings['"]/);
  assert.doesNotMatch(profilePage, /clinicAddress|setDoc\(doc\(db,\s*['"]kits|setDoc\(doc\(db,\s*['"]screenings/);
});

test('Firestore denies all client reads and writes to legacy patient-like collections', () => {
  for (const collection of ['kits', 'screenings', 'studyToolkitProgress']) {
    const start = firestoreRules.indexOf('match /' + collection + '/{');
    assert.notEqual(start, -1);
    const close = firestoreRules.indexOf('\n    }', start);
    const block = firestoreRules.slice(start, close + 6);
    assert.match(block, /allow read, write: if false/);
  }
  assert.match(firestoreRules, /function isAdmin\(\)[\s\S]*?exists\(\/databases\/\$\(database\)\/documents\/admins\/\$\(request\.auth\.uid\)\)/);
  assert.match(firestoreRules, /data\.active == true/);
  assert.doesNotMatch(firestoreRules, /premmore0552@gmail\.com/);
  assert.match(firestoreRules, /match \/admins\/{adminId}[\s\S]*?allow create, update, delete: if false/);
});

test('profile schema and update rules deny role escalation and extra contact/clinic fields', () => {
  const start = firestoreRules.indexOf('match /users/{userId}');
  const end = firestoreRules.indexOf('// --- Collection: Native learning progress');
  const userRule = firestoreRules.slice(start, end);
  assert.match(userRule, /allow list: if false/);
  assert.match(userRule, /allow delete: if false/);
  assert.doesNotMatch(userRule, /phoneNumber|clinicAddress|studyStats|streakCount|lastActiveDate/);
});

test('public question submissions are anonymous by default, bounded and pending-only', () => {
  const questionWrite = questionService.slice(questionService.indexOf('async submitQuestion'), questionService.indexOf('async getMyQuestions'));
  assert.match(questionWrite, /validateAcademicAiText/);
  assert.match(questionWrite, /status: QuestionStatus\.PENDING/);
  assert.doesNotMatch(questionWrite, /userEmail:|userName:/);
  const start = firestoreRules.indexOf('match /questions/{questionId}');
  const end = firestoreRules.indexOf('// ---', start + 10);
  const questionRule = firestoreRules.slice(start, end);
  assert.match(questionRule, /isValidQuestion\(incoming\(\)\)/);
  assert.match(questionRule, /allow update: if isAdmin\(\)/);
  assert.match(questionRule, /allow delete: if isAdmin\(\)/);
});

test('AI data sharing requires versioned consent and best-effort sensitive text checks', () => {
  assert.match(aiGuard, /AI_ACADEMIC_CONSENT_VERSION = 'academic-only-v1'/);
  assert.match(aiGuard, /containsPotentialPrivateHealthInformation/);
  assert.match(aiGuard, /validateAcademicAiText/);
  assert.match(askPage, /X-Curiva-AI-Consent/);
  assert.match(askPage, /validateAcademicAiText/);
  assert.match(aiCanvas, /X-Curiva-AI-Consent/);
  assert.match(aiCanvas, /priorHistoryIsSafe/);
  assert.match(server, /requireAcademicAiConsent/);
  assert.match(server, /res\.status\(428\)/);
  assert.match(server, /limit: "128kb"/);
});

test('Firestore client diagnostics never log or return user identity', () => {
  const start = firebaseClient.indexOf('export function handleFirestoreError');
  const end = firebaseClient.indexOf('// Safe connection check for Firestore', start);
  assert.ok(start >= 0 && end > start);
  const handler = firebaseClient.slice(start, end);
  assert.doesNotMatch(handler, /currentUser\?\.uid|currentUser\?\.email|providerData|emailVerified/);
  assert.doesNotMatch(handler, /authInfo|userId:\s*auth/);
  assert.doesNotMatch(handler, /error:\s*errMsg/);
  assert.match(handler, /collection/);
  assert.match(handler, /Cloud data operation failed/);
});

test('payment webhook diagnostics do not log internal order identifiers', () => {
  assert.doesNotMatch(server, /has no customer email[^\n]*orderId/i);
  assert.match(server, /Captured payment webhook is missing a customer contact field/);
});

test('server disables health-specific AI and arbitrary content-generation endpoints', () => {
  for (const route of [
    '/api/gemini/hair-loss-coach',
    '/api/gemini/analyze-symptoms',
    '/api/gemini/professional-tool',
    '/api/gemini/generate-ebook',
    '/api/custom-search'
  ]) {
    const position = server.indexOf('app.post("' + route + '"');
    assert.notEqual(position, -1);
    assert.match(server.slice(position, position + 650), /status\(410\)/);
  }
  const personalization = server.slice(server.indexOf('app.post("/api/personalize"'));
  assert.doesNotMatch(personalization, /safeGenerateContent|userProfile|userQuery|edge_all_open_tabs/);
});

test('analytics and fake collection forms stay disabled', () => {
  assert.match(analytics, /Deliberately disabled/);
  assert.doesNotMatch(analytics, /^\s*(?:window\.)?gtag\s*\(/m);
  assert.doesNotMatch(analytics, /^\s*console\.log\s*\(/m);
  assert.match(contactPage, /does not currently operate a verified online feedback inbox/);
  assert.doesNotMatch(contactPage, /wa\.me\/|onSubmit=/);
  assert.match(newsletter, /Newsletter subscriptions are not currently enabled/);
});

test('dynamic content is rendered through a strict HTML allowlist, never raw innerHTML', () => {
  for (const page of [hairGuide, cbcGuide, adminLinkAudit]) {
    assert.doesNotMatch(page, /dangerouslySetInnerHTML/);
  }
  assert.match(hairGuide, /SafeHtmlContent/);
  assert.match(cbcGuide, /SafeHtmlContent/);
  assert.match(adminLinkAudit, /SafeHtmlContent/);
  assert.match(safeHtml, /forbiddenTags/);
  assert.match(safeHtml, /script/);
  assert.match(safeHtml, /iframe/);
  assert.match(safeHtml, /safeHref/);
  assert.match(safeHtml, /noopener noreferrer nofollow/);
  assert.doesNotMatch(safeHtml, /dangerouslySetInnerHTML/);
});

test('privileged appointment and account-linked payment actions require verified email', () => {
  assert.match(server, /if \(!identity\.emailVerified\)/);
  assert.match(server, /if \(!identity\.emailVerified \|\| !appointmentAdminUids\(\)\.includes\(identity\.uid\)\)/);
  assert.match(server, /if \(!verifiedOrderUser\.emailVerified\)/);
  assert.match(server, /!verifiedUser\.emailVerified/);
});

test('privacy and security notices document implemented controls and known gaps', () => {
  assert.match(privacyPolicy, /Google Gemini/);
  assert.match(privacyPolicy, /best-effort/);
  assert.match(privacyPolicy, /Legacy records/);
  assert.match(privacyPolicy, /self-service account-deletion workflow/);
  assert.match(securityPolicy, /Private vulnerability reporting/);
  assert.match(controls, /33 npm audit findings/);
  assert.match(controls, /penetration test/i);
});
