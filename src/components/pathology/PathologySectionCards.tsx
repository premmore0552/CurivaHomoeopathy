import React from 'react';
import { Microscope, HeartPulse, ArrowRight, CheckCircle2, BookOpen, Layers } from 'lucide-react';
import { PathologyChapter } from '../../types/pathology';

interface PathologySectionCardsProps {
  generalChapters: PathologyChapter[];
  systemicChapters: PathologyChapter[];
  onOpenGeneral: () => void;
  onOpenSystemic: () => void;
  onSelectChapter: (chapter: PathologyChapter) => void;
}

export const PathologySectionCards: React.FC<PathologySectionCardsProps> = ({
  generalChapters,
  systemicChapters,
  onOpenGeneral,
  onOpenSystemic,
  onSelectChapter,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* General Pathology Card */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 rounded-2xl">
                <Microscope className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                  Core Theory Module
                </span>
                <h3 className="text-xl font-serif font-bold text-text-primary">
                  General Pathology
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 text-xs font-bold rounded-full">
              {generalChapters.length} Chapters
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Fundamental pathological processes including cell injury, inflammation, repair, neoplasia, immunopathology and haemodynamic disorders.
          </p>

          {/* Chapters Checklist */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
              Included Chapters & Topics:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {generalChapters.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => onSelectChapter(chap)}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-bg-primary border border-border/70 text-left hover:border-red-500/40 hover:bg-bg-secondary transition-all group cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 block leading-tight line-clamp-1">
                      {chap.title}
                    </span>
                    <span className="text-[10px] text-text-tertiary">
                      {chap.topics.length} Topics • NCH Mapped
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-text-tertiary">
            Full syllabus notes, flowcharts & LAQ/SAQ
          </span>
          <button
            onClick={onOpenGeneral}
            className="inline-flex items-center gap-2 text-white bg-red-800 hover:bg-red-900 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Explore General Pathology <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Systemic Pathology Card */}
      <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 rounded-2xl">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">
                  Organ-System Module
                </span>
                <h3 className="text-xl font-serif font-bold text-text-primary">
                  Systemic Pathology
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold rounded-full">
              {systemicChapters.length} Systems
            </span>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Organ-system based pathology arranged according to the applicable 2nd BHMS curriculum.
          </p>

          {/* System Chapters Checklist */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] font-bold text-text-tertiary uppercase tracking-wider">
              Included Organ Systems:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {systemicChapters.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => onSelectChapter(chap)}
                  className="flex items-start gap-2 p-2.5 rounded-xl bg-bg-primary border border-border/70 text-left hover:border-rose-500/40 hover:bg-bg-secondary transition-all group cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="text-xs font-semibold text-text-primary group-hover:text-rose-700 dark:group-hover:text-rose-400 block leading-tight line-clamp-1">
                      {chap.title}
                    </span>
                    <span className="text-[10px] text-text-tertiary">
                      {chap.topics.length} Topics • Clinical Notes
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs text-text-tertiary">
            Organ changes, gross & microscopy
          </span>
          <button
            onClick={onOpenSystemic}
            className="inline-flex items-center gap-2 text-white bg-rose-800 hover:bg-rose-900 px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
          >
            Explore Systemic Pathology <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
