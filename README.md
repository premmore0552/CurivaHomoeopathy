# Curiva Homoeopathy

An educational blog focused on Homoeopathy, holistic healing, and natural medicine awareness.

## Deployment to Netlify

This project is ready for deployment to Netlify.

### Steps to Deploy

1. **Push to GitHub**:
   - Create a new repository on GitHub.
   - Initialize git in your local project folder:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <YOUR_GITHUB_REPO_URL>
     git push -u origin main
     ```

2. **Connect to Netlify**:
   - Log in to [Netlify](https://www.netlify.com/).
   - Click **"Add new site"** > **"Import from an existing project"**.
   - Select **GitHub** and choose this repository.
   - Netlify will use the settings in `netlify.toml` automatically:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`

### Note on Backend (Express/SQLite)

This project currently uses an Express server with a SQLite database for the API. 
**Netlify's standard deployment is for static sites.** 

To make the blog fully functional on Netlify:
- The current setup uses a local SQLite database which is not persistent on Netlify.
- For a production deployment on Netlify, you should consider moving the blog data to a static JSON file or a headless CMS.

## Local Development

```bash
npm install
npm run dev
```



## Free website + app workflow

Curiva uses one React/Vite frontend for the website and Capacitor app.

- **Website hosting:** Netlify's Free plan, using the existing `curivahomoeopathy.netlify.app` address.
- **Source control and build checks:** public GitHub repository + GitHub Actions.
- **App live updates:** the open-source MIT-licensed `@capawesome/capacitor-live-update` plugin in **self-hosted** mode. The bundle ZIP and `latest.json` manifest are published as ordinary static files by the same Netlify deployment. **No Capawesome Cloud account, API token, or paid OTA plan is required.**
- **Mobile package:** `com.curiva.homoeopathy`.

Free plans have usage limits; this setup is designed to incur no service subscription charges while usage stays within the providers' free quotas. Netlify's free plan has a monthly credit limit, so deployments/traffic may pause when the quota is reached instead of requiring automatic paid overages.

### How updates work

1. A push to `main` triggers the Netlify production deploy (provided the existing Netlify Git integration remains enabled).
2. `npm run build` builds the website, creates a ZIP of the web assets for the app, computes a SHA-256 checksum, and writes `dist/live-updates/latest.json`.
3. Netlify serves the website, manifest, and versioned ZIP from the same free static deployment.
4. After the installed native app has the live-update plugin, it checks the manifest on launch, verifies the ZIP checksum, downloads a newer web bundle and stages it for the next app restart. It does not interrupt an active session.
5. GitHub Actions runs `npm ci`, `npm run lint`, `npm run build`, and ZIP/manifest validation for pull requests and pushes.

Only compatible web-layer changes (HTML, CSS, JavaScript and static assets) can use OTA. Native code, Android permissions, or adding/changing native plugins still require a rebuilt native app. Existing installed apps do not gain live-update support until they receive that first native build.

### Native setup and test APK

The repository does not need to check in generated Android/Gradle files. The workflow `.github/workflows/build-android-debug.yml` creates the Android platform from the Capacitor config, syncs the native plugin, builds a debug APK, and uploads it as the `curiva-android-debug-apk` artifact. Run it from the GitHub Actions tab or open a pull request affecting the app files.

For local development:

```bash
npm ci
npm run build
npm run cap:add
npx cap sync android
npx cap open android
```

Keep the package ID `com.curiva.homoeopathy`. The CI APK is a **debug/test build**, not a Play Store release; it uses Android's debug signing key. Installing it over an existing app signed by another key will fail. Do not uninstall any existing production app unless its data is backed up. To update an already-published app in place, its original Android release keystore is required. Store releases require a separately configured, backed-up signing keystore.

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

Paid-resource delivery email uses Resend when `RESEND_API_KEY` and `RESOURCE_EMAIL_FROM` are set. Verify the sender/domain in Resend. Email attempts use a stable idempotency key so browser callbacks and webhook retries do not send duplicates. Without those variables, checkout still presents the signed download link and accurately says email is not configured. Blog records are still seeded in memory. These changes are code- and CI-validated on the development branch; sandbox payment, real email, and private-object delivery still need a configured deploy preview.

## Separate native medical-learning experience

The Android Capacitor entry point is intentionally separate from the browser website. At startup, `src/main.tsx` detects the native platform and dynamically loads `src/native-app/NativeLearningApp.tsx`; only browser visits load the website routes and website providers. The Android app does not navigate to or render `curivahomoeopathy.netlify.app` as its interface.

The native interface contains an animated mobile-first dashboard, BHMS subject/chapter catalogue imported from `src/pages/AllSubjectsHub.tsx`, offline article reading, detailed Anatomy/Physiology/FMT modules, searchable Materia Medica profiles, a repertory browser, the existing multi-subject MCQ bank plus core-science questions, flip-card revision using `src/data/flashcards_data.ts`, subject filters, expandable viva answers, bookmarks, lesson completion, quiz history, mastered-card counts, and a local study streak. Learning progress is stored on the device. Core screens and learning material are bundled with the build and remain available without a network connection; the optional self-hosted live-update check only retrieves update metadata and does not display the website. Native updates are accepted only when the manifest explicitly declares `appShell: curiva-native-learning-v1`, so a legacy website-only manifest cannot replace the native learning interface. The Materia Medica/repertory sections are academic references, not evidence of efficacy or patient-specific treatment advice. Further lesson, video, and question content can be expanded in the native app without changing the public website experience.

The first pass intentionally reuses the website's existing curriculum and article data instead of scraping or remotely loading pages. Imported health material should be reviewed for accuracy and sourcing before being treated as a clinical reference. This product is for education, not diagnosis or patient-specific treatment.


### Clinic appointment calendar integration

Appointment requests remain request-only until the clinic calendar is configured. Set `CURIVA_CLINIC_CALENDAR_ID`, `CURIVA_CLINIC_TIMEZONE`, `CURIVA_APPOINTMENT_ADMIN_UIDS` (comma-separated Firebase Auth UIDs), and optionally `CURIVA_APPOINTMENT_DURATION_MINUTES` in the Netlify function environment. Share the target Google Calendar with the Firebase service account in `FIREBASE_SERVICE_ACCOUNT_JSON` and grant it permission to manage events. Depending on the Google Workspace/domain setup, attendee invitations may require additional delegation. Set `CURIVA_APPOINTMENT_NOTIFICATION_EMAIL` for staff request alerts and configure Resend.

The admin page disables confirmation until the server confirms calendar configuration and requires a real clinic date/time. The server creates or updates the Google Calendar event and requests an attendee invitation before saving status `confirmed` in Firestore. Declining/cancelling a previously confirmed request removes its calendar event first. Client-side Firestore rules block staff status writes so confirmation cannot bypass the server workflow. Test confirmation, rescheduling, cancellation, notifications and retries in a deploy preview before using real appointments. This is not a substitute for a final clinic workflow review.
