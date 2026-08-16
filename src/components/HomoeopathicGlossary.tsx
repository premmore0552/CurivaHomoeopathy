import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Info, Quote, Link2, Filter, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { glossaryData, GlossaryItem } from '../data/glossaryData';
import { useLocation } from 'react-router-dom';

export default function HomoeopathicGlossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const location = useLocation();
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Parse category selection
  const categories = ['All', 'Concept', 'Term', 'Remedy'];

  // Handle URL hash behavior for deep-linking from articles
  useEffect(() => {
    const hash = window.location.hash || location.hash;
    if (hash) {
      const targetId = hash.replace('#', '');
      const item = glossaryData.find(g => g.id === targetId);
      if (item) {
        setExpandedId(item.id);
        setActiveCategory('All');
        setTimeout(() => {
          const el = cardRefs.current[item.id];
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('ring-4', 'ring-primary/40');
            setTimeout(() => {
              el.classList.remove('ring-4', 'ring-primary/40');
            }, 3000);
          }
        }, 350);
      }
    }
  }, [location.hash, location.pathname]);

  const filteredItems = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setActiveCategory('All');
    setExpandedId(null);
  };

  return (
    <div className="space-y-10" id="glossary-explorer">
      {/* Intro Subheader & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-bg-secondary p-6 sm:p-8 rounded-[2rem] border border-border">
        <div className="max-w-xl space-y-1">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Classical Hahnemannian Terms
          </div>
          <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">
            Homoeopathic <span className="text-primary">Glossary</span>
          </h3>
          <p className="font-serif italic text-sm text-text-secondary">
            Explore core concepts, dynamic philosophies, and remedy models with definitions linked to historical sources.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-text-secondary border-border hover:border-primary/40'
              }`}
            >
              {cat === 'All' ? 'All categories' : `${cat}s`}
            </button>
          ))}
        </div>
      </div>

      {/* Grid search controller */}
      <div className="relative">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-text-tertiary">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search glossary terms, definitions, and concepts (e.g., Vital Force)..."
          className="w-full pl-14 pr-6 py-5 bg-white rounded-3xl border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all shadow-soft font-medium text-sm md:text-base text-text-primary"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-5 flex items-center text-xs text-text-tertiary hover:text-primary font-bold uppercase tracking-widest cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Glossary terms render listing */}
      <div className="grid gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <motion.div
                key={item.id}
                ref={(el) => { cardRefs.current[item.id] = el; }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
                className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'border-primary shadow-[0_20px_50px_rgba(var(--primary-rgb),0.08)]'
                    : 'border-border shadow-soft hover:border-primary/30'
                }`}
              >
                {/* Header view */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="p-6 sm:p-8 flex items-start sm:items-center justify-between gap-6 cursor-pointer select-none"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-xl sm:text-2xl font-display font-extrabold text-text-primary tracking-tight italic group-hover:text-primary transition-colors">
                        {item.term}
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-wider border ${
                        item.category === 'Concept'
                          ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                          : item.category === 'Remedy'
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-600 border-sky-500/20'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed font-serif max-w-4xl line-clamp-2">
                      {item.definition}
                    </p>
                  </div>

                  <div className={`w-10 h-10 rounded-full bg-bg-secondary flex items-center justify-center shrink-0 border border-border group transition-all ${
                    isExpanded ? 'bg-primary text-white rotate-180 border-primary' : 'hover:bg-primary/5 hover:border-primary/20'
                  }`}>
                    <svg className="w-4 h-4 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                      <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Details body */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-border bg-bg-secondary/40"
                    >
                      <div className="p-6 sm:p-8 space-y-6">
                        {/* Summary / Educational analysis */}
                        <div className="space-y-3">
                          <h5 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-text-tertiary">
                            <Info className="w-3.5 h-3.5 text-primary" /> Philosophy Breakdown
                          </h5>
                          <p className="text-text-secondary text-sm md:text-base leading-relaxed font-serif italic">
                            {item.explanation}
                          </p>
                        </div>

                        {/* Citation quote block */}
                        {item.source && (
                          <div className="p-5 bg-white rounded-2xl border border-border flex items-start gap-4">
                            <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
                              <Quote className="w-4 h-4 text-primary" />
                            </div>
                            <div className="space-y-1">
                              <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Source / Reference</span>
                              <p className="text-xs font-bold text-text-primary leading-normal italic">{item.source}</p>
                            </div>
                          </div>
                        )}

                        {/* Related tags selector */}
                        {item.relatedTerms && item.relatedTerms.length > 0 && (
                          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/80">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-text-tertiary flex items-center gap-1.5 mr-2">
                              <Link2 className="w-3.5 h-3.5 text-primary" /> Related Terms:
                            </span>
                            {item.relatedTerms.map(rt => {
                              // Lookup id for relation
                              const matchedItem = glossaryData.find(g => g.term.toLowerCase() === rt.toLowerCase());
                              return (
                                <button
                                  key={rt}
                                  onClick={() => {
                                    if (matchedItem) {
                                      setExpandedId(matchedItem.id);
                                      setTimeout(() => {
                                        cardRefs.current[matchedItem.id]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      }, 100);
                                    } else {
                                      setSearchQuery(rt);
                                    }
                                  }}
                                  className="px-3.5 py-1.5 bg-white hover:border-primary/40 border border-border rounded-xl text-xs font-bold text-primary transition-all shadow-sm cursor-pointer"
                                >
                                  {rt}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="p-16 text-center bg-bg-secondary rounded-[3rem] border border-dashed border-border flex flex-col items-center">
            <AlertCircle className="w-12 h-12 text-text-tertiary mb-4" />
            <h4 className="text-xl font-display font-bold text-text-primary mb-2">No Matching Glossary Terms</h4>
            <p className="text-sm text-text-secondary font-serif italic max-w-sm mb-6">"Let research be comprehensive" - verify spelling or change the source classification.</p>
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> Clear filters and search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
