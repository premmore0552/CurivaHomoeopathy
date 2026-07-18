import React from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Scale, Sparkles, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import RemedyComparison from '../components/RemedyComparison';
import { comparisonRemedies } from '../data/comparisonData';

export default function ComparisonTool() {
  const location = useLocation();
  const preSelectedId = location.state?.preSelectedId;
  const preSelectedIds = location.state?.preSelectedIds;

  // Deduplicate remedies by lowercase name to ensure clean comparisons with no duplicate rows
  const uniqueComparisonRemedies = React.useMemo(() => {
    const seen = new Set<string>();
    return comparisonRemedies.filter(r => {
      const nameKey = r.name.toLowerCase().trim();
      if (seen.has(nameKey)) return false;
      seen.add(nameKey);
      return true;
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Remedy Comparison Tool | Curiva Homoeopathy"
        description="Side-by-side differential analysis of homeopathic remedies for practitioners and students."
      />

      <header className="relative pt-32 pb-48 overflow-hidden bg-bg-secondary border-b border-border text-text-primary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.05)_0%,transparent_70%)] opacity-40 pointer-events-none" />
        <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none animate-pulse">
           <Scale className="w-96 h-96 text-primary" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-3 px-6 py-2.5 bg-primary/10 border border-primary/20 rounded-full shadow-sm mb-10"
           >
             <Sparkles className="w-4 h-4 text-primary" />
             <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Clinical Intelligence</span>
           </motion.div>
           <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-display font-medium text-text-primary tracking-tighter leading-[0.8] uppercase flex flex-col">
             <span>Differential</span>
             <span className="text-primary italic lg:ml-24">Analysis</span>
           </h1>
           <p className="text-xl md:text-2xl text-text-secondary max-w-2xl font-serif italic leading-tight mt-12">
             Compare modalities, thermal patterns, and keynotes side-by-side to refine your therapeutic accuracy.
           </p>
         </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <RemedyComparison remedies={uniqueComparisonRemedies} preSelectedId={preSelectedId} preSelectedIds={preSelectedIds} />

        <div className="mt-20 grid md:grid-cols-2 gap-8">
           <div className="p-10 bg-white rounded-[3rem] border border-border shadow-soft">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-medium text-text-primary italic mb-4">Study Strategy</h3>
              <p className="text-text-secondary leading-relaxed font-serif italic text-lg">
                When comparing remedies, focus on the "Striking, Singular, Uncommon, and Peculiar" (S.S.U.P) symptoms as defined by Samuel Hahnemann in the Organon of Medicine.
              </p>
           </div>
           <div className="p-10 bg-primary-light/50 border border-primary/20 rounded-[3rem] text-text-primary shadow-soft relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.1)_0%,transparent_50%)]" />
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 relative z-10">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-medium mb-4 relative z-10 tracking-tight italic">Clinical Correlation</h3>
              <p className="text-text-secondary leading-relaxed font-serif italic text-lg relative z-10">
                Differential diagnosis is the cornerstone of effective homeopathic prescribing. Use this tool to refine your understanding of "remedy families" and "complementary relationships".
              </p>
           </div>
        </div>
      </main>
    </div>
  );
}
