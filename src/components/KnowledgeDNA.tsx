import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Cpu, Activity, Award, CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface KnowledgeDNAProps {
  difficulty?: 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4' | 'Postgraduate' | 'General';
  examYieldScore?: number; // 0 to 100
  clinicalAffinityTags?: string[];
  miasmaWeights?: { psora: number; sycosis: number; syphilis: number };
  learningObjectives?: string[];
  clinicalPearls?: string[];
  category?: string;
}

export default function KnowledgeDNA({
  difficulty = 'Year 1',
  examYieldScore = 85,
  clinicalAffinityTags = ['Nervous System', 'Mucous Membranes', 'Vascular Axis'],
  miasmaWeights = { psora: 50, sycosis: 30, syphilis: 20 },
  learningObjectives = [
    'Differentiate raw material origins from biological families',
    'Memorize prime modalities and guiding symptom triggers',
    'Recognize miasmatic weights in chronic clinical models'
  ],
  clinicalPearls = [
    'Always compare thermal states before finalizing prescription.',
    'Restlessness with physical fatigue is highly indicative of Arsenic.'
  ],
  category = 'Materia Medica'
}: KnowledgeDNAProps) {
  return (
    <div className="bg-white dark:bg-gray-950 border border-border rounded-[2.5rem] p-6 md:p-8 shadow-soft relative overflow-hidden group">
      {/* Visual DNA background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 text-primary dark:bg-primary/25 rounded-2xl">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A059] block">
              Curiva Academic Metadata
            </span>
            <h3 className="text-lg font-display font-bold text-text-primary mt-0.5">
              Knowledge DNA Profile
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">Syllabus Grade:</span>
          <span className="px-3 py-1 bg-primary-light dark:bg-primary-light/10 text-primary-dark dark:text-primary rounded-xl text-xs font-bold uppercase tracking-wide border border-primary/10">
            {difficulty} BHMS
          </span>
        </div>
      </div>

      {/* Grid: 3 Analytical blocks */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column (Academic Yield & Affinities) */}
        <div className="md:col-span-4 space-y-5">
          {/* Circular Exam Potential */}
          <div className="p-5 bg-bg-secondary/40 dark:bg-gray-900/20 border border-border/80 rounded-2xl flex items-center gap-4">
            <div className="relative flex items-center justify-center shrink-0">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-border"
                  strokeWidth="4"
                  fill="transparent"
                />
                <motion.circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-primary"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={150}
                  initial={{ strokeDashoffset: 150 }}
                  whileInView={{ strokeDashoffset: 150 - (150 * examYieldScore) / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-primary">
                {examYieldScore}%
              </span>
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-text-tertiary block">
                Exam Yield Potential
              </span>
              <span className="text-xs font-bold text-text-primary block mt-0.5">
                High-Yield Syllabus Item
              </span>
              <span className="text-[10px] text-text-secondary">
                Common in Viva & theory papers
              </span>
            </div>
          </div>

          {/* Clinical Tissue Affinity */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
              Core Tissue Affinity
            </label>
            <div className="flex flex-wrap gap-1.5">
              {clinicalAffinityTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white dark:bg-gray-900 border border-border hover:border-primary/30 rounded-lg text-[10.5px] font-medium text-text-secondary hover:text-text-primary transition-all flex items-center gap-1.5"
                >
                  <Activity className="w-3 h-3 text-primary" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column (Miasmatic profile weights) */}
        <div className="md:col-span-4 p-5 bg-bg-secondary/20 dark:bg-gray-900/10 border border-border rounded-2xl space-y-4">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-text-tertiary block">
              Miasmatic Predisposition
            </span>
            <span className="text-xs font-bold text-text-primary block mt-0.5">
              Hahnemannian Classification
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Psora */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">Psora</span>
                <span className="font-bold">{miasmaWeights.psora}%</span>
              </div>
              <div className="h-1.5 w-full bg-amber-500/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${miasmaWeights.psora}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                />
              </div>
            </div>

            {/* Sycosis */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Sycosis</span>
                <span className="font-bold">{miasmaWeights.sycosis}%</span>
              </div>
              <div className="h-1.5 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${miasmaWeights.sycosis}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full"
                />
              </div>
            </div>

            {/* Syphilis */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono text-[10.5px]">
                <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">Syphilis</span>
                <span className="font-bold">{miasmaWeights.syphilis}%</span>
              </div>
              <div className="h-1.5 w-full bg-indigo-500/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${miasmaWeights.syphilis}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Learning Objectives) */}
        <div className="md:col-span-4 space-y-3">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
            Core Learning Objectives
          </label>
          <ul className="space-y-2.5">
            {learningObjectives.map((obj, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-text-secondary leading-tight"
              >
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Clinical Pearl overlay for the topic */}
      {clinicalPearls.length > 0 && (
        <div className="mt-5 pt-4 border-t border-border/60 flex flex-col sm:flex-row gap-3 items-start">
          <div className="p-1.5 bg-accent/5 dark:bg-accent/15 text-accent rounded-xl h-fit shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 text-left">
            <span className="text-[8.5px] font-black uppercase tracking-wider text-[#C5A059] block">
              Clinical Pearl & Comparison Hint
            </span>
            <p className="text-xs text-text-secondary font-serif italic leading-relaxed mt-0.5">
              “{clinicalPearls[0]}”
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
