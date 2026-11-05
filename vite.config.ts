import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  const appVersion = env.VITE_APP_VERSION || process.env.COMMIT_REF || process.env.GITHUB_SHA || 'local';
  return {
    plugins: [
      {
        name: 'curiva-build-version',
        transformIndexHtml: {
          order: 'pre',
          handler(html) {
            return html.replaceAll('__CURIVA_BUILD_VERSION__', appVersion);
          },
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve('.'),
      },
    },
    optimizeDeps: {
      force: true,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
