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
Deployment connection test
npm run dev
```


## Keeping the website and Android app in sync

Curiva uses one React/Vite frontend for the website and its Capacitor wrapper. The canonical hosted interface is:

- Website/runtime: https://curivahomoeopathy.netlify.app
- Android package ID: `com.curiva.homoeopathy`

By default, `capacitor.config.ts` points native Capacitor builds at the hosted website. After installing a native build that includes this configuration, changes published to the website become visible in the app on its next load; UI/content-only updates do not require a new APK. Native-code changes (for example, adding a new native plugin or changing Android permissions) still require a new app build and release.

### Important trade-off

The shared live-web mode requires an internet connection to load the interface. This repository does not currently include a checked-in Android project or release-signing credentials, so it cannot itself publish a signed Android update to an app store. An existing installed app must first be rebuilt and installed with the shared-web configuration. For store-distributed releases where offline reliability and managed over-the-air bundles are required, configure a supported Capacitor live-update service instead of relying on `server.url` in production.

### Build with local bundled web assets

For a development/test build that intentionally uses the locally bundled `dist` files instead of the hosted website:

```bash
CAPACITOR_LOCAL_BUNDLE=true npx cap sync android
```

Leave `CAPACITOR_LOCAL_BUNDLE` unset for the shared hosted website mode.

### Automatic website deployment

Connect this repository to the Netlify site and configure deployments from `main` using `npm run build` and `dist`. Once that connection is enabled, merging changes into `main` publishes the website, and the shared-web Capacitor app reads the same deployed interface. The GitHub Actions workflow checks the typecheck and production web build on pushes and pull requests.
