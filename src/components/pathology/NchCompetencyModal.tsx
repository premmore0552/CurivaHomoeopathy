import React from 'react';
import { 
  X, 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Target, 
  Layers, 
  Award, 
  Link as LinkIcon, 
  FileText,
  Activity,
  Microscope,
  Info
} from 'lucide-react';
import { NchCompetency } from '../../types/pathology';

interface NchCompetencyModalProps {
  competency: NchCompetency | null;
  onClose: () => void;
}

export const NchCompetencyModal: React.FC<NchCompetencyModalProps> = ({
  competency,
  onClose
}) => {
  if (!competency) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div 
        className="bg-bg-primary border border-border rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative text-text-primary my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-bg-secondary hover:bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="space-y-3 pr-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-red-800 text-white font-mono text-xs font-bold rounded-lg tracking-wider">
              {competency.code}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
              competency.official 
                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' 
                : 'bg-purple-100 text-purple-800 border border-purple-300'
            }`}>
              {competency.official ? 'NCH CURRICULUM' : 'SUPPLEMENTARY'}
            </span>
            <span className="px-2.5 py-0.5 bg-bg-secondary border border-border text-text-secondary text-[11px] font-semibold rounded-md">
              {competency.section.toUpperCase()} PATHOLOGY
            </span>
            <span className="px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 text-[11px] font-bold rounded-md">
              {competency.priority}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-text-primary leading-snug">
            {competency.domainName}
          </h3>
        </div>

        {/* Official Competency Statement */}
        <div className="bg-bg-secondary border border-border/80 rounded-2xl p-5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-red-800 dark:text-red-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            Official Competency Statement
          </div>
          <p className="text-sm sm:text-base text-text-primary leading-relaxed">
            {competency.competencyStatement}
          </p>
        </div>

        {/* Specific Learning Objectives (SLOs) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wider">
            <Target className="w-4 h-4 text-red-700 dark:text-red-400" />
            Specific Learning Objectives (SLOs)
          </div>
          <div className="bg-bg-secondary/60 border border-border rounded-2xl p-4 space-y-2.5">
            {competency.sloList.map((slo, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-primary">
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed">{slo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Curriculum Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Miller's & Bloom's Level */}
          <div className="bg-bg-secondary border border-border rounded-xl p-4 space-y-1.5">
            <div className="text-[11px] font-bold text-text-tertiary uppercase">Miller's Level</div>
            <div className="text-sm font-bold text-text-primary">
              {competency.millerLevel === 'K' && 'Knows (K)'}
              {competency.millerLevel === 'KH' && 'Knows How (KH)'}
              {competency.millerLevel === 'SH' && 'Shows How (SH)'}
              {competency.millerLevel === 'P' && 'Performs (P)'}
            </div>
            <div className="text-[11px] text-text-secondary">
              Bloom: {competency.bloomDomain} ({competency.bloomLevel})
            </div>
          </div>

          {/* Assessment Methods */}
          <div className="bg-bg-secondary border border-border rounded-xl p-4 space-y-1.5">
            <div className="text-[11px] font-bold text-text-tertiary uppercase">Assessment Types</div>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {competency.assessmentMethods.map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300 text-[11px] font-bold rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>

          {/* Teaching Methods */}
          <div className="bg-bg-secondary border border-border rounded-xl p-4 space-y-1.5 sm:col-span-2 lg:col-span-1">
            <div className="text-[11px] font-bold text-text-tertiary uppercase">Teaching Methods</div>
            <div className="flex flex-wrap gap-1 pt-0.5">
              {competency.teachingMethods.map((m, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-bg-primary border border-border text-text-secondary text-[11px] font-medium rounded">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Integrations (Horizontal & Vertical) */}
        {(competency.integration.horizontal?.length || competency.integration.vertical?.length) && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-text-primary uppercase tracking-wider">
              <LinkIcon className="w-4 h-4 text-red-700 dark:text-red-400" />
              Syllabus Integration
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {competency.integration.horizontal && (
                <div className="bg-bg-secondary border border-border rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-text-secondary uppercase">Horizontal Integration:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {competency.integration.horizontal.map((subj, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-bg-primary text-text-primary text-xs font-medium rounded-lg border border-border">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {competency.integration.vertical && (
                <div className="bg-bg-secondary border border-border rounded-xl p-3.5 space-y-1">
                  <span className="text-[11px] font-bold text-text-secondary uppercase">Vertical Integration:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {competency.integration.vertical.map((subj, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-bg-primary text-text-primary text-xs font-medium rounded-lg border border-border">
                        {subj}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Practical Relevance */}
        {competency.practicalRelevance && (
          <div className="bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl p-4 space-y-1 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="font-bold flex items-center gap-1.5">
              <Microscope className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              Practical & Clinical Relevance
            </div>
            <p className="leading-relaxed">{competency.practicalRelevance}</p>
          </div>
        )}

        {/* Source Traceability & Content Status Banner */}
        <div className="bg-bg-secondary/80 border border-border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-tertiary">
          <div className="space-y-0.5">
            <div>
              <span className="font-bold text-text-secondary">Source Document:</span> {competency.source.sourceDocument}
            </div>
            <div>
              <span className="font-bold text-text-secondary">Authority:</span> {competency.source.sourceType} ({competency.source.paper})
            </div>
          </div>
          <div className="px-3 py-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 font-semibold rounded-xl text-center self-start sm:self-center">
            Status: {competency.contentStatus} (Study Notes in next phase)
          </div>
        </div>
      </div>
    </div>
  );
};
