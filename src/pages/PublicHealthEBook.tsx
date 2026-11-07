import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Markdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight, Bookmark, BookmarkCheck, BookOpen, BookMarked, CheckCircle2,
  ChevronLeft, ChevronRight, Clock3, HeartPulse, List, Moon, Search,
  ShieldCheck, Sparkles, Star, Sun, Type, Volume2, VolumeX, X
} from 'lucide-react';
import SEO from '../components/SEO';
import { EBOOKS_DATABASE, EBookBook, EBookSection } from '../data/ebooksData';

type ReaderTheme = 'light' | 'sepia' | 'dark';
type BookProgress = { lastSectionId?: string; completedSectionIds: string[]; bookmarkedSectionIds: string[] };
type ProgressStore = Record<string, BookProgress>;
const PROGRESS_KEY = 'curiva-public-ebook-progress-v1';
const EMPTY_SECTION: EBookSection = { id: 'overview', title: 'Overview', content: '# Welcome to Curiva\\n\\nChoose a chapter from the contents panel to begin.' };

function readProgress(): ProgressStore {
  try {
    const raw = typeof window === 'undefined' ? null : window.localStorage.getItem(PROGRESS_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as ProgressStore : {};
  } catch { return {}; }
}

function forBook(store: ProgressStore, id: string): BookProgress {
  const saved = store[id];
  return {
    lastSectionId: saved?.lastSectionId,
    completedSectionIds: Array.isArray(saved?.completedSectionIds) ? saved.completedSectionIds : [],
    bookmarkedSectionIds: Array.isArray(saved?.bookmarkedSectionIds) ? saved.bookmarkedSectionIds : []
  };
}

function themeClass(theme: ReaderTheme) {
  if (theme === 'sepia') return 'bg-[#fbf4e8] text-[#382b20] border-[#e7d8bf]';
  if (theme === 'dark') return 'bg-[#171b24] text-[#e8edf4] border-[#30394a]';
  return 'bg-white text-slate-800 border-slate-200';
}

function PublicMarkdown({ content }: { content: string }) {
  return (
    <div className="curiva-public-markdown max-w-none space-y-5 leading-relaxed">
      <Markdown components={{
        h1: ({ children }) => <h1 className="mb-6 mt-3 border-b border-current/10 pb-5 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-4 mt-10 border-t border-current/10 pt-7 font-display text-2xl font-bold text-primary md:text-3xl">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-3 mt-7 font-display text-xl font-bold text-current md:text-2xl">{children}</h3>,
        h4: ({ children }) => <h4 className="mb-2 mt-5 font-sans text-base font-bold text-current">{children}</h4>,
        p: ({ children }) => <p className="mb-4 leading-[1.9] text-current/85">{children}</p>,
        ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-6 text-current/85 marker:text-primary">{children}</ul>,
        ol: ({ children }) => <ol className="mb-5 list-decimal space-y-2 pl-6 text-current/85 marker:font-bold marker:text-primary">{children}</ol>,
        li: ({ children }) => <li className="pl-1 leading-[1.85]">{children}</li>,
        blockquote: ({ children }) => <blockquote className="my-7 rounded-r-2xl border-l-4 border-primary bg-primary/5 px-5 py-4 text-current/85">{children}</blockquote>,
        strong: ({ children }) => <strong className="font-bold text-current">{children}</strong>,
        hr: () => <hr className="my-8 border-current/15" />,
        table: ({ children }) => <div className="my-7 overflow-x-auto rounded-2xl border border-current/15"><table className="w-full min-w-[34rem] border-collapse text-left text-sm">{children}</table></div>,
        th: ({ children }) => <th className="bg-primary/10 px-4 py-3 text-left font-bold text-primary">{children}</th>,
        td: ({ children }) => <td className="border-t border-current/10 px-4 py-3 align-top text-current/85">{children}</td>
      }}>{content}</Markdown>
    </div>
  );
}

export default function PublicHealthEBook() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const readerRef = useRef<HTMLDivElement>(null);
  const selectedBook = useMemo<EBookBook>(() => EBOOKS_DATABASE.find((item) => item.id === bookId) || EBOOKS_DATABASE[0], [bookId]);

  const [progress, setProgress] = useState<ProgressStore>(readProgress);
  const [activeIndex, setActiveIndex] = useState(0);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [chapterSearch, setChapterSearch] = useState('');
  const [theme, setTheme] = useState<ReaderTheme>('light');
  const [fontSize, setFontSize] = useState(18);
  const [serif, setSerif] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [mobileContents, setMobileContents] = useState(false);

  const saved = forBook(progress, selectedBook.id);
  const section = selectedBook.sections[activeIndex] || selectedBook.sections[0] || EMPTY_SECTION;
  const percent = selectedBook.sections.length ? Math.min(100, Math.round(saved.completedSectionIds.length / selectedBook.sections.length * 100)) : 0;
  const totalChapters = EBOOKS_DATABASE.reduce((sum, book) => sum + book.sections.length, 0);

  const categories = useMemo(
    () => ['All', 'Featured', ...Array.from(new Set(EBOOKS_DATABASE.map((book) => book.category))).sort()],
    []
  );

  const books = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return EBOOKS_DATABASE.filter((book) => {
      const categoryMatch = category === 'All' || (category === 'Featured' ? Boolean(book.isBestSeller) : category === book.category);
      const searchable = [book.title, book.subtitle, book.description, book.tagline, book.category, book.brand];
      const textMatch = !query ||
        searchable.some((value) => value.toLocaleLowerCase().includes(query)) ||
        book.sections.some((item) => item.title.toLocaleLowerCase().includes(query) || item.content.toLocaleLowerCase().includes(query));
      return categoryMatch && textMatch;
    });
  }, [category, search]);

  const chapters = useMemo(() => {
    const query = chapterSearch.trim().toLocaleLowerCase();
    return selectedBook.sections.map((item, index) => ({ item, index })).filter(({ item }) =>
      !query || item.title.toLocaleLowerCase().includes(query) || item.content.toLocaleLowerCase().includes(query));
  }, [chapterSearch, selectedBook]);

  useEffect(() => {
    try { window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch { /* Local storage is optional. */ }
  }, [progress]);

  useEffect(() => {
    const lastId = progress[selectedBook.id]?.lastSectionId;
    const restored = selectedBook.sections.findIndex((item) => item.id === lastId);
    setActiveIndex(restored >= 0 ? restored : 0);
    setChapterSearch('');
    setMobileContents(false);
  }, [selectedBook.id]);

  useEffect(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setSpeaking(false);
    return () => { if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, [selectedBook.id, section.id]);

  const updateProgress = (updater: (current: BookProgress) => BookProgress) => {
    setProgress((previous) => ({ ...previous, [selectedBook.id]: updater(forBook(previous, selectedBook.id)) }));
  };

  const scrollToReader = () => readerRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  const selectBook = (book: EBookBook) => {
    setActiveIndex(0);
    navigate('/ebooks/' + book.id);
    window.setTimeout(scrollToReader, reduceMotion ? 0 : 100);
  };

  const selectChapter = (index: number) => {
    const target = selectedBook.sections[index];
    if (!target) return;
    setActiveIndex(index);
    setMobileContents(false);
    updateProgress((current) => ({ ...current, lastSectionId: target.id }));
    scrollToReader();
  };

  const moveChapter = (direction: -1 | 1) => {
    const next = Math.max(0, Math.min(selectedBook.sections.length - 1, activeIndex + direction));
    if (next !== activeIndex) selectChapter(next);
  };

  const toggleComplete = () => updateProgress((current) => ({
    ...current,
    lastSectionId: section.id,
    completedSectionIds: current.completedSectionIds.includes(section.id)
      ? current.completedSectionIds.filter((id) => id !== section.id)
      : [...current.completedSectionIds, section.id]
  }));

  const toggleBookmark = () => updateProgress((current) => ({
    ...current,
    lastSectionId: section.id,
    bookmarkedSectionIds: current.bookmarkedSectionIds.includes(section.id)
      ? current.bookmarkedSectionIds.filter((id) => id !== section.id)
      : [...current.bookmarkedSectionIds, section.id]
  }));

  const toggleAudio = () => {
    const speech = typeof window !== 'undefined'
      ? (window as unknown as { speechSynthesis?: SpeechSynthesis }).speechSynthesis
      : undefined;
    if (!speech || typeof SpeechSynthesisUtterance === 'undefined') {
      window.alert('Audio reading is not supported in this browser. You can still read the chapter normally.');
      return;
    }
    if (speaking) {
      speech.cancel();
      setSpeaking(false);
      return;
    }
    const text = section.content.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*_\u0060>]/g, ' ').replace(/\s+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 12000));
    utterance.rate = 0.92;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    speech.cancel();
    speech.speak(utterance);
    setSpeaking(true);
  };

  const bookmarked = saved.bookmarkedSectionIds.includes(section.id);
  const completed = saved.completedSectionIds.includes(section.id);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f8f5] pb-10 text-slate-900">
      <SEO title={bookId ? selectedBook.title + ' | Curiva Public Health Library' : 'Public Health eBooks | Curiva Homoeopathy'} description="Free, reader-friendly public health eBooks from Curiva. Search the full text, read chapter by chapter, and save reading progress privately on this device." />

      <header className="relative isolate overflow-hidden border-b border-[#e6e9e2] bg-[#102f2b] text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-[#cf2d83]/20 blur-3xl" />
          <motion.div aria-hidden="true" animate={reduceMotion ? undefined : { x: [0, -18, 0], y: [0, 14, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-36 -left-24 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(#fff 0.7px, transparent 0.7px)', backgroundSize: '18px 18px' }} />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-20 lg:px-8">
          <div className="space-y-7">
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur">
              <HeartPulse className="h-4 w-4 text-[#f3a6cd]" /> Curiva · Public Health Series
            </motion.div>
            <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }} className="space-y-4">
              <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Health knowledge,<span className="mt-1 block font-serif italic font-normal text-[#f5b8d8]">made easier to understand.</span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-white/75 sm:text-base">Explore practical guides on everyday health topics. Read at your pace, search through chapter text, adjust the page for comfortable reading, and return to where you left off.</p>
            </motion.div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" onClick={scrollToReader} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#f5b8d8] px-6 py-3 text-xs font-black uppercase tracking-wider text-[#35142a] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-white">Open the reader <ArrowRight className="h-4 w-4" /></button>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-white/70"><ShieldCheck className="h-4 w-4 text-emerald-200" /> General education · Not personal medical advice</span>
            </div>
          </div>

          <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-4 rounded-[2.5rem] border border-white/10" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl shadow-black/20 backdrop-blur">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/65"><span>Inside the library</span><Sparkles className="h-4 w-4 text-[#f5b8d8]" /></div>
              <div className="mt-7 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4"><BookOpen className="h-5 w-5 text-[#f5b8d8]" /><strong className="mt-4 block text-3xl font-semibold">{EBOOKS_DATABASE.length}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-white/65">Public guides</span></div>
                <div className="rounded-2xl bg-white/10 p-4"><List className="h-5 w-5 text-emerald-200" /><strong className="mt-4 block text-3xl font-semibold">{totalChapters}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-wider text-white/65">Chapters</span></div>
              </div>
              <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a2421]/60 p-4">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-[#cf2d83]"><img src="/app_icon.png.png" alt="Curiva" className="h-full w-full object-cover" onError={(event) => { event.currentTarget.src = '/curiva_logo.svg'; }} /></div>
                <div><p className="text-sm font-bold text-white">Your reading stays on this device</p><p className="mt-1 text-[11px] leading-relaxed text-white/60">Saved chapters and progress stay in this browser.</p></div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl space-y-14 px-4 py-12 sm:px-6 lg:px-8">
        <section aria-labelledby="library-heading" className="space-y-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-2"><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b51e70]">Explore the collection</span><h2 id="library-heading" className="font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">The Curiva health library</h2><p className="text-sm leading-7 text-slate-600">Search the book titles, descriptions and chapter text. Open any guide to read it chapter by chapter.</p></div>
            <div className="relative w-full lg:max-w-md"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a condition, topic or phrase..." aria-label="Search all public health eBooks and their contents" className="min-h-12 w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#b51e70] focus:ring-4 focus:ring-[#b51e70]/10" /></div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2" aria-label="Filter eBooks by category">
            {categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={item === category} className={'min-h-10 shrink-0 rounded-full border px-4 py-2 text-[11px] font-bold transition ' + (item === category ? 'border-[#102f2b] bg-[#102f2b] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:border-[#b51e70]/50 hover:text-[#9e155e]')}>{item === 'Featured' ? '★ Featured' : item}</button>)}
          </div>
          <div className="flex items-center justify-between gap-3 text-xs text-slate-500"><span>{books.length} {books.length === 1 ? 'guide' : 'guides'} found</span>{(search || category !== 'All') && <button type="button" onClick={() => { setSearch(''); setCategory('All'); }} className="font-bold text-[#a51b68] hover:underline">Clear filters</button>}</div>

          <AnimatePresence mode="popLayout">
            {books.length ? <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {books.map((book, index) => {
                const state = forBook(progress, book.id);
                const done = book.sections.length ? Math.min(100, Math.round(state.completedSectionIds.length / book.sections.length * 100)) : 0;
                return <motion.button key={book.id} type="button" layout initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.28, delay: Math.min(index * 0.025, 0.18) }} whileHover={reduceMotion ? undefined : { y: -5 }} whileTap={reduceMotion ? undefined : { scale: 0.99 }} onClick={() => selectBook(book)} aria-pressed={selectedBook.id === book.id} className={'group flex h-full flex-col overflow-hidden rounded-[1.65rem] border bg-white text-left shadow-sm transition ' + (selectedBook.id === book.id ? 'border-[#b51e70] ring-2 ring-[#b51e70]/15' : 'border-slate-200 hover:border-[#b51e70]/45 hover:shadow-xl hover:shadow-slate-900/5')}>
                  <div className="relative h-44 w-full overflow-hidden bg-[#102f2b]">
                    <img src={book.coverImage} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={(event) => { event.currentTarget.style.opacity = '0'; }} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#081c19]/95 via-[#081c19]/25 to-transparent" />
                    <div className="absolute left-4 top-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-2"><span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white backdrop-blur">{book.category}</span>{book.isBestSeller && <span className="inline-flex items-center gap-1 rounded-full bg-[#f5b8d8] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#35142a]"><Star className="h-3 w-3 fill-current" /> Featured</span>}</div>
                    <div className="absolute bottom-4 left-5 right-5"><p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">{book.brand} · {book.version}</p><h3 className="mt-1 line-clamp-2 font-display text-xl font-semibold leading-tight text-white">{book.title}</h3></div>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-5"><p className="line-clamp-3 text-sm leading-6 text-slate-600">{book.subtitle || book.description}</p><div className="mt-auto space-y-3"><div className="flex items-center justify-between gap-3 text-[11px] font-semibold text-slate-500"><span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-[#b51e70]" />{book.readTime}</span><span>{book.sections.length} chapters</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#b51e70] transition-all" style={{ width: done + '%' }} /></div><div className="flex items-center justify-between border-t border-slate-100 pt-3"><span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{done ? done + '% completed' : 'Start reading'}</span><span className="inline-flex items-center gap-1 text-xs font-black text-[#a51b68] group-hover:gap-2">Open guide <ArrowRight className="h-3.5 w-3.5" /></span></div></div></div>
                </motion.button>;
              })}
            </motion.div> : <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center"><Search className="mx-auto h-8 w-8 text-slate-400" /><h3 className="mt-4 font-display text-xl font-bold text-slate-800">No guide matched that search</h3><p className="mt-2 text-sm text-slate-500">Try a broader phrase or clear the category filter.</p><button type="button" onClick={() => { setSearch(''); setCategory('All'); }} className="mt-5 rounded-full bg-[#102f2b] px-5 py-3 text-xs font-bold text-white">Show all guides</button></motion.div>}
          </AnimatePresence>
        </section>

        <section ref={readerRef} id="ebook-reader" aria-labelledby="reader-heading" className="scroll-mt-20 space-y-6">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 md:flex-row md:items-end md:justify-between"><div className="space-y-2"><span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#b51e70]">Now reading</span><h2 id="reader-heading" className="max-w-3xl font-display text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">{selectedBook.title}</h2><p className="max-w-3xl text-sm leading-7 text-slate-600">{selectedBook.description}</p></div><div className="flex shrink-0 flex-wrap gap-2 text-[11px] font-bold text-slate-500"><span className="rounded-full border border-slate-200 bg-white px-3 py-2">{selectedBook.sections.length} chapters</span><span className="rounded-full border border-slate-200 bg-white px-3 py-2">{percent}% completed</span></div></div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 bg-white/95 p-4 md:flex-row md:items-center md:justify-between md:px-5">
              <div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#102f2b] text-[#f5b8d8]"><BookMarked className="h-5 w-5" /></div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-900">{selectedBook.title}</p><p className="truncate text-[11px] text-slate-500">Chapter {activeIndex + 1} of {selectedBook.sections.length} · {section.title}</p></div></div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1" aria-label="Reader colour theme"><button type="button" onClick={() => setTheme('light')} aria-label="Light reading theme" aria-pressed={theme === 'light'} className={'rounded-lg p-2 transition ' + (theme === 'light' ? 'bg-white text-[#b51e70] shadow-sm' : 'text-slate-500 hover:text-slate-900')}><Sun className="h-4 w-4" /></button><button type="button" onClick={() => setTheme('sepia')} aria-label="Sepia reading theme" aria-pressed={theme === 'sepia'} className={'rounded-lg p-2 transition ' + (theme === 'sepia' ? 'bg-[#eadbc1] text-[#4e3924] shadow-sm' : 'text-slate-500 hover:text-slate-900')}><BookOpen className="h-4 w-4" /></button><button type="button" onClick={() => setTheme('dark')} aria-label="Dark reading theme" aria-pressed={theme === 'dark'} className={'rounded-lg p-2 transition ' + (theme === 'dark' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900')}><Moon className="h-4 w-4" /></button></div>
                <div className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1"><Type className="ml-1 h-4 w-4 text-slate-400" /><button type="button" onClick={() => setFontSize((value) => Math.max(16, value - 1))} aria-label="Decrease reading text size" className="rounded-lg px-2 py-1 text-xs font-black text-slate-600 hover:bg-white">A−</button><span className="min-w-10 text-center text-[10px] font-bold text-slate-500">{fontSize}px</span><button type="button" onClick={() => setFontSize((value) => Math.min(24, value + 1))} aria-label="Increase reading text size" className="rounded-lg px-2 py-1 text-xs font-black text-slate-600 hover:bg-white">A+</button></div>
                <button type="button" onClick={() => setSerif((value) => !value)} aria-label="Toggle reading font" className="min-h-10 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] font-bold text-slate-600 hover:border-[#b51e70]/40 hover:text-[#a51b68]">{serif ? 'Serif' : 'Sans'}</button>
                <button type="button" onClick={toggleAudio} aria-pressed={speaking} className={'inline-flex min-h-10 items-center gap-2 rounded-xl px-3 text-[11px] font-bold transition ' + (speaking ? 'bg-[#b51e70] text-white' : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-[#b51e70]/40 hover:text-[#a51b68]')}>{speaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}{speaking ? 'Stop audio' : 'Listen'}</button>
                <button type="button" onClick={() => setMobileContents((value) => !value)} aria-expanded={mobileContents} aria-controls="ebook-contents" className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-[11px] font-bold text-slate-600 lg:hidden">{mobileContents ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />} Contents</button>
              </div>
            </div>

            <div className="h-1.5 bg-slate-100"><div className="h-full bg-gradient-to-r from-[#b51e70] to-[#e7a1c7] transition-all duration-500" style={{ width: percent + '%' }} /></div>
            <div className="grid min-w-0 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <aside id="ebook-contents" className={(mobileContents ? 'block ' : 'hidden ') + 'border-b border-slate-200 bg-[#f8f9f7] p-4 lg:block lg:border-b-0 lg:border-r lg:p-5'}>
                <div className="flex items-center justify-between gap-3"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#a51b68]">Contents</p><p className="mt-1 text-xs font-semibold text-slate-500">{selectedBook.sections.length} chapters</p></div><span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500">{percent}% complete</span></div>
                <div className="relative mt-4"><Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" /><input value={chapterSearch} onChange={(event) => setChapterSearch(event.target.value)} placeholder="Search inside this book..." aria-label="Search chapters and chapter text" className="min-h-10 w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-700 outline-none focus:border-[#b51e70] focus:ring-2 focus:ring-[#b51e70]/10" /></div>
                <nav aria-label="Book chapters" className="mt-4 max-h-[65vh] space-y-1 overflow-y-auto pr-1">
                  {chapters.length ? chapters.map(({ item, index }) => {
                    const active = index === activeIndex;
                    const done = saved.completedSectionIds.includes(item.id);
                    const isSaved = saved.bookmarkedSectionIds.includes(item.id);
                    return <button key={item.id} type="button" onClick={() => selectChapter(index)} aria-current={active ? 'page' : undefined} className={'flex w-full items-start gap-2 rounded-xl px-3 py-3 text-left text-xs transition ' + (active ? 'bg-[#102f2b] font-bold text-white shadow-sm' : 'text-slate-600 hover:bg-white hover:text-[#a51b68]')}><span className={'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-black ' + (active ? 'bg-white/15 text-white' : 'bg-white text-slate-400')}>{done ? <CheckCircle2 className="h-3.5 w-3.5" /> : String(index + 1).padStart(2, '0')}</span><span className="min-w-0 flex-1 leading-5">{item.title}</span>{isSaved && <Bookmark className={'mt-1 h-3.5 w-3.5 shrink-0 ' + (active ? 'text-[#f5b8d8]' : 'text-[#b51e70]')} />}</button>;
                  }) : <p className="rounded-xl bg-white px-3 py-4 text-xs leading-5 text-slate-500">No chapters matched. Try a shorter search phrase.</p>}
                </nav>
              </aside>

              <div className="min-w-0 p-4 sm:p-6 md:p-8 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.article key={selectedBook.id + '-' + section.id} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.24 }} className={'min-w-0 rounded-2xl border p-5 shadow-sm transition-colors sm:p-7 md:p-9 ' + themeClass(theme)} style={{ fontSize: fontSize + 'px', fontFamily: serif ? 'Georgia, Cambria, "Times New Roman", serif' : 'Inter, ui-sans-serif, system-ui, sans-serif' }}>
                    <div className="mb-7 flex flex-col gap-4 border-b border-current/10 pb-6 sm:flex-row sm:items-start sm:justify-between"><div className="space-y-2"><span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#b51e70]"><BookMarked className="h-3.5 w-3.5" /> {selectedBook.brand} · {selectedBook.category}</span><h3 className="font-display text-2xl font-bold leading-tight text-current sm:text-3xl">{section.title}</h3><p className="text-xs leading-5 text-current/60">Chapter {activeIndex + 1} of {selectedBook.sections.length} · {selectedBook.version}</p></div><div className="flex shrink-0 flex-wrap gap-2"><button type="button" onClick={toggleBookmark} aria-pressed={bookmarked} className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-current/15 px-3 py-2 text-[11px] font-bold text-current/75 transition hover:border-[#b51e70]/50 hover:text-[#b51e70]">{bookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}{bookmarked ? 'Saved' : 'Save chapter'}</button><button type="button" onClick={toggleComplete} aria-pressed={completed} className={'inline-flex min-h-10 items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-bold transition ' + (completed ? 'bg-emerald-600 text-white' : 'bg-[#102f2b] text-white hover:bg-[#1b4942]')}><CheckCircle2 className="h-4 w-4" />{completed ? 'Completed' : 'Mark complete'}</button></div></div>
                    <div className="mb-7 rounded-2xl border border-current/10 bg-black/[0.025] px-4 py-3 text-xs leading-6 text-current/70"><span className="font-bold text-current">A note for readers:</span> Read at your own pace. Medical words and recommendations should be checked against the chapter context and its cited sources. This library is for general education, not a personal diagnosis or treatment plan.</div>
                    <PublicMarkdown content={section.content} />
                    <div className="mt-10 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4 text-xs leading-6 text-current/80"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" /><div><p className="font-bold text-current">Health and safety reminder</p><p className="mt-1">This publication is educational and cannot assess your individual health. Do not stop prescribed medicines, delay urgent care, or rely on a home remedy or complementary product in place of proven treatment. For personal advice, speak with a qualified healthcare professional. For an emergency, use your local emergency service.</p></div></div></div>
                  </motion.article>
                </AnimatePresence>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => moveChapter(-1)} disabled={activeIndex === 0} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition hover:border-[#b51e70]/40 hover:text-[#a51b68] disabled:cursor-not-allowed disabled:opacity-35"><ChevronLeft className="h-4 w-4" /> Previous chapter</button><span className="text-center text-[11px] font-bold text-slate-400">{activeIndex + 1} / {selectedBook.sections.length}</span><button type="button" onClick={() => moveChapter(1)} disabled={activeIndex >= selectedBook.sections.length - 1} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#102f2b] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#1b4942] disabled:cursor-not-allowed disabled:opacity-35">Next chapter <ChevronRight className="h-4 w-4" /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 rounded-[1.75rem] border border-[#e8d7e2] bg-gradient-to-br from-white via-[#fff8fc] to-[#f8f1f5] p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div className="flex items-start gap-4"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#b51e70] shadow-lg shadow-[#b51e70]/15"><img src="/app_icon.png.png" alt="Curiva Homoeopathy" className="h-full w-full object-cover" loading="lazy" onError={(event) => { event.currentTarget.src = '/curiva_logo.svg'; }} /></div><div className="space-y-1"><p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#a51b68]">Curiva Public Health Series</p><h2 className="font-display text-xl font-semibold text-slate-900">Clear information. Better conversations with your healthcare team.</h2><p className="max-w-2xl text-sm leading-6 text-slate-600">Keep exploring the library, save chapters on this device, and use what you learn to prepare questions for a qualified health professional.</p></div></div>
          <a href="/medical-disclaimer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#b51e70]/25 bg-white px-5 py-3 text-xs font-bold text-[#a51b68] transition hover:border-[#b51e70] hover:bg-[#b51e70] hover:text-white">Read our medical disclaimer <ArrowRight className="h-4 w-4" /></a>
        </section>
      </main>
      <footer className="border-t border-[#e5e9e3] bg-white px-4 py-7 text-center text-[11px] leading-6 text-slate-500">Curiva Homoeopathy · Public education library · Reading progress is saved locally in this browser.</footer>
    </div>
  );
}
