import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Check, GraduationCap, ShieldAlert } from 'lucide-react';

const DISCLAIMER_STORAGE_KEY = 'curiva_disclaimer_accepted';

const MedicalDisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let hasAccepted = false;

    try {
      hasAccepted = window.localStorage.getItem(DISCLAIMER_STORAGE_KEY) === 'true';
    } catch {
      // If browser storage is unavailable, keep the acknowledgement visible.
    }

    if (hasAccepted) return;

    const timer = window.setTimeout(() => setIsOpen(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    try {
      window.localStorage.setItem(DISCLAIMER_STORAGE_KEY, 'true');
    } catch {
      // The current page can still proceed when storage is disabled.
    }

    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
          role="region"
          aria-labelledby="medical-disclaimer-title"
          aria-describedby="medical-disclaimer-description"
          aria-live="polite"
          className="fixed z-[85] max-h-[min(55dvh,26rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-white p-4 shadow-2xl shadow-black/15 dark:bg-bg-primary curiva-disclaimer-position sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldAlert size={19} aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="mb-0.5 inline-flex items-center gap-1.5 text-[9px] font-extrabold uppercase tracking-[0.14em] text-primary">
                <GraduationCap className="h-3 w-3" aria-hidden="true" />
                BHMS Student Project
              </div>
              <h2 id="medical-disclaimer-title" className="text-base font-bold leading-tight text-text-primary">
                Before you continue
              </h2>
            </div>
          </div>

          <div id="medical-disclaimer-description" className="mt-3 space-y-2 text-xs leading-5 text-text-secondary">
            <p>
              Curiva is an educational research resource curated by a BHMS student, not a medical consultation. Content is not reviewed by medical practitioners for diagnostic use and does not provide medical advice, diagnosis, or prescriptions.
            </p>
            <p>
              For a medical emergency, contact local emergency services. Do not use this site for self-treatment.
            </p>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Link
              to="/disclaimer"
              className="text-center text-xs font-semibold text-primary underline-offset-4 hover:underline sm:text-left"
            >
              Read the full disclaimer
            </Link>
            <button
              type="button"
              onClick={handleAccept}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-extrabold uppercase tracking-wide text-white shadow-md shadow-primary/15 transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:w-auto"
            >
              I Understand &amp; Agree
              <Check className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MedicalDisclaimerModal;
