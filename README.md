# Curiva Homoeopathy

An educational medical-learning platform for BHMS students. The website and Android app are separate products.

> **Android app architecture:** The Android build is a standalone Kotlin + Jetpack Compose application. It does not open the React website, does not embed a website WebView, and does not request internet access. Its curriculum, lessons, question bank, flashcards, Materia Medica profiles, and Kent Repertory index are bundled for offline study. Learning progress is saved locally on the device; account sign-in and cloud progress sync are not part of this native build.

## Existing project and deployment workflow

This repository contains the Curiva Homoeopathy website and a separate native Android learning app. The website remains a React/Vite deployment; Android is Kotlin/Jetpack Compose. Continue development in the repository's development branch `feat/full-platform-transformation`; do not create another repository or Netlify site for this work.

- Production hosting remains connected to `main` on the existing Netlify site.
- Feature work should stay in the draft pull request until review and deploy-preview verification are complete.
- Do not merge to `main`, deploy production, or publish Firebase rules without explicit approval.
- The configured Netlify build uses `npm run build` and publishes `dist`; the existing `netlify.toml` owns the rewrite and security-header configuration.

### Local development

```bash
npm ci
npm run dev
npm run build
```

### Deploy-preview validation

Use the current draft pull request's preview build to verify the frontend and API integration before production. Configure secrets only in Netlify's environment-variable settings; never commit real keys or use `VITE_*` for server credentials. Required external-service setup for payments, private downloads, email delivery, and clinic calendar is documented below. Firebase rule deployment should be a separate, reviewed operation because it replaces the database's deployed rules.

Use [`docs/PRODUCTION_INTEGRATION_VERIFICATION.md`](docs/PRODUCTION_INTEGRATION_VERIFICATION.md) for the exact preview smoke command, Firestore emulator and deployment procedure, Gemini quota/safety checks, and Razorpay/Storage/Resend/Calendar release gates.

## Free website + app workflow

Curiva's public website uses React/Vite. The Android application is a separate native Kotlin + Jetpack Compose project generated in CI from the same educational source data.

- **Website hosting:** Netlify's Free plan, using the existing `curivahomoeopathy.netlify.app` address.
- **Source control and build checks:** public GitHub repository + GitHub Actions.
- **Native Android app:** Kotlin + Jetpack Compose, with offline content bundled into the APK. It does not consume website live-update bundles; native UI or content changes require a new Android APK/AAB build.
- **Mobile package:** `com.curiva.homoeopathy`.

Free plans have usage limits; this setup is designed to incur no service subscription charges while usage stays within the providers' free quotas. Netlify's free plan has a monthly credit limit, so deployments/traffic may pause when the quota is reached instead of requiring automatic paid overages.

### How updates work

1. A push to `main` triggers the Netlify production deploy (provided the existing Netlify Git integration remains enabled).
2. `npm run build` builds the website, creates a ZIP of the web assets for the app, computes a SHA-256 checksum, and writes `dist/live-updates/latest.json`.
3. Netlify serves the website, manifest, and versioned ZIP from the same free static deployment.
4. The standalone Compose Android app is intentionally excluded from website OTA updates. New native screens or bundled learning-content updates are delivered in a newly built Android APK/AAB; the website itself continues to update through Netlify.
5. GitHub Actions runs `npm ci`, `npm run lint`, `npm run build`, and ZIP/manifest validation for pull requests and pushes.

Only the website browser layer uses the website's static update artifacts. The standalone Compose Android app does not download or display website bundles; native UI and bundled learning-content updates require a new Android APK/AAB.

### Native setup and test APK

The repository does not check in generated Android/Gradle files. The workflow `.github/workflows/build-android-debug.yml` generates a temporary Capacitor platform shell, replaces its WebView activity and bridge dependencies with the native Compose activity, exports bundled offline study content, verifies that website assets and internet permissions are absent, builds a debug APK, and uploads it as the `curiva-android-debug-apk` artifact. Run it from the GitHub Actions tab or open a pull request affecting the app files.

For local development:

```bash
npm ci
npm run lint
npm run build
npm run cap:add
npm run export:native-content
node scripts/apply-native-android.mjs
node scripts/verify-native-android.mjs
cd android && ./gradlew assembleDebug
```

Keep the package ID `com.curiva.homoeopathy`. The native app stores lesson completion, study-plan items, flashcard status, saved profiles, and quiz summaries locally with Android SharedPreferences. It does not currently provide login or cloud synchronisation. The CI APK is a **debug/test build**, not a Play Store release; it uses Android's debug signing key. Installing it over an existing app signed by another key will fail. Do not uninstall any existing production app unless its data is backed up. To update an already-published app in place, its original Android release keystore is required. Store releases require a separately configured, backed-up signing keystore.

### Free OTA verification (no secrets required)

This free self-hosted setup verifies each downloaded ZIP using its SHA-256 checksum over HTTPS. It does **not** use a separate publisher signature, so no private signing key or Netlify environment variable is required. HTTPS protects the download in transit; because the manifest and bundle are published on the same website, anyone who gains control of your Netlify/GitHub publishing account could replace both. Protect those accounts with strong passwords and two-factor authentication.

The previously described `CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64` variable is not used in this no-secret mode. Do not upload that key or add a private key to the GitHub repository. If later you want cryptographic publisher signatures, that requires a matching private key stored securely in the build environment and a public key embedded in a new native app build.

### Website and app deployment

The live Netlify site should remain connected to this repository's `main` branch with build command `npm run build` and publish directory `dist`. Each production build creates the website plus a versioned `/live-updates/latest.json` manifest and ZIP archive. After the first native install containing the Live Update plugin, future compatible web-layer updates can be delivered from that static hosting deployment. Native changes (permissions, plugins, platform code) still need a new native build.

### Local development

```bash
npm install
npm run dev
npm run build
```

This repo's Netlify site builds and deploys from `main`. Keep the Netlify Git connection's build command at `npm run build` and publish directory at `dist`. The site uses a free Netlify subdomain, so a separately purchased domain isn't needed.

## Existing Express API on Netlify

The development branch wraps the existing Express routes in `netlify/functions/api.ts` via `serverless-http`; `netlify.toml` rewrites `/api/*` to the function before the SPA fallback. This keeps the website and API in one project without starting a listening socket inside the function.

Configure server-side environment variables in the Netlify deploy-preview environment before testing integrations: `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `FIREBASE_SERVICE_ACCOUNT_JSON`, `CURIVA_PRIVATE_DOWNLOAD_BUCKET`, optional `FIRESTORE_DATABASE_ID` and `FIREBASE_WEB_API_KEY`, plus `GEMINI_API_KEY` and (when used) `GOOGLE_CUSTOM_SEARCH_API_KEY` / `GOOGLE_CUSTOM_SEARCH_CX`. For delivery email, set `RESEND_API_KEY` and `RESOURCE_EMAIL_FROM`; verify the sender/domain in Resend before enabling it. `VITE_RAZORPAY_KEY_ID` is a public checkout key injected during the frontend build; never place server secrets in `VITE_*` variables.

The payment verification route writes an idempotent `paid` order document to the configured Firestore database using the server-only service account before releasing a download link. The `/api/razorpay-webhook` endpoint validates `X-Razorpay-Signature` against the raw request bytes and re-fetches captured order/payment records before using the same paid-order persistence path. Configure `payment.captured` in the Razorpay dashboard to call this endpoint and set the same webhook secret in Netlify.

Private downloads use Cloud Storage signed URLs. Set `CURIVA_PRIVATE_DOWNLOAD_BUCKET`, enable public access prevention on that bucket, and upload the real PDF at `resources/homoeopathy-modalities-cheat-sheet.pdf`. The server checks that the PDF exists before creating a Razorpay order; the bucket must not grant `allUsers` or `allAuthenticatedUsers` access. The Firebase service account needs Firestore write access and Storage Object Viewer access.

Paid-resource delivery email uses Resend when `RESEND_API_KEY` and `RESOURCE_EMAIL_FROM` are set. Verify the sender/domain in Resend. Email attempts use a stable idempotency key so browser callbacks and webhook retries do not send duplicates. Without those variables, checkout still presents the signed download link and accurately says email is not configured. Public blog articles remain bundled source-controlled content served through read-only GET endpoints; there is no blog write or publishing API. A future editorial workflow must add authenticated durable storage before adding create/update routes. These changes are code- and CI-validated on the development branch; sandbox payment, real email, and private-object delivery still need a configured deploy preview.

## Separate native medical-learning experience

The Android APK launches a Kotlin ComponentActivity that renders native Jetpack Compose screens. It does not load the React router, the website's HTML bundle, or curivahomoeopathy.netlify.app. The browser website remains the React/Vite product.

The native interface contains a BHMS subject browser with year filters, detailed offline learning notes sourced from the CBDC topic database and the Anatomy/Physiology modules, MCQ practice with explanations and timed mock tests, flashcards with active recall, searchable Materia Medica profiles, and a searchable Kent Repertory chapter/rubric index. A daily study checklist, lesson completion, known-card status, saved Materia Medica profiles, quiz attempts, and last quiz score are stored locally on the device. The APK contains its learning data as a bundled JSON asset and removes the website bundle, Capacitor runtime/bridge dependencies, and network permissions. There is no login, cloud sync, AI endpoint, or online content request in this native build. Materia Medica and repertory content is provided for academic study only, not diagnosis or treatment.

The first pass intentionally reuses the website's existing curriculum and article data instead of scraping or remotely loading pages. Imported health material should be reviewed for accuracy and sourcing before being treated as a clinical reference. This product is for education, not diagnosis or patient-specific treatment.


### Clinic appointment calendar integration

Appointment requests remain request-only until the clinic calendar is configured. Set `CURIVA_CLINIC_CALENDAR_ID`, `CURIVA_CLINIC_TIMEZONE`, `CURIVA_APPOINTMENT_ADMIN_UIDS` (comma-separated Firebase Auth UIDs), and optionally `CURIVA_APPOINTMENT_DURATION_MINUTES` in the Netlify function environment. Share the target Google Calendar with the Firebase service account in `FIREBASE_SERVICE_ACCOUNT_JSON` and grant it permission to manage events. Depending on the Google Workspace/domain setup, attendee invitations may require additional delegation. Set `CURIVA_APPOINTMENT_NOTIFICATION_EMAIL` for staff request alerts and configure Resend (`RESEND_API_KEY` and verified `RESOURCE_EMAIL_FROM`) for staff and requester notifications.

The admin page disables confirmation until the server confirms calendar configuration and requires a real clinic date/time. The server creates or updates the Google Calendar event and requests an attendee invitation before saving status `confirmed` in Firestore. Declining/cancelling a previously confirmed request removes its calendar event first. Client-side Firestore rules block staff status writes so confirmation cannot bypass the server workflow. Test confirmation, rescheduling, cancellation, notifications and retries in a deploy preview before using real appointments. This is not a substitute for a final clinic workflow review.
