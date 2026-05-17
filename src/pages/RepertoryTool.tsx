
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Activity, Target, ArrowRight, X, Info, Sparkles, Filter, ChevronRight, BookOpen, Stethoscope } from 'lucide-react';
import SEO from '../components/SEO';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { Link } from 'react-router-dom';

const allSymptoms = Array.from(new Set(enhancedRemedies.flatMap(r => [
  ...(r.keyCharacteristics || []),
  ...(r.modalities?.better || []),
  ...(r.modalities?.worse || [])
]))).sort();

export default function RepertoryTool() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSymptoms = useMemo(() => {
    if (!searchQuery) return allSymptoms.slice(0, 50);
    return allSymptoms.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 50);
  }, [searchQuery]);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom) 
        : [...prev, symptom]
    );
  };

  const matchingRemedies = useMemo(() => {
    if (selectedSymptoms.length === 0) return [];

    return enhancedRemedies
      .map(remedy => {
        const symptoms = [
          ...(remedy.keyCharacteristics || []), 
          ...(remedy.modalities?.better || []), 
          ...(remedy.modalities?.worse || []),
          ...(remedy.clinicalApplications || [])
        ];
        const matched = selectedSymptoms.filter(s => symptoms.some(sym => sym.toLowerCase().includes(s.toLowerCase())));
        return { ...remedy, matchCount: matched.length, matchedSymptoms: matched };
      })
      .filter(r => r.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);
  }, [selectedSymptoms]);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Interactive Repertory | Curiva Homoeopathy"
        description="Dynamic symptom-based repertory tool for identifying matching homeopathic remedies."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-10"
           >
             <Stethoscope className="w-4 h-4 text-accent-light" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Clinical Repertory</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col items-center">
             <span>Symptom</span>
             <span className="text-accent italic lg:ml-24 -mt-4">Analyzer</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-serif italic leading-tight mt-12">
             Input specific symptoms to dynamically filter and rank remedies from the Curiva Materia Medica database.
           </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Symptom Selection Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-[3rem] p-8 border border-border shadow-soft sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-display font-black text-text-primary uppercase tracking-tight italic">Select <span className="text-primary italic">Symptoms</span></h3>
              </div>

              <div className="relative group mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search symptoms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-secondary border border-border rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                {filteredSymptoms.map((symptom) => (
                  <button
                    key={symptom}
                    onClick={() => toggleSymptom(symptom)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all border ${
                      selectedSymptoms.includes(symptom)
                      ? 'bg-primary text-white border-primary shadow-md'
                      : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20'
                    }`}
                  >
                    <span className="text-xs font-bold truncate">{symptom}</span>
                    {selectedSymptoms.includes(symptom) && <X className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              {selectedSymptoms.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">Selected ({selectedSymptoms.length})</span>
                    <button 
                      onClick={() => setSelectedSymptoms([])}
                      className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSymptoms.map(s => (
                      <span key={s} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-primary/10">
                        {s} <X className="w-2.5 h-2.5 cursor-pointer" onClick={(e) => { e.stopPropagation(); toggleSymptom(s); }} />
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Results Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {matchingRemedies.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight">Matching <span className="text-primary">Remedies</span></h2>
                    <span className="px-4 py-1.5 bg-primary/5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                      {matchingRemedies.length} Potential Fits
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {matchingRemedies.map((remedy) => (
                      <motion.div
                        key={remedy.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-8 border border-border shadow-soft group hover:-translate-y-2 transition-all relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Activity className="w-24 h-24 text-primary" />
                        </div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="px-3 py-1 bg-bg-secondary rounded-full text-[9px] font-black uppercase tracking-widest text-text-tertiary border border-border">
                              {remedy.family}
                            </span>
                            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-500/10">
                              <Sparkles className="w-3 h-3" />
                              {remedy.matchCount} Matches
                            </div>
                          </div>

                          <h3 className="text-3xl font-display font-medium text-text-primary italic mb-2 group-hover:text-primary transition-colors">{remedy.name}</h3>
                          <p className="text-text-tertiary text-[10px] font-black uppercase tracking-[0.2em] mb-6">{remedy.origin}</p>
                          
                          <div className="space-y-3 mb-8">
                            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60 italic">Matched Symptoms:</p>
                            <div className="flex flex-wrap gap-2">
                              {remedy.matchedSymptoms.map((s, idx) => (
                                <span key={idx} className="text-xs font-serif italic text-emerald-600 flex items-center gap-2">
                                  <ChevronRight className="w-3 h-3" /> {s}
                                </span>
                              ))}
                            </div>
                          </div>

                          <Link
                            to={`/remedy/${remedy.id}`}
                            className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all w-full justify-center group/btn"
                          >
                            Explore Remedy <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[4rem] p-20 border border-dashed border-border flex flex-col items-center justify-center text-center shadow-soft"
                >
                  <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center text-text-tertiary mb-8">
                    <Target className="w-12 h-12 opacity-20" />
                  </div>
                  <h3 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic mb-4">Start <span className="text-primary italic">Repertorizing</span></h3>
                  <p className="text-text-secondary font-serif italic text-lg max-w-md mx-auto">
                    Select symptoms from the sidebar to find the most indicated remedies for your clinical case.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer Educational Bit */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
         <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-bg-secondary p-12 rounded-[3.5rem] border border-border flex flex-col justify-center">
               <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                 <Info className="w-6 h-6" />
               </div>
               <h4 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic mb-4">Expert Tip</h4>
               <p className="text-text-secondary font-serif italic text-lg leading-relaxed">
                 When selecting symptoms, prioritize the mental generals and physical particulars that are "Striking, Singular, Uncommon, and Peculiar."
               </p>
            </div>
            <div className="bg-primary-dark p-12 rounded-[3.5rem] text-white flex flex-col justify-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-10">
                 <BookOpen className="w-32 h-32 text-accent" />
               </div>
               <h4 className="text-2xl font-display font-black uppercase tracking-tight italic mb-4">Materia Medica Integration</h4>
               <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-8">
                 This tool cross-references clinical data verified by Boericke, Kent, and Allen.
               </p>
               <button className="flex items-center gap-2 text-accent text-[10px] font-black uppercase tracking-widest hover:underline transition-all">
                 Read Documentation <ChevronRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
}
