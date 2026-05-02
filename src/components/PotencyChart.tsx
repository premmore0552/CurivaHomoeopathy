import React from 'react';
import { Info, AlertCircle, Sparkles, ChevronRight } from 'lucide-react';

const POTENCIES = [
  { scale: 'Decimal (x)', description: 'Low concentration, for local symptoms.', common: '6x, 12x, 30x', focus: 'Physical/Structural' },
  { scale: 'Centesimal (c)', description: 'Standard potency, versatile usage.', common: '6c, 30c, 200c', focus: 'General/Functional' },
  { scale: 'LM Potencies', description: 'Gentle, frequent dosing for chronic deep-acting conditions.', common: 'LM1 to LM30', focus: 'Miasmatic/Chronic' },
  { scale: 'High Potency', description: 'Deep acting, emotional and constitutional layers.', common: '1M, 10M, CM', focus: 'Mental/Emotional' },
];

export default function PotencyChart() {
  return (
    <div className="bg-bg-secondary p-8 md:p-12 rounded-[3.5rem] border border-border shadow-soft relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
        <Sparkles className="w-64 h-64" />
      </div>
      
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="max-w-xl">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-4">
               <Info className="w-3 h-3" /> Educational Framework
             </div>
             <h3 className="text-3xl md:text-4xl font-display font-black text-text-primary leading-tight tracking-tight uppercase italic mb-4">
               Potency <span className="text-primary">Reference</span> Guide
             </h3>
             <p className="text-text-secondary text-lg font-medium leading-relaxed">
               A structured overview of homeopathic scales used in clinical practice and pharmaceutical preparation.
             </p>
          </div>
          <div className="flex items-center gap-4 p-6 bg-bg-primary/50 backdrop-blur-xl border border-border rounded-3xl shrink-0">
             <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
               <AlertCircle className="w-6 h-6" />
             </div>
             <div>
                <span className="text-xs font-black uppercase tracking-widest text-text-primary block">Clinical Safety</span>
                <span className="text-[10px] font-medium text-text-secondary uppercase">Consult a practitioner</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {POTENCIES.map((p, idx) => (
            <div 
              key={idx} 
              className="p-8 bg-bg-primary border border-border rounded-[2.5rem] hover:border-primary transition-all duration-500 hover:shadow-xl group/card relative"
            >
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 block border-b border-primary/10 pb-4">
                Scale {idx + 1}
              </div>
              <h4 className="text-xl font-display font-black text-text-primary mb-3 uppercase tracking-tight group-hover/card:text-primary transition-colors italic">
                {p.scale}
              </h4>
              <p className="text-sm text-text-secondary leading-relaxed font-medium mb-8">
                {p.description}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="px-4 py-3 bg-bg-secondary rounded-2xl border border-border/50">
                   <div className="text-[9px] font-black uppercase tracking-widest text-text-primary/40 mb-1">Common Examples</div>
                   <div className="text-sm font-bold text-text-primary">{p.common}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6 border-t border-border mt-auto">
                 <div className="w-2 h-2 rounded-full bg-primary" />
                 <span className="text-xs font-black uppercase tracking-widest text-text-primary italic">{p.focus}</span>
              </div>

              <ChevronRight className="absolute bottom-8 right-8 w-4 h-4 text-primary opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1 transition-all" />
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-primary/5 rounded-3xl border border-primary/10 text-center">
           <p className="text-[11px] font-bold text-primary uppercase tracking-widest leading-loose max-w-2xl mx-auto">
             Note: Selection of potency requires individualization based on the "susceptibility", "nature of symptoms", and "history of the case" as per Arndt-Schulz Law.
           </p>
        </div>
      </div>
    </div>
  );
}
