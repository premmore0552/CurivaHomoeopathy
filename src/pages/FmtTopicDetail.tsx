import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ContentBlocks } from '../components/ContentBlocks';
import { 
  ArrowLeft, BookOpen, Clock, Award, HelpCircle, ShieldAlert, CheckCircle, CheckCircle2,
  ChevronRight, Sparkles, AlertCircle, FileText, Compass, List, HeartPulse, 
  MapPin, RefreshCw, PenTool, Layout, Layers, CheckSquare, X, Activity, 
  BookOpenCheck, Zap, Scale, Brain, Bookmark, BookmarkCheck, ArrowRight,
  Eye, EyeOff, RotateCcw, Shuffle, MessageSquare, AlertTriangle, Lightbulb,
  GraduationCap
} from 'lucide-react';
import SEO from '../components/SEO';
import ShareButton from '../components/ShareButton';
import Breadcrumbs from '../components/Breadcrumbs';
import { getFMTChapterDetail, FMT_DETAILED_CHAPTERS, FMTChapterDetail } from '../data/fmtDetailedChapters';
import KnowledgeDNA from '../components/KnowledgeDNA';
import { ContentNavigator } from '../components/ContentNavigator';

export default function FmtTopicDetail() {
  const params = useParams<{ moduleId?: string; chapterId?: string; '*': string }>();
  const activeChapterId = params.chapterId || params['*'] || 'legal-procedure';
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'study' | 'flashcards' | 'quiz' | 'viva' | 'revision'>('study');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Local state for interactive features
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Viva state
  const [revealedVivas, setRevealedVivas] = useState<Record<number, boolean>>({});

  // Flashcards state
  const [cardIndex, setCardIndex] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // MCQ State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const chapterDetail = getFMTChapterDetail(activeChapterId) || FMT_DETAILED_CHAPTERS[0];

  // Study Navigator state and list
  const [activeScrollSection, setActiveScrollSection] = useState('section-objectives');

  const studySections = [
    { id: 'section-objectives', num: '1', label: '1. Objectives & Overview', hasData: true },
    { id: 'section-subtopics', num: '2', label: '2. Chapter Subtopics', hasData: !!(chapterDetail.subtopics && chapterDetail.subtopics.length > 0) },
    { id: 'section-learn', num: '3', label: '3. Detailed Notes', hasData: !!chapterDetail.detailedNotes },
    { id: 'section-explanation', num: '4', label: '4. Plain English', hasData: true },
    { id: 'section-definitions', num: '5', label: '5. Key Definitions', hasData: !!(chapterDetail.keyTerms && chapterDetail.keyTerms.length > 0) },
    { id: 'section-procedure', num: '6', label: '6. Sequential Steps', hasData: !!(chapterDetail.stepByStep && chapterDetail.stepByStep.length > 0) },
    { id: 'section-critical', num: '7', label: '7. Critical Concepts', hasData: !!(chapterDetail.importantConcepts && chapterDetail.importantConcepts.length > 0) },
    { id: 'section-tables', num: '8', label: '8. Comparison Tables', hasData: !!(chapterDetail.comparisonTables && chapterDetail.comparisonTables.length > 0) },
    { id: 'section-clinical', num: '9', label: '9. Clinical Scenarios', hasData: !!(chapterDetail.clinicalExamples && chapterDetail.clinicalExamples.length > 0) },
    { id: 'section-mnemonics', num: '10', label: '10. Memory Mnemonics', hasData: !!(chapterDetail.mnemonics && chapterDetail.mnemonics.length > 0) },
  ].filter(s => s.hasData);

  useEffect(() => {
    if (activeTab !== 'study') return;
    
    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 220;
      for (const sec of studySections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveScrollSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollActive);
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, [activeTab, chapterDetail.id]);

  useEffect(() => {
    // Scroll to top on chapter change
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRevealedVivas({});
    setCardIndex(0);
    setIsCardFlipped(false);
    setSelectedAnswers({});
    setQuizSubmitted(false);
    setActiveTab('study');

    // Load progress
    try {
      const savedCompleted = localStorage.getItem('curiva_fmt_completed');
      if (savedCompleted) {
        const completedList: string[] = JSON.parse(savedCompleted);
        setIsCompleted(completedList.includes(chapterDetail.id));
      }

      const savedBookmarks = localStorage.getItem('curiva_fmt_bookmarks');
      if (savedBookmarks) {
        const bookmarkList: string[] = JSON.parse(savedBookmarks);
        setIsBookmarked(bookmarkList.includes(chapterDetail.id));
      }
    } catch (e) {
      console.error(e);
    }
  }, [chapterDetail.id]);

  // Track scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCompletion = () => {
    try {
      const savedCompleted = localStorage.getItem('curiva_fmt_completed');
      let completedList: string[] = savedCompleted ? JSON.parse(savedCompleted) : [];

      if (isCompleted) {
        completedList = completedList.filter((id) => id !== chapterDetail.id);
      } else {
        completedList.push(chapterDetail.id);
      }

      localStorage.setItem('curiva_fmt_completed', JSON.stringify(completedList));
      setIsCompleted(!isCompleted);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleBookmark = () => {
    try {
      const savedBookmarks = localStorage.getItem('curiva_fmt_bookmarks');
      let bookmarkList: string[] = savedBookmarks ? JSON.parse(savedBookmarks) : [];

      if (isBookmarked) {
        bookmarkList = bookmarkList.filter((id) => id !== chapterDetail.id);
      } else {
        bookmarkList.push(chapterDetail.id);
      }

      localStorage.setItem('curiva_fmt_bookmarks', JSON.stringify(bookmarkList));
      setIsBookmarked(!isBookmarked);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleVivaReveal = (id: number) => {
    setRevealedVivas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (mcqId: number, optionIndex: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    chapterDetail.mcqs.forEach((mcq) => {
      if (selectedAnswers[mcq.id] === mcq.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  // Find previous and next chapters
  const currentIndex = FMT_DETAILED_CHAPTERS.findIndex((ch) => ch.id === chapterDetail.id);
  const prevChapter = currentIndex > 0 ? FMT_DETAILED_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < FMT_DETAILED_CHAPTERS.length - 1 ? FMT_DETAILED_CHAPTERS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300 pb-24">
      <SEO
        title={`${chapterDetail.title} | FMT Interactive Learning Module | Curiva Homoeopathy`}
        description={`Interactive study module for ${chapterDetail.title} (${chapterDetail.section}). Simplified explanations, step-by-step procedures, viva QA, and MCQs.`}
      />

      {/* Top Reading Scroll Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-bg-secondary z-50">
        <div
          className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header Navigation */}
      <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-border/70 z-40 py-3 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/fmt"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-text-secondary hover:text-primary transition-colors bg-bg-secondary px-3 py-1.5 rounded-xl border border-border/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">FMT Library</span>
            </Link>

            <div className="h-4 w-[1px] bg-border/60 hidden sm:block" />

            <div className="truncate max-w-xs sm:max-w-md">
              <span className="text-[10px] font-black uppercase text-primary tracking-wider block">
                Chapter {chapterDetail.chapterNumber}
              </span>
              <h2 className="text-sm font-bold text-text-primary truncate">
                {chapterDetail.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ShareButton 
              title={chapterDetail.title} 
              text={`Chapter ${chapterDetail.chapterNumber}: ${chapterDetail.title}`} 
              variant="outline" 
              label="Share" 
            />

            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isBookmarked
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 border border-amber-200'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary'
              }`}
            >
              {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
              <span className="hidden md:inline">{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>

            <button
              onClick={toggleCompletion}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-soft-xs ${
                isCompleted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isCompleted ? 'Completed' : 'Mark Done'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-bg-primary border-b border-border/60 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Breadcrumbs />

          <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {chapterDetail.priority && (
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    chapterDetail.priority === 'Highest' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    chapterDetail.priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    Priority: {chapterDetail.priority}
                  </span>
                )}
                <span className="px-3 py-1 bg-primary/15 text-primary text-xs font-bold rounded-full font-mono">
                  {chapterDetail.section}
                </span>
                <span className="px-3 py-1 bg-bg-secondary text-text-secondary text-xs font-semibold rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  {chapterDetail.readTime}
                </span>
                <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                  Difficulty: {chapterDetail.difficulty}
                </span>
                {chapterDetail.bhmsYear && (
                  <span className="px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 text-xs font-bold rounded-full flex items-center gap-1">
                    <GraduationCap className="w-3.5 h-3.5" />
                    {chapterDetail.bhmsYear}
                  </span>
                )}
                {chapterDetail.examImportance && (
                  <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1 ${
                    chapterDetail.examImportance === 'Very High' ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300' :
                    chapterDetail.examImportance === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    Importance: {chapterDetail.examImportance}
                  </span>
                )}
              </div>

              {chapterDetail.tags && chapterDetail.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {chapterDetail.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-text-tertiary bg-white dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-border/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

            <h1 className="text-3xl md:text-5xl font-display font-bold text-text-primary tracking-tight">
              {chapterDetail.title}
            </h1>

            {/* Why This Matters Callout Card */}
            <div className="p-5 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 rounded-2xl flex items-start gap-3 shadow-soft-xs">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 block">
                  Why This Topic Matters (Exam &amp; Clinical Context)
                </span>
                <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                  {chapterDetail.whyThisMatters}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-border/60">
            <button
              onClick={() => setActiveTab('study')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'study'
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Study Module</span>
            </button>

            <button
              onClick={() => setActiveTab('flashcards')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'flashcards'
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>2. Flashcards ({chapterDetail.flashcards.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-emerald-400" />
              <span>3. Interactive MCQs ({chapterDetail.mcqs.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('viva')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'viva'
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
              }`}
            >
              <Brain className="w-4 h-4 text-purple-400" />
              <span>4. Viva &amp; Cases</span>
            </button>

            <button
              onClick={() => setActiveTab('revision')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'revision'
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-white dark:bg-zinc-900 border border-border/60 text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText className="w-4 h-4 text-accent" />
              <span>5. Exam Prep &amp; Revision</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AnimatePresence mode="wait">
          {/* TAB 1: CORE STUDY MODULE */}
          {activeTab === 'study' && (
            <motion.div
              key="study-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="lg:grid lg:grid-cols-12 lg:gap-8 items-start"
            >
              {/* Sticky Sidebar Left Column */}
              <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-12 space-y-4 bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-5 shadow-soft max-h-[calc(100vh-8rem)] overflow-y-auto">
                <div className="space-y-1.5 border-b border-border/50 pb-3 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary block">
                    Study Navigator
                  </span>
                  <p className="text-[10px] text-text-tertiary">
                    Select a core section or scroll to navigate this chapter.
                  </p>
                </div>
                <nav className="space-y-1">
                  {studySections.map((sec) => {
                    const isSecActive = activeScrollSection === sec.id;
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const targetEl = document.getElementById(sec.id);
                          if (targetEl) {
                            const offset = 100;
                            const bodyRect = document.body.getBoundingClientRect().top;
                            const elementRect = targetEl.getBoundingClientRect().top;
                            const elementPosition = elementRect - bodyRect;
                            const offsetPosition = elementPosition - offset;
                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth"
                            });
                          }
                        }}
                        className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          isSecActive
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'text-text-secondary hover:text-primary hover:bg-primary/5 border-transparent hover:border-primary/10'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-lg font-mono text-[10px] flex items-center justify-center shrink-0 ${
                            isSecActive
                              ? 'bg-white/20 text-white'
                              : 'bg-bg-secondary group-hover:bg-primary/10 group-hover:text-primary'
                          }`}>
                            {sec.num}
                          </span>
                          <span className="truncate max-w-[140px]">{sec.label.split('. ')[1] || sec.label}</span>
                        </div>
                        <ChevronRight className={`w-3.5 h-3.5 transition-all ${
                          isSecActive 
                            ? 'opacity-100 translate-x-0.5' 
                            : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
                        }`} />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Main Content Column */}
              <div className="lg:col-span-9 space-y-12">
                {/* Learning Objectives & Intro Card */}
                <div id="section-objectives" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                    1. Learning Objectives &amp; Overview
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    Core Learning Competencies
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterDetail.learningObjectives.map((obj, idx) => (
                    <div key={idx} className="p-4 bg-bg-secondary/50 border border-border/50 rounded-2xl flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        {obj}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/50 space-y-2">
                  <h4 className="text-sm font-bold text-text-primary">Topic Introduction</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {chapterDetail.introduction}
                  </p>
                </div>
              </div>

              {/* Chapter Subtopics Navigation */}
              {chapterDetail.subtopics && chapterDetail.subtopics.length > 0 && (
                <div id="section-subtopics" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
                  <div className="flex items-center gap-2">
                    <List className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      2. Chapter Subtopics
                    </h3>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {chapterDetail.subtopics.map((sub, idx) => {
                      const slug = sub.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                      return (
                        <Link 
                          key={idx} 
                          to={`/fmt/${slug}`}
                          className="p-3 bg-bg-secondary/40 border border-border/60 rounded-xl text-center hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                          <span className="text-xs font-bold text-text-secondary group-hover:text-primary transition-colors line-clamp-1">{sub}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Comparison Topics Callout */}
              {chapterDetail.comparisonTopics && chapterDetail.comparisonTopics.length > 0 && (
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                    <Layers className="w-5 h-5" />
                    <h3 className="text-lg font-bold">Key Comparisons in this Chapter</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {chapterDetail.comparisonTopics.map((comp, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-text-primary bg-white dark:bg-zinc-900 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                        {comp}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Study Notes (Markdown) */}
              {chapterDetail.detailedNotes && (
                <div id="section-learn" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      3. Detailed Study Notes (Standard Textbook)
                    </h3>
                  </div>
                  <div className="markdown-body text-sm leading-relaxed text-text-secondary">
                    <ReactMarkdown>{chapterDetail.detailedNotes}</ReactMarkdown>
                  </div>
                  
                  {chapterDetail.contentBlocks && chapterDetail.contentBlocks.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-border/40">
                      <ContentBlocks blocks={chapterDetail.contentBlocks} />
                    </div>
                  )}
                </div>
              )}

              {/* In case there are ONLY contentBlocks and no detailedNotes */}
              {!chapterDetail.detailedNotes && chapterDetail.contentBlocks && chapterDetail.contentBlocks.length > 0 && (
                <div id="section-learn" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      3. Detailed Study Notes (Standard Textbook)
                    </h3>
                  </div>
                  <ContentBlocks blocks={chapterDetail.contentBlocks} />
                </div>
              )}

                <div id="section-explanation" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      4. Plain English Explanation (Zero Jargon)
                    </h3>
                  </div>
                <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl text-xs text-text-primary leading-relaxed space-y-3">
                  <p className="font-medium text-sm leading-relaxed">
                    {chapterDetail.simpleExplanation}
                  </p>
                </div>
              </div>

              {/* Key Terms & Definitions Grid */}
              <div id="section-definitions" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    3. Key Terminology &amp; Definitions
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    Essential Medical &amp; Legal Terms
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterDetail.keyTerms.map((kt, idx) => (
                    <div key={idx} className="p-5 bg-bg-secondary/40 border border-border/60 rounded-2xl space-y-2 shadow-soft-xs">
                      <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                        <Scale className="w-4 h-4 text-accent shrink-0" />
                        {kt.term}
                      </h4>
                      <p className="text-xs font-semibold text-text-primary leading-relaxed">
                        {kt.definition}
                      </p>
                      <p className="text-[11px] text-text-secondary italic bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-border/40">
                        💡 Simple: {kt.simpleExplanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comparison Tables Section */}
              {chapterDetail.comparisonTables && chapterDetail.comparisonTables.length > 0 && (
                <div id="section-tables" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="flex items-center gap-2 text-text-primary">
                    <Layers className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-display font-bold">Comparison Tables</h3>
                  </div>
                  <div className="space-y-8">
                    {chapterDetail.comparisonTables.map((table, tIdx) => (
                      <div key={tIdx} className="space-y-4">
                        <h4 className="text-sm font-bold text-primary flex items-center gap-2">
                          <span className="w-1.5 h-4 bg-primary rounded-full" />
                          {table.title}
                        </h4>
                        <div className="overflow-x-auto rounded-2xl border border-border/60">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-bg-secondary border-b border-border/60">
                                {table.headers.map((header, hIdx) => (
                                  <th key={hIdx} className="px-4 py-3 text-left font-black text-text-tertiary uppercase tracking-widest">
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-border/40">
                              {table.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-primary/5 transition-colors">
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className={`px-4 py-3 ${cIdx === 0 ? 'font-bold text-text-primary bg-bg-secondary/30' : 'text-text-secondary font-medium'}`}>
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step by Step Explanation */}
              <div id="section-procedure" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    4. Step-by-Step Procedure Workflow
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    Sequential Process Breakdown
                  </h3>
                </div>

                <div className="space-y-4">
                  {chapterDetail.stepByStep.map((s) => (
                    <div key={s.stepNumber} className="p-5 bg-bg-secondary/30 border border-border/60 rounded-2xl flex flex-col sm:flex-row sm:items-start gap-4">
                      <span className="w-9 h-9 rounded-2xl bg-primary text-white font-mono font-black text-sm flex items-center justify-center shrink-0 shadow-soft-xs">
                        {s.stepNumber}
                      </span>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="text-sm font-bold text-text-primary">{s.title}</h4>
                        <p className="text-xs text-text-secondary leading-relaxed">{s.description}</p>
                        <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-primary">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Key Takeaway: {s.keyTakeaway}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Callout Cards */}
              <div id="section-critical" className="space-y-4">
                <h3 className="text-xl font-display font-bold text-text-primary">
                  5. Critical Concepts &amp; Legal Warnings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapterDetail.importantConcepts.map((ic, idx) => {
                    const isLegal = ic.type === 'legal';
                    const isWarning = ic.type === 'warning';

                    return (
                      <div
                        key={idx}
                        className={`p-6 rounded-3xl border shadow-soft space-y-2 ${
                          isLegal
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
                            : isWarning
                            ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
                            : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {isLegal ? (
                            <Scale className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          ) : isWarning ? (
                            <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                          ) : (
                            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                          )}
                          <h4 className="text-sm font-bold text-text-primary">{ic.title}</h4>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {ic.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Visual Flowcharts */}
              {chapterDetail.flowcharts.length > 0 && (
                <div id="section-flowchart" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      6. Interactive Visual Flowchart
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      Flow Sequences &amp; Decision Trees
                    </h3>
                  </div>

                  {chapterDetail.flowcharts.map((fc, fIdx) => (
                    <div key={fIdx} className="space-y-4">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h4 className="text-sm font-bold text-primary">{fc.title}</h4>
                        <p className="text-xs text-text-secondary mt-0.5">{fc.description}</p>
                      </div>

                      <div className="relative pl-6 space-y-6 border-l-2 border-primary/30 ml-4 py-2">
                        {fc.steps.map((st, sIdx) => (
                          <div key={sIdx} className="relative group">
                            <span className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center ring-4 ring-white dark:ring-zinc-900">
                              {sIdx + 1}
                            </span>
                            <div className="p-4 bg-bg-secondary/40 border border-border/60 group-hover:border-primary/40 rounded-2xl transition-all space-y-1">
                              <h5 className="text-xs font-bold text-text-primary">{st.label}</h5>
                              <p className="text-[11px] text-text-secondary">{st.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Comparison Tables */}
              {chapterDetail.tables.length > 0 && (
                <div id="section-tables" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      7. Comparison &amp; Diagnostic Tables
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      Structured Comparative Data
                    </h3>
                  </div>

                  {chapterDetail.tables.map((tbl, tIdx) => (
                    <div key={tIdx} className="space-y-3">
                      <h4 className="text-sm font-bold text-text-primary">{tbl.title}</h4>
                      <div className="overflow-x-auto border border-border/60 rounded-2xl">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-primary/10 text-primary font-bold border-b border-border/60">
                            <tr>
                              {tbl.headers.map((h, hIdx) => (
                                <th key={hIdx} className="p-3.5 whitespace-nowrap">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/40">
                            {tbl.rows.map((row, rIdx) => (
                              <tr key={rIdx} className="hover:bg-bg-secondary/50 transition-colors">
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`p-3.5 leading-relaxed ${cIdx === 0 ? 'font-bold text-text-primary' : 'text-text-secondary'}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Clinical Examples */}
              {chapterDetail.clinicalExamples.length > 0 && (
                <div id="section-clinical" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
                  <h3 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-rose-500" />
                    <span>8. Clinical &amp; Medicolegal Scenarios</span>
                  </h3>

                  {chapterDetail.clinicalExamples.map((ce, cIdx) => (
                    <div key={cIdx} className="p-5 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/60 rounded-2xl space-y-3">
                      <h4 className="text-sm font-bold text-text-primary">{ce.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed"><strong className="text-text-primary">Scenario:</strong> {ce.scenario}</p>
                      <p className="text-xs text-text-secondary leading-relaxed"><strong className="text-text-primary">Analysis:</strong> {ce.analysis}</p>
                      <div className="p-3 bg-white dark:bg-zinc-900 rounded-xl border border-rose-200/50 text-xs font-bold text-rose-700 dark:text-rose-300">
                        Takeaway: {ce.takeaway}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Mnemonics */}
              {chapterDetail.mnemonics.length > 0 && (
                <div id="section-mnemonics" className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
                  <h3 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-500" />
                    <span>9. High-Yield Mnemonics &amp; Memory Tricks</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapterDetail.mnemonics.map((mn, mIdx) => (
                      <div key={mIdx} className="p-5 bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 rounded-2xl space-y-3">
                        <h4 className="text-xs font-black uppercase text-amber-900 dark:text-amber-300 tracking-wider">{mn.title}</h4>
                        <div className="p-2.5 bg-amber-100/70 dark:bg-amber-900/50 rounded-xl text-xs font-mono font-bold text-amber-950 dark:text-amber-100 text-center">
                          "{mn.phrase}"
                        </div>
                        <ul className="space-y-1 text-xs text-text-secondary">
                          {mn.breakdown.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-md bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                {b.letter}
                              </span>
                              <span><strong className="text-text-primary">{b.word}:</strong> {b.meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Academic Knowledge DNA Profile */}
              <div className="pt-6">
                <KnowledgeDNA
                  difficulty="Year 2"
                  examYieldScore={chapterDetail.difficulty === 'Advanced' || chapterDetail.difficulty === 'Intermediate' ? 92 : 84}
                  clinicalAffinityTags={[chapterDetail.section, "Medicolegal Axis", "Clinical Jurisprudence"]}
                  miasmaWeights={{ psora: 45, sycosis: 35, syphilis: 20 }}
                  learningObjectives={chapterDetail.learningObjectives}
                  clinicalPearls={chapterDetail.clinicalExamples && chapterDetail.clinicalExamples.length > 0 ? [chapterDetail.clinicalExamples[0].takeaway] : ["Understand the legal and forensic implications of clinical procedures."]}
                  category="FMT"
                />
              </div>

              {/* Previous / Next Chapter Navigation */}
              <ContentNavigator 
                prev={prevChapter ? { to: `/fmt/${prevChapter.id}`, title: prevChapter.title, label: 'Previous Chapter' } : null}
                next={nextChapter ? { to: `/fmt/${nextChapter.id}`, title: nextChapter.title, label: 'Next Chapter' } : null}
              />
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE FLASHCARDS */}
          {activeTab === 'flashcards' && (
            <motion.div
              key="flashcards-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 max-w-2xl mx-auto"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Interactive Memory Retention
                </span>
                <h3 className="text-2xl font-display font-bold text-text-primary">
                  Chapter Flashcard Deck
                </h3>
                <p className="text-xs text-text-secondary">
                  Card {cardIndex + 1} of {chapterDetail.flashcards.length}. Click card to flip and check answer.
                </p>
              </div>

              {/* 3D Flip Flashcard */}
              <div className="perspective-1000 min-h-[280px] cursor-pointer" onClick={() => setIsCardFlipped(!isCardFlipped)}>
                <motion.div
                  animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="w-full min-h-[280px] bg-white dark:bg-zinc-900 border-2 border-primary/30 rounded-3xl p-8 shadow-soft-lg flex flex-col items-center justify-center text-center space-y-4 relative preserve-3d"
                >
                  {!isCardFlipped ? (
                    <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-md">
                        {chapterDetail.flashcards[cardIndex].category}
                      </span>
                      <h4 className="text-lg md:text-xl font-display font-bold text-text-primary leading-relaxed">
                        {chapterDetail.flashcards[cardIndex].front}
                      </h4>
                      <p className="text-[11px] text-text-tertiary flex items-center justify-center gap-1">
                        <RotateCcw className="w-3.5 h-3.5" /> Click to reveal answer
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 transform rotateY-180">
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-3 py-1 rounded-md">
                        Answer / Explanation
                      </span>
                      <p className="text-base font-medium text-text-primary leading-relaxed">
                        {chapterDetail.flashcards[cardIndex].back}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setCardIndex((prev) => (prev > 0 ? prev - 1 : chapterDetail.flashcards.length - 1));
                  }}
                  className="px-5 py-2.5 bg-white dark:bg-zinc-900 border border-border/70 hover:border-primary text-text-primary text-xs font-bold rounded-xl shadow-soft"
                >
                  Previous Card
                </button>

                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    const rand = Math.floor(Math.random() * chapterDetail.flashcards.length);
                    setCardIndex(rand);
                  }}
                  className="px-4 py-2.5 bg-bg-secondary text-text-secondary hover:text-text-primary text-xs font-bold rounded-xl flex items-center gap-1.5"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>Shuffle</span>
                </button>

                <button
                  onClick={() => {
                    setIsCardFlipped(false);
                    setCardIndex((prev) => (prev < chapterDetail.flashcards.length - 1 ? prev + 1 : 0));
                  }}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-soft"
                >
                  Next Card
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 3: INTERACTIVE MCQS */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8 max-w-3xl mx-auto"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-primary">
                    Chapter Self-Assessment Quiz
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    Test your knowledge on high-yield exam questions.
                  </p>
                </div>

                {quizSubmitted && (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 rounded-2xl text-center space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                      Quiz Score
                    </span>
                    <p className="text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                      {calculateScore()} / {chapterDetail.mcqs.length}
                    </p>
                  </div>
                )}
              </div>

              {/* MCQs List */}
              <div className="space-y-6">
                {chapterDetail.mcqs.map((mcq, mIdx) => {
                  const selected = selectedAnswers[mcq.id];
                  const isCorrect = selected === mcq.correctIndex;

                  return (
                    <div
                      key={mcq.id}
                      className="p-6 bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl shadow-soft space-y-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-primary font-mono bg-primary/10 px-2.5 py-0.5 rounded-md">
                            Question {mIdx + 1}
                          </span>
                          <h4 className="text-sm font-bold text-text-primary leading-relaxed">
                            {mcq.question}
                          </h4>
                        </div>
                        {mcq.highYieldTag && (
                          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-200/50 shrink-0">
                            {mcq.highYieldTag}
                          </span>
                        )}
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {mcq.options.map((opt, oIdx) => {
                          const isOptionSelected = selected === oIdx;
                          let optionStyle = 'bg-bg-secondary/50 border-border/60 text-text-primary hover:border-primary/40';

                          if (quizSubmitted) {
                            if (oIdx === mcq.correctIndex) {
                              optionStyle = 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold';
                            } else if (isOptionSelected && !isCorrect) {
                              optionStyle = 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100';
                            }
                          } else if (isOptionSelected) {
                            optionStyle = 'bg-primary/15 border-primary text-primary font-bold';
                          }

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleSelectOption(mcq.id, oIdx)}
                              className={`w-full p-3.5 rounded-2xl border text-xs text-left transition-all flex items-center justify-between ${optionStyle}`}
                            >
                              <span>{opt}</span>
                              <span className="w-5 h-5 rounded-full border border-current font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      {quizSubmitted && (
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl text-xs text-text-secondary leading-relaxed space-y-1">
                          <span className="font-bold text-primary block">Explanation:</span>
                          <p>{mcq.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Reset Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4">
                {quizSubmitted ? (
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-6 py-3 bg-bg-secondary hover:bg-border text-text-primary text-xs font-bold rounded-2xl transition-all flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Quiz</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setQuizSubmitted(true)}
                    disabled={Object.keys(selectedAnswers).length === 0}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-soft transition-all"
                  >
                    Submit Quiz Answers
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 4: VIVA & CASES */}
          {activeTab === 'viva' && (
            <motion.div
              key="viva-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Viva Questions Accordion */}
              <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Oral Viva Voce Prep
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    High-Frequency Examiner Viva Questions
                  </h3>
                </div>

                <div className="space-y-4">
                  {chapterDetail.vivaQuestions.map((v) => {
                    const isRevealed = revealedVivas[v.id];

                    return (
                      <div
                        key={v.id}
                        className="p-5 bg-bg-secondary/40 border border-border/60 rounded-2xl space-y-3"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-sm font-bold text-text-primary leading-relaxed">
                            Q: {v.question}
                          </h4>
                          <button
                            onClick={() => toggleVivaReveal(v.id)}
                            className="px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl transition-colors shrink-0 flex items-center gap-1"
                          >
                            {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>{isRevealed ? 'Hide Answer' : 'Reveal Answer'}</span>
                          </button>
                        </div>

                        {isRevealed && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/60 rounded-xl space-y-2"
                          >
                            <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                              <strong>Answer:</strong> {v.answer}
                            </p>
                            {v.clinicalPearl && (
                              <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                                💎 Clinical Pearl: {v.clinicalPearl}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Case-Based Questions */}
              {chapterDetail.caseBasedQuestions.length > 0 && (
                <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Case-Based Clinical &amp; Legal Scenarios
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      Problem-Solving Clinical Case Studies
                    </h3>
                  </div>

                  {chapterDetail.caseBasedQuestions.map((cq) => (
                    <div key={cq.id} className="p-6 bg-primary/5 border border-primary/20 rounded-2xl space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-primary">
                          {cq.title}
                        </span>
                        <p className="text-xs text-text-primary leading-relaxed bg-white dark:bg-zinc-950 p-4 rounded-xl border border-border/40 font-medium">
                          <strong>Clinical Scenario:</strong> {cq.scenario}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-xs font-bold text-text-primary">Questions asked by examiner:</span>
                        <ul className="list-disc pl-5 text-xs text-text-secondary space-y-1">
                          {cq.questions.map((q, qIdx) => (
                            <li key={qIdx}>{q}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 rounded-xl space-y-2">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                          Step-by-Step Solution &amp; Legal Application:
                        </span>
                        <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-medium">
                          {cq.solution}
                        </p>
                        {cq.legalSections && (
                          <div className="flex flex-wrap gap-2 pt-1">
                            {cq.legalSections.map((sec, sIdx) => (
                              <span key={sIdx} className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md font-mono">
                                {sec}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5: EXAM PREP & REVISION SHEET */}
          {activeTab === 'revision' && (
            <motion.div
              key="revision-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-10"
            >
              {/* Quick Revision Section */}
              {chapterDetail.quickRevision && (
                <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                      1-Minute Rapid Revision
                    </span>
                    <h3 className="text-xl font-display font-bold text-text-primary">
                      Quick Recall: {chapterDetail.title}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 bg-primary/5 border border-primary/20 rounded-2xl">
                      <h4 className="text-xs font-black uppercase text-primary tracking-wider mb-2">Core Definition</h4>
                      <p className="text-sm font-bold text-text-primary leading-relaxed">
                        {chapterDetail.quickRevision.definition}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {chapterDetail.quickRevision.keyPoints.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-3 bg-bg-secondary/40 border border-border/60 rounded-xl">
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs font-medium text-text-secondary">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Related Topics Exploration */}
              {chapterDetail.relatedTopics && chapterDetail.relatedTopics.length > 0 && (
                <div className="bg-bg-secondary/30 border border-border/60 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <Compass className="w-5 h-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Related Modules</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {chapterDetail.relatedTopics.map((topic, idx) => (
                      <div key={idx} className="px-4 py-2 bg-white dark:bg-zinc-900 border border-border/60 rounded-xl text-xs font-bold text-primary shadow-soft-xs">
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Short Notes & Model Answers */}
              <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Short Notes (5 Marks Model Answers)
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    Ready-to-Write Exam Short Notes
                  </h3>
                </div>

                <div className="space-y-4">
                  {chapterDetail.shortNotes.map((sn, idx) => (
                    <div key={idx} className="p-5 bg-bg-secondary/40 border border-border/60 rounded-2xl space-y-2">
                      <h4 className="text-sm font-bold text-primary">{sn.title}</h4>
                      <p className="text-xs text-text-secondary leading-relaxed font-medium">
                        {sn.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Long Question Outlines */}
              <div className="bg-white dark:bg-zinc-900 border border-border/70 rounded-3xl p-6 md:p-8 shadow-soft space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Long Essay Questions (10 Marks Structure)
                  </span>
                  <h3 className="text-xl font-display font-bold text-text-primary">
                    Recommended Essay Answer Structures
                  </h3>
                </div>

                {chapterDetail.longQuestions.map((lq, lIdx) => (
                  <div key={lIdx} className="p-5 bg-primary/5 border border-primary/20 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-text-primary">{lq.title}</h4>
                    <ol className="list-decimal pl-5 text-xs text-text-secondary space-y-1 font-medium">
                      {lq.outline.map((item, iIdx) => (
                        <li key={iIdx}>{item}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>

              {/* Pre-Exam Revision Sheet */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/40 dark:to-zinc-900 border border-amber-200/80 rounded-3xl p-6 md:p-8 shadow-soft space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="text-xl font-display font-bold text-amber-950 dark:text-amber-100">
                    5-Minute Pre-Exam Cheat Sheet
                  </h3>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-amber-950 dark:text-amber-200 font-medium">
                  {chapterDetail.revisionSheet.map((item, rIdx) => (
                    <li key={rIdx} className="p-3 bg-white/80 dark:bg-zinc-900/80 border border-amber-200/50 rounded-xl flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Steps / Practice Section */}
        <div className="mt-20 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group p-8 bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-800/30 rounded-[2.5rem] flex flex-col justify-between gap-6 hover:shadow-glow transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                  <CheckSquare className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-black text-emerald-950 dark:text-emerald-100">MCQ Challenge</h3>
                  <p className="text-sm text-emerald-800/70 dark:text-emerald-400 font-medium leading-relaxed">
                    Test your understanding of {chapterDetail.title} with 10 interactive questions.
                  </p>
                </div>
              </div>
              <Link 
                to="/fmt/mcq"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all"
              >
                Start Practice
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="group p-8 bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-200 dark:border-indigo-800/30 rounded-[2.5rem] flex flex-col justify-between gap-6 hover:shadow-glow transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Brain className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-black text-indigo-950 dark:text-indigo-100">Viva Voice</h3>
                  <p className="text-sm text-indigo-800/70 dark:text-indigo-400 font-medium leading-relaxed">
                    Master oral exam questions and click-to-reveal answers for this module.
                  </p>
                </div>
              </div>
              <Link 
                to="/fmt/viva"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all"
              >
                Open Viva Bank
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Topic Navigation */}
          <div className="flex items-center justify-between gap-4 pt-8 border-t border-border/60">
            {prevChapter ? (
              <Link 
                to={`/fmt/learn/${params.moduleId || 'death-postmortem-changes'}/${prevChapter.id}`}
                className="flex-1 p-6 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">
                  <ArrowLeft className="w-3 h-3" />
                  Previous Topic
                </div>
                <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                  {prevChapter.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}

            {nextChapter ? (
              <Link 
                to={`/fmt/learn/${params.moduleId || 'death-postmortem-changes'}/${nextChapter.id}`}
                className="flex-1 p-6 bg-white dark:bg-zinc-900 border border-border/60 rounded-3xl hover:border-primary/30 transition-all group text-right"
              >
                <div className="flex items-center justify-end gap-2 text-[10px] font-black uppercase tracking-widest text-text-tertiary mb-1">
                  Next Topic
                  <ArrowRight className="w-3 h-3" />
                </div>
                <h4 className="text-sm font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                  {nextChapter.title}
                </h4>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>
      </main>
      <FmtBottomNav />
    </div>
  );
}
