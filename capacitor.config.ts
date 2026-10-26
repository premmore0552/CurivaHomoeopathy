import { CapacitorConfig } from '@capacitor/cli';

// Self-hosted OTA updates use free static hosting (Netlify), not Capawesome Cloud.
// To verify signed updates, set CURIVA_LIVE_UPDATE_PUBLIC_KEY when building/syncing
// the native app and CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64 in the Netlify build environment.
const liveUpdatePublicKey = process.env.CURIVA_LIVE_UPDATE_PUBLIC_KEY?.replace(/\r?\n/g, '');

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
      readyTimeout: 10000,
      ...(liveUpdatePublicKey ? { publicKey: liveUpdatePublicKey } : {})
    }
  }
};

export default config;
