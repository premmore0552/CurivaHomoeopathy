import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import {
  AI_ACADEMIC_CONSENT_VERSION,
  hasAiAcademicConsent
} from '../server/aiPrivacyGuard';

type Props = { compact?: boolean; onChange?: (allowed: boolean) => void };

export function hasCurrentAiAcademicConsent(): boolean {
  try {
    return typeof sessionStorage !== 'undefined' &&
      hasAiAcademicConsent(sessionStorage.getItem('curiva-ai-academic-consent'));
  } catch {
    return false;
  }
}

export default function AiPrivacyNotice({ compact = false, onChange }: Props) {
  const [allowed, setAllowed] = useState(() => {
    try {
      return typeof sessionStorage !== 'undefined' &&
        hasAiAcademicConsent(sessionStorage.getItem('curiva-ai-academic-consent'));
    } catch {
      return false;
    }
  });

  const update = (checked: boolean) => {
    setAllowed(checked);
    onChange?.(checked);
    try {
      if (typeof sessionStorage !== 'undefined') {
        if (checked) sessionStorage.setItem('curiva-ai-academic-consent', AI_ACADEMIC_CONSENT_VERSION);
        else sessionStorage.removeItem('curiva-ai-academic-consent');
      }
    } catch {
      setAllowed(false);
    }
  };

  return (
    <section className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-xs leading-6 text-text-secondary" aria-label="AI privacy acknowledgement">
      <div className="flex items-center gap-2 font-bold text-text-primary">
        <ShieldCheck className="h-4 w-4 text-amber-600" />
        Before using the external AI service
      </div>
      <p className="mt-2">
        The academic prompt and recent chat context you submit are sent to Curiva's server and then to Google Gemini to generate a response. The acknowledgement lasts only for this browser tab session. Do not submit names, contact details, identity numbers, patient or case notes, symptoms about a real person, diagnoses, photographs, medical reports, prescriptions, or other personal or sensitive health information.
      </p>
      <p className="mt-1">
        This is an academic study tool, not a medical consultation. AI output can be wrong. This checkbox is an explicit use acknowledgement, not a guarantee that entered text is anonymous or safe.
      </p>
      <label className={'mt-3 flex cursor-pointer items-start gap-2 font-semibold text-text-primary ' + (compact ? 'text-[11px]' : 'text-xs')}>
        <input
          type="checkbox"
          checked={allowed}
          onChange={(event) => update(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-primary"
        />
        <span>I understand and agree to send academic-only text to Google Gemini. I will not enter personal, patient, clinical or identifying information.</span>
      </label>
    </section>
  );
}
