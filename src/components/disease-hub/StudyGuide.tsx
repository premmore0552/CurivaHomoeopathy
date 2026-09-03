import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const steps = [
  'Understand the disease',
  'Understand why it occurs',
  'Learn the pathophysiology',
  'Recognize clinical features',
  'Learn investigations',
  'Differentiate similar diseases',
  'Identify complications',
  'Understand conventional management',
  'Learn homoeopathic individualization',
  'Study relevant remedies',
  'Open the complete drug picture',
];

export const StudyGuide: React.FC = () => {
  return (
    <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight italic">
            How to <span className="text-primary italic">Study</span> a Disease
          </h2>
          <p className="text-sm font-bold text-zinc-400 leading-relaxed max-w-md">
            Follow this rigorous 11-step methodology to master any medical condition from both academic and homoeopathic perspectives.
          </p>
        </div>
        <div className="grid gap-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-[10px] font-black text-primary font-mono bg-primary/10 w-6 h-6 flex items-center justify-center rounded border border-primary/20 shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-xs font-bold text-zinc-200 tracking-wide">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
