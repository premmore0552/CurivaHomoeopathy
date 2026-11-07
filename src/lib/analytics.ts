/**
 * Privacy-first analytics adapter.
 *
 * Curiva does not currently operate a consent-managed analytics service.
 * Never log event properties or forward them to a global gtag object. This
 * no-op preserves existing call sites while preventing accidental collection.
 */
export function trackEvent(_eventName: string, _properties?: Record<string, unknown>): void {
  // Deliberately disabled until an independently reviewed consent manager,
  // retention policy, data-processing agreement and withdrawal flow exist.
}
