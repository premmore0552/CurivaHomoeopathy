import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.research': 'Research Database',
    'nav.learn': 'Learn',
    'nav.about': 'Our Story',
    'hero.title': 'Modern Homoeopathy, Simplified',
    'hero.subtitle': 'Research-driven insights for the modern homoeopathic practitioner.',
    'btn.explore': 'Explore Symptoms',
    'btn.read': 'Read Articles',
    'auth.signin': 'Sign In',
    'auth.signout': 'Sign Out',
    'footer.disclosure': 'Curiva is an educational repository curators by a BHMS student. This information is for academic awareness.',
  },
  hi: {
    'nav.home': 'होम',
    'nav.research': 'अनुसंधान डेटाबेस',
    'nav.learn': 'सीखें',
    'nav.about': 'हमारी कहानी',
    'hero.title': 'साक्ष्य-आधारित समग्र चिकित्सा',
    'hero.subtitle': 'सहकर्मी द्वारा तैयार किए गए शोध और पारंपरिक मटेरिया मेडिका के माध्यम से होम्योपैथी की दुनिया का अन्वेषण करें।',
    'btn.explore': 'लक्षणों का अन्वेषण करें',
    'btn.read': 'लेख पढ़ें',
    'auth.signin': 'लॉग इन करें',
    'auth.signout': 'लॉग आउट करें',
    'footer.disclosure': 'क्यूरिवा एक बीएचएमएस छात्र द्वारा प्रबंधित एक शैक्षिक भंडार है। यह जानकारी शैक्षणिक जागरूकता के लिए है।',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.research': 'Base de Datos',
    'nav.learn': 'Aprender',
    'nav.about': 'Nuestra Historia',
    'hero.title': 'Curación Holística Basada en Evidencia',
    'hero.subtitle': 'Explora el mundo de la homeopatía a través de investigaciones curadas por pares.',
    'btn.explore': 'Explorar Síntomas',
    'btn.read': 'Leer Artículos',
    'auth.signin': 'Iniciar Sesión',
    'auth.signout': 'Cerrar Sesión',
    'footer.disclosure': 'Curiva es un repositorio educativo curado por un estudiante de BHMS.',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.research': 'Base de Données',
    'nav.learn': 'Apprendre',
    'nav.about': 'Notre Histoire',
    'hero.title': 'Guérison Holistique Basée sur les Preuves',
    'hero.subtitle': 'Explorez le monde de l\'homéopathie grâce à des recherches paires.',
    'btn.explore': 'Explorer les Symptômes',
    'btn.read': 'Lire les Articles',
    'auth.signin': 'Se Connecter',
    'auth.signout': 'Se Déconnecter',
    'footer.disclosure': 'Curiva est un référentiel éducatif géré par un étudiant en BHMS.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('curiva_lang') as Language;
    if (saved && ['en', 'hi', 'es', 'fr'].includes(saved)) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('curiva_lang', lang);
  };

  const t = (key: string) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
