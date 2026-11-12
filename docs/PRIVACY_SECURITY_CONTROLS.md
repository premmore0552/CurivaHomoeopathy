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
- **A PR-only preview now builds successfully.** Draft PR #58 has a ready Netlify Deploy Preview at [deploy-preview-58](https://deploy-preview-58--curivahomoeopathy.netlify.app/). Netlify reports the `api` function deployed, four redirect rules processed, and five header rules processed. This validates the preview build/configuration only; it does not change the production alias. The website CI now runs the low-risk HTTP checks in `scripts/verify-deploy-preview.mjs` against each pull request preview (posts, appointment configuration, AI consent gate, invalid payment-order validation and fake-webhook rejection). Production browser/integration tests still need a controlled release window and real provider credentials.
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


## Follow-up verification after PR #58 merge — 8 November 2026

This section supersedes the earlier point-in-time statements above where they described PR #58 as a draft or said that no post-merge production-context deployment existed. The historical section is retained to preserve what was known at the time.

- **PR #58 is merged.** It merged into `main` on 8 November 2026. The current `main` commit is `54241aa2f155fae1fefb56aa47d1bd85c98dacf2`.
- **The PR #58 CI runs passed.** The website verification job, Android debug APK job, and CodeQL analyses for Actions, Java/Kotlin, and JavaScript/TypeScript all completed successfully.
- **A new Netlify production-context deployment is ready, but publication is not yet confirmed.** Deploy `6af01842f271bc3d7f3312fd` was created on 8 November 2026 for branch `main` at commit `54241aa2f155fae1fefb56aa47d1bd85c98dacf2`. Its state is `ready`; the summary reports one deployed `api` Function, three redirect rules and five header rules. However, its `published_at` field is unset. The Netlify project's published-deploy record still points to deploy `6ada8a18eb547690fb669c28`, published on 23 October 2026, with no Functions. **Do not claim that the new API or security routing is live on the public alias until Netlify confirms the new deploy is published and the alias points to it.**
- **The visible Netlify environment-variable inventories are empty.** The site-level environment-variable listing and team-level environment-variable listing both returned no entries during this follow-up check. This does not rule out credentials held in a separately linked provider or other account context, but no required integration secrets were visible through these inventories. Before enabling the affected integrations, verify the Netlify UI and configure the required server-only credentials as secrets with least-privilege scopes and appropriate deploy contexts.
- **Live production HTTP smoke testing remains incomplete.** The repository's existing `scripts/verify-deploy-preview.mjs` intentionally rejects the production alias and is designed for deploy-preview URLs. The five low-risk preview probes were not rerun against production as part of this follow-up. Run an approved production smoke-test plan after publication, using safe requests that do not create charges, send email, write real appointments or mutate user data.
- **GitHub repository protection remains an administrator task.** The repository rulesets endpoint returned an empty list. The current GitHub connection could not read the branch-protection endpoint, so verify the live branch-protection page directly. The weekly Dependabot update schedules are present, but alert and push-protection states still require confirmation in repository settings.
- **No published GitHub Release was returned by the releases endpoint during this check.** Semantic release/versioning remains a separate project task.

The new operator procedure is documented in [GitHub repository protection](GITHUB_REPOSITORY_PROTECTION.md). These facts are a point-in-time audit and should be refreshed after publication and provider configuration.


## Security readiness re-check — 12 November 2026

This addendum records the live state observed after PR #83 merged. It supersedes older point-in-time statements only where explicitly noted. This is an operational configuration review, not a penetration test or compliance certification.

### GitHub repository controls

- Default branch is main; observed head: e65e6a82e5b2f2975441411b1764690ffaab9c13 (PR #83 merge commit).
- GitHub's branch listing reports protected: true, but its embedded protection summary reports required_status_checks.enforcement_level: off and an empty contexts/checks list. The rulesets endpoint returns an empty array. The detailed branch-protection endpoint returns HTTP 403 to the connected integration, so approval count, conversation resolution, force-push and deletion restrictions cannot be independently verified. Do not describe main as fully protected.
- No root CODEOWNERS or .github/CODEOWNERS file exists. Do not enable code-owner review until at least two active, independent human maintainers are confirmed.
- .github/dependabot.yml configures weekly npm and GitHub Actions update schedules, including security-update grouping. This is not evidence that Dependabot alerts/security updates are enabled in repository settings.
- The connected GitHub integration cannot read or administer repository security feature toggles, collaborator membership/MFA, or account passkey state. Secret scanning, push protection, Dependabot alerts, private vulnerability reporting, collaborator access and administrator MFA therefore remain unverified.
- The GitHub connection has admin permission on the repository object, but its installed integration cannot access branch-protection administration endpoints. No branch rules, security toggles or collaborator permissions were changed in this audit.

### Netlify and Firebase configuration

- Netlify project curivahomoeopathy (site ID 93ecb839-499a-4284-aafc-97d19fec7d04) is public; visitor password and team-SSO gates are both off.
- The latest published deploy returned by Netlify is 6af2291dafedaeb655e0dbb2, published 9 November 2026, for main commit 32d8df7a2461993a3826b9b831d50e63a95f61fc. It contains one api Function, four redirect rules and five header rules. This is not the current GitHub main head (e65e6a82e5b2f2975441411b1764690ffaab9c13); PR #83 was merged with [skip netlify]. No build or publication for the newer main commit was triggered by this audit.
- The site-level Netlify environment inventory contains VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY in the Production context. Netlify masks its value and marks the variable is_secret=true; its scopes are builds, functions and runtime. The site/team inventory returned no team-level variables.
- The masked value cannot be compared with the Firebase Console's registered reCAPTCHA Enterprise site key. Therefore App Check key equality, Firebase registration and enforcement remain unverified. A public reCAPTCHA site key is not a server secret: after verifying the exact key with Firebase, recreate/configure this variable as non-secret, Production context, Builds scope only. The Netlify connector cannot change the secret flag or scopes on an existing variable; its upsert operation changes the value only. Do not delete/recreate it without the verified plaintext value and an approved maintenance window.
- No Firebase Console registration or enforcement state was available through the connected services. Do not enable enforcement until the exact provider/key match is verified and valid traffic has been monitored.
- The team-level environment inventory is empty. The site-level inventory contains only the masked App Check variable; no Firebase Admin service-account, Gemini, Razorpay, webhook, private-storage, Resend or calendar credentials were visible. Do not infer that linked-provider or other external account scopes are empty.

### Release gate and owner actions

- Keep production publication on hold until the current main commit has a reviewed production-context build, the App Check key is verified and correctly scoped, required server-only credentials are provisioned where the relevant features are intentionally enabled, and sandbox/negative-path smoke tests pass.
- Do not put service-account JSON, Gemini/Razorpay/webhook credentials, email credentials, patient data or private files in GitHub, issues, PRs or chat.
- Before changing the main protection policy, identify a second trusted human reviewer. Then activate a ruleset requiring PRs, one independent approval, stale-review dismissal, resolved conversations, the verified website/Android/CodeQL checks, and no force pushes or deletion. Keep bypass empty for routine work.
- Repository security feature states, account MFA, collaborator access, Firebase Console state, external-provider credentials, independent penetration test, backup/restore drill, India privacy/legal review and clinical editorial review remain owner/provider/independent-review tasks.


## Post-PR #84 current-main and configuration re-check — 12 November 2026

After PR #84 merged, current GitHub main is `fa14d6014662a127e4159acd0af06fe5183e1fc9`. This supersedes the earlier `e65e6a82...` main-head reference above. PR #84's documentation-only merge retained `[skip netlify]`.

### Current production deployment

- Netlify's published production deploy remains `6af2291dafedaeb655e0dbb2` for commit `32d8df7a2461993a3826b9b831d50e63a95f61fc` (published 9 November 2026). It contains one `api` Function, four redirect rules and five header rules. The published commit is behind current GitHub main (`fa14d601...`). No deployment for the current main commit was triggered during this review.
- No production publication or mutation test was run. The deploy is not upgraded merely because a newer GitHub commit was merged. Production remains a separate release gate.

### Current Netlify environment inventory

- The site inventory returns exactly one variable: `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` in Production. Its value is masked, it is marked secret, and its scopes are Builds, Functions and Runtime. The team-level inventory is empty.
- This is a public browser site key, not a private credential. It should ultimately be configured non-secret, Production-only, Builds-only, but only after the value is independently matched against the reCAPTCHA Enterprise key registered to the Curiva Web app in Firebase Console. The current masked value cannot be compared, and the Netlify connector cannot amend an existing variable's secret flag/scopes through its upsert operation. Do not delete or overwrite it without the verified site key and a reviewed change window.
- No server-side provider variables were visible in the site-level inventory. Variables documented in `.env.example` and `docs/PRODUCTION_INTEGRATION_VERIFICATION.md` but absent from the inventory include `FIREBASE_SERVICE_ACCOUNT_JSON`, `GEMINI_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`, `CURIVA_PRIVATE_DOWNLOAD_BUCKET`, `RESEND_API_KEY`, `RESOURCE_EMAIL_FROM`, `CURIVA_APPOINTMENT_NOTIFICATION_EMAIL`, `CURIVA_CLINIC_CALENDAR_ID`, `CURIVA_CLINIC_TIMEZONE`, and `CURIVA_APPOINTMENT_ADMIN_UIDS`. Optional server configuration values `FIRESTORE_DATABASE_ID` and `FIREBASE_WEB_API_KEY` were also not present. The public checkout variable `VITE_RAZORPAY_KEY_ID` was not present. These should only be provisioned if the corresponding feature is intentionally enabled, using isolated test values in deploy previews and least-privilege production secrets/functions scopes. Do not place secrets in `VITE_*`.
- The server reads `CURIVA_APPOINTMENT_ADMIN_UIDS` as a server-side comma-separated Firebase UID allowlist. No value was visible in Netlify. Appointment administration must remain disabled until real staff UIDs are reconciled and added through privileged configuration; never use email/display-name matching or client profile roles as a substitute.

### Latest CI and analysis status

- PR #84's `Typecheck, build website, and validate free OTA bundle` job passed on head `be9ca3577a8cdc1c1a9d36074678baa816e38827`, including typecheck, website/OTA build, dependency advisory reports, Organon curriculum tests, privacy/security checks and Firestore emulator tests.
- CodeQL passed for Actions, Java/Kotlin and JavaScript/TypeScript on that head.
- The SonarQube workflow job completed successfully but skipped the actual scanner because repository settings `SONAR_TOKEN`, `SONAR_HOST_URL` and `SONAR_PROJECT_KEY` are not configured.
- The deploy-preview smoke test was skipped intentionally with `[skip netlify]`. These CI results do not prove live Firebase, Razorpay, Resend, private Cloud Storage or Calendar integration credentials are configured.

### Current closure decision

Keep issue #46 open. Main is flagged protected but required-check enforcement is off and no required contexts are configured; rulesets remain empty. Secret scanning, push protection, Dependabot alert toggles, private vulnerability reporting, account MFA/passkeys, all collaborator membership, Firebase App Check registration/enforcement, external linked-provider credentials, production smoke tests, independent penetration testing, backup/restore, India privacy/legal review and qualified clinical editorial review remain unverified or owner/provider/independent-review actions. This document is not a certification.
