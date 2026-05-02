// Simple analytics utility for tracking interactions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // In a real app, this would send data to Google Analytics, Mixpanel, etc.
  console.log(`[Analytics Event] ${eventName}:`, properties || {});
  
  // Example implementation for GA4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
};
