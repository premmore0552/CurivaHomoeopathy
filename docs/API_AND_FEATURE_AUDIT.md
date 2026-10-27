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
2. Confirm durable database configuration and backup strategy. The README references SQLite; local SQLite should not be assumed persistent in a serverless/static deployment.
3. Confirm whether API clients use same-origin endpoints, and whether those endpoints are reachable in production.
4. Test all authorization paths and Firestore rules with signed-out, owner, and non-owner users.
5. Build appointment persistence and scheduling against a verified backend; do not show made-up availability or accept real clinical details into demo storage.
6. Patient records need private file storage, strict ownership/role access, audit events, retention/deletion policy, and a tested recovery process.

## Next implementation candidates
- First: shared visual primitives and responsive public homepage, keeping current routes and role switching.
- Then: a booking flow only after the actual runtime/backend target is confirmed; if backend deployment is unavailable, deliver the UI as clearly labelled non-submitting prototype until a real persistence layer exists.
- Patient portal: appointments/profile before clinical records; keep clinical records disabled until the security/storage review is complete.
- Android: improve native UI independently, preserve local learning keys, and test the native app shell and offline behavior.
