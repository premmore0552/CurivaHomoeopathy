# API and feature inventory (source-level)

Inspected on `feat/full-platform-transformation`; this is not a runtime or production smoke test.

## Express endpoints found in `server.ts`
- `POST /api/send-resource-email`
- `POST /api/create-razorpay-order`
- `POST /api/verify-razorpay-payment`
- `POST /api/gemini/curiva-care`
- `POST /api/gemini/hair-loss-coach`
- `POST /api/gemini/search`
- `POST /api/gemini/analyze-symptoms`
- `POST /api/gemini/case-simulation`
- `POST /api/gemini/simulation-feedback`
- `POST /api/gemini/professional-tool`
- `POST /api/gemini/generate-ebook`
- `POST /api/custom-search`
- `POST /api/personalize`
- `GET /api/posts`
- `GET /api/posts/slug/:slug`
- `GET /api/posts/:id`
- Catch-all `*` for app/static fallback

No dedicated appointment/availability or patient medical-record API route was found in this top-level Express route inventory. Some workflows may use Firestore directly; confirm with end-to-end tests before declaring them available.

## Feature surface found in source
- Website: many existing educational and clinical-reference routes, plus separate `Home` and `CurivaHome` page modules.
- Authentication: Firebase Auth integration in `src/pages/Auth.tsx` and `src/lib/firebase.ts`.
- Profile: `src/pages/Profile.tsx` includes learner profile and study/case-log-style UI. Do not assume this is a clinical patient record system.
- Android: Capacitor selects `src/native-app/NativeLearningApp.tsx` in `src/main.tsx`; existing study progress uses local storage state. This data should not be silently migrated or reset.
- Payments: Razorpay endpoints exist; the server only initializes the SDK when required environment variables are present. Payment code is not evidence of appointment booking.

## Blocking verification before production clinical workflows
1. The development branch now exposes the existing Express app through `netlify/functions/api.ts` using `serverless-http`, with `/api/*` rewritten to that function before the SPA fallback. CI bundles and smoke-tests the function against `/api/posts`. This is validated on the branch, not yet deployed to the live Netlify site; configure the required server-side environment variables in a deploy preview before production approval.
2. `server.ts` explicitly describes its post collection as a **pure JavaScript in-memory representation**. It does not initialize SQLite in the inspected source. That means server process restarts discard in-memory changes; SQLite mentioned in the README appears stale or inaccurate for the current implementation.
3. Resource delivery emails now use the Resend API when `RESEND_API_KEY` and a verified `RESOURCE_EMAIL_FROM` are configured. The server only emails after Razorpay capture and durable paid-order recording; failures are reflected in the checkout UI. No provider credentials are present in this branch, so actual delivery is not yet live-verified.
4. The frontend uses same-origin `/api/*` endpoints. The development branch now routes these through a Netlify Function adapter; runtime reachability still needs a deploy-preview smoke test because CI cannot verify live Netlify environment variables or secrets.
5. Test all authorization paths and Firestore rules with signed-out, owner, and non-owner users. The inspected REST-like Express endpoints include no dedicated booking or clinical-record routes.
6. Build appointment persistence and scheduling against a verified backend; do not show made-up availability or accept real clinical details into demo storage.
7. Patient records need private file storage, strict ownership/role access, audit events, retention/deletion policy, and a tested recovery process.
8. Payment uses server-side catalogue pricing, captured payment verification, idempotent Firestore paid-order recording, a signed capture webhook, and time-limited private Cloud Storage download URLs. Before release, upload the actual PDF to the configured private bucket, configure the service account and provider secrets, and test callback/webhook/email/signed-download flows in a deploy preview.

## Appointment request implementation added on the development branch
- `/appointments` now offers a signed-in, request-only workflow: a service category, preferred date, time window, time zone, account contact, and optional phone number. It explicitly says this is not a confirmed booking and does not collect symptoms or medical files.
- `/admin/appointments` provides a status-review interface. Firestore rules, not route visibility, must enforce access: a requester can read only their own requests and cancel a pending request; designated admins can review and update status.
- `firestore.rules` now contains an `appointmentRequests` rule set. The development branch adds `firebase.json` and `firestore.indexes.json` pointing specifically at the named database configured in `firebase-applet-config.json`. Rules still are not deployed automatically: before running Firebase CLI deployment, compare the complete rules file with the currently deployed rules because Firebase deployment replaces the database's rules. Test with the emulator/authorized test accounts and get explicit approval before publishing.
- No email/SMS integration or staff notification is wired. The requester must not rely on a saved request as a booking; an administrator must review it and confirm the real clinic calendar separately. Automatic notifications and a verified clinician directory remain future work.

## Next implementation candidates
- First: shared visual primitives and responsive public homepage, keeping current routes and role switching.
- Then: a booking flow only after the actual runtime/backend target is confirmed; if backend deployment is unavailable, deliver the UI as clearly labelled non-submitting prototype until a real persistence layer exists.
- Patient portal: appointments/profile before clinical records; keep clinical records disabled until the security/storage review is complete.
- Android: improve native UI independently, preserve local learning keys, and test the native app shell and offline behavior.
