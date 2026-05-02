import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Scale, Info, Sparkles, AlertCircle } from 'lucide-react';

interface ComparisonData {
  id: string;
  name: string;
  origin: string;
  tendency: string;
  keyCharacteristic: string;
  betterWith: string[];
  worseWith: string[];
  thermal: 'Chilly' | 'Hot' | 'Ambi-thermal';
  thirst: string;
}

interface RemedyComparisonProps {
  remedies: ComparisonData[];
}

export default function RemedyComparison({ remedies }: RemedyComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const selectedRemedies = remedies.filter(r => selectedIds.includes(r.id));

  return (
    <div className="space-y-12">
      {/* Selection Grid */}
      <div className="bg-bg-secondary p-8 rounded-[3rem] border border-border shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black text-text-primary uppercase tracking-tight italic">Remedy <span className="text-primary italic">Comparator</span></h3>
            <p className="text-xs text-text-secondary font-bold uppercase tracking-widest opacity-60">Differential Materia Medica Analysis</p>
          </div>
          <div className="ml-auto px-4 py-2 bg-primary/10 text-primary rounded-xl text-xs font-black uppercase tracking-widest border border-primary/20">
            {selectedIds.length} / 3 Selected
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {remedies.map(remedy => (
            <button
              key={remedy.id}
              onClick={() => toggleSelection(remedy.id)}
              className={`p-4 rounded-2xl border transition-all text-left group relative ${
                selectedIds.includes(remedy.id)
                ? 'bg-primary border-primary shadow-xl shadow-primary/20 -translate-y-1'
                : 'bg-bg-primary border-border hover:border-primary/50 text-text-primary'
              }`}
            >
              <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${selectedIds.includes(remedy.id) ? 'text-white/60' : 'text-text-secondary opacity-50'}`}>
                {remedy.id.substring(0, 3)}
              </div>
              <div className={`text-sm font-bold truncate ${selectedIds.includes(remedy.id) ? 'text-white' : 'text-text-primary'}`}>
                {remedy.name}
              </div>
              
              {selectedIds.includes(remedy.id) && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <AnimatePresence mode="wait">
        {selectedIds.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="overflow-x-auto rounded-[2.5rem] border border-border shadow-2xl bg-bg-primary"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-8 bg-bg-secondary text-left border-r border-border min-w-[200px]">
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
                        <h4 className="text-xl font-display font-black text-text-primary uppercase tracking-tight">{remedy.name}</h4>
                        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.3em] mt-1">{remedy.origin}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { label: 'Thermal Pattern', key: 'thermal', icon: AlertCircle },
                  { label: 'Primary Modality', key: 'keyCharacteristic', icon: Scale },
                  { label: 'Thirst', key: 'thirst', icon: Info },
                ].map((row, i) => (
                  <tr key={row.key} className={i % 2 === 0 ? 'bg-bg-primary' : 'bg-bg-secondary/30'}>
                    <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px]">
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
                <tr className="bg-bg-primary">
                  <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px]">
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
                  <td className="p-8 border-r border-border font-black text-text-primary uppercase tracking-widest text-[11px]">
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
              </tbody>
            </table>
          </motion.div>
        ) : (
          <div className="p-20 text-center bg-bg-secondary rounded-[3rem] border border-dashed border-border border-spacing-4">
             <div className="inline-flex p-6 bg-bg-primary rounded-full mb-6 border border-border shadow-soft">
               <Scale className="w-12 h-12 text-primary/20" />
             </div>
             <h4 className="text-xl font-black text-text-primary uppercase tracking-tight">Select <span className="text-primary italic">Remedies</span></h4>
             <p className="text-text-secondary font-medium mt-2">Pick up to three remedies from the grid above to see a detailed comparative analysis.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
