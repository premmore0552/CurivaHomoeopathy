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

### Free OTA signing setup

The RSA public key is now embedded in `capacitor.config.ts`. The matching private key must stay out of GitHub source control and be available to the Netlify build that creates signed update ZIPs.

1. Download the matching private-key files from the current ChatGPT response. Keep a secure offline backup of `curiva-live-update-private.pem`.
2. Open Netlify **Project configuration → Environment variables** for the `curivahomoeopathy` site. Add `CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64` with the complete one-line contents of `curiva-live-update-private-base64.txt`. Mark it secret, scope it to builds, and enable it for production deployments. Never paste the private key into the GitHub repo, issues, logs, or chats.
3. Trigger a new production deploy from `main`. The build will sign the self-hosted OTA ZIP. The app downloads the manifest and bundle, checks the SHA-256 checksum and verifies the signature against its embedded public key before applying the update.
4. If the private key is lost or rotated, don't replace it silently: the corresponding public key is in native app builds. Key rotation needs a new native app build with the matching public key.

The private key shown to you was generated specifically for this repository's now-pinned public key. If you prefer to create/own a key pair locally instead, generate a new RSA pair and intentionally update the pinned public key in `capacitor.config.ts` before producing the next native build.

### Website and app deployment

The live Netlify site should remain connected to this repository's `main` branch with build command `npm run build` and publish directory `dist`. Each production build creates the website plus a versioned `/live-updates/latest.json` manifest and ZIP archive. After the first native install containing the Live Update plugin, future compatible web-layer updates can be delivered from that static hosting deployment. Native changes (permissions, plugins, platform code) still need a new native build.

### Local development

```bash
npm install
npm run dev
npm run build
```

This repo's Netlify site builds and deploys from `main`. Keep the Netlify Git connection's build command at `npm run build` and publish directory at `dist`. The site uses a free Netlify subdomain, so a separately purchased domain isn't needed.
