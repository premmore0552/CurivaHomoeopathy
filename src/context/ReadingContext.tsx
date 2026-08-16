import React, { createContext, useContext, useEffect, useState } from 'react';

export type FontSize = 'sm' | 'md' | 'lg' | 'xl';
export type ReadingWidth = 'narrow' | 'medium' | 'wide';
export type LineSpacing = 'compact' | 'normal' | 'relaxed';
export type ReaderTheme = 'default' | 'sepia' | 'dark-contrast';

interface ReadingContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  readingWidth: ReadingWidth;
  setReadingWidth: (width: ReadingWidth) => void;
  lineSpacing: LineSpacing;
  setLineSpacing: (spacing: LineSpacing) => void;
  readerTheme: ReaderTheme;
  setReaderTheme: (theme: ReaderTheme) => void;
}

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export const ReadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('reading_font_size') as FontSize) || 'md';
  });

  const [readingWidth, setReadingWidth] = useState<ReadingWidth>(() => {
    return (localStorage.getItem('reading_width') as ReadingWidth) || 'medium';
  });

  const [lineSpacing, setLineSpacing] = useState<LineSpacing>(() => {
    return (localStorage.getItem('reading_line_spacing') as LineSpacing) || 'normal';
  });

  const [readerTheme, setReaderTheme] = useState<ReaderTheme>(() => {
    return (localStorage.getItem('reading_theme') as ReaderTheme) || 'default';
  });

  useEffect(() => {
    localStorage.setItem('reading_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('reading_width', readingWidth);
  }, [readingWidth]);

  useEffect(() => {
    localStorage.setItem('reading_line_spacing', lineSpacing);
  }, [lineSpacing]);

  useEffect(() => {
    localStorage.setItem('reading_theme', readerTheme);
  }, [readerTheme]);

  return (
    <ReadingContext.Provider
      value={{
        fontSize,
        setFontSize,
        readingWidth,
        setReadingWidth,
        lineSpacing,
        setLineSpacing,
        readerTheme,
        setReaderTheme,
      }}
    >
      {children}
    </ReadingContext.Provider>
  );
};

export const useReading = () => {
  const context = useContext(ReadingContext);
  if (context === undefined) {
    throw new Error('useReading must be used within a ReadingProvider');
  }
  return context;
};
