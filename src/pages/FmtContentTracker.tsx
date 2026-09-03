import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, CheckCircle2, Clock, ShieldAlert, 
  BarChart3, FileText, Zap, HelpCircle, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { FMT_DETAILED_CHAPTERS } from '../data/fmtDetailedChapters';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FmtContentTracker() {
  // Group chapters by module
  const modulesMap = FMT_DETAILED_CHAPTERS.reduce((acc, ch) => {
    const mod = ch.module || 'Uncategorized';
    if (!acc[mod]) acc[mod] = [];
    acc[mod].push(ch);
    return acc;
  }, {} as Record<string, typeof FMT_DETAILED_CHAPTERS>);

  const stats = {
    total: FMT_DETAILED_CHAPTERS.length,
    published: FMT_DETAILED_CHAPTERS.filter(ch => ch.contentStatus === 'Published').length,
    draft: FMT_DETAILED_CHAPTERS.filter(ch => ch.contentStatus === 'Draft').length,
    comingSoon: FMT_DETAILED_CHAPTERS.filter(ch => ch.isComingSoon).length
  };

  const completionPercent = Math.round((stats.published / stats.total) * 100);

  return (
    <div className="min-h-screen bg-bg-primary pb-20">
      <SEO 
        title="Content Production Tracker | FMTMedEasy"
        description="Monitor the progress of our FMT educational content production pipeline."
      />

      <div className="max-w-5xl mx-auto px-4 pt-10 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-6">
          <Breadcrumbs />
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Link 
                to="/fmt" 
                className="inline-flex items-center gap-2 text-xs font-black text-text-tertiary hover:text-primary transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                BACK TO HUB
              </Link>
              <h1 className="text-3xl md:text-5xl font-display font-black text-text-primary tracking-tight">
                Content Pipeline
              </h1>
              <p className="text-lg text-text-secondary font-medium">
                Real-time tracker for FMT educational modules.
              </p>
            </div>
          </div>
        </div>

        {/* Global Progress */}
        <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[2.5rem] p-8 shadow-soft flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-32 h-32 flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-bg-secondary"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 56}
                strokeDashoffset={2 * Math.PI * 56 * (1 - completionPercent / 100)}
                strokeLinecap="round"
                className="text-primary transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-text-primary">{completionPercent}%</span>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="space-y-1">
              <div className="text-2xl font-black text-text-primary">{stats.total}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Total Topics</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-emerald-500">{stats.published}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Published</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-amber-500">{stats.draft}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">In Progress</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-black text-text-tertiary">{stats.comingSoon}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Pending</div>
            </div>
          </div>
        </div>

        {/* Module Breakdown */}
        <div className="space-y-8">
          {Object.entries(modulesMap).map(([moduleName, chapters]) => (
            <div key={moduleName} className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-text-tertiary">
                  {moduleName}
                </h2>
                <span className="text-[10px] font-bold text-text-tertiary">
                  {chapters.filter(c => c.contentStatus === 'Published').length} / {chapters.length} Ready
                </span>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-border/60 rounded-[2rem] overflow-hidden shadow-soft">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-bg-secondary/50 border-b border-border/60">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary">Topic</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-center">Notes</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-center">Rev</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-center">Viva</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-center">MCQ</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-text-tertiary text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chapters.map((ch) => {
                        const isPublished = ch.contentStatus === 'Published';
                        const hasViva = (ch.vivaQuestions?.length ?? 0) > 0;
                        const hasMcq = (ch.mcqs?.length ?? 0) > 0;
                        const hasRev = (ch.revisionSheet?.length ?? 0) > 0;

                        return (
                          <tr key={ch.id} className="border-b border-border/40 last:border-0 hover:bg-bg-secondary/20 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-bold text-sm text-text-primary">{ch.title}</div>
                              <div className="text-[10px] text-text-tertiary">Ch.{ch.chapterNumber}</div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              {isPublished ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <Clock className="w-4 h-4 text-text-tertiary mx-auto" />}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {hasRev ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <Clock className="w-4 h-4 text-text-tertiary mx-auto" />}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {hasViva ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <Clock className="w-4 h-4 text-text-tertiary mx-auto" />}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {hasMcq ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" /> : <Clock className="w-4 h-4 text-text-tertiary mx-auto" />}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-block px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-tighter ${
                                isPublished 
                                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                                  : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                              }`}>
                                {ch.contentStatus || 'Draft'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
