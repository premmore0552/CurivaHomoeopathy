# Production integration verification

Last reviewed: 2026-11-07

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
