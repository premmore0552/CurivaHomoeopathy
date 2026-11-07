// Privacy-first analytics adapter.
// Analytics are opt-in and disabled by default. Do not pass personal or health data.
const CONSENT_KEY = 'curiva-analytics-consent';
const ALLOWED_EVENTS = new Set([
  'page_view',
  'ebook_open',
  'ebook_chapter_complete',
  'study_tool_open',
  'resource_store_open',
]);

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  try {
    if (window.localStorage.getItem(CONSENT_KEY) !== 'accepted') return;
  } catch {
    return;
  }

  if (!ALLOWED_EVENTS.has(eventName)) return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== 'function') return;

  const safeProperties: Record<string, string | number | boolean> = {};
  const blockedKey = /(email|phone|name|uid|user|token|password|prompt|query|search|message|clinical|patient|symptom|diagnos|address|record|note|content)/i;
  for (const [key, value] of Object.entries(properties || {})) {
    if (blockedKey.test(key)) continue;
    if (typeof value === 'string') {
      if (value.length <= 80 && /^[a-zA-Z0-9 _.-]*$/.test(value)) safeProperties[key] = value;
    } else if (typeof value === 'number' && Number.isFinite(value)) {
      safeProperties[key] = value;
    } else if (typeof value === 'boolean') {
      safeProperties[key] = value;
    }
  }
  gtag('event', eventName, safeProperties);
};
