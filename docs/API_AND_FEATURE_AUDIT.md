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
1. Determine where the Express process actually runs. A static Netlify publish of `dist` does not by itself run `server.ts`.
2. `server.ts` explicitly describes its post collection as a **pure JavaScript in-memory representation**. It does not initialize SQLite in the inspected source. That means server process restarts discard in-memory changes; SQLite mentioned in the README appears stale or inaccurate for the current implementation.
3. The `POST /api/send-resource-email` endpoint is labelled as simulated delivery in source, waits briefly, and returns a success response without integrating with an email provider. The UI must not imply that a real email was sent until a provider is connected and delivery status is meaningful.
4. Confirm whether API clients use same-origin endpoints, and whether the Express process is reachable in production. Standard static Netlify publishing does not itself run `server.ts`; a separate service or explicit functions/server deployment is required.
5. Test all authorization paths and Firestore rules with signed-out, owner, and non-owner users. The inspected REST-like Express endpoints include no dedicated booking or clinical-record routes.
6. Build appointment persistence and scheduling against a verified backend; do not show made-up availability or accept real clinical details into demo storage.
7. Patient records need private file storage, strict ownership/role access, audit events, retention/deletion policy, and a tested recovery process.
8. Review payment integrity before expanding commerce: server-side order creation currently receives amount/currency/receipt from the request. Verify product pricing and allowed currencies server-side rather than trusting a client-supplied amount.

## Next implementation candidates
- First: shared visual primitives and responsive public homepage, keeping current routes and role switching.
- Then: a booking flow only after the actual runtime/backend target is confirmed; if backend deployment is unavailable, deliver the UI as clearly labelled non-submitting prototype until a real persistence layer exists.
- Patient portal: appointments/profile before clinical records; keep clinical records disabled until the security/storage review is complete.
- Android: improve native UI independently, preserve local learning keys, and test the native app shell and offline behavior.
