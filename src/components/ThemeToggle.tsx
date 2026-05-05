import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-bg-secondary border border-border text-text-primary hover:border-primary/50 transition-all active:scale-95 group relative overflow-hidden"
      aria-label="Toggle theme"
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
              <Sun className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 20, opacity: 0, rotate: -45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );
}
