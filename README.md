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



## Shared website and app release pipeline

Curiva's React/Vite project is the shared web UI. The website is deployed to Netlify; the Android package ID is `com.curiva.homoeopathy`. The app should keep a local copy of its web assets and use Capacitor Live Updates for web-layer changes, rather than loading the entire production app from `server.url`.

### What updates automatically

- **Website:** a push/merge to `main` deploys to Netlify when the Netlify site is connected to this repository with build command `npm run build` and publish directory `dist`.
- **Android app:** the workflow builds the same `dist` bundle and publishes it to Capawesome Cloud Live Updates after the required repository variables/secrets are configured. Compatible HTML, CSS, JavaScript, and asset changes can then be downloaded by installed apps in the background and applied on a later launch.
- **Native changes:** new Capacitor plugins, Android permissions, native code, or incompatible plugin configuration still require a new signed Android/iOS build and store/release process.

### One-time OTA setup

1. Create a Curiva app in [Capawesome Cloud](https://capawesome.io/docs/cloud/live-updates/setup/) and copy its app ID.
2. In the GitHub repository settings, add repository variable `CAPAWESOME_LIVE_UPDATE_APP_ID` with that ID, and repository secret `CAPAWESOME_TOKEN` with a Capawesome Cloud API token.
3. For production, enable bundle signing. Generate an RSA signing-key pair using the [Capawesome signing guide](https://capawesome.io/docs/cloud/live-updates/code-signing/). Add the **base64-encoded private key** as GitHub secret `CAPAWESOME_LIVE_UPDATE_PRIVATE_KEY_BASE64`. Configure its matching one-line public key as `CAPAWESOME_LIVE_UPDATE_PUBLIC_KEY` when syncing/building the native app. Never commit the private key.
4. Add the Live Update plugin to the native platform, using the same ID/public key, and release one new signed native app build. This repository currently does not contain the generated `android/` or `ios/` platform folders, so that first native build must be made in the original native-build environment.
5. After those GitHub settings are in place, pushes to `main` run typecheck + production build and upload the signed `dist` bundle to the `default` Live Update channel. The first installation/release must include the plugin; existing installed binaries won't gain OTA support just from a website deployment.

For local Android setup, install/sync the plugin with `npm install` and `npx cap sync android`. If the native platform folder is missing, generate it once with `npm run cap:add` (from the environment that owns the Android signing/build setup) before syncing. Set `CAPAWESOME_LIVE_UPDATE_APP_ID` and, for signed updates, `CAPAWESOME_LIVE_UPDATE_PUBLIC_KEY` in the shell environment when running Capacitor sync/build.

### Release safety

The plugin uses background updates and automatic blocking/rollback for bundles that fail to become ready. Publish only web-layer changes compatible with the installed native app. Keep native-version compatibility in mind before changing plugin usage; version-specific channels are recommended as native releases evolve. See the [Capawesome Live Updates docs](https://capawesome.io/docs/cloud/live-updates/).
