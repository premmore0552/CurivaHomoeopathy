import React from 'react';
import { FileText, CheckCircle2, HelpCircle, MessageSquare, ArrowRight, Award } from 'lucide-react';

interface PathologyExamPrepProps {
  onSelectType: (type: 'laq' | 'saq' | 'mcq' | 'viva') => void;
  counts: {
    laqs: number;
    saqs: number;
    mcqs: number;
    viva: number;
  };
}

export const PathologyExamPrep: React.FC<PathologyExamPrepProps> = ({
  onSelectType,
  counts,
}) => {
  const examCards = [
    {
      id: 'laq' as const,
      title: 'LAQs (10 Marks)',
      subtitle: 'Long-Answer Questions',
      description: 'Long-answer questions with structured answer frameworks, clinical descriptions, and required histological diagrams.',
      countLabel: `${counts.laqs} Questions`,
      icon: FileText,
      iconBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
      badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      cta: 'Explore LAQ Bank',
    },
    {
      id: 'saq' as const,
      title: 'SAQs (5 Marks)',
      subtitle: 'Short-Answer Questions',
      description: 'Short-answer questions with exam-ready answers, differentiating tables, pathogenesis stages, and core points.',
      countLabel: `${counts.saqs} Questions`,
      icon: CheckCircle2,
      iconBg: 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
      badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      cta: 'Explore SAQ Bank',
    },
    {
      id: 'mcq' as const,
      title: 'MCQs & AIAPGET',
      subtitle: 'Multiple-Choice Questions',
      description: 'Topic-wise practice questions with explanations, test timers, rationales, and university entrance patterns.',
      countLabel: `${counts.mcqs} Practice MCQs`,
      icon: HelpCircle,
      iconBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
      badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      cta: 'Start Practice MCQs',
    },
    {
      id: 'viva' as const,
      title: 'Viva Voce & Spotters',
      subtitle: 'Oral Examination Prep',
      description: 'Rapid-fire oral examination preparation covering pathology gross specimens, micro-slides, stains, and instruments.',
      countLabel: `${counts.viva} Oral Flashcards`,
      icon: MessageSquare,
      iconBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
      badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      cta: 'Practice Viva Cards',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">Pathology Exam Preparation</h2>
          <p className="text-xs text-text-secondary">Structured university question blueprints for Paper I (General) and Paper II (Microbiology & Systemic)</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {examCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectType(card.id)}
              className="bg-bg-secondary border border-border rounded-3xl p-6 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`p-3.5 rounded-2xl ${card.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${card.badgeColor}`}>
                    {card.countLabel}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-text-tertiary tracking-wider block">
                    {card.subtitle}
                  </span>
                  <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                <span>{card.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
