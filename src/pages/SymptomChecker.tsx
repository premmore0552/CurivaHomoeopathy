import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Search, 
  Activity, 
  Brain, 
  Droplet, 
  Sparkles, 
  X, 
  Check, 
  HelpCircle,
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  Scale, 
  Stethoscope,
  RefreshCw,
  Info,
  ChevronRight,
  ShieldAlert,
  Flame,
  Wind
} from 'lucide-react';
import SEO from '../components/SEO';
import { symptomList, performSymptomMatching, Symptom, MatchResult } from '../utils/symptomMatcher';
import { enhancedRemedies } from '../data/enhancedRemedies';

// Categorized icons mapping
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  head: <Brain className="w-5 h-5" />,
  chest: <Wind className="w-5 h-5" />,
  abdomen: <Flame className="w-5 h-5" />,
  limbs: <Activity className="w-5 h-5" />,
  skin: <Droplet className="w-5 h-5" />,
  general: <Sparkles className="w-5 h-5" />
};

const CATEGORY_NAMES: Record<string, string> = {
  head: "Mind & Head",
  chest: "Chest & Breathing",
  abdomen: "Digestive & Belly",
  limbs: "Limbs & Stiffness",
  skin: "Skin & Eruptions",
  general: "General Modalities"
};

export default function SymptomChecker() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'head' | 'chest' | 'abdomen' | 'limbs' | 'skin' | 'general'>('all');
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);

  // Filter symptoms based on search query and category
  const filteredSymptoms = useMemo(() => {
    return symptomList.filter(sym => {
      const matchesSearch = sym.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (sym.description && sym.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'all' || sym.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // Compute matched remedies in real-time
  const matchResults = useMemo(() => {
    return performSymptomMatching(selectedSymptoms);
  }, [selectedSymptoms]);

  // Handle active symptom selection toggle
  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const clearAllSymptoms = () => {
    setSelectedSymptoms([]);
  };

  // Helper to fetch details from enhanced remedies profile for cards
  const getRemedyDetails = (id: string) => {
    return enhancedRemedies.find(r => r.id === id);
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <SEO 
        title="Interactive Symptom Checker | Curiva Homoeopathy"
        description="Explore potential homeopathic remedies based on your matching aggregate symptoms, modalities, and constitutional keynotes."
      />

      {/* Modern Curiva Banner Header */}
      <header className="relative pt-32 pb-48 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Activity className="w-96 h-96 text-accent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-10"
           >
             <Sparkles className="w-4 h-4 text-accent-light" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Therapeutic Co-relation</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-medium text-white tracking-tighter leading-[0.8] uppercase flex flex-col">
             <span>Symptom</span>
             <span className="text-accent italic lg:ml-24">Checker</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-serif italic leading-tight mt-12">
             An interactive diagnostic ledger matching physical modalities, keynotes, and emotional states with organic Homoeopathic remedies.
           </p>
         </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        
        {/* Step 1: Medical Disclaimer (Enforced Before Search) */}
        {!acceptedDisclaimer ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[3rem] border border-border/80 shadow-2xl overflow-hidden max-w-4xl mx-auto"
          >
            <div className="p-8 sm:p-12 space-y-6">
              <div className="flex items-center gap-4 text-amber-600">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-200">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest font-black text-amber-500">Legal Duty & Safe Use</span>
                  <p className="font-display font-bold text-2xl text-text-primary uppercase tracking-tight">Clinical Self-Assessment Disclaimer</p>
                </div>
              </div>

              <div className="space-y-4 text-text-secondary font-serif text-base leading-relaxed border-t border-b border-border py-6">
                <p>
                  Welcome to the Curiva Interactive Symptom Checker. Before you begin cataloging physical signs and sensory modalities, please acknowledge the strictly academic scope of this engine:
                </p>
                <p className="font-bold text-text-primary">
                  1. Clinical Non-Substitute:
                </p>
                <p>
                  This analyzer is designed as a study ledger mapping constitutional patterns with therapeutic materia medica. It does <b>NOT</b> constitute medical advice, physical diagnosis, or a prescription protocol.
                </p>
                <p className="font-bold text-text-primary">
                  2. Red Flag Emergency Notice:
                </p>
                <p>
                  If you are suffering from severe acute symptoms—including chest pressure, sudden breathing failure, heavy hemorrhaging, or severe high fevers—do not utilize home remedy matching. Consult a physician, dial emergency services (such as 911), or seek direct urgent care immediately.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="accept-check" 
                    checked={acceptedDisclaimer}
                    onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
                    className="mt-1.5 h-4 w-4 rounded border-border-strong text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="accept-check" className="text-xs font-medium text-text-secondary select-none cursor-pointer leading-tight">
                    I explicitly understand that this tool is for <b>informational purposes only</b>, does not construct a diagnosis, and I agree to use it as a reference study ledger.
                  </label>
                </div>

                <button
                  type="button"
                  disabled={!acceptedDisclaimer}
                  onClick={() => setAcceptedDisclaimer(true)}
                  className={`w-full sm:w-auto px-10 py-5 rounded-full text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
                    acceptedDisclaimer 
                    ? 'bg-primary text-white shadow-lg hover:scale-105 active:scale-95' 
                    : 'bg-bg-tertiary text-text-tertiary border border-border cursor-not-allowed'
                  }`}
                >
                  Enter Symtomatology Stage
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Active Symptom Stage Interface */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Symptom Selector & Filter Board (8 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic Interactive Panel */}
              <div className="bg-white rounded-[2.5rem] border border-border shadow-soft p-6 sm:p-8 space-y-6">
                
                {/* Search & Tool Metadata */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <h2 className="text-2xl font-display font-medium text-text-primary uppercase tracking-tight italic">
                      Identify <span className="text-primary italic">active expressions</span>
                    </h2>
                    {selectedSymptoms.length > 0 && (
                      <button 
                        onClick={clearAllSymptoms}
                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-text-tertiary hover:text-red-500 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset Checklist ({selectedSymptoms.length})
                      </button>
                    )}
                  </div>
                  <p className="text-text-secondary text-xs sm:text-sm font-serif">
                    Toggle individual bodily regions or use instant indexing to quickly find active symptoms or modalities.
                  </p>
                </div>

                {/* Instant Search Bar */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-tertiary">
                    <Search className="w-4 h-4" />
                  </span>
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search symptoms or modalities (e.g., 'fever', 'headache', 'acidity', 'burning')..."
                    className="w-full pl-11 pr-4 py-4 rounded-[1.5rem] bg-bg-secondary border border-border text-xs focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all placeholder:text-text-tertiary"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-text-tertiary hover:text-text-primary"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Segmented Bodily Filters */}
                <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-none border-b border-border">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border shrink-0 ${
                      activeCategory === 'all'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20'
                    }`}
                  >
                    All Spheres ({symptomList.length})
                  </button>
                  {Object.keys(CATEGORY_NAMES).map((catName) => {
                    const count = symptomList.filter(s => s.category === catName).length;
                    return (
                      <button
                        key={catName}
                        onClick={() => setActiveCategory(catName as any)}
                        className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border shrink-0 ${
                          activeCategory === catName
                          ? 'bg-primary text-white border-primary shadow-sm'
                          : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/20'
                        }`}
                      >
                        {CATEGORY_ICONS[catName]}
                        <span>{CATEGORY_NAMES[catName]}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Grid list of Matching symptoms */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {filteredSymptoms.length > 0 ? (
                      filteredSymptoms.map((sym) => {
                        const isChecked = selectedSymptoms.includes(sym.id);
                        return (
                          <motion.div
                            key={sym.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={() => toggleSymptom(sym.id)}
                            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 h-full select-none group ${
                              isChecked
                              ? 'bg-primary/5 border-primary/40 shadow-sm'
                              : 'bg-bg-primary/40 border-border/60 hover:bg-bg-secondary hover:border-border'
                            }`}
                          >
                            <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isChecked 
                              ? 'bg-primary border-primary text-white' 
                              : 'border-border-strong group-hover:border-primary/50 bg-white'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-text-primary leading-snug">
                                  {sym.name}
                                </span>
                                <span className="px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider bg-bg-secondary border border-border text-text-tertiary">
                                  {CATEGORY_NAMES[sym.category]}
                                </span>
                              </div>
                              {sym.description && (
                                <p className="text-[11px] leading-relaxed text-text-secondary font-serif italic">
                                  {sym.description}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="text-center py-16 space-y-4">
                        <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border flex items-center justify-center text-text-tertiary mx-auto">
                          <Search className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-text-secondary">No Matching Clinical Signs</p>
                          <p className="text-text-tertiary text-xs font-serif italic mt-1">Try broad keywords, spelling, or switch the bodily sphere filter.</p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Informational Guidance Section */}
              <div className="bg-bg-secondary rounded-[2rem] border border-border p-6 flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center border border-orange-500/20 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-text-primary">How does mapping work?</h4>
                  <p className="text-[11px] leading-normal text-text-secondary font-serif italic">
                    Homeopathy relies on structural totality—matching all bodily physical symptoms, mental mood changes, local sensations, and aggravating/relieving modalities (heat, movement, pressure) to find the most indicated remedy. The matching scores above display proximity factors based on classical Materia Medica correlations.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Diagnostic Recommendations & Results (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {/* Dynamic Remedy list Card wrapper */}
              <div className="bg-white rounded-[2.5rem] border border-border shadow-soft p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Indications Ledger</span>
                    <h3 className="text-xl font-display font-medium text-text-primary uppercase tracking-tight leading-none italic">
                      Matched <span className="text-primary italic">Remedies</span>
                    </h3>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-bg-secondary border border-border text-text-secondary">
                    Active Matches: {matchResults.length}
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {selectedSymptoms.length === 0 ? (
                    <motion.div 
                      key="empty-state"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-16 text-center space-y-4"
                    >
                      <div className="w-12 h-12 rounded-[1rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mx-auto">
                        <Activity className="w-6 h-6 animate-pulse" />
                      </div>
                      <div className="space-y-1.5 max-w-xs mx-auto">
                        <p className="text-xs font-black uppercase tracking-wider text-text-secondary">Awaiting Symptom Input</p>
                        <p className="text-text-tertiary text-[11px] font-serif leading-relaxed">
                          Please select one or more symptoms from the bodily spheres on the left. The compiler will display therapeutic remedies dynamically.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="results-found"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4 h-[550px] overflow-y-auto pr-1 custom-scrollbar"
                    >
                      {matchResults.slice(0, 10).map((res, index) => {
                        const remedyMeta = getRemedyDetails(res.remedyId);
                        // Determine score color
                        let scoreColorClass = "bg-emerald-500 text-white";
                        let scoreBorderClass = "border-emerald-500/15";
                        let strengthText = "Highly Indicated";
                        if (res.matchPercentage < 40) {
                          scoreColorClass = "bg-slate-500 text-white";
                          scoreBorderClass = "border-slate-500/15";
                          strengthText = "Constitutional Support";
                        } else if (res.matchPercentage < 70) {
                          scoreColorClass = "bg-amber-500 text-white";
                          scoreBorderClass = "border-amber-500/15";
                          strengthText = "Moderately Indicated";
                        }

                        return (
                          <div 
                            key={res.remedyId}
                            className={`p-5 rounded-2xl border bg-bg-secondary/40 border-border/60 hover:bg-bg-secondary transition-all space-y-4`}
                          >
                            
                            {/* Remedy Metadata Header */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-bold text-text-primary uppercase leading-tight hover:text-primary transition-colors">
                                    <Link to={`/remedy/${res.remedyId}`}>
                                      {remedyMeta?.name || res.remedyId.replace('-', ' ')}
                                    </Link>
                                  </h4>
                                </div>
                                {remedyMeta?.latinName && (
                                  <p className="text-[10px] leading-tight text-text-tertiary font-serif italic">
                                    {remedyMeta.latinName} — {remedyMeta.family} Family
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-col items-end gap-1 select-none">
                                <div className={`px-2.5 py-1 rounded-lg text-xs font-black tracking-tight ${scoreColorClass}`}>
                                  {res.matchPercentage}% Limit
                                </div>
                                <span className="text-[8px] font-black uppercase tracking-wider text-text-tertiary grayscale">
                                  {strengthText}
                                </span>
                              </div>
                            </div>

                            {/* Remedy Description */}
                            {remedyMeta?.description && (
                              <p className="text-[11px] leading-relaxed text-text-secondary font-serif line-clamp-2 italic">
                                {remedyMeta.description}
                              </p>
                            )}

                            {/* Why it matches */}
                            <div className="space-y-1.5 pt-2 border-t border-border/50">
                              <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary">Triggering Symptoms:</span>
                              <div className="space-y-1">
                                {res.matchedSymptoms.map((msym) => (
                                  <div key={msym.symptomId} className="flex gap-1.5 items-start text-[10px] leading-relaxed text-text-secondary">
                                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                                    <span>
                                      <b>{msym.symptomName}:</b> {msym.reason}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Dynamic Read Article link */}
                            <div className="pt-2">
                              <Link 
                                to={`/remedy/${res.remedyId}`}
                                className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
                              >
                                View Detailed Drug Profile
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>

                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Informational Warning block in the result card */}
                {selectedSymptoms.length > 0 && (
                  <div className="mt-4 p-4.5 bg-amber-500/5 rounded-2xl border border-amber-500/10 text-amber-600 text-[10px] leading-relaxed font-serif italic">
                    <b>Informational Use Guard:</b> Matching results reflect basic Materia Medica associations. Homeopathy is highly individualized. To proceed with dosage, scheduling, or potency selection, consult a qualified homeopath or physician.
                  </div>
                )}

              </div>

              {/* Consultation Navigation block */}
              <div className="bg-primary-dark rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.1)_0%,transparent_50%)]" />
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-accent mb-6 relative z-10">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-display font-medium mb-3 relative z-10 italic">Need clinical verification?</h3>
                <p className="text-white/80 leading-relaxed font-serif italic text-sm relative z-10 mb-6">
                  Discuss symptoms anonymously or arrange an virtual diagnostic checkup with a credentialed clinical homeopath.
                </p>
                <div className="flex flex-col gap-2 relative z-10">
                  <Link 
                    to="/ask-homeopath"
                    className="w-full inline-flex items-center justify-between p-4 bg-white/10 border border-white/20 hover:bg-white/15 active:scale-[0.99] transition-all rounded-2xl font-bold text-xs uppercase tracking-widest text-white leading-tight"
                  >
                    <span>Connect with expert homeopath</span>
                    <ChevronRight className="w-4 h-4 text-accent" />
                  </Link>
                  <Link 
                    to="/repertory"
                    className="w-full inline-flex items-center justify-between p-4 bg-white/10 border border-white/20 hover:bg-white/15 active:scale-[0.99] transition-all rounded-2xl font-bold text-xs uppercase tracking-widest text-white leading-tight"
                  >
                    <span>Open classical repertory tool</span>
                    <ChevronRight className="w-4 h-4 text-accent" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>
    </div>
  );
}
