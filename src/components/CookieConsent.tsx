import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Cookie, Settings2, X } from 'lucide-react';

const CONSENT_KEY = 'curiva-analytics-consent';

type ConsentChoice = 'accepted' | 'declined' | null;

function readConsent(): ConsentChoice {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return 'declined';
  }
}

const CookieConsent: React.FC = () => {
  const [choice, setChoice] = useState<ConsentChoice>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setChoice(readConsent());
  }, []);

  const saveChoice = (next: Exclude<ConsentChoice, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // A blocked storage API must fail closed: analytics stays disabled.
      next = 'declined';
    }
    setChoice(next);
    setOpen(false);
  };

  const showPanel = choice === null || open;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open privacy and analytics settings"
        className="fixed bottom-4 right-4 z-[58] inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-bg-secondary/95 px-4 py-2 text-xs font-bold text-text-primary shadow-xl backdrop-blur transition hover:border-primary/40"
      >
        <Settings2 className="h-4 w-4 text-primary" />
        Privacy settings
      </button>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="curiva-privacy-settings-title"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 z-[59] mx-auto max-w-2xl rounded-2xl border border-border bg-bg-secondary p-5 shadow-2xl sm:p-6"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Cookie className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 id="curiva-privacy-settings-title" className="font-display text-base font-bold text-text-primary">
                      Privacy and analytics preferences
                    </h2>
                    <p className="mt-1 text-xs leading-5 text-text-secondary">
                      Essential storage supports sign-in, security and app features. Optional analytics are disabled unless you explicitly allow them.
                    </p>
                  </div>
                  {choice !== null && (
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Close privacy settings"
                      className="rounded-lg p-2 text-text-tertiary hover:bg-bg-primary hover:text-text-primary"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <p className="mt-3 text-xs leading-5 text-text-secondary">
                  If enabled and an analytics provider is configured, Curiva may send a small allowlist of general feature events. The analytics adapter excludes names, contact details, account IDs, search text, prompts, messages and clinical information. Reading bookmarks and chapter progress remain in your browser and are not analytics events.
                </p>

                <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => saveChoice('declined')}
                    className="min-h-10 rounded-xl border border-border px-4 py-2 text-xs font-bold text-text-secondary transition hover:bg-bg-primary"
                  >
                    Only necessary storage
                  </button>
                  <button
                    type="button"
                    onClick={() => saveChoice('accepted')}
                    className="min-h-10 rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-dark"
                  >
                    Allow optional analytics
                  </button>
                </div>
                <p className="mt-3 text-[10px] leading-4 text-text-tertiary">
                  You can change this choice later using Privacy settings. Choosing only necessary storage does not prevent access to the learning library.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CookieConsent;
