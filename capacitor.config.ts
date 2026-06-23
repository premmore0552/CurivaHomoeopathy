import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.curiva.homoeopathy',
  appName: 'Curiva Homoeopathy',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
