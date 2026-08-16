import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'motion/react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full border border-border bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-all duration-300 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-1 shrink-0"
      aria-label="Toggle Theme"
      id="theme-toggle-btn"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0, scale: theme === 'dark' ? 0.9 : 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20" />
        ) : (
          <Moon className="w-4 h-4 text-primary fill-primary/10" />
        )}
      </motion.div>
    </button>
  );
}
