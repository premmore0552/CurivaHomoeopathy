import { CapacitorConfig } from '@capacitor/cli';

// The public key is safe to ship in the app. The matching private key must stay
// in Netlify's build environment as CURIVA_LIVE_UPDATE_PRIVATE_KEY_BASE64.
const bundledLiveUpdatePublicKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo0wlZNjtEb7o4JVYLTToz8aY8IWbWa1X1TnUD3HlXzV9ERgYk5rEhIY0o+wRk7orM9yhe4ZMdn7jDy5bgY2/QB/t0o346KfTiZVFtir4h0HoF0zIfTRcY5AcUaXaDjkfUBIlwl+9bogVeh8+pZ4jjtTWF+o4xZi90tnoDLi5fLfHmsKf90HiYuIFkZgDLPM1AvO3rIVABJwP5Qt5xFkOg5RF7WYc7k9ocCBec8lsXpghb7Pgd7/71k6b4BzQvTaY0Aaf63BGK0JFGYaWblGn4So8kNxIDR2gafd8vptwV+KLZ7I4S4diXqtkff7oYNdRcAorOXKNqo81U1sYVZhGuwIDAQAB-----END PUBLIC KEY-----';
const liveUpdatePublicKey = process.env.CURIVA_LIVE_UPDATE_PUBLIC_KEY?.replace(/\r?\n/g, '') || bundledLiveUpdatePublicKey;

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
      publicKey: liveUpdatePublicKey
    }
  }
};

export default config;
