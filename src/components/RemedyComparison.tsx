import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Scale, Info, Sparkles, AlertCircle, Lock, ArrowRight, Crown, Search, ArrowUpDown, ChevronLeft, ChevronRight, Filter, Thermometer, Droplets, Target, Activity, ClipboardList } from 'lucide-react';
import { ComparisonData } from '../data/comparisonData';

interface RemedyComparisonProps {
  remedies: ComparisonData[];
  preSelectedId?: string;
  preSelectedIds?: string[];
}

// Full differential diagnostics matching Allen's Keynotes
const getKeyDifference = (remedy: ComparisonData) => {
  if (remedy.keyDifference) return remedy.keyDifference;
  
  const fallbacks: Record<string, string> = {
    'lycopodium': 'Intellectual superiority with physical weakness, right-to-left progression (4-8 PM); differentiates from Sulphur (craves cold, hot feet) and Calc-carb (flabby, chilly).',
    'nux-vomica': 'Extreme irritability, over-sensitiveness to all impressions, and constant ineffectual urging to stool; differentiates from Pulsatilla by hot, dry, irritable state.',
    'nat-mur': 'Great weakness and weariness, silent grief, and aggravation from the sun, craves salt; differentiates from Ignatia by chronic weeping aversion.',
    'sepia': 'Yellow saddle across nose, bearing-down sensation, indifferent to loved ones; differentiates from Pulsatilla by extreme chilly indifference and relief by hard exercise.',
    'phosphorus': 'Tall, slender, craves cold drinks which are vomited as soon as warm in stomach; differentiates from Arsenicum by loving cold drinks (Ars loves hot sips).',
    'calc-carb': 'Chilly, flabby, perspiration on head (wets the pillow), craves boiled eggs; differentiates from Silicea by cold damp feet (felt as if damp stockings).',
    'gelsemium': 'Dread of any public appearance, complete motor paralysis, dullness, and clean tongue; differentiates from Ignatia by lacking hysterical spasms.',
    'ignatia': 'Silent grief, sobbing, changeable mood, paradoxical symptoms; differentiates from Nat-mur (chronic grief) by acute hysterical shocks.',
    'rhus-tox': 'Extreme physical restlessness where movement reliefs the stiff joints; exact opposite of Bryonia (which is aggravated by least motion).',
    'apis': 'Stinging, burning pains with puffy swelling, completely thirstless; differentiates from Lachesis (which is highly sensitive to touch, left-sided).',
    'silicea': 'Want of grit, chilly, head/foot offensive sweats, slow healing; differentiates from Calc-carb by fine bony structures instead of flabby fat.',
    'hepar-sulph': 'Hypersensitive to cold air, pain as from a splinter, extremely irritable; differentiates from Silica by sweaty heat and sour smell.',
    'lachesis': 'Left-sided progress, intolerant of tight collars, sleeps into aggravation; differentiates from Apis by high touch-sensitivity.',
    'thuja': 'Fleshy warts, feels as if limbs made of glass, hydrogenoid constitution; differentiates from Nitric Acid by weeping skin symptoms.',
    'sulphur': 'Standing is absolute torture, hot burning soles, craves sweets; differentiates from Lycopodium by loving cold applications.',
    'causticum': 'Gradual progressive paralysis, raw throat better for cold water; differentiates from Phosphorus by cold drinks relieving cough.',
    'kali-carb': 'Stitching pains bag-like swelling of upper eyelids, 3 AM aggravation; differentiates from Arsenicum by lacking extreme restlessness.',
    'graphites': 'Cobweb sensation on face, honey-like skin discharges; differentiates from Mezereum by cold dryness.',
    'calc-phos': 'Delayed bone union, growing pains, craves smoked meats; differentiates from Calc-carb by slender, dark-eyed build.',
    'carbo-veg': 'Desires deep fanning, cold breath, complete collapse; differentiates from Arsenicum by extreme air hunger.',
    'conium': 'Stony hard glands, vertigo on turning head in bed; differentiates from Baryta Carb by glandular induration from bruises.',
    'nat-sulph': 'Damp weather asthma, olive-green stools; differentiates from Thuja by liver and lung focus.',
    'hyoscyamus': 'Foolish, talkative mania, lascivious undressing; differentiates from Stramonium by less terrifying hallucinations.',
    'stramonium': 'Terrified child clings to people, fears dark; differentiates from Belladonna by painlessness.',
    'veratrum-album': 'Cold sweat on forehead, violent vomiting with collapse; differentiates from Camphora by high thirst.',
    'palladium': 'Fatigued by social events, craves admiration; differentiates from Platina (who is haughty and ignores others).',
    'chamomilla': 'One cheek red, one pale, quiet only when carried; differentiates from Cina by lack of worm grinding.',
    'borax': 'Fear of downward motion, aphthae; differs from Gelsemium by high sensitivity to sudden sounds.',
    'ipecac': 'Constant nausea with perfectly clean tongue; differentiates from Ant-tart by lack of rattling chest.',
    'colocynth': 'Cramping pain relieved by hard pressure and bending double; differs from Mag-phos by anger-triggered onset.',
    'mag-phos': 'Spasmodic neuralgias cured by hot towels/heat; differs from Colocynth by being better for warm drinks.',
    'ledum-pal': 'Puncture wounds feel icy cold yet relieved by freezing applications; differs from Hypericum by ascending gout.',
    'hypericum': 'Mechanical injuries or crushed fingers with shooting nerve pains along limbs; differs from Ledum by injury to nerve-rich areas.',
    'ferrum-phos': 'First stage of all inflammations, soft pulse; differs from Aconite by lacking restlessness/fear.',
    'spigelia': 'Left-sided facial neuralgia radiating to left eye, heart clicks; differs from Belladonna by strict left side focus.',
    'chelidonium': 'Pain under lower angle of right shoulder blade; differs from Lycopodium by relief from hot food.',
    'aloes': 'Insecure rectum with jelly-like stool, hemorrhoids like grapes; differs from Podophyllum by piles relieved by cold water.',
    'ant-tart': 'Rattling chest with too weak cough to expectorate; differs from Ipecac by extreme drowsiness and cyanosis.',
    'cantharis': 'Intense burning urinations, drop by drop, blistering burns; differs from Apis by high sexual/urinary excitement.',
    'cocculus': 'Nausea/vertigo from travel or loss of sleep (nursing the sick); differs from Tabacum by being better in warm room.',
    'euphrasia': 'Profuse bland coryza with acrid burning tears; exact opposite of Allium Cepa.',
    'drosera': 'Spasmodic cough in quick rapid successions, holds chest; differs from Ipecac by lack of clean tongue.',
    'phytolacca': 'Pain of throat shoots to ears on swallowing; differs from Mercurius by stony breast hardness.',
    'rumex': 'Violent coughing from least cold air in throat; differs from Phosphorus by being worse at 11 PM.',
    'sanguinaria': 'Right-sided migraine settling in right eye, better for sleep; differs from Spigelia (left-sided).',
  };

  const idKey = remedy.id.toLowerCase();
  if (fallbacks[idKey]) return fallbacks[idKey];
  
  return `${remedy.name} is characterised by ${remedy.keyCharacteristic}. It primarily presents with a ${remedy.tendency.toLowerCase()} profile. Differentiate from similar remedies via its thermal model (${remedy.thermal}) and thirst presentation (${remedy.thirst}).`;
};

type SortKey = 'name' | 'origin' | 'category';

export default function RemedyComparison({ remedies, preSelectedId, preSelectedIds }: RemedyComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    if (preSelectedIds && Array.isArray(preSelectedIds) && preSelectedIds.length > 0) {
      return preSelectedIds;
    }
    return preSelectedId ? [preSelectedId] : [];
  });
  const [isComparing, setIsComparing] = useState(() => {
    return preSelectedIds && Array.isArray(preSelectedIds) && preSelectedIds.length > 1;
  });
  const [usage, setUsage] = useState<any>(null);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);
  
  // New States: Search, Sort, Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadUsage() {
      setUsage({ isPremium: true, totalUsed: 0, limitReached: false });
      setIsLoadingUsage(false);
    }
    loadUsage();
  }, []);

  // Filtered and Sorted Remedies
  const filteredAndSortedRemedies = useMemo(() => {
    let result = remedies.filter(r => 
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.keyCharacteristic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    result.sort((a, b) => {
      const valA = a[sortKey].toLowerCase();
      const valB = b[sortKey].toLowerCase();
      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [remedies, searchQuery, sortKey, sortDirection]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedRemedies.length / itemsPerPage);
  const paginatedRemedies = filteredAndSortedRemedies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 on search or sort
  }, [searchQuery, sortKey]);

  const toggleSelection = (id: string) => {
    if (isComparing) setIsComparing(false); // Reset comparison view when changing selection
    const max = usage?.isPremium ? 100 : (usage?.maxRemedies || 5);
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : prev.length < max ? [...prev, id] : prev
    );
  };

  const startComparison = async () => {
    setIsComparing(true);
    
    // Scroll to table
    setTimeout(() => {
      document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const selectedRemedies = remedies.filter(r => selectedIds.includes(r.id));

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  if (isLoadingUsage) {
    return (
      <div className="p-20 text-center animate-pulse">
        <Scale className="w-12 h-12 text-primary/20 mx-auto mb-4" />
        <div className="h-4 w-48 bg-border rounded mx-auto" />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Selection Grid Container */}
      <div className="bg-bg-secondary p-8 rounded-[3rem] border border-border shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">Remedy <span className="text-primary italic">Comparator</span></h3>
              <p className="text-xs text-text-secondary font-bold uppercase tracking-widest opacity-60">Differential Materia Medica Analysis</p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 md:ml-auto">
            {usage && !usage.isPremium && (
              <div className="px-4 py-2 bg-text-primary/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-text-secondary border border-border backdrop-blur-sm">
                {Math.max(0, 5 - usage.count)} Free Comparisons Left
              </div>
            )}
            <div className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              {selectedIds.length} Selected
            </div>
            {selectedIds.length > 0 && !isComparing && (
              <button 
                onClick={startComparison}
                disabled={!usage?.isPremium && usage?.limitReached && selectedIds.length > 0}
                className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Compare Now <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Toolbar: Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-bg-primary p-4 rounded-2xl border border-border">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Filter by name, origin, or indication..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-bg-secondary border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60 hidden xl:inline">Sort by:</span>
            {(['name', 'origin', 'category'] as SortKey[]).map(key => (
              <button
                key={key}
                onClick={() => toggleSort(key)}
                className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                  sortKey === key 
                  ? 'bg-primary text-white border-primary shadow-sm' 
                  : 'bg-bg-secondary text-text-secondary border-border hover:border-primary/30'
                }`}
              >
                {key}
                {sortKey === key && <ArrowUpDown className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Remedy Selection Grid */}
        {paginatedRemedies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 min-h-[220px]">
            {paginatedRemedies.map(remedy => (
              <button
                key={remedy.id}
                onClick={() => toggleSelection(remedy.id)}
                disabled={(!usage?.isPremium && usage?.limitReached && !selectedIds.includes(remedy.id))}
                className={`p-4 rounded-2xl border transition-all text-left group relative flex flex-col justify-between h-[100px] ${
                  selectedIds.includes(remedy.id)
                  ? 'bg-primary border-primary shadow-xl shadow-primary/20 -translate-y-1'
                  : 'bg-bg-primary border-border hover:border-primary/50 text-text-primary'
                } ${(!usage?.isPremium && usage?.limitReached && !selectedIds.includes(remedy.id)) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedIds.includes(remedy.id) ? 'text-white/60' : 'text-text-secondary opacity-50'}`}>
                    {remedy.category}
                  </div>
                  <div className={`text-sm font-bold truncate ${selectedIds.includes(remedy.id) ? 'text-white' : 'text-text-primary'}`}>
                    {remedy.name}
                  </div>
                </div>
                
                <div className={`text-[9px] font-bold truncate ${selectedIds.includes(remedy.id) ? 'text-white/80' : 'text-text-tertiary opacity-70'}`}>
                  {remedy.origin}
                </div>
                
                {selectedIds.includes(remedy.id) && (
                  <div className="absolute top-2 right-2 bg-white rounded-full p-0.5 shadow-sm">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-bg-primary border border-border border-dashed rounded-3xl">
            <Filter className="w-8 h-8 text-text-tertiary mx-auto mb-4" />
            <p className="text-text-secondary font-bold text-sm">No remedies match your search.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <p className="text-[10px] font-black text-text-secondary uppercase tracking-widest opacity-60">
              Showing {currentPage} of {totalPages} Pages
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-bg-primary border border-border disabled:opacity-30 hover:bg-bg-secondary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1 overflow-x-auto max-w-[150px] sm:max-w-none no-scrollbar">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all flex-shrink-0 ${
                      currentPage === i + 1 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-bg-primary border border-border text-text-secondary hover:bg-bg-secondary'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-bg-primary border border-border disabled:opacity-30 hover:bg-bg-secondary transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comparison Table */}
      <div id="comparison-table">
        <AnimatePresence mode="wait">
          {isComparing && selectedIds.length > 0 ? (
            <motion.div
              key="table-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-8"
            >
              {/* Desktop View (md and up) */}
              <div className="hidden md:block bg-bg-primary border border-border shadow-2xl rounded-[2.5rem] overflow-hidden">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-primary/20">
                  <table className="w-full border-collapse font-sans">
                    <thead>
                      <tr>
                        <th className="p-8 bg-bg-secondary text-left border-r border-b border-border min-w-[200px] sticky left-0 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                          <div className="flex items-center gap-2 text-primary">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">Key Aspects</span>
                          </div>
                        </th>
                        {selectedRemedies.map(remedy => (
                          <th key={remedy.id} className="p-8 border-r border-b border-border last:border-r-0 min-w-[320px] bg-bg-primary sticky top-0 z-10">
                            <div className="flex flex-col items-center">
                              <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <Info className="w-8 h-8" />
                              </div>
                              <h4 className="text-xl font-display font-black text-text-primary uppercase tracking-tight truncate max-w-full px-2 text-center">{remedy.name}</h4>
                              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mt-1 line-clamp-1">{remedy.origin}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        { label: 'Thermal Pattern', key: 'thermal', icon: Thermometer },
                        { label: 'Key Difference', key: 'keyDifference', icon: Scale },
                        { label: 'Differential Modality', key: 'keyCharacteristic', icon: Target },
                        { label: 'Thirsty Habits', key: 'thirst', icon: Droplets },
                      ].map((row, i) => (
                        <tr key={row.key} className={i % 2 === 0 ? 'bg-bg-primary' : 'bg-bg-secondary/30'}>
                          <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px] sticky left-0 z-10 bg-inherit shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-primary/5 rounded-lg">
                                 <row.icon className="w-3.5 h-3.5 text-primary" />
                               </div>
                               {row.label}
                            </div>
                          </td>
                          {selectedRemedies.map(remedy => (
                            <td key={remedy.id} className="p-8 border-r border-border last:border-r-0 font-medium text-text-secondary leading-relaxed break-words">
                              <div className={`p-5 rounded-2xl ${row.key === 'keyDifference' ? 'bg-accent/5 border border-accent/10 whitespace-normal' : ''}`}>
                                {row.key === 'keyDifference' && <span className="block text-[9px] font-black uppercase tracking-widest text-accent mb-2">Differential Verdict:</span>}
                                <div className="text-sm text-text-primary font-serif italic">
                                  {row.key === 'keyDifference' ? getKeyDifference(remedy) : ((remedy as any)[row.key] || 'Data entry in progress...')}
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Expanded Fields */}
                      {[
                        { label: 'Key Patterns', key: 'keyPatterns', icon: Target },
                        { label: 'Related Conditions', key: 'relatedConditions', icon: Activity },
                        { label: 'Clinical Applications', key: 'clinicalApplications', icon: ClipboardList },
                      ].map((row, i) => (
                        <tr key={row.key} className={i % 2 === 1 ? 'bg-bg-primary' : 'bg-bg-secondary/30'}>
                          <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px] sticky left-0 z-10 bg-inherit shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                            <div className="flex items-center gap-3">
                               <div className="p-2 bg-primary/5 rounded-lg">
                                 <row.icon className="w-3.5 h-3.5 text-primary" />
                               </div>
                               {row.label}
                            </div>
                          </td>
                          {selectedRemedies.map(remedy => (
                            <td key={remedy.id} className="p-8 border-r border-border last:border-r-0">
                              <div className="flex flex-wrap gap-2">
                                 {((remedy as any)[row.key] || []).map((item: string, idx: number) => (
                                   <span key={`${remedy.id}-${row.key}-${idx}`} className="px-3 py-1 bg-primary/5 text-primary rounded-lg text-[10px] font-bold border border-primary/10">
                                     {item}
                                   </span>
                                 ))}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}

                      <tr className="bg-bg-primary">
                        <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px] sticky left-0 z-10 bg-bg-primary shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                          <div className="flex items-center gap-3">
                               <div className="p-2 bg-[#166534]/5 rounded-lg">
                                 <Check className="w-3.5 h-3.5 text-[#166534]" />
                               </div>
                               Amelioration (Better)
                             </div>
                        </td>
                        {selectedRemedies.map(remedy => (
                          <td key={remedy.id} className="p-8 border-r border-border last:border-r-0">
                            <div className="flex flex-wrap gap-2">
                              {remedy.betterWith.map((item, idx) => (
                                <span key={`${remedy.id}-better-${idx}`} className="px-3 py-1 bg-[#DCFCE7] text-[#166534] rounded-lg text-xs font-bold border border-[#166534]/10">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-bg-secondary/30">
                        <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px] sticky left-0 z-10 bg-inherit shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                           <div className="flex items-center gap-3">
                               <div className="p-2 bg-[#991B1B]/5 rounded-lg">
                                 <X className="w-3.5 h-3.5 text-[#991B1B]" />
                               </div>
                               Aggravation (Worse)
                             </div>
                        </td>
                        {selectedRemedies.map(remedy => (
                          <td key={remedy.id} className="p-8 border-r border-border last:border-r-0">
                            <div className="flex flex-wrap gap-2">
                              {remedy.worseWith.map((item, idx) => (
                                <span key={`${remedy.id}-worse-${idx}`} className="px-3 py-1 bg-[#FEE2E2] text-[#991B1B] rounded-lg text-xs font-bold border border-[#991B1B]/10">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Pro Section */}
                      <tr className="bg-primary/5">
                        <td className="p-8 border-r border-border sticky left-0 z-10 bg-bg-primary shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-primary">
                              <ClipboardList className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">Clinical Verdict</span>
                            </div>
                            <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">Differential Analysis</span>
                          </div>
                        </td>
                        {selectedRemedies.map(remedy => (
                          <td key={remedy.id} className="p-8 border-r border-border last:border-r-0">
                            <div className="space-y-4">
                              <p className="text-sm font-medium text-text-secondary leading-relaxed italic">
                                {remedy.name} primarily presents with a {remedy.tendency.toLowerCase()} profile. Focus on the {remedy.keyCharacteristic} for definitive identification in complex clinical cases.
                              </p>
                              <div className="bg-bg-primary/50 p-4 rounded-2xl border border-primary/10">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-2">Key Patterns for {remedy.name}:</span>
                                 <ul className="space-y-1">
                                   {(remedy.keyPatterns || []).map((p, i) => (
                                     <li key={i} className="text-[11px] font-bold text-text-primary flex items-center gap-2 font-mono">
                                       <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                                       {p}
                                     </li>
                                   ))}
                                 </ul>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile View (sm / xs) */}
              <div className="md:hidden space-y-6">
                {selectedRemedies.map(remedy => (
                  <div key={remedy.id} className="bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-xl p-6 space-y-6">
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                        <Info className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-display font-black text-text-primary uppercase tracking-tight">{remedy.name}</h4>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.2em]">{remedy.origin}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Characteristics Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-bg-secondary rounded-2xl border border-border">
                          <span className="block text-[8px] font-black uppercase text-text-secondary tracking-widest mb-1">Thermal Pattern</span>
                          <span className="text-xs font-bold text-text-primary">{remedy.thermal}</span>
                        </div>
                        <div className="p-4 bg-bg-secondary rounded-2xl border border-border">
                          <span className="block text-[8px] font-black uppercase text-text-secondary tracking-widest mb-1">Thirst Habit</span>
                          <span className="text-xs font-bold text-text-primary">{remedy.thirst}</span>
                        </div>
                      </div>

                      {/* Modality */}
                      <div className="p-4 bg-bg-secondary rounded-2xl border border-border">
                        <span className="block text-[8px] font-black uppercase text-text-secondary tracking-widest mb-2">Differential Modality</span>
                        <p className="text-xs font-bold text-text-primary leading-relaxed">{remedy.keyCharacteristic}</p>
                      </div>

                      {/* Key Difference */}
                      <div className="p-4 bg-accent/5 border border-accent/10 rounded-2xl">
                        <span className="block text-[8px] font-black uppercase tracking-widest text-accent mb-2">Differential Verdict</span>
                        <p className="text-xs font-bold text-text-primary leading-relaxed font-serif italic">{getKeyDifference(remedy)}</p>
                      </div>

                      {/* Amelioration & Aggravation */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                          <span className="block text-[8px] font-black uppercase text-emerald-600 tracking-widest mb-1">Better With</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {remedy.betterWith.map((item, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-700 rounded text-[9px] font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
                          <span className="block text-[8px] font-black uppercase text-red-600 tracking-widest mb-1">Worse With</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {remedy.worseWith.map((item, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-red-500/10 text-red-700 rounded text-[9px] font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Clinical Applications */}
                      <div className="p-4 bg-bg-secondary rounded-2xl border border-border">
                        <span className="block text-[8px] font-black uppercase text-text-secondary tracking-widest mb-2">Clinical Applications</span>
                        <div className="flex flex-wrap gap-1">
                          {remedy.clinicalApplications.map((item, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded text-[10px] font-bold">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="p-20 text-center bg-bg-secondary rounded-[3rem] border border-dashed border-border border-spacing-4">
               <div className="inline-flex p-6 bg-bg-primary rounded-full mb-6 border border-border shadow-soft hover:scale-110 transition-transform">
                 <Scale className="w-12 h-12 text-primary/20" />
               </div>
               <h4 className="text-xl font-black text-text-primary uppercase tracking-tight">Select <span className="text-primary italic">Remedies</span></h4>
               <p className="text-text-secondary font-medium mt-2 max-w-md mx-auto">
                 Pick remedies from the grid above and click 'Compare Now' to see a detailed side-by-side analysis.
               </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

