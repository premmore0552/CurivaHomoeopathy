# Production integration verification

Last reviewed: 2026-11-12

This runbook separates code-level checks from provider and production checks. A green build or a Netlify deploy marked **ready** does not prove that a function is deployed, that provider credentials are available in the relevant deploy context, or that external systems accept requests.

## 1. Before testing

Use a deploy preview, not the production domain. Confirm the preview URL, branch, and commit SHA in Netlify. Configure test-only credentials in the Netlify **deploy-preview** context. Do not copy production secrets into pull-request previews unless the preview is trusted and the values are isolated test credentials.

Server-side variables used by the current application:

| Variable | Purpose |
| --- | --- |
| `FIREBASE_SERVICE_ACCOUNT_JSON` | Server-only service-account JSON for Firestore and private Cloud Storage operations |
| `FIRESTORE_DATABASE_ID` | Optional Firestore database override; by default the app uses the database ID in `firebase-applet-config.json` |
| `FIREBASE_WEB_API_KEY` | Optional server-side Identity Toolkit key override |
| `GEMINI_API_KEY` | Server-side Gemini API key for the academic study assistant |
| `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET` | Razorpay test-mode credentials in a preview |
| `RAZORPAY_WEBHOOK_SECRET` | Separate webhook-signature secret configured to match the Razorpay test-mode webhook |
| `CURIVA_PRIVATE_DOWNLOAD_BUCKET` | Private Cloud Storage bucket containing the paid resource PDF |
| `RESEND_API_KEY`, `RESOURCE_EMAIL_FROM` | Resend test sender and verified sender address |
| `CURIVA_APPOINTMENT_NOTIFICATION_EMAIL` | Controlled inbox for appointment request notifications |
| `CURIVA_CLINIC_CALENDAR_ID`, `CURIVA_CLINIC_TIMEZONE` | Test calendar and IANA time zone for appointment confirmation |
| `CURIVA_APPOINTMENT_ADMIN_UIDS` | Comma-separated Firebase UIDs authorized for appointment administration |
| `CURIVA_APPOINTMENT_DURATION_MINUTES` | Optional appointment event duration |

The browser build may receive `VITE_RAZORPAY_KEY_ID`, which is the public checkout key only, and the public Firebase App Check site key (`VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` or the v3 fallback `VITE_FIREBASE_APPCHECK_SITE_KEY`). Never place service-account JSON, Razorpay secrets, webhook secrets, Gemini keys, Resend keys, or private signing keys in `VITE_*` variables or source control.

## 2. Automated repository checks

Run on the pull-request branch:

```bash
npm ci
npm run lint
npm run build
npm run test:privacy-security
npm install --no-save --package-lock=false firebase-tools @firebase/rules-unit-testing
npx firebase emulators:exec --only firestore --project demo-curiva-firestore-rules "node --test tests/firestore.rules.test.mjs"
mkdir -p .netlify-build/functions
npx esbuild netlify/functions/api.ts --bundle --platform=node --format=esm --packages=external --outfile=.netlify-build/functions/api.mjs
node --test tests/netlify-api.test.mjs
```

The GitHub Actions workflow `.github/workflows/verify-curiva.yml` runs the repository typecheck, production build, API adapter tests, privacy/security tests, and Firestore emulator tests. Check the status for the exact pull-request head SHA; do not rely on an earlier commit's green checks.

## 3. Deploy-preview routing smoke checks

After Netlify has produced a preview containing the `api` Function, run:

```bash
npm run verify:deploy-preview -- https://deploy-preview-N--curivahomoeopathy.netlify.app
```

The script checks that:
- `GET /api/posts` reaches Express and returns a JSON array rather than the SPA shell.
- `GET /api/appointments/config` returns the integration-status response.
- `POST /api/gemini/curiva-care` without the versioned consent header is rejected with HTTP 428 before any provider call.
- An invalid checkout email is rejected before storage access or Razorpay order creation.
- A fake Razorpay webhook signature is rejected (HTTP 400), or HTTP 503 clearly identifies a missing preview webhook secret.

These probes do not call Gemini, create an order, send email, write Firestore records, or confirm appointments. They prove route reachability and guard behavior, not successful integration credentials.

## 4. Firestore security and deployment

1. Run the Firestore emulator suite with signed-out, owner, non-owner, and privileged-admin contexts. The `kits`, `screenings`, and `studyToolkitProgress` client collections must deny get, list, create, update, and delete for every client role.
2. Keep legacy screening and case data out of the browser. Do not reopen a sensitive collection merely to make an old profile screen work.
3. Review `firebase.json` before deployment: it targets a specifically named Firestore database. Verify that this is the intended project/database and compare the entire proposed `firestore.rules` file with the deployed rules.
4. A Firebase rules deploy replaces the database's deployed rules. Get a separate explicit approval, verify emulator results and the backup/rollback plan, then deploy only to the intended database. This runbook and the pull request do not deploy rules.

## 5. AI quota and safety

The Gemini route family has a Netlify edge quota of 12 requests per 60 seconds aggregated by client IP and domain. The general `/api/*` edge limit remains 120 requests per 60 seconds. Express also retains its 30 requests per 15-minute in-process backstop; that memory counter is not a shared account-wide quota and must not be described as one.

1. Verify the Netlify redirect order and confirm the Gemini-specific rule precedes the broad API rule.
2. Verify no-consent, excessive-prompt, malformed-history, and sensitive-text rejection in automated tests.
3. In the preview, use only synthetic academic study text. Test prompts asking for diagnosis, prescriptions, stopping prescribed medication, emergency decisions, or identifiable patient information; confirm the safety boundary rejects or safely redirects them.
4. Confirm server logs do not retain full prompts or user health details. Do not submit real patient/student health records for testing.
5. Configure provider-side spend limits/alerts where available. Review the edge limit against expected campus/shared-IP usage before release; users behind one shared public IP share the edge quota.

## 6. Razorpay and private resource delivery

Use Razorpay **Test Mode** only.

1. Confirm the preview has test-mode `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, and a separate `RAZORPAY_WEBHOOK_SECRET`; keep `VITE_RAZORPAY_KEY_ID` public-only.
2. Confirm the configured private PDF exists in the bucket. Enable Public Access Prevention and verify there are no `allUsers` or `allAuthenticatedUsers` bindings.
3. Confirm the Firebase service account has only the required Firestore and Storage object-read permissions.
4. Create one test order and complete one test capture. Verify that a valid payment is recorded as paid only by the server.
5. Deliver a `payment.captured` webhook from the Razorpay test dashboard. Replay it and verify idempotency: one paid order and no duplicate entitlement/email side effect.
6. Verify an unpaid order, invalid signature, wrong resource, wrong owner, missing PDF, and expired signed URL cannot obtain the private file.
7. Do not switch Razorpay to live mode based only on a passing preview.

## 7. Resend and Google Calendar

- Verify the Resend sender/domain and use a controlled test mailbox. Test successful delivery, disabled/missing configuration, provider rejection, and retry behavior.
- Use a dedicated test Google Calendar. Test service-account access, confirmation, an overlapping appointment, rescheduling, cancellation, and a calendar/API failure. A failed calendar write must not leave Firestore showing a confirmed appointment.
- Verify the configured administrator UID list against named staff accounts and require verified email. Never treat a hidden admin page or a client profile role as authorization.

## 8. Production release gate

Before enabling the provider-backed production routes, record the preview URL, branch, commit SHA, test date, and pass/fail results for each integration. Review the exact commit's CI results and inspect the Netlify deploy record for the production context:

- The production deployment must list the `api` function; a successful static-only deploy is not sufficient for `/api/*`.
- Confirm server-side environment variables exist in the **production** context and have the correct function/runtime scopes. Inspect names, context, and secret flags only; do not print secret values into logs or tickets.
- Compare deployed Firestore rules with the reviewed file and verify the named database.
- Configure the intended Firebase App Check provider for web and native separately. Observe metrics before enforcement, then confirm enforcement in Firebase Console; a configured site key alone is not proof that App Check is enforcing requests.
- Check CSP, redirects, cache headers, payment/webhook logs, Firebase App Check configuration/enforcement, backups, and provider retention settings.
- Keep payments in test mode until the release owner explicitly approves a separate live-payment enablement.

### Current observed deployment findings (2026-11-07)

The published production deploy `6ada8a18eb547690fb669c28` is marked ready but its deployment record lists **no deployed Netlify Functions**. A recent deploy preview for PR #47 did deploy one `api` Function. Production must be rebuilt/promoted from a reviewed commit and its deployment record must explicitly show the function before API availability can be claimed.

The Netlify site-level environment-variable inventory observed during this review contained the live-update private key and two Netlify database URL variables, but no application Firebase service-account, Gemini, Razorpay, Resend, private-download bucket, or appointment-calendar variables. Team-level inventory returned no shared values. Configure the necessary values through Netlify's secret-aware environment settings; do not paste them into GitHub.

The two database URL variables were visible as non-secret values during the review. Treat the associated database credential as exposed: rotate the database password, update both Netlify URL variables, mark them secret, and restrict their scopes to the processes that actually need them. Verify the database provider's connection/audit logs after rotation.

No production deployment, Firestore rules deployment, provider secret change, payment, email, or calendar event is performed by this runbook.


## 9. Firebase App Check web rollout — Curiva configuration

### Current repository integration

The web client already initializes App Check in `src/lib/firebase.ts` immediately after `initializeApp(firebaseConfig)` and before `getAuth(app)` / `getFirestore(app, ...)`. It prefers `ReCaptchaEnterpriseProvider`, falls back to `ReCaptchaV3Provider` only when the Enterprise key is absent, enables token auto-refresh, and skips the web provider in development and native Capacitor runtimes.

The following values are read from `import.meta.env` at build time:

- `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` — preferred public reCAPTCHA Enterprise site key.
- `VITE_FIREBASE_APPCHECK_SITE_KEY` — optional legacy reCAPTCHA v3 site-key fallback. Leave it empty when using Enterprise.

The reCAPTCHA site key is intentionally public because it is embedded in the browser bundle. It is not a secret. Never put the reCAPTCHA Enterprise API credentials, service-account keys, debug tokens, or other private credentials in a `VITE_*` variable.

### Curiva project identity to verify in the consoles

Use these identifiers to avoid creating a key in the wrong Google Cloud/Firebase project:

- Firebase project ID: `gen-lang-client-0830179867` (from `firebase-applet-config.json`).
- Firebase Web app ID: `1:750296789037:web:462a945cb832f6d4ac88a4` (from `firebase-applet-config.json`).
- Current production hostname: `curivahomoeopathy.netlify.app`.

Before proceeding, confirm that the Firebase Console project selector shows the same project ID and that the Web app ID shown under Project settings → Your apps matches the ID above. If either differs, stop and resolve the project mismatch before registering a provider.

### A. Create the reCAPTCHA Enterprise key

1. Open the [Google Cloud console](https://console.cloud.google.com/) and select project `gen-lang-client-0830179867`.
2. Open Google Cloud Fraud Defense / reCAPTCHA Enterprise. Enable the reCAPTCHA Enterprise API if Google prompts you.
3. Create a **Web** key with a **score-based** integration. Do not choose a checkbox/challenge key; App Check's web Enterprise provider uses score-based keys and does not show an interactive challenge.
4. Keep domain verification enabled. Add only `curivahomoeopathy.netlify.app` and any verified custom production hostname that Curiva actually serves. Do not add the broad `netlify.app` parent domain, do not disable domain verification, and do not add `localhost` to a production key.
5. Save the key and copy its **site key**. Do not copy or publish any private API credentials or service-account credentials.

If the project picker shows a different project, stop. Do not make a key in a personal/default project by accident.

### B. Register that same key in Firebase App Check

1. Open the [Firebase console](https://console.firebase.google.com/) and select `gen-lang-client-0830179867`.
2. Open **Security → App Check → Apps**.
3. Locate the Web app whose app ID is `1:750296789037:web:462a945cb832f6d4ac88a4`.
4. Register/select the **reCAPTCHA Enterprise** provider and enter the same site key created in step A.
5. Save the app registration. Do not enable enforcement yet.
6. Review the Apps tab for every other app in this Firebase project. Before enforcing any Firebase product, make sure every legitimate client application that uses that product is registered with an appropriate provider. The standalone Kotlin Android APK described in the README is offline-only; do not register it with the web provider. Any separate online/native Firebase client needs its own supported native attestation provider.

### C. Configure the Netlify production build

1. Open the [Curiva Netlify project](https://app.netlify.com/projects/curivahomoeopathy).
2. Open **Project configuration → Environment variables**.
3. Create `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` with the site key from step A.
4. Set the variable context to **Production only** and its scope to **Builds**. The key is public, so it should not be treated as a secret. It is deliberately a `VITE_*` build variable because the browser SDK must receive it.
5. Leave `VITE_FIREBASE_APPCHECK_SITE_KEY` unset unless deliberately using reCAPTCHA v3 instead.
6. Do not copy the production key into every deploy-preview or branch-deploy context. PR preview hostnames are dynamic and are not covered by the production hostname allowlist. Use an isolated Firebase staging project and a separate preview key if preview deployments need live Firebase integration. Avoid making `netlify.app` a blanket allowed domain just to cover ephemeral previews.
7. Trigger a new production build only after the Firebase app registration and Netlify variable have been reviewed. Confirm the resulting deployment was intentionally published; a Netlify deployment marked `ready` is not necessarily the published production alias.

Do not place the site key in `FIREBASE_SERVICE_ACCOUNT_JSON`, `GEMINI_API_KEY`, or any server-only secret variable.

### D. Verify before enforcement

1. Open the production site and test sign-in plus ordinary Firestore-backed flows using a normal browser session. Do not use patient data.
2. In browser developer tools, confirm the Firebase SDK can obtain and attach App Check tokens to requests. Do not copy, post, or log the token value.
3. In Firebase Console → App Check, review request metrics for the Web app and for the Firebase products Curiva actually uses. Confirm that legitimate production traffic is being recognized as valid and investigate any unverified/invalid traffic before proceeding.
4. Check sign-in, Firestore reads/writes used by the learning experience, and any client-side Firebase Storage access if it is introduced later. The current repository's visible client Firebase initialization uses Authentication and Firestore; private paid resources use the server-side download flow. Do not enforce a service the app does not use without a separate reason.
5. Confirm production browser errors and Firebase request failures have not increased. Keep the previous deploy available for rollback.
6. After an observation period that covers normal usage, enable enforcement one Firebase product at a time for the products actually used by registered clients. Monitor metrics and user-facing errors after each change. If legitimate users are rejected, disable enforcement for that product and investigate before retrying.
7. Record the date, app ID, key type, allowed hostnames, Netlify variable context/scope, metric observation window, and enforcement decisions in this runbook. Never record the site key if a policy prefers not to expose config, and never record private credentials or debug tokens.

### E. Development and preview environments

- The current client intentionally skips App Check initialization while `import.meta.env.DEV` is true. Do not put `localhost` into the production reCAPTCHA key's domain list.
- If local development later needs to run while enforcement is active, implement the Firebase App Check debug provider only in a strictly local development build, register an individual debug token in Firebase Console, and keep that token outside source control. Never include a debug token in a public Netlify preview or production bundle.
- For deploy previews, use a separate Firebase staging project and an allowed staging hostname/key, or limit previews to tests that do not call enforced production Firebase services. Do not reuse a production debug token to make public previews pass.
- The standalone Kotlin/Jetpack Compose APK documented in the README is offline-only and does not use Firebase. A future online native app must use a native App Check provider (for example Play Integrity), not the web reCAPTCHA site key.

### Follow-up state observed on 8 November 2026

The Firebase App Check code is present, but the reCAPTCHA key registration could not be verified from repository files. The Netlify site-level and team-level environment-variable inventories returned no variables during this audit, including neither App Check site-key variable. The user reported that the key-registration status is unknown. Therefore, treat App Check as **not yet configured** until steps A–C are completed and confirmed in the provider consoles. No key has been generated, no Firebase provider registration has been changed, no Netlify variable has been added, and no Firebase enforcement has been enabled by this runbook.


## Latest production and provider configuration snapshot — 12 November 2026

The latest published Netlify deploy remains `6af2291dafedaeb655e0dbb2` for commit `32d8df7a2461993a3826b9b831d50e63a95f61fc`, behind current GitHub main `fa14d6014662a127e4159acd0af06fe5183e1fc9`. The published deploy includes the `api` Function, but no build or publication for current main has been triggered. Do not enable provider-backed workflows on the assumption that current source is live.

Netlify's site environment inventory exposes only `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY`, in Production, with its value masked, marked secret and scoped to Builds/Functions/Runtime. The team inventory is empty. This variable is a public reCAPTCHA site key and should be non-secret and Builds-only after its exact value is verified against Firebase Console. Do not replace it without the verified key. No server-side Firebase Admin, Gemini, Razorpay, webhook, private bucket, Resend, calendar or appointment-admin UID values were visible. Keep these integrations disabled/request-only until correct test and production credentials are provisioned and verified.

The app's server-side appointment administrator allowlist is `CURIVA_APPOINTMENT_ADMIN_UIDS`; the code does not make client profile roles authoritative. Provision only verified staff Firebase UIDs through the Netlify function environment after confirming account identities. If no allowlist is configured, appointments remain request-only and admin confirmation should not be enabled.

PR #84 passed website verification, Firestore emulator tests and CodeQL on its PR head. SonarQube scanner execution was skipped because `SONAR_TOKEN`, `SONAR_HOST_URL` and `SONAR_PROJECT_KEY` are absent. Deploy Preview smoke tests were skipped intentionally because of `[skip netlify]`. A ready CI job or PR merge does not replace real provider testing.
