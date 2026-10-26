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

### One-time native setup

The repository currently does not contain generated `android/` or `ios/` platform folders. In the environment where you build the app:

```bash
npm install
npm run cap:add
npx cap sync android
npx cap open android
```

Build and install/release a new APK/AAB with the Live Update plugin included. Do not change the existing package ID `com.curiva.homoeopathy`. You must sign native Android releases with your own keystore; keep a backup of that keystore. OTA updates cannot add a native plugin to an already-installed app.

### Optional: free code-signing setup (recommended for production)

The update ZIP is always checked against its SHA-256 checksum. For publisher authenticity as well, sign the update with a free RSA key pair so the app only trusts bundles signed by you.

1. Generate the key pair locally (OpenSSL is free):
   ```bash
   openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out curiva-live-update-private.pem
   openssl pkey -in curiva-live-update-private.pem -pubout -out curiva-live-update-public.pem
   ```
2. In the Netlify site environment variables, add **`CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64`** with the base64-encoded private key. Generate the value without exposing the PEM file:
   ```bash
   node -e "process.stdout.write(require('node:fs').readFileSync('curiva-live-update-private.pem').toString('base64'))"
   ```
   Do not commit or share the private key. Because Netlify builds the published website, the build script can sign OTA ZIPs during that deployment.
3. Before running `npx cap sync android` / creating the next native build, set **`CURIVA_LIVE_UPDATE_PUBLIC_KEY`** in that build environment to the contents of `curiva-live-update-public.pem`. The app embeds only the public key; never put the private key in app source.
4. Keep the matching private-key secret in Netlify. If you later rotate the key, the new public key requires another native app release.

If the signing variables aren't set yet, the free self-hosted update pipeline still generates checksummed bundles, but production deployment should prefer code signing. Do not ship an OTA bundle that changes native-plugin assumptions.

### Local development

```bash
npm install
npm run dev
npm run build
```

This repo's Netlify site builds and deploys from `main`. Keep the Netlify Git connection's build command at `npm run build` and publish directory at `dist`. The site uses a free Netlify subdomain, so a separately purchased domain isn't needed.
