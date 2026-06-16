import React from 'react';
import { Sun, Moon, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, isManual, resetToAuto } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={toggleTheme}
        className={`p-2.5 rounded-xl bg-bg-secondary border text-text-primary hover:border-primary/50 transition-all active:scale-95 group relative overflow-hidden ${!isManual ? 'border-primary/30 ring-2 ring-primary/5' : 'border-border'}`}
        aria-label="Toggle theme"
        title={isManual ? `Currently pinned to ${theme === 'light' ? 'Day' : 'Night'} Mode. Click to toggle.` : `Ambient mode active. Currently set to ${theme === 'light' ? 'Day' : 'Night'} based on local time.`}
      >
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {theme === 'light' ? (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <Sun className="w-5 h-5 text-amber-500" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -20, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.2 }}
              >
                <Moon className="w-5 h-5 text-purple-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Tiny green dot indicating automatic synchronization is active */}
        {!isManual && (
          <span className="absolute bottom-1 right-1 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
        )}
      </button>

      {/* Expose instant re-sync if manual override is active */}
      {isManual && (
        <button
          onClick={resetToAuto}
          className="p-1 hover:bg-bg-secondary border border-border hover:border-text-secondary/20 rounded-lg text-text-secondary/60 hover:text-text-primary transition-all active:scale-95 text-[10px] flex items-center gap-1 font-sans px-2 h-[34px] md:h-[40px] whitespace-nowrap shadow-sm text-xs font-semibold"
          title="Sync theme to real-time day/night cycles"
        >
          <RefreshCw className="w-3 h-3 text-emerald-600 shrink-0" />
          <span className="hidden md:inline">Sync Time</span>
        </button>
      )}
    </div>
  );
}
