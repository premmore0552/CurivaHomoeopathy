import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isManual: boolean;
  resetToAuto: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    
    // Auto day/night based on time (6 AM to 6 PM is day)
    const hour = new Date().getHours();
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  });

  // If we have a saved theme, we consider it manual
  const [isManual, setIsManual] = useState(() => {
    return localStorage.getItem('theme') !== null;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    if (isManual) {
      localStorage.setItem('theme', theme);
    } else {
      localStorage.removeItem('theme');
    }
    console.log('Theme applied to root and body:', theme, 'manual:', isManual);
  }, [theme, isManual]);

  // Auto-switch logic
  useEffect(() => {
    if (isManual) return;

    const checkTime = () => {
      const hour = new Date().getHours();
      const newTheme = (hour >= 6 && hour < 18) ? 'light' : 'dark';
      if (newTheme !== theme) {
        setTheme(newTheme);
      }
    };

    checkTime(); // Run immediately on mount
    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isManual, theme]);

  const toggleTheme = () => {
    console.log('Manual toggle triggered');
    setIsManual(true);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const resetToAuto = () => {
    console.log('Resynced to Day/Night clock');
    setIsManual(false);
    const hour = new Date().getHours();
    setTheme((hour >= 6 && hour < 18) ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isManual, resetToAuto }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
