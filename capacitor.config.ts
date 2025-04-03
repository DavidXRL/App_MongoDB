import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Solaris',
  webDir: 'www',
  server: {
    cleartext:true,
    allowNavigation:["172.16.0.0/12", "192.168.0.0/16", "10.0.0.0/8", "localhost"]
  },
  android:{
    webContentsDebuggingEnabled:true,
    allowMixedContent:true
  }
};

export default config;
