/**
 * Privacy guard for externally processed academic AI prompts.
 *
 * This is deliberately conservative best-effort filtering, not a reliable
 * de-identification system. Do not submit real patient records or sensitive
 * personal health information even when a request passes these checks.
 */
export const AI_ACADEMIC_CONSENT_VERSION = 'academic-only-v1';
export const AI_ACADEMIC_CONSENT_HEADER = 'x-curiva-ai-consent';

const privateIdentifierPatterns = [
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  /\b(?:\+?91[\s-]?)?[6-9]\d{9}\b/,
  /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/,
  /\b(?:MRN|UHID|OPD|IPD|ABHA|patient\s*(?:id|number)|medical\s*record\s*(?:number|no\.?))\s*[:#-]?\s*[A-Z0-9/-]{4,}\b/i
];

const sensitiveNarrativePatterns = [
  /\bmy\s+(?:patient|client|child|mother|father|wife|husband|symptoms?|diagnosis|medical history|lab report|test report|prescription)\b/i,
  /\b(?:patient|client)\s+(?:name|age|address|phone|history|details)\s*[:=-]/i,
  /\b(?:diagnosed|treated|admitted)\s+(?:with|for)\s+[a-z -]{3,80}\s+(?:on|at|by)\s+/i,
  /\b(?:blood report|lab report|medical record|discharge summary|prescription photo|clinical case sheet)\b/i,
  /\b(?:date of birth|dob)\s*[:=-]\s*\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b/i
];

export function hasAiAcademicConsent(value: unknown): boolean {
  return typeof value === 'string' && value === AI_ACADEMIC_CONSENT_VERSION;
}

export function containsPotentialPrivateHealthInformation(value: string): boolean {
  if (privateIdentifierPatterns.some(pattern => pattern.test(value))) return true;
  return sensitiveNarrativePatterns.some(pattern => pattern.test(value));
}

export function validateAcademicAiText(value: unknown, maxLength = 4000): { ok: true; text: string } | { ok: false; reason: 'invalid' | 'too-long' | 'sensitive' } {
  if (typeof value !== 'string' || !value.trim()) return { ok: false, reason: 'invalid' };
  const text = value.trim();
  if (text.length > maxLength) return { ok: false, reason: 'too-long' };
  if (containsPotentialPrivateHealthInformation(text)) return { ok: false, reason: 'sensitive' };
  return { ok: true, text };
}
