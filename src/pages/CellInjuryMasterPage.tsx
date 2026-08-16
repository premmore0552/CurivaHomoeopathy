import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Layers, ShieldCheck, Microscope, Award } from 'lucide-react';
import SEO from '../components/SEO';
import { CellInjuryChapterView } from '../components/pathology/CellInjuryChapterView';

export default function CellInjuryMasterPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      <SEO
        title="Cell Injury, Adaptations & Cell Death — NCH 2nd BHMS Pathology Master Chapter | Curiva Homoeopathy"
        description="Comprehensive 2nd BHMS Pathology Chapter on Cell Injury, Adaptations, Necrosis, Apoptosis, Calcification, and Intracellular Accumulations with 15 flowcharts, comparison tables, case studies, and exam question blueprints."
      />

      {/* Top Breadcrumb / Return to Pathology Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-border">
        <Link
          to="/subject/pathology"
          className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400 hover:underline bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800/80 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          ← Back to 2nd BHMS Pathology Hub
        </Link>

        <div className="flex items-center gap-2 text-xs font-medium text-text-secondary">
          <span className="hidden sm:inline">Paper I Section A • General Pathology</span>
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            NCH HomUG-PM I.2, I.3, I.4, I.5
          </span>
        </div>
      </div>

      {/* Master Chapter Interactive Component */}
      <CellInjuryChapterView />
    </div>
  );
}
