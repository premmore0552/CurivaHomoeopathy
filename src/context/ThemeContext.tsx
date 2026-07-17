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
  const theme: Theme = 'light';
  const isManual = false;

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    root.classList.remove('dark');
    body.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
    localStorage.removeItem('theme');
  }, []);

  const toggleTheme = () => {
    console.log('Theme toggle disabled: Light theme is enforced.');
  };

  const resetToAuto = () => {
    console.log('Theme reset disabled: Light theme is enforced.');
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
