import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Layers, Scale, Info, CheckCircle2 } from 'lucide-react';
import { FMT_COMPARISONS } from '../data/fmtComparisons';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FmtComparisonDetail() {
  const { comparisonSlug } = useParams<{ comparisonSlug: string }>();
  const comparison = FMT_COMPARISONS.find(c => c.slug === comparisonSlug);

  if (!comparison) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-text-primary">Comparison Not Found</h2>
          <Link to="/fmt/compare" className="text-primary font-bold flex items-center gap-2 justify-center">
            <ArrowLeft className="w-4 h-4" />
            Back to Comparison Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title={`${comparison.title} | FMT Comparison Hub | Curiva Homoeopathy`}
        description={comparison.summary}
      />

      <div className="max-w-7xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-6">
          <Breadcrumbs />
          <div className="space-y-4">
            <Link 
              to="/fmt/compare" 
              className="inline-flex items-center gap-2 text-xs font-bold text-text-tertiary hover:text-primary transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              BACK TO COMPARISON HUB
            </Link>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary">
                <Layers className="w-3 h-3" />
                {comparison.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
                {comparison.title}
              </h1>
              <p className="text-lg text-text-secondary max-w-3xl font-medium leading-relaxed">
                {comparison.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl overflow-hidden shadow-soft"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-bg-secondary border-b border-border/60">
                  {comparison.headers.map((header, idx) => (
                    <th key={idx} className={`px-6 py-4 text-left font-black uppercase tracking-widest text-text-tertiary ${idx === 0 ? 'w-1/4' : 'text-primary'}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {comparison.rows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-primary/5 transition-colors group">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-6 py-4 ${cIdx === 0 ? 'font-bold text-text-primary bg-bg-secondary/20' : 'text-text-secondary font-medium'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Medicolegal Significance */}
        {comparison.medicolegalSignificance && (
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-xl">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-display font-bold text-text-primary">Medicolegal Significance</h2>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              {comparison.medicolegalSignificance}
            </p>
          </div>
        )}

        {/* Clinical Pearls / Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <h3 className="font-bold">Clinical Differentiation</h3>
            </div>
            <p className="text-xs text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
              In actual practice, these features may overlap. Always look for a combination of findings rather than relying on a single indicator.
            </p>
          </div>
          <div className="p-6 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Info className="w-5 h-5" />
              <h3 className="font-bold">Exam High-Yield Point</h3>
            </div>
            <p className="text-xs text-blue-900/80 dark:text-blue-300/80 leading-relaxed">
              This comparison is a favorite 5-mark short note question. Focus on the mechanism and timeline for maximum marks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
