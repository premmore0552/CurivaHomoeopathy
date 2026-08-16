import React from 'react';
import { 
  X, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  CheckCircle2, 
  Activity, 
  Layers, 
  Sparkles, 
  Stethoscope, 
  Info,
  Calendar,
  Award
} from 'lucide-react';
import { 
  PathologyChapter, 
  PathologyTopic, 
  PathologyDefinition, 
  PathologyComparison, 
  PathologyQuestion, 
  PathologyStudyTool 
} from '../../types/pathology';

interface PathologyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: string | null;
  data: any;
}

export const PathologyDetailModal: React.FC<PathologyDetailModalProps> = ({
  isOpen,
  onClose,
  type,
  data,
}) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-bg-primary border border-border rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col justify-between animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-border flex items-start justify-between gap-4 sticky top-0 bg-bg-primary/95 backdrop-blur-md z-10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300">
              {type?.toUpperCase() || 'PATHOLOGY MODULE'}
            </span>
            <h3 className="text-xl font-serif font-bold text-text-primary">
              {data.title || data.term || 'Resource Preview'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-text-tertiary hover:text-text-primary rounded-xl hover:bg-bg-secondary transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 space-y-6 text-sm text-text-secondary">
          {/* TOPIC TYPE */}
          {type === 'topic' && (
            <div className="space-y-4">
              <div className="p-4 bg-bg-secondary rounded-2xl border border-border/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-text-tertiary">
                  <span>Competency: {data.competencyCode || 'NCH CBDC Core'}</span>
                  <span className="capitalize text-red-600 dark:text-red-400">Priority: {data.priority}</span>
                </div>
                <p className="text-text-primary font-medium">{data.description}</p>
              </div>

              {data.clinicalCorrelation && (
                <div className="p-4 bg-red-50/50 dark:bg-red-950/30 rounded-2xl border border-red-200/50 dark:border-red-900/40 space-y-1">
                  <span className="text-xs font-bold text-red-800 dark:text-red-300 flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4" /> Clinico-Pathological & Miasmatic Correlation:
                  </span>
                  <p className="text-xs text-text-primary">{data.clinicalCorrelation}</p>
                </div>
              )}

              <div className="p-5 bg-bg-secondary rounded-2xl border border-dashed border-border text-center space-y-2">
                <Info className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto" />
                <h4 className="font-serif font-bold text-text-primary">Syllabus-Oriented Content Module</h4>
                <p className="text-xs text-text-tertiary max-w-md mx-auto">
                  {data.contentPlaceholder || 'Comprehensive topic notes, gross & microscopic pathology diagrams, flowcharts, and homoeopathic miasmatic correlations will be populated in subsequent syllabus modules.'}
                </p>
              </div>
            </div>
          )}

          {/* CHAPTER TYPE */}
          {type === 'chapter' && (
            <div className="space-y-4">
              <p className="text-text-primary">{data.description}</p>
              
              <div className="space-y-2">
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                  Mapped NCH Competencies:
                </span>
                <div className="flex flex-wrap gap-2">
                  {data.competencies?.map((c: string, i: number) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-bg-secondary text-xs font-semibold text-text-primary border border-border">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                  Chapter Topics ({data.topics?.length || 0}):
                </span>
                <div className="space-y-2">
                  {data.topics?.map((top: PathologyTopic) => (
                    <div key={top.id} className="p-3 bg-bg-secondary rounded-xl border border-border/80 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-text-primary block">{top.title}</span>
                        <span className="text-[11px] text-text-tertiary">{top.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DEFINITION TYPE */}
          {type === 'definition' && (
            <div className="space-y-4">
              <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-2">
                <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider">
                  Standard Textbook Definition:
                </span>
                <p className="text-base font-serif text-text-primary italic leading-relaxed">
                  "{data.definition}"
                </p>
              </div>

              <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-1">
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                  Clinical & Pathological Significance:
                </span>
                <p className="text-xs text-text-secondary">{data.significance}</p>
              </div>
            </div>
          )}

          {/* COMPARISON TYPE */}
          {type === 'comparison' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-bg-secondary text-text-primary font-bold">
                    <tr>
                      <th className="p-3 border-b border-border">Feature</th>
                      <th className="p-3 border-b border-border text-red-700 dark:text-red-400">{data.itemA}</th>
                      <th className="p-3 border-b border-border text-rose-700 dark:text-rose-400">{data.itemB}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {data.points?.map((pt: any, i: number) => (
                      <tr key={i} className="hover:bg-bg-secondary/50">
                        <td className="p-3 font-semibold text-text-primary">{pt.feature}</td>
                        <td className="p-3 text-text-secondary">{pt.a}</td>
                        <td className="p-3 text-text-secondary">{pt.b}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* QUESTION TYPE (LAQ, SAQ, MCQ, VIVA) */}
          {['laq', 'saq', 'mcq', 'viva'].includes(type || '') && (
            <div className="space-y-4">
              <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-text-tertiary">
                  <span className="uppercase text-red-700 dark:text-red-400">{type?.toUpperCase()} Format</span>
                  {data.marks && <span>{data.marks} Marks Scheme</span>}
                </div>
                <h4 className="text-base font-serif font-bold text-text-primary">
                  {data.title}
                </h4>
              </div>

              <div className="p-4 bg-bg-secondary rounded-2xl border border-border space-y-2">
                <span className="text-xs font-bold text-text-tertiary uppercase tracking-wider">
                  Answer Blueprint & Model Framework:
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {data.preview}
                </p>
              </div>

              <div className="p-4 bg-bg-secondary/60 rounded-xl border border-dashed border-border text-xs text-text-tertiary text-center">
                Full model answers, diagrams, and evaluation rubrics will be populated in subsequent syllabus modules.
              </div>
            </div>
          )}

          {/* STUDY TOOL TYPE */}
          {type === 'study-tool' && (
            <div className="space-y-4">
              <p className="text-text-primary">{data.description}</p>
              <div className="p-5 bg-bg-secondary rounded-2xl border border-dashed border-border text-center space-y-2">
                <Sparkles className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto" />
                <h4 className="font-serif font-bold text-text-primary">{data.title} Suite</h4>
                <p className="text-xs text-text-tertiary max-w-md mx-auto">
                  Interactive tool interface will be fully populated with searchable tables, interactive flashcards, and diagrams in subsequent content modules.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-border flex items-center justify-end bg-bg-primary/95">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-bg-secondary hover:bg-border text-text-primary text-xs font-bold transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
