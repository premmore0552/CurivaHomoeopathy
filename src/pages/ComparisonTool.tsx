import React from 'react';
import { motion } from 'motion/react';
import { Scale, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import RemedyComparison from '../components/RemedyComparison';
import { comparisonRemedies } from '../data/comparisonData';

export default function ComparisonTool() {
  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Remedy Comparison Tool | Curiva Homoeopathy"
        description="Side-by-side differential analysis of homeopathic remedies for practitioners and students."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-text-primary text-white">
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 to-transparent opacity-50 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Scale className="w-96 h-96 text-white" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-full shadow-2xl mb-10"
           >
             <Sparkles className="w-4 h-4 text-primary-light" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-light">Clinical Intelligence</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-black text-white tracking-tighter leading-[0.8] uppercase flex flex-col">
             <span>Differential</span>
             <span className="text-primary italic lg:ml-24">Analysis</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-medium leading-tight mt-12">
             Compare modalities, thermal patterns, and keynotes side-by-side.
           </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <RemedyComparison remedies={comparisonRemedies} />

        <div className="mt-20 grid md:grid-cols-2 gap-8">
           <div className="p-10 bg-bg-secondary rounded-[3rem] border border-border">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold text-text-primary mb-4">Study Strategy</h3>
              <p className="text-text-secondary leading-relaxed font-medium">
                When comparing remedies, focus on the "Striking, Singular, Uncommon, and Peculiar" (S.S.U.P) symptoms as defined by Samuel Hahnemann in the Organon of Medicine.
              </p>
           </div>
           <div className="p-10 bg-primary rounded-[3rem] text-white shadow-2xl shadow-primary/20">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4">Clinical Correlation</h3>
              <p className="text-white/80 leading-relaxed font-medium">
                Differential diagnosis is the cornerstone of effective homeopathic prescribing. Use this tool to refine your understanding of "remedy families" and "complementary relationships".
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
