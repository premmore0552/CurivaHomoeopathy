import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Activity, 
  Target, 
  ArrowRight, 
  X, 
  Info, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  BookOpen, 
  Stethoscope, 
  Layers, 
  CheckSquare, 
  Square,
  Bookmark,
  Share2,
  Brain,
  Skull,
  Frown,
  Eye,
  Volume2,
  Flame,
  Droplets,
  ShieldAlert
} from 'lucide-react';
import SEO from '../components/SEO';
import { repertoryDatabase, Rubric, RepertoryChapter } from '../data/repertoryDatabase';
import { enhancedRemedies } from '../data/enhancedRemedies';
import { Link } from 'react-router-dom';

// Map icons to their lucide components safely
const iconMap: Record<string, React.FC<any>> = {
  Brain: Brain,
  Skull: Skull,
  Frown: Frown,
  Eye: Eye,
  Volume2: Volume2,
  Flame: Flame,
  Droplets: Droplets,
  ShieldAlert: ShieldAlert
};

export default function RepertoryTool() {
  const [activeChapterId, setActiveChapterId] = useState<string>("mind");
  const [rubricSearchQuery, setRubricSearchQuery] = useState('');
  const [selectedRubrics, setSelectedRubrics] = useState<Rubric[]>([]);
  const [customSearchQuery, setCustomSearchQuery] = useState('');

  // Find the currently active chapter
  const activeChapter = useMemo(() => {
    return repertoryDatabase.find(c => c.id === activeChapterId) || repertoryDatabase[0];
  }, [activeChapterId]);

  // Comprehensive rubric search across all chapters
  const searchResults = useMemo(() => {
    if (!customSearchQuery.trim()) return [];
    
    const query = customSearchQuery.toLowerCase().trim();
    const results: { chapterName: string; chapterId: string; rubric: Rubric }[] = [];
    
    repertoryDatabase.forEach(chapter => {
      chapter.rubrics.forEach(rubric => {
        if (
          rubric.symptom.toLowerCase().includes(query) ||
          (rubric.subCategory && rubric.subCategory.toLowerCase().includes(query)) ||
          rubric.remedies.some(r => r.toLowerCase().includes(query))
        ) {
          results.push({
            chapterName: chapter.name,
            chapterId: chapter.id,
            rubric
          });
        }
      });
    });
    
    return results;
  }, [customSearchQuery]);

  // Group rubrics in active chapter by subcategory
  const activeSubcategories = useMemo(() => {
    const map: Record<string, Rubric[]> = {};
    activeChapter.rubrics.forEach(rubric => {
      const sub = rubric.subCategory || "General";
      if (!map[sub]) {
        map[sub] = [];
      }
      map[sub].push(rubric);
    });
    return map;
  }, [activeChapter]);

  // Toggle rubric selection inside cross-referencing clipboard
  const toggleRubricSelection = (rubric: Rubric) => {
    setSelectedRubrics(prev => {
      const exists = prev.some(r => r.id === rubric.id);
      if (exists) {
        return prev.filter(r => r.id !== rubric.id);
      } else {
        return [...prev, rubric];
      }
    });
  };

  // Cross-reference selected symptoms to find matching remedies and weight them
  const crossReferencedRemedies = useMemo(() => {
    if (selectedRubrics.length === 0) return [];

    const remedyScores: Record<string, { 
      abbreviation: string; 
      score: number; 
      matchedRubrics: string[]; 
      matchedPercent: number;
    }> = {};

    selectedRubrics.forEach(rubric => {
      rubric.remedies.forEach(rem => {
        // Normalize abbreviation for mapping to detailed Materia Medica
        const cleanName = rem.replace(/[.,\s]/g, '').toLowerCase();
        
        if (!remedyScores[cleanName]) {
          remedyScores[cleanName] = {
            abbreviation: rem,
            score: 0,
            matchedRubrics: [],
            matchedPercent: 0
          };
        }
        remedyScores[cleanName].score += 1;
        remedyScores[cleanName].matchedRubrics.push(rubric.symptom);
      });
    });

    return Object.values(remedyScores)
      .map(entry => {
        // Try to match with our enhancedRemedies database
        const matchedDetail = enhancedRemedies.find(r => 
          r.name.toLowerCase().includes(entry.abbreviation.replace('.', '').toLowerCase()) ||
          r.id.toLowerCase().includes(entry.abbreviation.replace('.', '').toLowerCase())
        );

        return {
          ...entry,
          fullName: matchedDetail ? matchedDetail.name : `${entry.abbreviation} Remedium`,
          id: matchedDetail ? matchedDetail.id : entry.abbreviation.replace('.', '').toLowerCase(),
          family: matchedDetail ? matchedDetail.family : "Homeopathic Proving",
          matchedPercent: Math.round((entry.score / selectedRubrics.length) * 100)
        };
      })
      .sort((a, b) => b.score - a.score || b.matchedPercent - a.matchedPercent);
  }, [selectedRubrics]);

  return (
    <div className="min-h-screen bg-bg-primary pb-24">
      <SEO 
        title="Interactive Clinical Repertory | Curiva Homoeopathy"
        description="Comprehensive symptom-based clinical repertory. Group symptoms by Mind, Vertigo, Headache, and find the corresponding indicated remedies."
      />

      {/* Modern High-End Hero Section */}
      <header className="relative pt-32 pb-44 overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.15)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-8"
           >
             <Stethoscope className="w-4 h-4 text-accent-light" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent-light">Expert Clinical Portal</span>
           </motion.div>
           <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-display font-medium text-white tracking-tighter leading-[0.85] uppercase flex flex-col items-center">
             <span>Homeopathic</span>
             <span className="text-accent italic lg:ml-24 -mt-2">Repertory</span>
           </h1>
           <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-serif italic leading-relaxed mt-10">
             Explore the comprehensive classical repertory compiled from expert sources. Filter by sections, explore sub-categories, analyze keynotes, and cross-reference multiple symptoms.
           </p>
        </div>
      </header>

      {/* Main Repertory Engine Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        
        {/* TOP LEVEL INTUITIVE CROSS-REFERENCE SOLVER (Symptom Clipboard) */}
        <div className="bg-white rounded-[2.5rem] border border-border shadow-soft p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary mb-1">
                <Sparkles className="w-5 h-5 text-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-text-secondary">AI Cross-Reference solver</span>
              </div>
              <h2 className="text-3xl font-display font-black text-text-primary uppercase tracking-tight italic">
                Symptom <span className="text-primary italic">Clipboard</span>
              </h2>
              <p className="text-text-secondary text-sm font-medium mt-1">
                Collect symptoms below to compute overlapping remedies and calculate coverage weight percentages.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="px-4 py-2 bg-primary/10 rounded-xl text-xs font-black uppercase tracking-widest text-primary border border-primary/10">
                {selectedRubrics.length} Symptoms Selected
              </span>
              {selectedRubrics.length > 0 && (
                <button 
                  onClick={() => setSelectedRubrics([])}
                  className="px-4 py-2 bg-text-primary/5 hover:bg-text-primary/10 transition-colors text-text-secondary rounded-xl text-xs font-black uppercase tracking-widest"
                >
                  Clear Clipboard
                </button>
              )}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedRubrics.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-10 text-center bg-bg-secondary rounded-[2rem] border border-dashed border-border"
              >
                <Layers className="w-12 h-12 mx-auto text-text-tertiary mb-3 opacity-30" />
                <p className="font-serif italic text-text-secondary text-base">Your symptom clipboard is empty.</p>
                <p className="text-xs text-text-tertiary mt-2">Browse the categorized chapters below and check boxes to calculate overlapping remedies.</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-12 gap-8"
              >
                {/* Selected Rubrics List */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-tertiary opacity-70 mb-2">Selected Symptoms:</h4>
                  <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2 no-scrollbar">
                    {selectedRubrics.map(rubric => (
                      <div 
                        key={rubric.id}
                        className="flex items-start justify-between gap-3 p-3 bg-primary/5 rounded-xl border border-primary/10"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-widest rounded mb-1">
                            {rubric.subCategory}
                          </span>
                          <p className="text-xs font-medium text-text-primary leading-tight">{rubric.symptom}</p>
                        </div>
                        <button 
                          onClick={() => toggleRubricSelection(rubric)}
                          className="p-1 hover:bg-primary/10 rounded text-primary transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overlap Results Engine */}
                <div className="lg:col-span-7 bg-bg-secondary rounded-3xl p-6 border border-border">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-text-tertiary opacity-70 mb-4 flex items-center justify-between">
                    <span>Ranked Remedies (by matched weight):</span>
                    <span className="text-[10px] font-medium text-accent">Cooccurrence overlap calculated</span>
                  </h4>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 no-scrollbar">
                    {crossReferencedRemedies.map((scored, index) => (
                      <div 
                        key={scored.abbreviation}
                        className="flex items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-border hover:border-primary/20 transition-all shadow-sm"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {index === 0 && (
                              <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[8px] font-black uppercase tracking-widest rounded-md">
                                Highly Indicated
                              </span>
                            )}
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                              {scored.family}
                            </span>
                          </div>
                          
                          <Link 
                            to={`/remedy/${scored.id}`}
                            className="text-lg font-display font-bold text-text-primary hover:text-primary transition-colors italic block"
                          >
                            {scored.fullName} <span className="text-sm font-sans font-black uppercase not-italic text-primary">({scored.abbreviation})</span>
                          </Link>
                          
                          <p className="text-[10px] text-text-secondary mt-1">
                            Matches {scored.score} out of {selectedRubrics.length} symptoms
                          </p>
                        </div>

                        {/* Weight Indicator Bubble */}
                        <div className="text-right">
                          <div className="inline-flex flex-col items-end">
                            <span className="text-xl font-bold text-primary font-display">{scored.matchedPercent}%</span>
                            <span className="text-[8px] font-black uppercase tracking-widest text-text-tertiary">Matched</span>
                          </div>
                          
                          {/* Progress Line */}
                          <div className="w-16 h-1 bg-border rounded-full overflow-hidden mt-1.5">
                            <div 
                              className={`h-full ${index === 0 ? 'bg-amber-500' : 'bg-primary'}`} 
                              style={{ width: `${scored.matchedPercent}%` }} 
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* REPERTORY EXPLORER FRAME */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: CHAPTER SELECTOR */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Global Search Box for Fast Querying */}
            <div className="bg-white rounded-[2rem] p-8 border border-border shadow-soft">
              <h3 className="text-lg font-display font-black text-text-primary uppercase tracking-tight mb-4 flex items-center gap-2 italic">
                <Search className="w-5 h-5 text-primary" />
                Quick <span className="text-primary italic">Search</span>
              </h3>
              
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary w-4 h-4" />
                <input
                  type="text"
                  placeholder="Query rubrics or remedies..."
                  value={customSearchQuery}
                  onChange={(e) => setCustomSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary border border-border rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>

              {customSearchQuery && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] font-black text-text-tertiary uppercase tracking-wider">
                    Found {searchResults.length} matches
                  </span>
                  <button 
                    onClick={() => setCustomSearchQuery('')}
                    className="text-[10px] font-black text-primary uppercase tracking-wider hover:underline"
                  >
                    Clear Search
                  </button>
                </div>
              )}
            </div>

            {/* Chapters Tab Selector */}
            <div className="bg-white rounded-[2rem] p-8 border border-border shadow-soft sticky top-24">
              <h3 className="text-lg font-display font-black text-text-primary uppercase tracking-tight mb-6 flex items-center gap-2 italic">
                <Layers className="w-5 h-5 text-primary" />
                Repertory <span className="text-primary italic">Chapters</span>
              </h3>

              <div className="space-y-2">
                {repertoryDatabase.map(chapter => {
                  const IconComponent = iconMap[chapter.icon] || Brain;
                  const isActive = chapter.id === activeChapterId;
                  
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => {
                        setActiveChapterId(chapter.id);
                        setCustomSearchQuery(''); // Clear manual search when switching chapters
                      }}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all border ${
                        isActive
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-bg-secondary text-text-secondary border-transparent hover:border-primary/10'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isActive ? 'bg-white/10 text-white' : 'bg-white text-primary border border-border'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-black uppercase tracking-wider ${isActive ? 'text-white' : 'text-text-primary'}`}>
                          {chapter.name}
                        </p>
                        <p className={`text-[10px] truncate ${isActive ? 'text-white/60' : 'text-text-tertiary'}`}>
                          {chapter.rubrics.length} symptoms indexed
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DETAIL BROWSER */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              
              {/* Dynamic Global Search Results View */}
              {customSearchQuery ? (
                <motion.div
                  key="search-view"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-border shadow-soft space-y-6"
                >
                  <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">
                    Search Results for <span className="text-primary italic">"{customSearchQuery}"</span>
                  </h3>
                  
                  {searchResults.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-border rounded-3xl">
                      <p className="font-serif italic text-text-secondary text-lg">No rubrics matched your query.</p>
                      <p className="text-xs text-text-tertiary mt-2">Try looking up keywords like 'Anger', 'Vertigo', 'Fear', 'Hair' or specific remedies.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-border">
                      {searchResults.map(({ chapterName, chapterId, rubric }) => {
                        const isItemSelected = selectedRubrics.some(r => r.id === rubric.id);
                        
                        return (
                          <div 
                            key={rubric.id}
                            className="py-6 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-bg-primary/40 px-4 rounded-xl transition-all"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-0.5 bg-bg-secondary text-text-tertiary rounded text-[8px] font-black uppercase tracking-wider border border-border">
                                  {chapterName}
                                </span>
                                {rubric.subCategory && (
                                  <span className="px-2 py-0.5 bg-primary/5 text-primary rounded text-[8px] font-black uppercase tracking-wider">
                                    {rubric.subCategory}
                                  </span>
                                )}
                              </div>
                              <p className="text-base font-serif italic text-text-primary mb-3">
                                {rubric.symptom}
                              </p>
                              
                              <div className="flex flex-wrap gap-1.5 items-center">
                                <span className="text-[10px] font-black uppercase tracking-wider text-text-tertiary opacity-70 mr-1">Remedies:</span>
                                {rubric.remedies.map(rem => (
                                  <span 
                                    key={rem} 
                                    className="px-2 py-0.5 bg-text-primary/5 rounded text-[10px] font-black font-sans uppercase tracking-widest text-text-secondary border border-border"
                                  >
                                    {rem}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <button
                              onClick={() => toggleRubricSelection(rubric)}
                              className={`self-start flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                isItemSelected
                                ? 'bg-primary text-white border-primary shadow-sm'
                                : 'bg-white text-text-secondary border-border hover:border-primary/20'
                              }`}
                            >
                              {isItemSelected ? (
                                <>
                                  <CheckSquare className="w-3.5 h-3.5" /> Checked
                                </>
                              ) : (
                                <>
                                  <Square className="w-3.5 h-3.5" /> Add to Solver
                                </>
                              )}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              ) : (
                
                // Chapter-by-Chapter Browse View
                <motion.div
                  key={activeChapter.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-border shadow-soft space-y-8"
                >
                  {/* Chapter Header */}
                  <div>
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-primary border border-primary/10">
                      Standard Classical Rubrics
                    </span>
                    <h2 className="text-4xl font-display font-black text-text-primary uppercase tracking-tight italic mt-3 mb-2">
                      {activeChapter.name} <span className="text-primary italic">Rubrics</span>
                    </h2>
                    <p className="text-text-secondary text-sm">
                      {activeChapter.description}
                    </p>
                  </div>

                  {/* Grouped Sub-categories & Rubrics */}
                  <div className="space-y-8">
                    {Object.entries(activeSubcategories).map(([subCatName, rubrics]) => (
                      <div key={subCatName} className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-4 bg-accent rounded" />
                          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-text-secondary">
                            {subCatName}
                          </h4>
                        </div>

                        <div className="divide-y divide-border">
                          {rubrics.map(rubric => {
                            const isItemSelected = selectedRubrics.some(r => r.id === rubric.id);
                            
                            return (
                              <div 
                                key={rubric.id} 
                                className="py-5 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-bg-primary/30 px-3 rounded-xl transition-all"
                              >
                                <div className="flex-1">
                                  <p className="text-base font-serif italic text-text-primary mb-3">
                                    {rubric.symptom}
                                  </p>
                                  <div className="flex flex-wrap gap-1.5 items-center">
                                    <span className="text-[10px] font-black uppercase tracking-wider text-text-tertiary opacity-70 mr-1">Proven Remedies:</span>
                                    {rubric.remedies.map(rem => (
                                      <span 
                                        key={rem} 
                                        className="px-2.5 py-0.5 bg-bg-secondary text-text-primary rounded text-[10px] font-black font-sans uppercase tracking-widest border border-border/60 hover:text-primary transition-all cursor-help"
                                        title={`Materia Medica proven clinical match for ${rem}`}
                                      >
                                        {rem}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                <button
                                  onClick={() => toggleRubricSelection(rubric)}
                                  className={`self-start flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                    isItemSelected
                                    ? 'bg-primary text-white border-primary shadow-sm'
                                    : 'bg-white text-text-secondary border-border hover:border-primary/20'
                                  }`}
                                >
                                  {isItemSelected ? (
                                    <>
                                      <CheckSquare className="w-3.5 h-3.5" /> Selected
                                    </>
                                  ) : (
                                    <>
                                      <Square className="w-3.5 h-3.5" /> Select
                                    </>
                                  )}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </main>

      {/* FOOTER CLINICAL STATEMENT */}
      <footer className="max-w-7xl mx-auto px-4 mt-20">
         <div className="bg-bg-secondary p-12 rounded-[3.5rem] border border-border relative overflow-hidden">
            <div className="absolute right-0 top-0 p-12 opacity-5 pointer-events-none">
              <Bookmark className="w-48 h-48 text-primary" />
            </div>
            
            <div className="max-w-3xl">
              <h4 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic mb-4">
                Clinical Repertorization Note
              </h4>
              <p className="text-text-secondary font-serif italic text-lg leading-relaxed mb-6">
                Repertorization represents the core analytical step in homeopathic prescribing. It provides a numeric evaluation of candidates, which must always be confirmed against the physical keynote and emotional constitution profiles listed in the <strong>Materia Medica</strong>.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/materia-medica" 
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md hover:scale-105 transition-all text-center inline-block"
                >
                  Browse Materia Medica
                </Link>
                <Link 
                  to="/relationships" 
                  className="px-5 py-2.5 bg-white text-text-primary border border-border rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-bg-primary transition-all text-center inline-block"
                >
                  Analyze Relationships
                </Link>
              </div>
            </div>
         </div>
      </footer>
    </div>
  );
}
