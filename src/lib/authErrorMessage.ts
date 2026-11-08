const AUTH_ERROR_CODE_PATTERN = /^auth\/[a-z0-9-]+$/i;

export function getGoogleAuthErrorCode(error: unknown): string {
  if (!error || typeof error !== 'object') return '';

  const candidate = (error as { code?: unknown }).code;
  if (typeof candidate !== 'string' || !AUTH_ERROR_CODE_PATTERN.test(candidate)) return '';

  return candidate.toLowerCase();
}

export function shouldUseGoogleRedirectFallback(error: unknown): boolean {
  const code = getGoogleAuthErrorCode(error);
  return code === 'auth/popup-blocked' ||
    code === 'auth/operation-not-supported-in-this-environment';
}

export function getGoogleAuthErrorMessage(error: unknown): string {
  const code = getGoogleAuthErrorCode(error);

  switch (code) {
    case 'auth/unauthorized-domain':
      return 'Google sign-in is not authorized for this website. Add the exact site hostname in Firebase Authentication settings, then retry.';
    case 'auth/popup-blocked':
      return 'Your browser blocked the Google sign-in popup. Curiva will try the redirect sign-in flow instead.';
    case 'auth/operation-not-supported-in-this-environment':
      return 'This browser does not support the Google sign-in popup. Curiva will try the redirect sign-in flow instead.';
    case 'auth/popup-closed-by-user':
      return 'The Google sign-in window was closed before sign-in completed. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'A Google sign-in request was interrupted by another request. Please try again.';
    case 'auth/network-request-failed':
      return 'A network error interrupted Google sign-in. Check your connection and retry.';
    case 'auth/invalid-api-key':
      return 'Firebase rejected the web API key. Verify the Firebase Web App configuration and the key restrictions in Google Cloud.';
    case 'auth/firebase-app-check-token-is-invalid':
    case 'auth/app-check-invalid-token':
      return 'Firebase App Check rejected this request. Verify the registered web app, site key, allowed hostname and App Check monitoring before changing enforcement.';
    case 'auth/internal-error':
      return 'Firebase returned an internal sign-in error. Check the browser Console and Network panel for the failed Identity Toolkit request, then verify the Firebase Web API key and its restrictions before changing provider settings.';
    case 'auth/too-many-requests':
      return 'Firebase temporarily limited sign-in attempts. Wait before trying again.';
    default:
      return code
        ? `Google sign-in could not be completed (${code}). Please try again. If it continues, share this error code with support.`
        : 'Google sign-in could not be completed. Please try again.';
  }
}
