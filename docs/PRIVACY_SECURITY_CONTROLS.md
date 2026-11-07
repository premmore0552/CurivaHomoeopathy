# Curiva privacy and security controls

_Last reviewed: 8 November 2026_

This document records controls present in the source branch and actions still required from repository, Firebase, Netlify and business administrators. Source-code changes alone do not prove that production configuration is correct. Do not treat this document as a penetration-test report or legal compliance certification.

## Implemented in this branch

### Personal and health information

- The public study workspace stores free-text notes, reflections, flashcards, reading logs and tasks in tab-scoped `sessionStorage`; it no longer writes the Study Toolkit document to Firestore.
- Legacy local-storage migration is scoped to the guest workspace. Switching to a signed-in account does not clear the guest namespace.
- The profile page no longer exposes client-side case logs or reproductive-health screening records.
- Firestore client access to legacy `kits`, `screenings` and `studyToolkitProgress` collections is denied for all clients, including owners and web administrators. Existing records are not automatically deleted by this rule change.
- Profile documents have a closed field allowlist, owner-only reads, no list access, bounded fields and no client delete. Client profile updates cannot add phone numbers, clinic addresses or role authority.
- The question submission service stores the authenticated UID and academic question only. It does not store the submitter's email or display name. Submissions must be pending and bounded; only privileged administrators can publish or answer them.
- User bookmarks, reading history and learning performance summaries are stored in the browser session, not added to the Firestore profile by the current user service.
- Public Health eBook reading progress remains browser-local.

### AI data flows

- Academic AI interfaces show an explicit acknowledgement before calling the Gemini-backed academic assistant. The acknowledgement is versioned and scoped to the current browser tab/session.
- Client and server both reject common patterns for contact identifiers and sensitive health narratives before the academic AI proxy calls Gemini.
- These pattern checks are best-effort filters. They cannot reliably detect every name, identifier, diagnosis, clinical narrative or re-identification risk. Never submit real patient information.
- Symptom-to-remedy analysis, patient-case AI analysis modes, personalized hair-health AI coaching, arbitrary AI eBook generation and external query-based research search are disabled.
- The hair-health AI endpoint returns 410. The AI eBook generation and custom external search endpoints return 410.
- The personalization endpoint returns a predefined role-specific configuration. It does not send profile content, user queries or open-tab URLs to an AI provider.
- The fictional study simulator is local/non-generative and validates submitted text before processing.

### API and browser protections

- Express JSON input has a 128 KiB body limit. Netlify's `/api/*` rewrite also applies a provider-edge rate limit of 120 requests per 60 seconds, aggregated by client IP and domain. This complements the in-process route limits; it is not a shared absolute limit across all visitors.
- Raw request bytes are retained only for the Razorpay webhook signature-verification route; ordinary API/AI requests are not duplicated into `req.rawBody`.
- API responses receive private/no-store headers in Express and Netlify configuration.
- Existing sensitive/private download routes retain server-side access checks and short-lived resource delivery. Public browser bundles are never treated as private.
- Service-worker caching is limited to same-origin static script/style/image/font resources. HTML, API, authenticated/cookie-bearing, account, appointment, profile, admin, and private download paths are network-only.
- The service worker refuses to store responses marked private/no-store/no-cache, with Set-Cookie, or with a sensitive Vary header.
- The web Firebase client prefers reCAPTCHA Enterprise when `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` is configured, with reCAPTCHA v3 as a compatibility fallback using `VITE_FIREBASE_APPCHECK_SITE_KEY`. Register the selected provider and secret in Firebase Console, then monitor metrics before enforcement; do not describe App Check as active until Firebase Console enforcement is enabled. Native Android uses a different attestation provider and is not covered by the web integration.
- The website HTML contains no inline JavaScript. Theme initialization and version/service-worker bootstrapping are same-origin files/modules.
- CSP blocks inline scripts, inline script attributes, objects and framing. Style attributes remain allowed for current React/motion presentation. Razorpay, Firebase, Google authentication and font origins are explicitly allowlisted.
- Security headers include frame denial, MIME sniffing protection, strict referrer policy, HSTS, COOP, and a restrictive Permissions Policy.
- Browser analytics event logging is disabled. The newsletter and contact feedback forms no longer pretend to submit or accept data when no backend is connected.
- Administrator membership documents are read-only to clients. Admin grants must be provisioned or revoked using a privileged Firebase Admin SDK/Console operation. A hard-coded verified-email bootstrap was removed from client and Firestore rule code.

## Native Android local-data protection

- The native app is offline-only and stores the learner display name, lesson completion, saved cards, study-plan checkmarks and quiz statistics in app-private preferences. It does not upload this study state to Curiva.
- The generated manifest sets `android:allowBackup="false"` and references explicit legacy backup rules plus Android 12+ data-extraction rules. Both cloud backup and device-to-device transfer exclude the app's private files, databases and shared preferences.
- The Progress screen provides a confirmed **Erase all local study data** action. Clearing app data or uninstalling the app removes this state; it cannot be restored from Curiva.
- The display name is capped at 40 characters and strips control characters. The screen warns users not to enter real patient information.

## Account-enabled Capacitor learning workspace and cloud-progress reset

The repository contains two separate Android experiences. The standalone Jetpack Compose APK is offline-only as described above. A separate account-enabled learning experience (also used by the Capacitor shell when that shell is present) has optional Firebase sign-in and syncs a limited academic progress snapshot to `nativeLearningProgress/{uid}`.

- The snapshot currently contains completed lesson identifiers, quiz subject/date/score summaries, mastered flashcard identifiers, study-day dates, a last-lesson reference and a bounded daily checklist. It does not contain bookmarks or free-text Study Toolkit notes.
- Firestore rules restrict this collection to owner-only document get/create/update, deny list access and deny client document deletion. Writes are field-allowlisted and size-bounded. The account UID is the document ID and is checked by the rule.
- The signed-in experience keeps an owner-scoped local cache in browser/app storage to support offline learning and account switching. Browser/app local storage is not encrypted by Curiva. Clearing only local site/app data does not delete the Firestore snapshot.
- The Progress screen's reset action now asks for confirmation and replaces the signed-in account's progress fields with an empty snapshot as well as clearing the active device cache. The write is serialized with background sync so an older in-flight sync cannot repopulate the cleared data. Bookmarks are deliberately retained. Guest/offline mode clears only the guest device namespace.
- Signing out stops further sync but does not delete previously synced progress. Users must use the confirmed reset action while signed in to clear that progress. This reset does not delete the account, appointment, payment or other Firestore records.
- The reset path must pass the website TypeScript build and the Firestore emulator tests before release. It is not a full account deletion feature or a general clinical-record deletion workflow.

## Production deployment and configuration audit — 8 November 2026

This is a point-in-time operational audit, separate from the source-code tests and GitHub CI results.

- **Production is still on the older published deploy.** Netlify's latest published production record available during this audit is from 23 October 2026 and reports no deployed serverless functions. The subsequent production deploy attempt for the 7 November `main` commit (`fec5bf23deb98b7d98fc83bfa9ff3d7ae449b668`) failed during the build. Do not claim the new Express API protections, Firestore-backed workflows or `/api/*` edge rate-limit rule are active on the public site.
- **A PR-only preview now builds successfully.** Draft PR #58 has a ready Netlify Deploy Preview at [deploy-preview-58](https://deploy-preview-58--curivahomoeopathy.netlify.app/). Netlify reports the `api` function deployed, four redirect rules processed, and five header rules processed. This validates the preview build/configuration only; it does not change the production alias. The low-risk HTTP smoke checks in `scripts/verify-deploy-preview.mjs` and production browser/integration tests still need to be run against the preview and production respectively.
- **The package security audit is currently clean on the repair branch.** PR #58's latest website verification reports zero vulnerabilities for the full dependency tree and zero for the production-only tree. This is a point-in-time lockfile audit, not a guarantee that future versions remain free of advisories.
- **Web App Check is not configured in the project-level Netlify environment inventory.** The client supports reCAPTCHA Enterprise (preferred) and reCAPTCHA v3 fallback, but neither `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` nor `VITE_FIREBASE_APPCHECK_SITE_KEY` was present. Web App Check is therefore not active in the current Netlify build configuration. Register the provider in Firebase Console, add the public site key with build scope and the correct contexts, deploy, monitor attested traffic, and only then enable Firebase enforcement. The standalone Compose APK is offline-only; a future native Firebase-enabled app would need a separate Android App Check/Play Integrity integration.
- **Unused Netlify database variables were removed.** `NETLIFY_DATABASE_URL` and `NETLIFY_DATABASE_URL_UNPOOLED` were non-secret project variables and had no references in the repository or `@netlify/database` dependency. Both were deleted on 8 November 2026. If a Netlify database integration is reintroduced, provision new credentials as secrets with least-privilege scopes.
- **The legacy live-update signing variable was removed, not rotated.** `CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64` was not consumed by the current web OTA builder or the standalone offline Android app. The deployed OTA manifest uses HTTPS and SHA-256 checksums; it does not implement publisher-signature verification. The unused variable was deleted on 8 November 2026. Do not reintroduce it unless a signed-update design is implemented with a new key pair, an embedded verification public key, and end-to-end signature tests.
- **The site-level environment inventory is now empty.** This confirms that the unused project variables above are gone; it does not prove that any required integration credentials are configured through team-level, linked-provider or other scopes. Before enabling production integrations, check the Netlify UI and configure the required variables as secrets in the correct contexts/scopes. Server-only variables include `FIREBASE_SERVICE_ACCOUNT_JSON`, `GEMINI_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `CURIVA_PRIVATE_DOWNLOAD_BUCKET`, `RESEND_API_KEY`, and (when appointments are enabled) the calendar/admin UID variables. The browser may receive only the intended public build keys, such as `VITE_RAZORPAY_KEY_ID` and a public Firebase App Check site key. Never paste credentials into issues, pull requests, chats or logs.
- **GitHub main protection is not enabled.** GitHub reports `main` as `protected: false`, and the repository rulesets endpoint returns an empty list. No `.github/CODEOWNERS` file exists. The current GitHub connection cannot configure branch protection/rulesets or verify administrator MFA/passkeys, collaborator membership, secret-scanning/push-protection state, or Dependabot alert enablement. Treat these as outstanding administrator actions; the weekly npm and GitHub Actions update schedules in `.github/dependabot.yml` are configured, but they do not prove security alerts are enabled.
- **No production release has been made as part of this audit.** PR #58 remains a draft and the production alias is unchanged. A ready preview must not be confused with a published production deployment.

## Required production configuration and operator actions

These cannot safely be completed by editing client source alone:

1. Verify that the live Firestore rules equal the reviewed branch rules before enabling the site release.
2. Provision each administrator through a controlled privileged operation. Keep the appointment-admin UID allowlist in server-only Netlify environment variables, and reconcile it with Firestore membership. Never expose service-account credentials in `VITE_*` variables.
3. Require MFA/passkeys for every Firebase/Netlify/GitHub administrator and restrict repository, Firebase console, Razorpay dashboard, email provider, DNS and hosting access to named operators.
4. In GitHub repository settings, enable secret scanning and push protection (where available), Dependabot security alerts, and code-owner reviews. Protect `main` against direct pushes, force pushes and deletion; require pull requests, at least one independent approval, and the website verification, Android build and all configured CodeQL checks. Confirm administrator MFA/passkeys and review collaborators. These controls are not currently active/verified.
5. Configure a distributed edge/WAF rate limit for public and AI API endpoints. Express memory rate limiting is only a per-process mitigation and is not a substitute for edge controls on a serverless deployment.
6. Verify Netlify's deployed headers and redirects against the checked-in configuration. Run a browser smoke test for Google sign-in, Firebase, Razorpay checkout, image/CDN hosts, static eBooks and native live-update downloads. Do not loosen CSP with wildcards or `unsafe-inline` scripts to silence a report.
7. Rotate any API/service-account/payment/email secrets that have ever been committed or exposed. Use provider secret stores, least-privilege service accounts, separate staging/production credentials and a documented rotation procedure.
8. Reconcile and inventory historic documents in `kits`, `screenings`, `studyToolkitProgress`, profiles and backups using a privileged read-only audit. Do not mass-delete records until retention, legal, payment-dispute and user-request requirements have been reviewed and signed off.
9. Publish a verified privacy/grievance contact, data retention schedule, access/correction/deletion request process and incident/breach response procedure. The current UI does not offer a complete self-service account deletion workflow.
10. Obtain an independent application and configuration penetration test, including authenticated/non-owner/admin tests, Firebase rules tests, payment and webhook review, signed-download IDOR tests, XSS/CSP tests, CSRF/CORS checks, secret scanning and restore drills.
11. Obtain qualified clinical editorial review and India-focused privacy/legal review before production use.

## Content security and copyright

- All educational material, question banks, covers, diagrams, logos and downloadable files need a rights register with owner/source, licence or permission, required attribution, review date and permitted distribution.
- Clinical statements need source links, author, qualified reviewer, publication/review date, version and a correction history. Health content must clearly separate established evidence, uncertainty and historical/complementary beliefs.
- Public eBooks are shipped to the browser and therefore can be copied. Disabling right-click, hiding text or client-side encryption is not real access control.
- Restricted or paid files must remain in private storage and be served through short-lived signed links only after server-side entitlement checks, rate limits and audit events. Do not put private files in `public/`, the website bundle, Android public assets or service-worker cache.
- User-submitted questions must remain pending until a moderator reviews them. Never render untrusted HTML; render user content as text/escaped Markdown with a restricted component set.
- Do not use external generative search to invent references, medical papers, citations or URLs. Every published source must be checked by an editor.

## Known release risks

- The latest repair-branch CI audit reported zero full-tree and zero production-only npm vulnerabilities. Keep the audit gates/reporting enabled and treat any future unremediated high/critical production-path finding as a release blocker until fixed or formally accepted with a documented risk decision.
- Firestore records from earlier versions may still exist. Denying client access is not deletion.
- Browser session storage is not encrypted by Curiva; it is appropriate only for ordinary study notes, never for confidential records.
- The AI PII filter is heuristic and not a de-identification system.
- CSP allows style attributes for current UI compatibility. Inline JavaScript is not allowed; the remaining style allowance should be replaced with classes/nonces where practical.
- API abuse controls are layered: Netlify applies a shared per-IP/domain edge quota (12 requests/minute for Gemini routes and 120 requests/minute for the broader API), with Express process-local limits as a secondary backstop. These edge quotas are IP-scoped, not authenticated account quotas; users sharing a public IP share the quota. Review campus/shared-network impact and provider spend alerts before broad rollout.
- The current code does not provide a complete user data export/deletion workflow or a published retention schedule.

## Release verification checklist

- [ ] `npm run lint`
- [ ] Website production build and OTA bundle validation
- [ ] Firestore rules emulator tests for guest, owner, other user and admin
- [ ] Netlify API tests for no-auth, invalid payload, PII, rate limit, webhook signature and private-download IDOR
- [ ] Run `npm run verify:deploy-preview -- <preview-url>` and confirm the preview contains the `api` Function
- [ ] Confirm the Gemini-specific Netlify edge quota precedes the general API redirect and review shared-IP impact
- [ ] Confirm the production deploy record lists the `api` Function and the required production runtime variables are present with secret flags
- [ ] CSP and service-worker regression tests
- [ ] CodeQL and fresh production dependency audit
- [ ] Manual mobile/desktop sign-in, payment, reading, accessibility and offline tests
- [ ] Security configuration review and independent penetration test
- [ ] Clinical editorial, content licence and privacy/legal review
