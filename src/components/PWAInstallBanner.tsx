import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Smartphone, ArrowDown, HelpCircle } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone === true;
                         
    if (isStandalone) {
      return;
    }

    // Check if the user has dismissed the banner in this session
    const isDismissed = sessionStorage.getItem('pwa_banner_dismissed') === 'true';
    if (isDismissed) {
      return;
    }

    // Handle Android / Chrome prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIOSDevice);

    if (isIOSDevice) {
      // For iOS, show the banner because the browser can't auto-prompt
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // Wait 5 seconds to show cleanly
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    // Show native prompt
    await deferredPrompt.prompt();
    
    // Wait for response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50 p-6 bg-white dark:bg-zinc-900 border border-emerald-500/20 dark:border-emerald-500/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(16,185,129,0.15)] backdrop-blur-2xl"
      >
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleDismiss}
            className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors text-text-secondary hover:text-text-primary"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-4 items-start">
          <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl shrink-0">
            <Smartphone className="w-6 h-6 animate-pulse" />
          </div>
          <div className="flex-1 pr-6">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#10b981]">Native Web App</span>
              <Sparkles className="w-3 h-3 text-[#10b981] animate-bounce-slow" />
            </div>
            <h4 className="font-display font-medium text-text-primary text-lg italic tracking-tight leading-none mb-1.5">
              Install <span className="text-emerald-500 font-bold">Curiva</span> on Phone
            </h4>
            <p className="text-xs text-text-secondary leading-normal">
              Access Materia Medica, quizzes & clinical guides instantly from your home screen. Works offline.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between gap-4">
          <button
            onClick={handleDismiss}
            className="text-[10px] font-bold text-text-secondary uppercase tracking-widest hover:text-text-primary transition-colors text-left"
          >
            No, Thanks
          </button>
          
          <button
            onClick={handleInstallClick}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Install Now
          </button>
        </div>

        {/* Custom iOS Guidance Overlay */}
        <AnimatePresence>
          {showIOSInstructions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-[#10b981]/10 bg-emerald-500/5 dark:bg-emerald-950/20 p-4 rounded-2xl text-xs overflow-hidden"
            >
              <div className="flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <HelpCircle className="w-4 h-4" />
                <span>iOS Installation Steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-text-secondary">
                <li>Tap the <span className="font-bold text-text-primary">Share</span> button in Safari.</li>
                <li>Scroll down and tap <span className="font-bold text-text-primary">Add to Home Screen</span>.</li>
                <li>Tap <span className="font-bold text-text-primary">Add</span> in the top-right corner.</li>
              </ol>
              <button
                onClick={() => setShowIOSInstructions(false)}
                className="mt-3 w-full py-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase text-[9px] tracking-wider rounded-lg hover:bg-emerald-500/20 transition-all"
              >
                Got It
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
