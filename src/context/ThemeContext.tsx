import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
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
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('theme', theme);
    console.log('Theme applied to root:', theme);
  }, [theme]);

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

    const interval = setInterval(checkTime, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [isManual, theme]);

  const toggleTheme = () => {
    console.log('Manual toggle triggered');
    setIsManual(true);
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
