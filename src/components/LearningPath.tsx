import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lock, 
  Unlock, 
  Check, 
  BookOpen, 
  Sparkles, 
  Award, 
  HelpCircle, 
  ArrowRight, 
  BookMarked,
  Layers,
  Flame,
  Zap,
  Target
} from 'lucide-react';
import { UserProfile } from '../services/userService';
import { Link } from 'react-router-dom';

interface LearningPathProps {
  profile?: UserProfile | null;
}

interface SkillNode {
  id: string;
  title: string;
  subject: string;
  tier: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  unlockCondition: string;
  badgeText: string;
  remedyIds: string[];
  actionPath: string;
  actionText: string;
  quizText?: string;
  quizPath?: string;
}

export default function LearningPath({ profile }: LearningPathProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('philosophy');

  const guestProfile: UserProfile = {
    uid: 'guest',
    email: 'guest@curiva.org',
    displayName: 'Scholar Companion',
    profession: 'student',
    qualifications: '',
    bio: 'Self-guided Homoeopathic student.',
    clinicAddress: '',
    interests: [],
    studyStats: {},
    bookmarks: [],
    readingHistory: [],
    activities: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const activeProfile = profile || guestProfile;

  // Sum up quiz statistics from real state
  const getQuizStats = () => {
    let totalQuestions = 0;
    let totalCorrect = 0;
    if (activeProfile.studyStats) {
      Object.values(activeProfile.studyStats).forEach((stat: any) => {
        totalQuestions += stat.total || 0;
        totalCorrect += stat.correct || 0;
      });
    }
    return { totalQuestions, totalCorrect };
  };

  const { totalQuestions, totalCorrect } = getQuizStats();
  const bookmarksCount = activeProfile.bookmarks?.length || 0;
  const historyCount = activeProfile.readingHistory?.length || 0;

  // Define nodes and determine unlocked/completed status from actual activity fields
  const nodes: (SkillNode & { isUnlocked: boolean; isCompleted: boolean; currentProgressValue: number; targetProgressValue: number })[] = [
    {
      id: 'philosophy',
      title: 'Organon of Medicine & Philosophy',
      subject: 'Principles of Homoeopathy',
      tier: 'beginner',
      description: 'Master the fundament of Similia Similibus Curentur, vital force dynamics, and standard therapeutic laws postulated under Organon of Medicine.',
      icon: BookMarked,
      color: 'amber',
      unlockCondition: 'Unlocked by default for new scholars.',
      badgeText: 'Tier I: Grounding',
      remedyIds: ['Aconitum', 'Arnica'],
      actionPath: '/lexicon/philosophy',
      actionText: 'Study Organon of medicine',
      quizPath: '/mcq-practice',
      quizText: 'Take Theory Quiz',
      isUnlocked: true,
      isCompleted: historyCount >= 1 || totalQuestions >= 1,
      currentProgressValue: historyCount >= 1 || totalQuestions >= 1 ? 1 : 0,
      targetProgressValue: 1
    },
    {
      id: 'pharmacy',
      title: 'Clinical Case Investigation & Repertory',
      subject: 'Symptomatology & Mapping',
      tier: 'beginner',
      description: 'Learn how to construct structured clinical case recordings, elicit matching modality particulars, and find candidate polychrest formulations.',
      icon: Layers,
      color: 'emerald',
      unlockCondition: 'Unlocks once you review at least 1 Case Study or take 1 Quiz.',
      badgeText: 'Tier II: Diagnostics',
      remedyIds: ['Nux vomica', 'Belladonna'],
      actionPath: '/symptom-checker',
      actionText: 'Launch Symptom Repertory',
      quizPath: '/visualization',
      quizText: 'Materia Medica Practice',
      isUnlocked: historyCount >= 1 || totalQuestions >= 1,
      isCompleted: historyCount >= 3,
      currentProgressValue: Math.min(historyCount, 3),
      targetProgressValue: 3
    },
    {
      id: 'materia-medica',
      title: 'Polychrest Materia Medica',
      subject: 'Remedy Archetypes',
      tier: 'intermediate',
      description: 'Deepen your knowledge of the vital symptom states, somatic triggers, and distinct modal expressions characterizing major classic Homoeopathic therapeutics.',
      icon: Target,
      color: 'indigo',
      unlockCondition: 'Unlocks once you bookmark at least 2 Clinical Inquiries.',
      badgeText: 'Tier III: Remedy States',
      remedyIds: ['Pulsatilla', 'Lycopodium'],
      actionPath: '/lexicon/all',
      actionText: 'Browse Remedies Directory',
      quizPath: '/mcq-practice',
      quizText: 'Launch Polychrest Exam',
      isUnlocked: bookmarksCount >= 2,
      isCompleted: bookmarksCount >= 4 && totalQuestions >= 2,
      currentProgressValue: Math.min(bookmarksCount, 4),
      targetProgressValue: 4
    },
    {
      id: 'therapeutics',
      title: 'Clinical Posology & Comparative Therapeutics',
      subject: 'Potency & Practice',
      tier: 'advanced',
      description: 'Analyze precise potency selection strategies, repeating intervals, aggravation risks, and comparative analysis of remedy boundaries.',
      icon: Zap,
      color: 'violet',
      unlockCondition: 'Unlocks once you practice at least 5 Competitive Quiz Questions.',
      badgeText: 'Tier IV: Practice',
      remedyIds: ['Sulfur', 'Calcarea carbonica'],
      actionPath: '/lexicon/clinical',
      actionText: 'Review Clinical therapeutics guides',
      quizPath: '/mcq-practice',
      quizText: 'Advanced Posology assessment',
      isUnlocked: totalQuestions >= 5,
      isCompleted: totalQuestions >= 10,
      currentProgressValue: Math.min(totalQuestions, 10),
      targetProgressValue: 10
    },
    {
      id: 'miasms',
      title: 'Chronic Miasms & Constitutional Prescribing',
      subject: 'Miasmatic Mastery',
      tier: 'expert',
      description: 'Unlock expert-level therapeutic perspectives. Deeply map the complex miasmatic roots—Psora, Sycosis, and Syphilis—to apply advanced curative rules.',
      icon: Award,
      color: 'rose',
      unlockCondition: 'Unlocks once you accumulate at least 15 MCQ practice scores.',
      badgeText: 'Tier V: Mastery',
      remedyIds: ['Thuja', 'Psorinum', 'Syphilinum'],
      actionPath: '/analysis',
      actionText: 'Launch Comparative remedies Matrix',
      quizPath: '/mcq-practice',
      quizText: 'Take Grand Miasmatic Board',
      isUnlocked: totalQuestions >= 15,
      isCompleted: totalCorrect >= 8,
      currentProgressValue: Math.min(totalCorrect, 8),
      targetProgressValue: 8
    }
  ];

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  // Visual highlights based on selected color theme
  const getColorClasses = (color: string) => {
    switch(color) {
      case 'amber': return {
        progress: 'bg-amber-500',
        text: 'text-amber-500 dark:text-amber-400',
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        border: 'border-amber-500/20 hover:border-amber-500/50',
        glow: 'shadow-amber-500/20'
      };
      case 'emerald': return {
        progress: 'bg-emerald-500',
        text: 'text-emerald-500 dark:text-emerald-400',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        border: 'border-emerald-500/20 hover:border-emerald-500/50',
        glow: 'shadow-emerald-500/20'
      };
      case 'indigo': return {
        progress: 'bg-indigo-500',
        text: 'text-indigo-500 dark:text-indigo-400',
        bg: 'bg-indigo-500/10 dark:bg-indigo-500/15',
        border: 'border-indigo-500/20 hover:border-indigo-500/50',
        glow: 'shadow-indigo-500/20'
      };
      case 'violet': return {
        progress: 'bg-violet-500',
        text: 'text-violet-500 dark:text-violet-400',
        bg: 'bg-violet-500/10 dark:bg-violet-500/15',
        border: 'border-violet-500/20 hover:border-violet-500/50',
        glow: 'shadow-violet-500/20'
      };
      case 'rose': return {
        progress: 'bg-rose-500',
        text: 'text-rose-500 dark:text-rose-400',
        bg: 'bg-rose-500/10 dark:bg-rose-500/15',
        border: 'border-rose-500/20 hover:border-rose-500/50',
        glow: 'shadow-rose-500/20'
      };
      default: return {
        progress: 'bg-primary',
        text: 'text-primary',
        bg: 'bg-primary/10',
        border: 'border-primary/20',
        glow: 'shadow-primary/20'
      };
    }
  };

  const selectedColors = getColorClasses(selectedNode.color);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Learning Path Nodes - Left/Center Column */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900/60 border border-border dark:border-zinc-800 p-8 rounded-[2.5rem] shadow-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <h4 className="text-lg font-black text-text-primary uppercase tracking-tight">Active Learning Path</h4>
            <p className="text-xs text-text-secondary font-serif italic">Unlock expert clinical tiers as your case studies and quiz trials accumulate.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 border border-primary/10 text-primary dark:text-accent rounded-xl text-[10px] font-black uppercase tracking-widest shrink-0">
            <Flame className="w-3.5 h-3.5" />
            <span>{bookmarksCount} SAVED &middot; {totalQuestions} QUIZZED</span>
          </div>
        </div>

        {/* Vertical connected node timeline tree */}
        <div className="relative pl-6 space-y-10 py-4">
          {/* Vertical connecting pipeline */}
          <div className="absolute left-[34px] top-8 bottom-8 w-0.5 bg-zinc-200 dark:bg-zinc-850 border-dashed border-l" />

          {nodes.map((node, index) => {
            const isSelected = selectedNodeId === node.id;
            const nodeColors = getColorClasses(node.color);
            const IconComp = node.icon;

            return (
              <motion.div 
                key={node.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center md:items-start gap-5 p-5 border rounded-2xl cursor-pointer transition-all ${
                  isSelected 
                  ? `bg-bg-secondary dark:bg-zinc-800/20 border-primary/40 text-text-primary ${nodeColors.glow} scale-102 shadow-md` 
                  : 'bg-white dark:bg-zinc-900/40 border-border dark:border-zinc-800 hover:bg-bg-secondary/40'
                }`}
                onClick={() => setSelectedNodeId(node.id)}
              >
                {/* Node marker ring */}
                <div className="relative shrink-0 z-10 w-11 h-11 flex items-center justify-center">
                  {node.isCompleted ? (
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <Check className="w-4.5 h-4.5" strokeWidth={3} />
                    </div>
                  ) : node.isUnlocked ? (
                    <div className={`w-9 h-9 rounded-xl ${nodeColors.bg} ${nodeColors.text} border border-current flex items-center justify-center shadow-sm`}>
                      <IconComp className="w-4 h-4" strokeWidth={2.5} />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute inset-x-0 -inset-y-0.5 rounded-2xl border-2 border-primary/30 pointer-events-none scale-105" />
                  )}
                </div>

                {/* Node details */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h5 className="text-sm font-black uppercase tracking-wider text-text-primary flex items-center gap-2">
                      {node.title}
                      {!node.isUnlocked && <Lock className="w-3 h-3 text-text-tertiary" />}
                    </h5>
                    <span className={`text-[8.5px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md self-start ${
                      node.isCompleted 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10'
                      : node.isUnlocked
                      ? `${nodeColors.bg} ${nodeColors.text} border border-current/10`
                      : 'bg-zinc-150 dark:bg-zinc-800 text-zinc-500'
                    }`}>
                      {node.badgeText}
                    </span>
                  </div>
                  
                  <p className="text-[11px] text-text-secondary font-serif leading-tight line-clamp-1 mb-2 opacity-80">{node.subject}</p>
                  
                  {/* Miniature progress bar */}
                  {node.isUnlocked && (
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800/80 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${node.isCompleted ? 'bg-emerald-500' : nodeColors.progress}`}
                        style={{ width: `${(node.currentProgressValue / node.targetProgressValue) * 100}%` }}
                      />
                    </div>
                  )}
                  {!node.isUnlocked && (
                    <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium leading-none truncate opacity-70">Locked: {node.unlockCondition}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Card - Right Column */}
      <div className="lg:col-span-5 space-y-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedNode.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 p-8 sm:p-10 rounded-[2.5rem] shadow-soft space-y-6 relative overflow-hidden"
          >
            {/* Ambient Background Glow matching the active node theme */}
            <div className={`absolute -right-24 -top-24 w-48 h-48 rounded-full blur-3xl opacity-[0.06] ${selectedColors.progress}`} />

            <div className="space-y-2">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border ${selectedColors.bg} ${selectedColors.text} border-current/15`}>
                {selectedNode.badgeText} &middot; {selectedNode.tier}
              </span>
              <h4 className="text-2xl font-display font-medium text-text-primary italic pt-3 tracking-tight outline-none">{selectedNode.title}</h4>
              <p className="text-xs text-text-secondary font-serif italic">{selectedNode.subject}</p>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed font-serif pt-2 border-t border-border/60">
              {selectedNode.description}
            </p>

            {/* Key Remedy Studies */}
            <div className="space-y-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">Materia Medica Milestones:</span>
              <div className="flex flex-wrap gap-2">
                {selectedNode.remedyIds.map(rem => (
                  <span key={rem} className="px-3 py-1.5 bg-bg-secondary dark:bg-zinc-800/40 border border-border rounded-xl text-xs font-bold text-text-secondary">
                    🌿 {rem}
                  </span>
                ))}
              </div>
            </div>

            {/* Locked Progress view */}
            {!selectedNode.isUnlocked ? (
              <div className="p-5 bg-zinc-50 dark:bg-zinc-800/20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-start gap-4">
                <Lock className="w-5 h-5 text-zinc-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Node Locked</p>
                  <p className="text-[11px] text-text-secondary leading-relaxed font-serif italic mt-1">{selectedNode.unlockCondition}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black uppercase tracking-widest text-text-secondary">Section Progress</span>
                  <span className="font-black text-text-primary">{selectedNode.currentProgressValue} / {selectedNode.targetProgressValue}</span>
                </div>
                
                <div className="w-full bg-zinc-100 dark:bg-zinc-850 h-2.5 rounded-full overflow-hidden border border-border/20">
                  <div 
                    className={`h-full ${selectedNode.isCompleted ? 'bg-emerald-500' : selectedColors.progress}`}
                    style={{ width: `${(selectedNode.currentProgressValue / selectedNode.targetProgressValue) * 100}%` }}
                  />
                </div>

                {selectedNode.isCompleted ? (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 rounded-2xl flex items-center gap-3">
                    <Check className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest">Syllabus Mastered!</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-text-secondary font-serif italic">Meet the requirement count to unlock or complete consecutive syllabus tiers.</p>
                )}
              </div>
            )}

            {/* Actions segment */}
            {selectedNode.isUnlocked && (
              <div className="grid gap-3 pt-6 border-t border-border/50">
                <Link 
                  to={selectedNode.actionPath}
                  className="w-full flex items-center justify-between px-6 py-4 bg-zinc-900 border border-zinc-850 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-102 active:scale-98 transition-all shadow-md group"
                >
                  <span className="truncate">{selectedNode.actionText}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                </Link>

                {selectedNode.quizPath && (
                  <Link 
                    to={selectedNode.quizPath}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 border border-border hover:border-zinc-400 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 rounded-2xl font-black text-[10px] uppercase tracking-widest text-text-primary transition-all shadow-sm"
                  >
                    <span>{selectedNode.quizText}</span>
                  </Link>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
