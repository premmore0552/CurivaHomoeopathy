import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  BookOpen, 
  Sun, 
  Moon, 
  BookMarked, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  List, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Sparkles,
  CheckCircle2,
  Star,
  Filter
} from 'lucide-react';
import SEO from '../components/SEO';
import { EBOOKS_DATABASE, EBookBook, EBookSection } from '../data/ebooksData';

const CATEGORY_TABS = [
  "All",
  "⭐ Best Sellers",
  "Heart & Circulation",
  "Diabetes & Metabolism",
  "Thyroid Health",
  "Women's Health",
  "Child Health",
  "Respiratory Health",
  "Digestive Health",
  "Bone & Joint Health",
  "Mental Wellness",
  "Skin & Hair",
  "Nutrition",
  "Preventive Health"
];

export default function PublicHealthEBook() {
  // Selected eBook from Database
  const [selectedBook, setSelectedBook] = useState<EBookBook>(EBOOKS_DATABASE[0]);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

  // Category & Search State
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [bookSearchQuery, setBookSearchQuery] = useState<string>("");

  // Reader Customization State
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [fontSize, setFontSize] = useState<number>(17); // in px
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('serif');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [chapterSearchQuery, setChapterSearchQuery] = useState<string>("");
  const [showTocMobile, setShowTocMobile] = useState<boolean>(false);

  // Reader viewport container ref for scrolling
  const readerContentRef = useRef<HTMLDivElement>(null);

  // Current active section
  const currentSection: EBookSection = selectedBook.sections[activeSectionIndex] || selectedBook.sections[0];

  // Filtered eBooks
  const filteredBooks = EBOOKS_DATABASE.filter(book => {
    const matchesCategory = 
      activeCategory === "All" ||
      (activeCategory === "⭐ Best Sellers" && book.isBestSeller) ||
      book.category.toLowerCase().includes(activeCategory.toLowerCase().replace(/[^\w\s]/gi, '').trim());

    const matchesSearch = 
      !bookSearchQuery ||
      book.title.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      book.subtitle.toLowerCase().includes(bookSearchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(bookSearchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Stop audio speech if active book or section changes
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    }
  }, [selectedBook.id, activeSectionIndex]);

  // Handle Book Switching
  const handleSelectBook = (book: EBookBook) => {
    setSelectedBook(book);
    setActiveSectionIndex(0);
    setShowTocMobile(false);
    if (readerContentRef.current) {
      readerContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Section Navigation
  const handleNextSection = () => {
    if (activeSectionIndex < selectedBook.sections.length - 1) {
      setActiveSectionIndex(prev => prev + 1);
      scrollToTop();
    }
  };

  const handlePrevSection = () => {
    if (activeSectionIndex > 0) {
      setActiveSectionIndex(prev => prev - 1);
      scrollToTop();
    }
  };

  const scrollToTop = () => {
    if (readerContentRef.current) {
      readerContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Text-to-Speech Toggler
  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert("Audio speech synthesis is not supported in this browser.");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      const textToRead = currentSection.content.replace(/[#*`>_\[\]\(\)]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(textToRead.substring(0, 3500));
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  // Reader Background Theme Classes
  const getThemeClasses = () => {
    switch (readerTheme) {
      case 'sepia':
        return 'bg-[#FBF0D9] text-[#332516] border-[#E5D2B3] shadow-md';
      case 'dark':
        return 'bg-[#18181B] text-[#E4E4E7] border-[#27272A] shadow-lg';
      case 'light':
      default:
        return 'bg-white text-text-primary border-border shadow-soft';
    }
  };

  // Font Family Classes
  const getFontFamilyClass = () => {
    switch (fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary pb-28">
      <SEO 
        title={`${selectedBook.title} | Curiva Public Health Series`}
        description={selectedBook.description}
      />

      {/* Hero Header */}
      <header className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-bg-secondary border-b border-border text-center mb-10">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.25em] text-primary"
          >
            <BookOpen className="w-3.5 h-3.5" /> Curiva Public Health Series
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-medium text-text-primary tracking-tight"
          >
            Curiva Public Health <span className="text-primary italic">Education Library</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs md:text-sm text-text-secondary max-w-2xl mx-auto leading-relaxed"
          >
            Your trusted health education library featuring official patient awareness publications, medical report decoders, and evidence-informed homoeopathic wellness guides.
          </motion.p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SECTION 1: eBook Library Selection Shelf */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary block">Select Publication</span>
              <h2 className="text-2xl font-display font-bold text-text-primary">Public Health Series Directory</h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-text-tertiary absolute left-3.5 top-3" />
              <input
                type="text"
                value={bookSearchQuery}
                onChange={(e) => setBookSearchQuery(e.target.value)}
                placeholder="Search eBook library..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-xl text-xs font-medium text-text-primary focus:outline-none focus:border-primary shadow-xs"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CATEGORY_TABS.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-white border-border text-text-secondary hover:border-primary/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* eBooks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => {
                const isSelected = selectedBook.id === book.id;
                return (
                  <motion.div
                    key={book.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectBook(book)}
                    className={`relative p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                      isSelected
                        ? 'bg-primary/5 border-primary shadow-md ring-2 ring-primary/20'
                        : 'bg-white border-border hover:border-primary/40 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-2xl overflow-hidden bg-bg-secondary border border-border/60">
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                          <span className="px-2.5 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-wider rounded-md">
                            {book.category}
                          </span>
                          {book.isBestSeller && (
                            <span className="px-2.5 py-0.5 bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider rounded-md flex items-center gap-1 shadow-xs">
                              <Star className="w-3 h-3 fill-white" /> Best Seller
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-text-tertiary flex items-center gap-1">
                            <Clock className="w-3 h-3 text-primary" /> {book.readTime}
                          </span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
                        </div>
                        <h3 className="text-sm font-bold text-text-primary line-clamp-2 leading-snug">
                          {book.title}
                        </h3>
                        <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed font-normal">
                          {book.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-text-secondary font-medium">
                      <span className="flex items-center gap-1 font-bold text-primary">
                        {book.brand}
                      </span>
                      <span className="text-primary font-bold">Read Publication →</span>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full py-12 text-center bg-white rounded-3xl border border-dashed border-border p-8">
                <BookOpen className="w-8 h-8 text-text-tertiary mx-auto mb-2" />
                <p className="text-xs text-text-secondary font-bold">No eBooks match your filter criteria.</p>
                <button 
                  onClick={() => { setActiveCategory("All"); setBookSearchQuery(""); }}
                  className="mt-3 px-4 py-1.5 bg-primary/10 text-primary rounded-xl text-xs font-bold cursor-pointer hover:bg-primary hover:text-white transition-all"
                >
                  Reset Search Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: Publication Reader Canvas */}
        <section className="space-y-6">

          {/* Reader Top Controls Toolbar */}
          <div className="bg-white border border-border rounded-2xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-4 sticky top-10 z-30">
            
            {/* Left: Active Book & Current Chapter */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs md:text-sm font-bold text-text-primary line-clamp-1">{selectedBook.title}</h3>
                <span className="text-[10px] text-text-secondary font-medium">
                  Chapter {activeSectionIndex + 1} of {selectedBook.sections.length}: <span className="text-primary font-semibold">{currentSection.title}</span>
                </span>
              </div>
            </div>

            {/* Middle: Controls (Theme, Typography, Audio, TOC) */}
            <div className="flex items-center gap-2">
              
              {/* Theme Switcher */}
              <div className="flex items-center p-1 bg-bg-secondary border border-border rounded-xl">
                <button
                  onClick={() => setReaderTheme('light')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${readerTheme === 'light' ? 'bg-white text-primary shadow-xs' : 'text-text-secondary hover:text-primary'}`}
                  title="Light Theme"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('sepia')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${readerTheme === 'sepia' ? 'bg-[#FBF0D9] text-[#433422] shadow-xs' : 'text-text-secondary hover:text-primary'}`}
                  title="Sepia Warm Theme"
                >
                  <BookMarked className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('dark')}
                  className={`p-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${readerTheme === 'dark' ? 'bg-[#18181B] text-white shadow-xs' : 'text-text-secondary hover:text-primary'}`}
                  title="Night Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="flex items-center gap-1 p-1 bg-bg-secondary border border-border rounded-xl">
                <button
                  onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
                  className="px-2 py-1 text-xs font-black text-text-secondary hover:text-primary cursor-pointer"
                  title="Decrease Font Size"
                >
                  A-
                </button>
                <span className="text-[10px] font-bold text-text-tertiary px-1">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
                  className="px-2 py-1 text-xs font-black text-text-secondary hover:text-primary cursor-pointer"
                  title="Increase Font Size"
                >
                  A+
                </button>
              </div>

              {/* Font Family Selector */}
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value as any)}
                className="px-2.5 py-1.5 bg-bg-secondary border border-border rounded-xl text-xs font-bold text-text-primary focus:outline-none cursor-pointer"
              >
                <option value="serif">Book Serif</option>
                <option value="sans">Clean Sans</option>
                <option value="mono">Monospace</option>
              </select>

              {/* Speech Audio Reader */}
              <button
                onClick={toggleSpeech}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isPlayingAudio ? 'bg-accent text-white animate-pulse' : 'bg-bg-secondary text-text-secondary hover:text-primary'
                }`}
                title="Listen to Section Audio"
              >
                {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span className="hidden sm:inline">{isPlayingAudio ? "Stop Audio" : "Listen"}</span>
              </button>

              {/* Mobile TOC Toggler */}
              <button
                onClick={() => setShowTocMobile(!showTocMobile)}
                className="lg:hidden p-2 bg-bg-secondary border border-border text-text-secondary rounded-xl text-xs font-bold cursor-pointer"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Book Reader Layout (Sidebar Index + Page Content) */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* Sidebar Table of Contents */}
            <aside className={`lg:block ${showTocMobile ? 'block' : 'hidden'} lg:col-span-1 bg-white border border-border rounded-3xl p-6 shadow-soft space-y-4 max-h-[80vh] overflow-y-auto sticky top-10`}>
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                  <List className="w-4 h-4" /> Chapter Index
                </span>
                <span className="text-[10px] font-black text-text-tertiary">{selectedBook.sections.length} Chapters</span>
              </div>

              {/* Search Within Book */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-text-tertiary absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={chapterSearchQuery}
                  onChange={(e) => setChapterSearchQuery(e.target.value)}
                  placeholder="Filter chapters..."
                  className="w-full pl-8 pr-3 py-1.5 bg-bg-secondary border border-border rounded-xl text-[11px] font-medium text-text-primary focus:outline-none focus:border-primary"
                />
              </div>

              {/* Chapter Navigation Items */}
              <nav className="space-y-1.5 pt-2">
                {selectedBook.sections
                  .filter((sec) => !chapterSearchQuery || sec.title.toLowerCase().includes(chapterSearchQuery.toLowerCase()))
                  .map((sec, idx) => {
                    const isCurrent = idx === activeSectionIndex;
                    return (
                      <button
                        key={sec.id}
                        onClick={() => {
                          setActiveSectionIndex(idx);
                          setShowTocMobile(false);
                          scrollToTop();
                        }}
                        className={`w-full text-left py-2 px-3 rounded-xl text-xs transition-all flex items-center gap-2 cursor-pointer ${
                          isCurrent
                            ? 'bg-primary text-white font-bold shadow-xs'
                            : 'text-text-secondary hover:bg-bg-secondary hover:text-primary font-medium'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${isCurrent ? 'bg-white/20 text-white' : 'bg-bg-secondary text-text-tertiary'}`}>
                          {idx + 1}
                        </span>
                        <span className="line-clamp-1">{sec.title}</span>
                      </button>
                    );
                  })}
              </nav>
            </aside>

            {/* eBook Reader Page Canvas */}
            <div className="lg:col-span-3">
              <div ref={readerContentRef} className="scroll-mt-16">
                <AnimatePresence mode="wait">
                  <motion.article 
                    key={`${selectedBook.id}-${currentSection.id}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={`p-8 md:p-14 border rounded-[3rem] transition-all duration-300 ${getThemeClasses()} ${getFontFamilyClass()}`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {/* Publication Cover Branding Header */}
                    <div className="border-b border-border/40 pb-8 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold text-sm">
                          CH
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block">
                            {selectedBook.brand} • {selectedBook.category}
                          </span>
                          <span className="text-xs font-bold text-text-secondary">
                            Official Publication • {selectedBook.version}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-text-tertiary font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Curiva Evidence-Informed Publication</span>
                      </div>
                    </div>

                    {/* Markdown Content Renderer */}
                    <div className="markdown-body space-y-6 leading-relaxed">
                      <Markdown
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-primary mt-6 mb-6 pb-3 border-b border-border/60">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-2xl font-bold text-text-primary mt-8 mb-4 pt-4 border-t border-border/30">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-xl font-bold text-primary/90 mt-6 mb-3">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4 leading-relaxed font-normal">
                              {children}
                            </p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc pl-6 mb-4 space-y-2 text-text-secondary font-medium">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal pl-6 mb-4 space-y-2 text-text-secondary font-medium">
                              {children}
                            </ol>
                          ),
                          blockquote: ({ children }) => (
                            <blockquote className="p-5 my-6 bg-primary/5 border-l-4 border-primary rounded-r-2xl font-medium text-text-secondary text-sm italic">
                              {children}
                            </blockquote>
                          ),
                          table: ({ children }) => (
                            <div className="overflow-x-auto my-6 rounded-2xl border border-border/60">
                              <table className="w-full text-left text-xs">
                                {children}
                              </table>
                            </div>
                          ),
                          th: ({ children }) => (
                            <th className="bg-primary/10 p-3 font-bold text-primary border-b border-border/60">
                              {children}
                            </th>
                          ),
                          td: ({ children }) => (
                            <td className="p-3 border-b border-border/40 font-medium text-text-secondary">
                              {children}
                            </td>
                          ),
                          hr: () => (
                            <hr className="my-8 border-border/60" />
                          )
                        }}
                      >
                        {currentSection.content}
                      </Markdown>
                    </div>

                    {/* Bottom Page Pagination Bar */}
                    <div className="border-t border-border/40 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        onClick={handlePrevSection}
                        disabled={activeSectionIndex === 0}
                        className="w-full sm:w-auto px-5 py-2.5 bg-bg-secondary border border-border rounded-xl text-xs font-bold text-text-secondary hover:text-primary transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous Chapter</span>
                      </button>

                      <span className="text-xs font-bold text-text-tertiary">
                        {activeSectionIndex + 1} / {selectedBook.sections.length}
                      </span>

                      <button
                        onClick={handleNextSection}
                        disabled={activeSectionIndex === selectedBook.sections.length - 1}
                        className="w-full sm:w-auto px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-strong transition-all flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                      >
                        <span>Next Chapter</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Footer Medical Disclaimer */}
                    <div className="border-t border-border/40 pt-8 mt-8 space-y-3 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-amber-700">
                        <AlertTriangle className="w-3.5 h-3.5" /> Medical Disclaimer
                      </div>
                      <p className="text-[11px] text-text-tertiary max-w-2xl mx-auto leading-relaxed">
                        This publication is created for public education, academic reference, and patient awareness. It does not replace individual clinical consultation or personal medical diagnosis.
                      </p>
                      <p className="text-[10px] font-black text-primary uppercase tracking-widest pt-1">
                        © Curiva Homoeopathy • All Rights Reserved
                      </p>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
