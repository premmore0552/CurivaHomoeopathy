import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sliders, Compass, BookOpen, Zap, Sparkles, Brain, 
  ArrowUp, Search, X, ChevronRight, GraduationCap, 
  Check, Activity, FileText, LayoutGrid, MessageSquare, 
  Type, Columns, AlignLeft, Info
} from 'lucide-react';
import { useReading, FontSize, ReadingWidth, LineSpacing, ReaderTheme } from '../context/ReadingContext';

interface HeadingItem {
  id: string;
  text: string;
  level: 'h2' | 'h3';
  element: HTMLElement;
}

const CLINICAL_PEARLS = [
  {
    author: "Samuel Hahnemann",
    text: "The highest ideal of cure is rapid, gentle and permanent restoration of health, and removal or anhiliation of the disease in the shortest, most reliable, and most harmless way, on easily comprehensible principles."
  },
];

export default function FloatingQuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'toc' | 'reader' | 'tools'>('reader');
  const [headings, setHeadings] = useState<HeadingItem[]>([]);
  const [activeHeadingId, setActiveHeadingId] = useState<string>('');
  const [currentPearlIdx, setCurrentPearlIdx] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    fontSize, setFontSize,
    readingWidth, setReadingWidth,
    lineSpacing, setLineSpacing,
    readerTheme, setReaderTheme
  } = useReading();

  // Pick a clinical pearl based on the day or route
  useEffect(() => {
    const sum = location.pathname.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    setCurrentPearlIdx(sum % CLINICAL_PEARLS.length);
  }, [location.pathname]);

  // Monitor scroll height to show Back to Top sub-button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Collect headings on page navigation or DOM mutations
  useEffect(() => {
    const collectHeadings = () => {
      const selector = 'main h2, main h3, article h2, article h3, .long-form h2, .long-form h3, .container h2, .container h3';
      const elements = Array.from(document.querySelectorAll(selector)) as HTMLElement[];
      
      const gathered: HeadingItem[] = elements.map((el, index) => {
        if (!el.id) {
          const cleanText = (el.textContent || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
          el.id = cleanText || `heading-${index}`;
        }
        return {
          id: el.id,
          text: el.textContent || '',
          level: el.tagName.toLowerCase() as 'h2' | 'h3',
          element: el,
        };
      });

      setHeadings(gathered);

      if (gathered.length > 0) {
        setActiveTab('toc');
      } else {
        setActiveTab('reader');
      }

      // Setup Intersection Observer for active section tracking
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      }, {
        root: null,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      });

      gathered.forEach((item) => {
        if (item.element && observerRef.current) {
          observerRef.current.observe(item.element);
        }
      });
    };

    const timer = setTimeout(collectHeadings, 600);
    return () => {
      clearTimeout(timer);
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [location.pathname]);

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // On mobile, close drawer to show content
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }
  };

  const triggerCommandPalette = () => {
    setIsOpen(false);
    setTimeout(() => {
      const event = new CustomEvent('open-command-palette');
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <>
      {/* PERSISTENT FLOATING ACTIONS TRIGGERS */}
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] right-3 sm:bottom-6 sm:right-6 z-40 flex max-w-[calc(100vw-1.5rem)] flex-col items-end gap-2.5">
        {/* Back To Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-white dark:bg-gray-900 hover:bg-bg-secondary text-text-secondary dark:text-text-primary border border-border rounded-full shadow-lg cursor-pointer transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/40"
              title="Scroll back to top"
              id="fab-scroll-top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Master Trigger Panel */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(true)}
          className="min-h-11 max-w-full px-3 py-3 sm:px-4 sm:py-3.5 bg-primary hover:bg-primary-dark text-white rounded-full shadow-xl shadow-primary/25 cursor-pointer transition-all flex items-center justify-center gap-2 border border-primary/20 group focus:outline-none focus:ring-2 focus:ring-primary/40"
          title="Open Quick Settings & Directory"
          id="fab-quick-actions"
        >
          <Sliders className="w-4 h-4 animate-pulse group-hover:rotate-45 transition-transform duration-300" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide sm:tracking-wider pr-0.5 whitespace-nowrap">Quick Actions</span>
          {headings.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-accent animate-ping absolute top-0.5 right-0.5" />
          )}
        </motion.button>
      </div>

      {/* QUICK ACTIONS PANEL DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-50 cursor-pointer"
              id="fab-backdrop"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="fixed inset-y-0 right-0 h-[100dvh] w-[min(100vw,24rem)] sm:w-100 bg-white dark:bg-gray-950 border-l border-border shadow-2xl z-50 flex flex-col"
              id="fab-drawer-panel"
            >
              {/* Header */}
              <div className="p-5 border-b border-border/80 flex items-center justify-between bg-bg-secondary/20 dark:bg-gray-950">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-primary/10 text-primary dark:bg-primary/20">
                    <Sliders className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xs text-text-primary uppercase tracking-widest">
                      Ecosystem Controls
                    </h3>
                    <p className="text-[10px] text-text-tertiary">
                      Personalize your active learning environment
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-bg-secondary dark:hover:bg-gray-900 text-text-secondary rounded-lg transition-all border border-transparent hover:border-border cursor-pointer focus:outline-none"
                  id="fab-drawer-close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Tabs inside Panel */}
              <div className="grid grid-cols-3 border-b border-border/60 bg-bg-secondary/40 dark:bg-gray-900/30 p-1">
                {headings.length > 0 && (
                  <button
                    onClick={() => setActiveTab('toc')}
                    className={`py-2 text-[10.5px] font-black uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                      activeTab === 'toc'
                        ? 'bg-white dark:bg-gray-950 text-primary border border-border shadow-sm font-bold'
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    Directory
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('reader')}
                  className={`py-2 text-[10.5px] font-black uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'reader'
                      ? 'bg-white dark:bg-gray-950 text-primary border border-border shadow-sm font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  } ${headings.length === 0 ? 'col-span-2' : ''}`}
                >
                  Reader Prefs
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`py-2 text-[10.5px] font-black uppercase tracking-wider rounded-lg transition-all text-center cursor-pointer ${
                    activeTab === 'tools'
                      ? 'bg-white dark:bg-gray-950 text-primary border border-border shadow-sm font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  Quick Tools
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin dark:bg-gray-950">
                
                {/* 1. TABLE OF CONTENTS TAB */}
                {activeTab === 'toc' && headings.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                        Page Table of Contents
                      </h4>
                      <span className="text-[9px] font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                        {headings.length} segments
                      </span>
                    </div>

                    <div className="space-y-1 divide-y divide-border/20">
                      {headings.map((item, idx) => {
                        const isActive = activeHeadingId === item.id;
                        return (
                          <button
                            key={idx}
                            onClick={() => scrollToHeading(item.id)}
                            className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-start gap-2.5 cursor-pointer text-xs ${
                              isActive
                                ? 'bg-primary/5 text-primary border-l-4 border-primary pl-2 font-bold'
                                : 'hover:bg-bg-secondary dark:hover:bg-gray-900 text-text-secondary hover:text-text-primary border-l-4 border-transparent'
                            } ${item.level === 'h3' ? 'pl-6 text-[11px]' : 'font-medium'}`}
                          >
                            <ChevronRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-primary' : 'text-text-tertiary/40'}`} />
                            <span className="leading-tight break-words">{item.text}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. READER PREFERENCES TAB */}
                {activeTab === 'reader' && (
                  <div className="space-y-5">
                    {/* Theme Preference */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
                        Reading Palette
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-secondary dark:bg-gray-900 rounded-xl border border-border">
                        {[
                          { id: 'default', label: 'Default' },
                          { id: 'sepia', label: 'Warm Sepia' },
                          { id: 'dark-contrast', label: 'Cozy Dark' }
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => setReaderTheme(t.id as ReaderTheme)}
                            className={`py-2 text-[10px] font-bold uppercase rounded-lg transition-all text-center cursor-pointer ${
                              readerTheme === t.id
                                ? t.id === 'sepia'
                                  ? 'bg-[#E9DFCB] text-[#433422] shadow-sm border border-[#D5C6A9]'
                                  : t.id === 'dark-contrast'
                                    ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700'
                                    : 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Font Size Preference */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
                        Font Size Sizing
                      </label>
                      <div className="grid grid-cols-4 gap-1 p-1 bg-bg-secondary dark:bg-gray-900 rounded-xl border border-border text-center">
                        {(['sm', 'md', 'lg', 'xl'] as FontSize[]).map((sz) => (
                          <button
                            key={sz}
                            onClick={() => setFontSize(sz)}
                            className={`py-1.5 text-xs font-bold uppercase rounded-lg transition-all cursor-pointer ${
                              fontSize === sz
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Reading Width Preference */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
                        Text Column Width
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-secondary dark:bg-gray-900 rounded-xl border border-border text-center">
                        {[
                          { id: 'narrow', label: 'Narrow', icon: Columns },
                          { id: 'medium', label: 'Medium', icon: Columns },
                          { id: 'wide', label: 'Wide', icon: Columns }
                        ].map((w) => (
                          <button
                            key={w.id}
                            onClick={() => setReadingWidth(w.id as ReadingWidth)}
                            className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                              readingWidth === w.id
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            <span>{w.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Line Spacing Preference */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-text-tertiary block">
                        Vertical Line Spacing
                      </label>
                      <div className="grid grid-cols-3 gap-1.5 p-1 bg-bg-secondary dark:bg-gray-900 rounded-xl border border-border text-center">
                        {[
                          { id: 'compact', label: 'Compact' },
                          { id: 'normal', label: 'Normal' },
                          { id: 'relaxed', label: 'Relaxed' }
                        ].map((ls) => (
                          <button
                            key={ls.id}
                            onClick={() => setLineSpacing(ls.id as LineSpacing)}
                            className={`py-1.5 text-[10px] font-bold uppercase rounded-lg transition-all cursor-pointer ${
                              lineSpacing === ls.id
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:text-text-primary'
                            }`}
                          >
                            {ls.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Preview Area showing styling changes instantly */}
                    <div className="mt-4 p-4 rounded-xl border border-border/60 bg-bg-secondary/50 dark:bg-gray-900/40 text-left space-y-1.5">
                      <span className="text-[9px] uppercase font-bold text-accent tracking-widest">Aesthetic Live Preview</span>
                      <p className={`font-serif italic leading-relaxed text-text-primary ${
                        fontSize === 'sm' ? 'text-xs' : fontSize === 'md' ? 'text-sm' : fontSize === 'lg' ? 'text-base' : 'text-lg'
                      } ${
                        lineSpacing === 'compact' ? 'leading-tight' : lineSpacing === 'normal' ? 'leading-normal' : 'leading-loose'
                      }`}>
                        “The highest ideal of cure is rapid, gentle and permanent restoration of health.”
                      </p>
                      <p className="text-[10px] text-text-tertiary font-mono">— Organon, Section 2</p>
                    </div>
                  </div>
                )}

                {/* 3. QUICK TOOLS TAB */}
                {activeTab === 'tools' && (
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-text-tertiary">
                      Ecosystem Utilities
                    </h4>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Launch search console */}
                      <button
                        onClick={triggerCommandPalette}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <Search className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">Cmd+K Search</span>
                          <span className="text-[9px] text-text-tertiary">Ecosystem search</span>
                        </div>
                      </button>

                      {/* Launch MCQ practice */}
                      <Link
                        to="/student-academy/mcq-practice"
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <GraduationCap className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">MCQ Practice</span>
                          <span className="text-[9px] text-text-tertiary">Exams & quizzes</span>
                        </div>
                      </Link>

                      {/* Launch symptom checker */}
                      <Link
                        to="/symptom-checker"
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <Activity className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">Symptom Engine</span>
                          <span className="text-[9px] text-text-tertiary">Differential lookup</span>
                        </div>
                      </Link>

                      {/* Study Guide / Visualization */}
                      <Link
                        to="/visualization"
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <Brain className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">Study Mind Map</span>
                          <span className="text-[9px] text-text-tertiary">Visual learning charts</span>
                        </div>
                      </Link>

                      {/* Ask Homoeopath / Ask Expert */}
                      <Link
                        to="/ask-Homoeopath"
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <MessageSquare className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">Ask Homoeopath</span>
                          <span className="text-[9px] text-text-tertiary">Consult expert AI</span>
                        </div>
                      </Link>

                      {/* Materia Medica Encyclopedia */}
                      <Link
                        to="/materia-medica"
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-bg-secondary dark:bg-gray-900 hover:bg-primary/5 dark:hover:bg-primary/10 border border-border hover:border-primary/30 rounded-xl text-left transition-all group flex flex-col justify-between h-24 cursor-pointer"
                      >
                        <BookOpen className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-wider text-text-primary block">Encyclopedia</span>
                          <span className="text-[9px] text-text-tertiary">Browse all remedies</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )}

              </div>

              {/* Dynamic Footer with Academic Wisdom Box */}
              <div className="p-5 border-t border-border/80 bg-bg-secondary/40 dark:bg-gray-900/40 space-y-3.5">
                <div className="p-4 bg-white dark:bg-gray-950 rounded-2xl border border-border/80 shadow-inner flex gap-3 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl pointer-events-none" />
                  <div className="p-1.5 bg-accent/5 dark:bg-accent/15 text-accent rounded-xl h-fit">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="space-y-1 text-left flex-1">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#C5A059] block">Clinical Pearl</span>
                    <p className="text-[11px] font-serif italic text-text-primary leading-relaxed">
                      “{CLINICAL_PEARLS[currentPearlIdx].text}”
                    </p>
                    <span className="text-[9px] font-bold text-text-tertiary block mt-0.5">
                      — {CLINICAL_PEARLS[currentPearlIdx].author}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px]">
                  <button
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      setIsOpen(false);
                    }}
                    className="font-bold text-primary hover:text-primary-dark transition-colors uppercase tracking-wider flex items-center gap-1 cursor-pointer focus:outline-none"
                    id="fab-drawer-top-link"
                  >
                    <ArrowUp className="w-3 h-3" /> Scroll to Top
                  </button>
                  <span className="font-mono text-text-tertiary">
                    Curiva Study Campus v2.5
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
