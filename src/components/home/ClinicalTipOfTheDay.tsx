import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, RefreshCw, X, Sparkles } from 'lucide-react';

const tips = [
  {
    category: 'Materia Medica',
    tip: 'Lycopodium patients often have a strong desire for sweets and warm drinks, which helps distinguish it from Pulsatilla.',
    author: 'Boericke',
  },
  {
    category: 'Clinical Practice',
    tip: 'When a patient presents with "never well since" a specific event, always investigate the Miasmatic background of that timeline.',
    author: 'Kent',
  },
  {
    category: 'Pharmacy',
    tip: 'Succussion is as vital as dilution; it is the kinetic energy that releases the dynamic power of the drug substance.',
    author: 'Hahnemann',
  },
  {
    category: 'Anatomy',
    tip: 'The right kidney is slightly lower than the left because of the large space occupied by the liver above it.',
    author: 'Gray',
  },
  {
    category: 'Organon',
    tip: 'The physician’s high and only mission is to restore the sick to health, to cure, as it is termed.',
    author: 'Aphorism 1',
  },
  {
    category: 'Repertory',
    tip: 'Always repertorize the most characteristic and intense symptoms first to narrow down the remedy group quickly.',
    author: 'Boger',
  }
];

const ClinicalTipOfTheDay: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(tips[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      let nextTip;
      do {
        nextTip = tips[Math.floor(Math.random() * tips.length)];
      } while (nextTip === currentTip);
      setCurrentTip(nextTip);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden p-8 rounded-[2.5rem] bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-border shadow-soft group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="mt-1 p-3.5 rounded-2xl bg-primary/10 text-primary shadow-sm border border-primary/20">
            <Lightbulb className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-primary text-white text-[9px] font-black uppercase tracking-widest">
                {currentTip.category}
              </span>
              <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">
                Clinical Tip of the Day
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTip.tip}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="text-lg md:text-xl font-display font-semibold text-text-primary leading-relaxed max-w-2xl"
              >
                "{currentTip.tip}"
              </motion.p>
            </AnimatePresence>
            <div className="pt-1">
              <span className="text-xs font-serif italic text-text-tertiary">— {currentTip.author}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-zinc-900 border border-border hover:border-primary hover:text-primary transition-all shadow-sm active:scale-95 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-[10px] font-black uppercase tracking-widest">Refresh Tip</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ClinicalTipOfTheDay;
