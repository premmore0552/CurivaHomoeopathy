import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles, Search, X } from 'lucide-react';

interface MythItem {
  myth: string;
  fact: string;
}

const myths: MythItem[] = [
  {
    myth: "Homoeopathy takes a very long time to act.",
    fact: "The duration depends on whether the condition is acute or chronic. In acute issues, homoeopathy can act very quickly in minutes or hours. For chronic conditions, it requires more time because it aims at deep foundational healing."
  },
  {
    myth: "You cannot take homoeopathic medicines alongside conventional medicines.",
    fact: "In most cases, you can. Homoeopathic remedies are highly diluted and typically do not interfere with pharmacological actions of conventional drugs. However, always consult your physician."
  },
  {
    myth: "There are severe dietary restrictions, like avoiding onions and garlic.",
    fact: "It is often suggested to keep a gap of 20-30 minutes before and after taking the medicine so the oral mucosa is clean. Strict dietary restrictions are not a universal rule for all homoeopathic treatments."
  },
  {
    myth: "Homoeopathy is just placebo or sweet pills.",
    fact: "Homoeopathic remedies go through a pharmacological process called potentization. Many patients, including infants and animals who do not understand the placebo effect, respond remarkably to homoeopathy."
  },
  {
    myth: "Homoeopathy cannot be used for serious acute conditions.",
    fact: "Homoeopathy can effectively manage a variety of acute conditions (like fevers or injuries). While not a substitute for emergency surgical care, it is a powerful tool for rapid recovery in acute sickness."
  },
  {
    myth: "Homoeopathy is only for chronic conditions.",
    fact: "Incorrect. Homoeopathy is highly effective for acute conditions like injuries, coughs, colds, and fevers when prescribed correctly based on symptoms."
  },
  {
    myth: "Steroids are used in homoeopathic pills.",
    fact: "Genuine homoeopathy never uses steroids. Homoeopathic medicines are derived from plants, minerals, and other natural sources and are strictly regulated."
  },
  {
    myth: "Homoeopathy does not have any side effects so anyone can take it.",
    fact: "While extremely safe, incorrect or repeated dosing of a Homoeopathic remedy when not indicated can cause 'provings' (temporary appearance of symptoms). A professional Homoeopath should always guide the treatment."
  },
  {
    myth: "Homoeopathy is the same as herbal medicine or Ayurveda.",
    fact: "They are entirely different systems. Herbalism uses material doses of plant tinctures. Homoeopathy is a distinct medical system based on the 'law of similars' using ultramolecular dilutions of plants, minerals, or other substances."
  }
];

export default function Myths() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMyths = useMemo(() => {
    if (!searchQuery.trim()) return myths;
    const query = searchQuery.toLowerCase();
    return myths.filter(
      item => item.myth.toLowerCase().includes(query) || 
              item.fact.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleMyth = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-bg-secondary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-4xl md:text-5xl font-display font-black text-text-primary mb-4 leading-tight">
              Homoeopathy: <span className="text-primary italic">Myths & Facts</span>
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              Let's clear the air and address common misconceptions about homoeopathy with evidence-based facts.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-lg mx-auto"
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
          >
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary opacity-40 z-10" />
            <motion.input 
              whileFocus={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
              type="text" 
              placeholder="Search myths or facts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-12 py-5 bg-bg-primary border border-border rounded-2xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-1 bg-bg-secondary rounded-full hover:bg-bg-primary transition-colors z-10"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            )}
          </motion.div>
        </div>

        <div className="space-y-6">
          {filteredMyths.length > 0 ? (
            filteredMyths.map((item, index) => (
              <motion.div 
                key={item.myth}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2, y: -2 }}
                style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                className="bg-bg-primary rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative"
              >
                <button 
                  onClick={() => toggleMyth(index)}
                  className="w-full px-6 py-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none relative z-10 bg-bg-primary"
                >
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center">
                    <span className="px-3 py-1.5 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-red-500/10 w-fit">Myth</span>
                    <span className="font-bold text-lg text-text-primary leading-snug">{item.myth}</span>
                  </div>
                  <div className={`p-2 rounded-xl transition-colors ${activeIndex === index ? 'bg-primary/10' : 'bg-bg-secondary'}`}>
                    <ChevronDown 
                      className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-6 pb-6 pt-4 border-t border-border bg-gradient-to-br from-bg-secondary/50 to-bg-primary relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-start">
                          <span className="px-3 py-1.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm border border-green-500/10 mt-1 w-fit">Fact</span>
                          <div className="text-text-secondary text-lg leading-relaxed font-medium">
                            {item.fact}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-bg-primary rounded-3xl border border-border border-dashed"
            >
              <p className="text-text-secondary mb-4">No matching myths found.</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-bg-secondary text-primary font-bold rounded-xl hover:bg-border transition-colors"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
