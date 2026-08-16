import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, Search, ShieldAlert, Award, Clock, ArrowRight, CheckCircle2, 
  Sparkles, FileText, Scale, HelpCircle, Layers, Bookmark, BookmarkCheck,
  ChevronRight, Activity, Zap, Brain, CheckSquare, RefreshCw
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import { FMT_DETAILED_CHAPTERS, FMTChapterDetail } from '../data/fmtDetailedChapters';

export default function FmtLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'all' | 'section-a' | 'section-b'>('all');
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const [bookmarkedChapters, setBookmarkedChapters] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedCompleted = localStorage.getItem('curiva_fmt_completed');
      if (savedCompleted) setCompletedChapters(JSON.parse(savedCompleted));

      const savedBookmarks = localStorage.getItem('curiva_fmt_bookmarks');
      if (savedBookmarks) setBookmarkedChapters(JSON.parse(savedBookmarks));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    let updated: string[];
    if (bookmarkedChapters.includes(id)) {
      updated = bookmarkedChapters.filter((chId) => chId !== id);
    } else {
      updated = [...bookmarkedChapters, id];
    }
    setBookmarkedChapters(updated);
    localStorage.setItem('curiva_fmt_bookmarks', JSON.stringify(updated));
  };

  const filteredChapters = FMT_DETAILED_CHAPTERS.filter((ch) => {
    // Section filter
    if (activeSection === 'section-a' && ch.section !== 'Section A: Forensic Medicine') return false;
    if (activeSection === 'section-b' && ch.section !== 'Section B: Toxicology') return false;

    // Search query filter
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.introduction.toLowerCase().includes(q) ||
      ch.keyTerms.some((kt) => kt.term.toLowerCase().includes(q) || kt.definition.toLowerCase().includes(q)) ||
      ch.highYieldPoints.some((hyp) => hyp.toLowerCase().includes(q))
    );
  });

  const completionPercentage = Math.round((completedChapters.length / FMT_DETAILED_CHAPTERS.length) * 100) || 0;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 pb-20">
      <SEO
        title="Forensic Medicine & Toxicology (FMT) Interactive Learning Hub | Curiva Homoeopathy"
        description="Interactive, CBDC-aligned Forensic Medicine and Toxicology learning platform for 2nd BHMS students. Master jurisprudence, autopsy, thanatology, toxicology, and legal sections."
      />

      {/* Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-bg-primary border-b border-border/60 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary">
                <Scale className="w-3.5 h-3.5" />
                <span>NCH CBDC 2nd BHMS Curriculum</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
                Forensic Medicine &amp; Toxicology
              </h1>
              <p className="text-base text-text-secondary leading-relaxed">
                Recreated textbook content into an interactive, high-yield learning hub. Conversational explanations, step-by-step legal procedures, animated flowcharts, viva QA, and instant MCQs.
              </p>
            </div>

            {/* Study Progress Card */}
            <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-2xl p-5 shadow-soft max-w-xs w-full shrink-0 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-primary" />
                  Syllabus Progress
                </span>
                <span className="font-mono text-primary font-black">{completionPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-text-tertiary font-medium">
                <span>{completedChapters.length} of {FMT_DETAILED_CHAPTERS.length} Chapters Done</span>
                <span>{bookmarkedChapters.length} Bookmarked</span>
              </div>
            </div>
          </div>

          {/* Search and Section Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, legal sections, poisons, or keywords..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-900 border border-border/70 rounded-xl text-xs text-text-primary focus:outline-none focus:border-primary transition-all placeholder:text-text-tertiary shadow-soft-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                onClick={() => setActiveSection('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeSection === 'all'
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
                }`}
              >
                All Chapters ({FMT_DETAILED_CHAPTERS.length})
              </button>
              <button
                onClick={() => setActiveSection('section-a')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeSection === 'section-a'
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
                }`}
              >
                Section A: Forensic Medicine
              </button>
              <button
                onClick={() => setActiveSection('section-b')}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeSection === 'section-b'
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
                }`}
              >
                Section B: Toxicology
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Chapter Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredChapters.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl p-8 space-y-4 max-w-md mx-auto">
            <ShieldAlert className="w-12 h-12 text-primary/60 mx-auto" />
            <h3 className="text-lg font-bold text-text-primary">No Matching FMT Topics Found</h3>
            <p className="text-xs text-text-secondary">
              Try adjusting your search query or switching between Section A and Section B filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveSection('all');
              }}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-soft"
            >
              Reset Search Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChapters.map((ch) => {
              const isDone = completedChapters.includes(ch.id);
              const isBookmarked = bookmarkedChapters.includes(ch.id);

              return (
                <motion.div
                  key={ch.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-white dark:bg-zinc-900 border border-border/70 hover:border-primary/50 rounded-3xl p-6 shadow-soft hover:shadow-soft-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Bar inside Card */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-mono font-black text-xs flex items-center justify-center">
                          Ch.{ch.chapterNumber}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-tertiary bg-bg-secondary px-2.5 py-1 rounded-md">
                          {ch.section.split(':')[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {isDone && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200/50">
                            <CheckCircle2 className="w-3 h-3" />
                            Completed
                          </span>
                        )}
                        <button
                          onClick={(e) => toggleBookmark(ch.id, e)}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Chapter'}
                          className={`p-2 rounded-xl transition-colors ${
                            isBookmarked
                              ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                              : 'text-text-tertiary hover:text-text-primary hover:bg-bg-secondary'
                          }`}
                        >
                          {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-display font-bold text-text-primary group-hover:text-primary transition-colors">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">
                        {ch.whyThisMatters}
                      </p>
                    </div>

                    {/* Features Badges */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-text-secondary pt-1">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-secondary/60">
                        <Clock className="w-3 h-3 text-primary" />
                        {ch.readTime}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-secondary/60">
                        <Brain className="w-3 h-3 text-accent" />
                        {ch.vivaQuestions.length} Viva QA
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-secondary/60">
                        <CheckSquare className="w-3 h-3 text-emerald-600" />
                        {ch.mcqs.length} MCQs
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg-secondary/60">
                        <Zap className="w-3 h-3 text-amber-500" />
                        {ch.flashcards.length} Flashcards
                      </span>
                    </div>

                    {/* High Yield Key Concepts Preview */}
                    <div className="pt-2 border-t border-border/40 space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                        Core Learning Objectives
                      </span>
                      <ul className="space-y-1 text-xs text-text-secondary">
                        {ch.learningObjectives.slice(0, 2).map((obj, oIdx) => (
                          <li key={oIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                            <span className="line-clamp-1">{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-primary flex items-center gap-1">
                      Start Interactive Learning
                    </span>
                    <Link
                      to={`/fmt/${ch.id}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs shadow-soft transition-all transform group-hover:translate-x-1"
                    >
                      <span>Study Chapter</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Quick Legal Reference & Exam Tips Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-primary/20 rounded-3xl p-8 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-md">
              <Sparkles className="w-4 h-4" />
              <span>NMC 2nd BHMS Exam Preparation</span>
            </div>
            <h3 className="text-2xl font-display font-bold text-text-primary">
              22-Step Pedagogical Learning Framework
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Every FMT module includes conversational simple explanations, step-by-step legal workflows, animated flowcharts, IPC/BNS legal sections, mnemonics, viva QA with click-to-reveal answers, interactive flashcards, and instant MCQs with explanations.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/student-resources"
              className="px-6 py-3 bg-white dark:bg-zinc-900 border border-border/70 hover:border-primary text-text-primary text-xs font-bold rounded-2xl shadow-soft transition-all"
            >
              Browse All BHMS Subjects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
