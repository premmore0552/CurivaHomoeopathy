import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
];

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-bg-secondary border border-border rounded-xl hover:border-primary transition-all shadow-sm"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-xs font-bold uppercase tracking-widest">{currentLang.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 w-40 bg-bg-secondary border border-border rounded-2xl shadow-2xl z-[100] overflow-hidden"
          >
            <div className="py-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as any);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-colors ${
                    language === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5 text-text-secondary'
                  }`}
                >
                  <span>{lang.name}</span>
                  <span className="text-lg">{lang.flag}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
