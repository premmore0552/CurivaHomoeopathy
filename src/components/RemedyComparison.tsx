import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Scale, Info, Sparkles, AlertCircle, Lock, ArrowRight, Crown, Search, ArrowUpDown, ChevronLeft, ChevronRight, Filter, Thermometer, Droplets, Target, Activity, ClipboardList } from 'lucide-react';
import { getComparisonUsage, incrementComparisonCount, UsageStatus } from '../services/UsageService';
import Paywall from './Paywall';
import { ComparisonData } from '../data/comparisonData';

interface RemedyComparisonProps {
  remedies: ComparisonData[];
}

type SortKey = 'name' | 'origin' | 'category';

export default function RemedyComparison({ remedies }: RemedyComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isComparing, setIsComparing] = useState(false);
  const [usage, setUsage] = useState<UsageStatus | null>(null);
  const [isLoadingUsage, setIsLoadingUsage] = useState(true);
  
  // New States: Search, Sort, Pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    async function loadUsage() {
      const status = await getComparisonUsage();
      setUsage(status);
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
    const max = usage?.maxRemedies || 5;
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : prev.length < max ? [...prev, id] : prev
    );
  };

  const startComparison = async () => {
    if (usage?.limitReached) return;
    
    setIsComparing(true);
    const newUsage = await incrementComparisonCount();
    setUsage(newUsage);
    
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
            <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border ${usage?.isPremium ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-primary/10 text-primary border-primary/20'}`}>
              {selectedIds.length} / {usage?.maxRemedies || 5} Selected
            </div>
            {selectedIds.length > 0 && !isComparing && !usage?.limitReached && (
              <button 
                onClick={startComparison}
                className="px-6 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
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
                  ? 'bg-primary text-white border-primary border-primary shadow-sm' 
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
                disabled={usage?.limitReached && !selectedIds.includes(remedy.id)}
                className={`p-4 rounded-2xl border transition-all text-left group relative flex flex-col justify-between h-[100px] ${
                  selectedIds.includes(remedy.id)
                  ? 'bg-primary border-primary shadow-xl shadow-primary/20 -translate-y-1'
                  : 'bg-bg-primary border-border hover:border-primary/50 text-text-primary'
                } ${usage?.limitReached && !selectedIds.includes(remedy.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              <div className="flex gap-1">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-[10px] font-black transition-all ${
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

      {/* Comparison Table / Paywall */}
      <div id="comparison-table">
        <AnimatePresence mode="wait">
          {usage?.limitReached ? (
            <motion.div
              key="paywall"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <Paywall />
            </motion.div>
          ) : isComparing && selectedIds.length > 0 ? (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="overflow-x-auto rounded-[2.5rem] border border-border shadow-2xl bg-bg-primary"
            >
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="p-8 bg-bg-secondary text-left border-r border-border min-w-[200px] sticky left-0 z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                      <div className="flex items-center gap-2 text-primary">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-xs font-black uppercase tracking-[0.2em]">Key Aspects</span>
                      </div>
                    </th>
                    {selectedRemedies.map(remedy => (
                      <th key={remedy.id} className="p-8 border-r border-border last:border-r-0 min-w-[280px]">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                            <Info className="w-8 h-8" />
                          </div>
                          <h4 className="text-xl font-display font-black text-text-primary uppercase tracking-tight truncate max-w-full px-2 text-center">{remedy.name}</h4>
                          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mt-1 line-clamp-1">{remedy.origin}</span>
                          <span className="mt-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest border border-primary/10">{remedy.category}</span>
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
                        <td key={remedy.id} className="p-8 border-r border-border last:border-r-0 font-medium text-text-secondary leading-relaxed">
                          {(remedy as any)[row.key]}
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
                            <span key={`${remedy.id}-better-${idx}`} className="px-3 py-1 bg-[#DCFCE7] text-[#166534] dark:bg-[#14532D] dark:text-[#DCFCE7] rounded-lg text-xs font-bold border border-[#166534]/10">
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
                            <span key={`${remedy.id}-worse-${idx}`} className="px-3 py-1 bg-[#FEE2E2] text-[#991B1B] dark:bg-[#7F1D1D] dark:text-[#FEE2E2] rounded-lg text-xs font-bold border border-[#991B1B]/10">
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
                          <Crown className="w-4 h-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Pro Verdict</span>
                        </div>
                        <span className="text-[11px] font-black text-text-primary uppercase tracking-widest">Differential Analysis</span>
                      </div>
                    </td>
                    {selectedRemedies.map(remedy => (
                      <td key={remedy.id} className="p-8 border-r border-border last:border-r-0">
                        {usage?.isPremium ? (
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-text-secondary leading-relaxed italic">
                              {remedy.name} primarily presents with a {remedy.tendency.toLowerCase()} profile. Focus on the {remedy.keyCharacteristic} for definitive identification in complex clinical cases.
                            </p>
                            <div className="bg-bg-primary/50 p-4 rounded-2xl border border-primary/10">
                               <span className="text-[9px] font-black uppercase tracking-widest text-primary block mb-2">Key Patterns for {remedy.name}:</span>
                               <ul className="space-y-1">
                                 {(remedy.keyPatterns || []).map((p, i) => (
                                   <li key={i} className="text-[11px] font-bold text-text-primary flex items-center gap-2">
                                     <span className="w-1 h-1 bg-primary rounded-full" />
                                     {p}
                                   </li>
                                 ))}
                               </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-4 py-4 blur-[2px] select-none pointer-events-none opacity-50">
                             <Lock className="w-6 h-6 text-text-tertiary" />
                             <p className="text-[10px] font-black uppercase tracking-widest text-center">Unlocks with Pro Plan</p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </motion.div>
          ) : (
            <div className="p-20 text-center bg-bg-secondary rounded-[3rem] border border-dashed border-border border-spacing-4">
               <div className="inline-flex p-6 bg-bg-primary rounded-full mb-6 border border-border shadow-soft hover:scale-110 transition-transform">
                 <Scale className="w-12 h-12 text-primary/20" />
               </div>
               <h4 className="text-xl font-black text-text-primary uppercase tracking-tight">Select <span className="text-primary italic">Remedies</span></h4>
               <p className="text-text-secondary font-medium mt-2 max-w-md mx-auto">
                 {usage?.limitReached 
                   ? "You have reached your free comparison limit." 
                   : `Pick up to ${usage?.maxRemedies || 5} remedies from the grid above and click 'Compare Now' to see a detailed analysis.`
                 }
               </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

