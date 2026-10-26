import { CapacitorConfig } from '@capacitor/cli';

// Live Updates keep the installed app's web assets local while allowing web-layer
// releases to be delivered over the air. The app ID is created once in Capawesome Cloud.
const liveUpdateAppId = process.env.CAPAWESOME_LIVE_UPDATE_APP_ID;
const liveUpdatePublicKey = process.env.CAPAWESOME_LIVE_UPDATE_PUBLIC_KEY;

const config: CapacitorConfig = {
  appId: 'com.curiva.homoeopathy',
  appName: 'Curiva Homoeopathy',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  ...(liveUpdateAppId
    ? {
        plugins: {
          LiveUpdate: {
            appId: liveUpdateAppId,
            defaultChannel: 'default',
            autoUpdateStrategy: 'background',
            autoBlockRolledBackBundles: true,
            readyTimeout: 10000,
            ...(liveUpdatePublicKey ? { publicKey: liveUpdatePublicKey } : {})
          }
        }
      }
    : {})
};

export default config;
