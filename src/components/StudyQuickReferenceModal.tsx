import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, GraduationCap, Award, BookMarked, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface StudyTopic {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  distilledSummary: string;
  coreConcepts: {
    name: string;
    description: string;
  }[];
  practicalTip: string;
  quickFact: string;
  targetLink: string;
  linkLabel: string;
}

interface StudyQuickReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: StudyTopic | null;
}

export default function StudyQuickReferenceModal({ isOpen, onClose, topic }: StudyQuickReferenceModalProps) {
  if (!topic) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/45 md:bg-zinc-950/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-border dark:border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
          >
            {/* Top decorative color bar */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-accent to-primary" />

            {/* Header */}
            <div className="p-6 md:p-8 flex items-start justify-between border-b border-border/60 dark:border-zinc-800/80">
              <div className="space-y-1.5 pr-8">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary bg-primary-light dark:bg-primary-dark/30 dark:text-pink-300 px-3 py-1 rounded-full">
                  {topic.category}
                </span>
                <h3 className="text-xl md:text-2xl font-display font-medium text-text-primary dark:text-white leading-tight mt-2 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-accent shrink-0" />
                  {topic.title}
                </h3>
                <p className="text-xs text-text-secondary dark:text-zinc-400 font-medium">
                  {topic.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-text-tertiary hover:text-text-primary dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body (Scrollable) */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-text-secondary dark:text-zinc-300">
              {/* Distilled Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-text-primary dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-accent" /> Distilled Concept
                </h4>
                <p className="leading-relaxed font-serif italic text-base text-zinc-700 dark:text-zinc-200 pl-4 border-l-2 border-primary/40">
                  "{topic.distilledSummary}"
                </p>
              </div>

              {/* Core Concepts */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-text-primary dark:text-white flex items-center gap-1.5">
                  <BookMarked className="w-4 h-4 text-primary" /> Core Pillars &amp; Essentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {topic.coreConcepts.map((concept, index) => (
                    <div 
                      key={index} 
                      className="p-4 bg-bg-primary dark:bg-zinc-900/60 border border-border dark:border-zinc-800 rounded-2xl space-y-1.5"
                    >
                      <h5 className="font-bold text-xs text-primary dark:text-pink-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                        {concept.name}
                      </h5>
                      <p className="text-xs text-text-secondary dark:text-zinc-400 leading-normal">
                        {concept.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Tip */}
              <div className="p-4 rounded-2xl bg-teal-500/10 dark:bg-teal-500/5 border border-teal-500/20 text-teal-900 dark:text-teal-400 space-y-1">
                <h4 className="text-xs font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                  💡 Clinical &amp; Practical Tip
                </h4>
                <p className="text-xs leading-relaxed">
                  {topic.practicalTip}
                </p>
              </div>

              {/* Quick Fact */}
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-border dark:border-zinc-800/80 text-text-primary dark:text-zinc-300 flex items-center justify-between text-xs font-medium gap-4">
                <span>📚 Quick Study Fact:</span>
                <span className="font-bold text-accent text-right">{topic.quickFact}</span>
              </div>
            </div>

            {/* Footer actions */}
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border-t border-border/60 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-text-tertiary">
                Direct learning path shortcut
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-border text-xs font-bold text-text-secondary dark:text-zinc-400 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 transition-colors"
                >
                  Close
                </button>
                <Link
                  to={topic.targetLink}
                  onClick={onClose}
                  className="w-1/2 sm:w-auto btn-premium btn-premium-primary py-2.5 px-5 text-[10px] uppercase tracking-wider text-center"
                >
                  {topic.linkLabel} <ChevronRight className="w-3 px-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
