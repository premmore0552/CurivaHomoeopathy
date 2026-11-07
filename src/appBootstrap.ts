import { Capacitor } from '@capacitor/core';

declare const __CURIVA_BUILD_VERSION__: string;

async function removeRegistrationsAndCaches(): Promise<void> {
  try {
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(registrations.map(registration => registration.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(key => caches.delete(key)));
    }
  } catch {
    // Cleanup is best-effort. The app must still start if browser APIs are blocked.
  }
}

async function registerPublicStaticServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('/sw.js', { scope: '/' });
  } catch {
    // Service-worker installation is optional; the website remains online-first.
  }
}

async function bootBrowserCachePolicy(): Promise<void> {
  // The native Android app has its own offline learning shell. Do not install
  // the website service worker or clear WebView caches in native mode.
  if (Capacitor.isNativePlatform()) return;

  if (import.meta.env.DEV) {
    await removeRegistrationsAndCaches();
    return;
  }

  let previousVersion: string | null = null;
  try {
    previousVersion = window.localStorage.getItem('app_version');
  } catch {
    // Storage may be unavailable; version comparison is skipped.
  }

  if (previousVersion && previousVersion !== __CURIVA_BUILD_VERSION__) {
    await removeRegistrationsAndCaches();
    try {
      window.localStorage.setItem('app_version', __CURIVA_BUILD_VERSION__);
    } catch {
      // Reload still occurs once for this navigation.
    }
    window.location.reload();
    return;
  }

  try {
    window.localStorage.setItem('app_version', __CURIVA_BUILD_VERSION__);
  } catch {
    // Storage may be disabled; the service worker has its own versioned cache.
  }

  if (document.readyState === 'complete') {
    void registerPublicStaticServiceWorker();
  } else {
    window.addEventListener('load', () => void registerPublicStaticServiceWorker(), { once: true });
  }
}

void bootBrowserCachePolicy();
