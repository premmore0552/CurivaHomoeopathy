import React from 'react';
import { 
  Microscope, 
  HeartPulse, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  MessageSquare, 
  Zap, 
  BookMarked,
  ArrowRight
} from 'lucide-react';

interface PathologyOverviewGridProps {
  onSelectSection: (sectionKey: string) => void;
  counts: {
    generalTopics: number;
    systemicTopics: number;
    laqCount: number;
    saqCount: number;
    mcqCount: number;
    vivaCount: number;
    definitionsCount: number;
  };
}

export const PathologyOverviewGrid: React.FC<PathologyOverviewGridProps> = ({
  onSelectSection,
  counts,
}) => {
  const overviewCards = [
    {
      id: 'general',
      title: 'General Pathology',
      description: 'Cell injury, necrosis, inflammation cascades, wound repair, hemodynamics, and neoplasia mechanisms.',
      countLabel: `${counts.generalTopics} Core Topics`,
      icon: Microscope,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
      iconBg: 'p-3 bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300',
    },
    {
      id: 'systemic',
      title: 'Systemic Pathology',
      description: 'Cardiovascular, respiratory, gastrointestinal, hepatobiliary, renal, and hematology organ changes.',
      countLabel: `${counts.systemicTopics} Organ Systems`,
      icon: HeartPulse,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      iconBg: 'p-3 bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300',
    },
    {
      id: 'laq',
      title: 'LAQ Bank',
      description: '10-mark Long Answer Questions with structured university exam-oriented answer frameworks & diagrams.',
      countLabel: `${counts.laqCount} LAQs Available`,
      icon: FileText,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      iconBg: 'p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300',
    },
    {
      id: 'saq',
      title: 'SAQ Bank',
      description: '5-mark Short Answer Questions with crisp differentiating points, causes, and pathological stages.',
      countLabel: `${counts.saqCount} SAQs Available`,
      icon: CheckCircle2,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
      iconBg: 'p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300',
    },
    {
      id: 'mcq',
      title: 'MCQ Bank',
      description: 'Chapter-wise multiple choice questions with detailed diagnostic rationales and AIAPGET references.',
      countLabel: `${counts.mcqCount} MCQs Tracked`,
      icon: HelpCircle,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      iconBg: 'p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300',
    },
    {
      id: 'viva',
      title: 'Viva Preparation',
      description: 'High-yield oral questions on gross specimens, histopathology slides, definitions, and spotters.',
      countLabel: `${counts.vivaCount} Viva Questions`,
      icon: MessageSquare,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
      iconBg: 'p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300',
    },
    {
      id: 'revision',
      title: 'Rapid Revision',
      description: 'One-page cheat sheets, bulleted keynotes, and memory mnemonics for high-speed university exam review.',
      countLabel: 'High-Yield Points',
      icon: Zap,
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
      iconBg: 'p-3 bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300',
    },
    {
      id: 'definitions',
      title: 'Important Definitions',
      description: 'Authoritative, exact definitions conforming to standard Robbins and Harsh Mohan textbooks.',
      countLabel: `${counts.definitionsCount} Exact Terms`,
      icon: BookMarked,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      iconBg: 'p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-text-primary">Pathology Overview</h2>
          <p className="text-xs text-text-secondary">Core study modules, question banks, viva resources, and quick references</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => onSelectSection(card.id)}
              className="bg-bg-secondary border border-border rounded-3xl p-5 hover:border-red-500/40 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`${card.iconBg} rounded-2xl`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${card.color}`}>
                    {card.countLabel}
                  </span>
                </div>
                <h3 className="text-base font-serif font-bold text-text-primary group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary group-hover:text-red-700 dark:group-hover:text-red-400">
                <span>Access Resource</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
