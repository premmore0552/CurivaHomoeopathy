import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Capacitor } from '@capacitor/core';

const root = createRoot(document.getElementById('root')!);

async function bootCuriva() {
  if (Capacitor.isNativePlatform()) {
    // Native Android opens its own bundled learning interface, not the website routes.
    const { default: NativeLearningApp } = await import('./native-app/NativeLearningApp');
    root.render(
      <StrictMode>
        <NativeLearningApp />
      </StrictMode>,
    );
    return;
  }

  // The browser website and its providers are loaded only for the web entry point.
  const [appModule, helmetModule, themeModule, languageModule, roleModule, readingModule] = await Promise.all([
    import('./App'),
    import('react-helmet-async'),
    import('./context/ThemeContext'),
    import('./context/LanguageContext'),
    import('./context/RoleContext'),
    import('./context/ReadingContext'),
  ]);
  const App = appModule.default;
  const { HelmetProvider } = helmetModule;
  const { ThemeProvider } = themeModule;
  const { LanguageProvider } = languageModule;
  const { RoleProvider } = roleModule;
  const { ReadingProvider } = readingModule;

  root.render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider>
          <LanguageProvider>
            <RoleProvider>
              <ReadingProvider>
                <App />
              </ReadingProvider>
            </RoleProvider>
          </LanguageProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>,
  );
}

void bootCuriva();
