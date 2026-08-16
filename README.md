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
