import { CapacitorConfig } from '@capacitor/cli';

// Free self-hosted OTA mode: verify downloaded ZIPs by SHA-256 checksum over HTTPS.
// No paid OTA service or Netlify secret is required. Publisher signatures are not used
// in this mode; secure the GitHub and Netlify accounts that can publish updates.

const config: CapacitorConfig = {
  appId: 'com.curiva.homoeopathy',
  appName: 'Curiva Homoeopathy',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    LiveUpdate: {
      autoBlockRolledBackBundles: true,
      readyTimeout: 10000
    }
  }
};

export default config;
