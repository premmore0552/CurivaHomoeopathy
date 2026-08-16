import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import MateriaMedicaSearch from '../components/MateriaMedicaSearch';
import HomoeopathicGlossary from '../components/HomoeopathicGlossary';
import RemedyFinder from '../components/RemedyFinder';
import ModalitiesCheatSheet from '../components/ModalitiesCheatSheet';
import MateriaMedicaCanvas from '../components/MateriaMedicaCanvas';

export default function Encyclopedia() {
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || 'remedies';
  });
  const [activeFamily, setActiveFamily] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen to outer navigation search parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [location.search, activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', tab);
    window.history.pushState(null, '', url.toString());
  };

  const handleItemClick = (link: string) => {
    navigate(link);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Materia Medica Homoeopathic Encyclopedia | Curiva Homoeopathy"
        description="Browse our comprehensive A-Z database of remedies, drug pictures, symptoms, and classical definitions."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary border-b border-border text-text-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -bottom-48 -right-48 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-10 border border-primary/20 text-primary"
           >
             <Sparkles className="w-4 h-4" /> Living Archive
           </motion.div>
           
           <AnimatePresence mode="wait">
             {activeTab === 'remedies' && (
               <motion.div
                 key="hdr-remedies"
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 className="space-y-6"
               >
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-text-primary tracking-tighter leading-[0.85]">
                   Materia <br/> <span className="text-primary italic">Medica</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-relaxed">
                   Your centralized gateway for evidence-based Homoeopathic remedy profiles, keynotes, and clinical indications.
                 </p>
               </motion.div>
             )}

             {activeTab === 'glossary' && (
               <motion.div
                 key="hdr-glossary"
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 className="space-y-6"
               >
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-text-primary tracking-tighter leading-[0.85]">
                   Homoeopathic <br/> <span className="text-primary italic">Glossary</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-relaxed">
                   Explore foundational concepts, dynamic energetic definitions, and primary remedy designations linked to authentic sources.
                 </p>
               </motion.div>
             )}

             {activeTab === 'modalities' && (
                <motion.div
                  key="hdr-modalities"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="space-y-6"
                >
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-text-primary tracking-tighter leading-[0.85]">
                    Symptom <br/> <span className="text-primary italic">Modalities</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-relaxed">
                    Browse exact Homoeopathic aggravations and ameliorations. Filter major remedies by temporal, thermal, positional, and environmental dynamics.
                  </p>
                </motion.div>
              )}

             {activeTab === 'finder' && (
               <motion.div
                 key="hdr-finder"
                 initial={{ opacity: 0, y: 15 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -15 }}
                 className="space-y-6"
               >
                 <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-text-primary tracking-tighter leading-[0.85]">
                   Remedy <br/> <span className="text-primary italic">Finder</span>
                 </h1>
                 <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-relaxed">
                   An interactive clinical symptom mapping configuration tool. Match holistic indications to remedies using weighted correlations.
                 </p>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      </header>

      {/* Dynamic Sub-navigation Tab Selector */}
      <div className="sticky top-0 z-[100] transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row bg-white/80 backdrop-blur-lg border border-border p-2 rounded-[2rem] shadow-2xl items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1 bg-bg-secondary p-1 rounded-[1.5rem] w-full sm:w-auto">
              {[
                { id: 'remedies', label: '📖 Materia Index' },
                { id: 'glossary', label: '📜 Terms & Definitions' },
                { id: 'finder', label: '🎯 Remedy Finder' },
                { id: 'modalities', label: '🌡️ Symptom Modalities' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-3 sm:px-6 py-3.5 rounded-xl sm:rounded-[1.25rem] text-[9px] sm:text-xs font-black uppercase tracking-wider md:tracking-widest transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-text-secondary hover:bg-zinc-200/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-primary/5 text-primary text-xs font-bold rounded-2xl border border-primary/10">
              <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />
              <span>Accurate References &middot; Evidence-Backed</span>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <AnimatePresence mode="wait">
          {activeTab === 'remedies' && (
            <motion.div
              key="pane-remedies"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <MateriaMedicaCanvas />
            </motion.div>
          )}

          {activeTab === 'glossary' && (
            <motion.div
              key="pane-glossary"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <HomoeopathicGlossary />
            </motion.div>
          )}

          {activeTab === 'finder' && (
            <motion.div
              key="pane-finder"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <RemedyFinder />
            </motion.div>
          )}

          {activeTab === 'modalities' && (
            <motion.div
              key="pane-modalities"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ModalitiesCheatSheet />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <MateriaMedicaSearch />
    </div>
  );
}
