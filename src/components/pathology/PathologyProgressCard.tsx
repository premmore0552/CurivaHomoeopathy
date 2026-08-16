import React from 'react';
import { Award, CheckCircle2, BookOpen, FileText, HelpCircle, MessageSquare, Flame } from 'lucide-react';
import { PathologyProgress } from '../../types/pathology';

interface PathologyProgressCardProps {
  progress: PathologyProgress;
}

export const PathologyProgressCard: React.FC<PathologyProgressCardProps> = ({
  progress,
}) => {
  const totalItems = 
    progress.generalTotal + 
    progress.systemicTotal + 
    progress.mcqsTotal + 
    progress.laqsTotal + 
    progress.vivaTotal;

  const completedItems = 
    progress.generalCompleted + 
    progress.systemicCompleted + 
    progress.mcqsCompleted + 
    progress.laqsCompleted + 
    progress.vivaCompleted;

  const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const metrics = [
    {
      label: 'General Pathology',
      completed: progress.generalCompleted,
      total: progress.generalTotal,
      unit: 'topics',
      icon: BookOpen,
      color: 'bg-red-500',
    },
    {
      label: 'Systemic Pathology',
      completed: progress.systemicCompleted,
      total: progress.systemicTotal,
      unit: 'topics',
      icon: Award,
      color: 'bg-rose-500',
    },
    {
      label: 'MCQs',
      completed: progress.mcqsCompleted,
      total: progress.mcqsTotal,
      unit: 'completed',
      icon: HelpCircle,
      color: 'bg-emerald-500',
    },
    {
      label: 'LAQs',
      completed: progress.laqsCompleted,
      total: progress.laqsTotal,
      unit: 'completed',
      icon: FileText,
      color: 'bg-amber-500',
    },
    {
      label: 'Viva',
      completed: progress.vivaCompleted,
      total: progress.vivaTotal,
      unit: 'completed',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="bg-bg-secondary border border-border rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      {/* Header & Overall Gauge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-text-primary">
              Pathology Progress
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-950/50 text-red-800 dark:text-red-300">
              Study Tracker
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Track your 2nd BHMS syllabus mastery across theory topics and examination question banks
          </p>
        </div>

        <div className="flex items-center gap-3 bg-bg-primary px-5 py-3 rounded-2xl border border-border shrink-0">
          <div className="text-right">
            <div className="text-2xl font-bold font-serif text-text-primary">
              {percentage}%
            </div>
            <div className="text-[10px] uppercase font-bold text-text-tertiary">
              Complete
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-red-100 dark:border-red-950 flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-full border-4 border-red-600 dark:border-red-400 border-t-transparent transition-all duration-700" 
              style={{ transform: `rotate(${(percentage / 100) * 360}deg)` }}
            />
            <Flame className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
        </div>
      </div>

      {/* Progress Bars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((item, idx) => {
          const itemPercentage = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
          return (
            <div 
              key={idx}
              className="bg-bg-primary p-4 rounded-2xl border border-border/80 space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-text-primary truncate">
                  {item.label}
                </span>
                <span className="text-[11px] font-bold text-text-tertiary">
                  {item.completed} / {item.total} {item.unit}
                </span>
              </div>
              {/* Progress track */}
              <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden border border-border/40">
                <div 
                  className={`h-full ${item.color} rounded-full transition-all duration-500`}
                  style={{ width: `${itemPercentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Meaningful status notice */}
      <div className="pt-2 text-center sm:text-left text-xs text-text-tertiary border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>Content will appear here as chapters are added.</span>
        <span className="text-[11px] text-text-tertiary">
          Total syllabus inventory: {progress.generalTotal + progress.systemicTotal} core topics • {progress.laqsTotal} LAQs • {progress.saqsTotal} SAQs • {progress.mcqsTotal} MCQs
        </span>
      </div>
    </div>
  );
};
