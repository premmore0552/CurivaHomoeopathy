import { CapacitorConfig } from '@capacitor/cli';

// The website is the shared UI source for web and native Capacitor clients.
// Set CAPACITOR_LOCAL_BUNDLE=true only when intentionally building an offline-first
// native bundle for development/testing. The shared-web mode requires internet.
const useSharedWebRuntime = process.env.CAPACITOR_LOCAL_BUNDLE !== 'true';

const config: CapacitorConfig = {
  appId: 'com.curiva.homoeopathy',
  appName: 'Curiva Homoeopathy',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    ...(useSharedWebRuntime
      ? { url: 'https://curivahomoeopathy.netlify.app' }
      : {}),
  },
};

export default config;
