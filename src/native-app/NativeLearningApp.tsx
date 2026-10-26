import React, { useEffect, useMemo, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LiveUpdate } from '@capawesome/capacitor-live-update';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity, ArrowLeft, ArrowRight, Award, Bookmark, BookmarkCheck, BookOpen,
  Brain, Check, CheckCircle2, ChevronRight, Clock3, Compass, Flame, GraduationCap,
  HeartPulse, Home, Layers, Library, ListChecks, Search, ShieldCheck, Sparkles, Stethoscope,
  Target, TrendingUp, Trophy, X, Zap, Play, RotateCcw, NotebookPen, Microscope, FlaskConical, BookMarked
} from 'lucide-react';
import { allBhmsSubjects } from '../pages/AllSubjectsHub';
import { allBlogPosts } from '../data/blogPosts';
import { HomoeopathicFlashcards } from '../data/flashcards_data';
import { materiaMedicaData } from '../data/materiaMedica';
import { repertoryDatabase } from '../data/repertoryDatabase';
import { anatomyModules, getAnatomyModule } from '../data/anatomyModulesData';
import { getAllPhysiologyModules } from '../data/physiologyModulesData';
import { FMT_DETAILED_CHAPTERS } from '../data/fmtDetailedChapters';
import { nativeQuestionBank, type NativeQuestion } from './quizBank';
import { importedMedicalMCQs } from '../data/medicalMcqBank';
import './native-learning.css';

type Tab = 'home' | 'learn' | 'practice' | 'flashcards' | 'library' | 'profile';
type Screen = 'main' | 'subject' | 'lesson' | 'article' | 'remedy' | 'repertory' | 'quiz' | 'quiz-result';
type StoredLesson = { subjectId: string; chapterTitle: string; subjectTitle: string };
type StoredQuizResult = { date: string; subject: string; score: number; total: number; percent: number };

function useStoredState<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) as T : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Storage is optional. */ }
  }, [key, value]);
  return [value, setValue];
}

function recordStudyDay() {
  try {
    const key = 'curiva-native-study-days';
    const days = JSON.parse(localStorage.getItem(key) || '[]') as string[];
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem(key, JSON.stringify(Array.from(new Set([...days, today])).slice(-90)));
  } catch { /* Keep the learning flow available if storage is disabled. */ }
}

function getStudyStreak(days: string[]) {
  const values = new Set(days);
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  let streak = 0;
  if (!values.has(date.toISOString().slice(0, 10))) date.setUTCDate(date.getUTCDate() - 1);
  while (values.has(date.toISOString().slice(0, 10))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }
  return streak;
}

const yearFilters = ['All years', '1st BHMS', '2nd BHMS', '3rd BHMS', '4th BHMS'];
const tabItems: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'practice', label: 'Practice', icon: Brain },
  { id: 'flashcards', label: 'Cards', icon: Layers },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'profile', label: 'Progress', icon: TrendingUp }
];
const allQuestionBank: NativeQuestion[] = [
  ...nativeQuestionBank,
  ...importedMedicalMCQs.map((question) => ({
    id: 'curiva-' + question.id,
    subject: question.subject,
    prompt: question.question,
    options: question.options,
    answer: question.correctAnswer,
    explanation: question.explanation,
    difficulty: question.category.toLowerCase().includes('clinical') ? 'Intermediate' as const : 'Foundational' as const
  }))
];
const allQuestionSubjects = ['All subjects', ...Array.from(new Set(allQuestionBank.map((question) => question.subject)))];

const subjectIconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  anatomy: Activity, physiology: HeartPulse, pharmacy: FlaskConical, 'organon-1': BookMarked,
  pathology: Microscope, 'materia-medica': Library, repertory: Compass,
  'forensic-medicine': ShieldCheck, 'practice-of-medicine': Stethoscope, surgery: Activity
};

export default function NativeLearningApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [screen, setScreen] = useState<Screen>('main');
  const [selectedSubjectId, setSelectedSubjectId] = useState('');
  const [selectedChapterTitle, setSelectedChapterTitle] = useState('');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState('');
  const [selectedRemedyId, setSelectedRemedyId] = useState('');
  const [selectedRepertoryId, setSelectedRepertoryId] = useState('');
  const [libraryView, setLibraryView] = useState<'articles' | 'remedies' | 'repertory'>('articles');
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState('All years');
  const [articleCategory, setArticleCategory] = useState('All topics');
  const [quizSubject, setQuizSubject] = useState('All subjects');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [splashVisible, setSplashVisible] = useState(true);
  const [showAllArticles, setShowAllArticles] = useState(false);
  const [completedLessons, setCompletedLessons] = useStoredState<string[]>('curiva-native-completed-lessons', []);
  const [bookmarks, setBookmarks] = useStoredState<string[]>('curiva-native-bookmarks', []);
  const [quizHistory, setQuizHistory] = useStoredState<StoredQuizResult[]>('curiva-native-quiz-history', []);
  const [knownFlashcards, setKnownFlashcards] = useStoredState<string[]>('curiva-native-known-flashcards', []);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [flashcardCategory, setFlashcardCategory] = useState('All types');
  const [studyDays, setStudyDays] = useStoredState<string[]>('curiva-native-study-days', []);
  const [lastLesson, setLastLesson] = useStoredState<StoredLesson | null>('curiva-native-last-lesson', null);

  useEffect(() => {
    const timer = window.setTimeout(() => setSplashVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, []);

  // The native app uses bundled screens and content. This only checks update metadata;
  // it does not open or display the website.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    void (async () => {
      try {
        await LiveUpdate.ready();
        const manifestUrl = 'https://curivahomoeopathy.netlify.app/live-updates/latest.json';
        const response = await fetch(manifestUrl, { cache: 'no-store' });
        if (!response.ok) return;
        const manifest = await response.json() as { bundleId?: string; url?: string; checksum?: string; signature?: string };
        if (typeof manifest.bundleId !== 'string' || !/^[a-zA-Z0-9._-]{1,64}$/.test(manifest.bundleId) ||
          typeof manifest.url !== 'string' || typeof manifest.checksum !== 'string' || !/^[a-f0-9]{64}$/i.test(manifest.checksum)) return;
        const origin = new URL(manifestUrl).origin;
        const bundleUrl = new URL(manifest.url, manifestUrl);
        if (bundleUrl.origin !== origin || !bundleUrl.pathname.startsWith('/live-updates/bundles/')) return;
        const current = await LiveUpdate.getCurrentBundle();
        if (current.bundleId === manifest.bundleId) return;
        const bundles = await LiveUpdate.getBundles();
        if (!bundles.bundleIds.includes(manifest.bundleId)) {
          await LiveUpdate.downloadBundle({
            artifactType: 'zip', bundleId: manifest.bundleId, url: bundleUrl.toString(), checksum: manifest.checksum,
            ...(manifest.signature ? { signature: manifest.signature } : {})
          });
        }
        await LiveUpdate.setNextBundle({ bundleId: manifest.bundleId });
      } catch (error) {
        console.info('Curiva offline study app: update check skipped.', error);
      }
    })();
  }, []);

  const subjects = useMemo(() => allBhmsSubjects.filter((subject) => {
    const matchesYear = yearFilter === 'All years' || subject.year === yearFilter;
    const haystack = (subject.title + ' ' + subject.summary + ' ' + subject.category + ' ' + subject.highYieldTopics.join(' ')).toLowerCase();
    return matchesYear && haystack.includes(search.toLowerCase().trim());
  }), [yearFilter, search]);

  const categories = useMemo(() => ['All topics', ...Array.from(new Set(allBlogPosts.map((post) => post.category).filter(Boolean))).slice(0, 8)], []);
  const articles = useMemo(() => {
    const matched = allBlogPosts.filter((post) => {
      const categoryMatches = articleCategory === 'All topics' || post.category === articleCategory;
      const haystack = (post.title + ' ' + post.excerpt + ' ' + post.category + ' ' + (post.tags || []).join(' ')).toLowerCase();
      return categoryMatches && haystack.includes(search.toLowerCase().trim());
    });
    return showAllArticles ? matched : matched.slice(0, 12);
  }, [articleCategory, search, showAllArticles]);
  const selectedSubject = allBhmsSubjects.find((subject) => subject.id === selectedSubjectId);
  const flashcardCategories = useMemo(() => ['All types', ...Array.from(new Set(HomoeopathicFlashcards.map((card) => card.subType)))], []);
  const filteredFlashcards = useMemo(() => HomoeopathicFlashcards.filter((card) => {
    const categoryMatches = flashcardCategory === 'All types' || card.subType === flashcardCategory;
    const query = search.toLowerCase().trim();
    return categoryMatches && (card.term + ' ' + card.definition + ' ' + card.clinicalSignificance + ' ' + card.subType).toLowerCase().includes(query);
  }), [flashcardCategory, search]);
  const currentFlashcard = filteredFlashcards.length ? filteredFlashcards[flashcardIndex % filteredFlashcards.length] : undefined;
  const selectedArticle = allBlogPosts.find((post) => post.slug === selectedArticleSlug || post.id === selectedArticleSlug);
  const selectedRemedy = materiaMedicaData.find((remedy) => remedy.id === selectedRemedyId);
  const selectedRepertory = repertoryDatabase.find((chapter) => chapter.id === selectedRepertoryId);
  const filteredRemedies = useMemo(() => materiaMedicaData.filter((remedy) => {
    const query = search.toLowerCase().trim();
    return (remedy.name + ' ' + remedy.commonName + ' ' + remedy.family + ' ' + remedy.keynotes.join(' ') + ' ' + remedy.mind.join(' ') + ' ' + remedy.physical.join(' ')).toLowerCase().includes(query);
  }).slice(0, 80), [search]);
  const filteredRepertoryChapters = useMemo(() => repertoryDatabase.filter((chapter) => {
    const query = search.toLowerCase().trim();
    if (!query) return true;
    return (chapter.name + ' ' + chapter.description).toLowerCase().includes(query) ||
      chapter.rubrics.some((rubric) => (rubric.symptom + ' ' + (rubric.subCategory || '') + ' ' + rubric.remedies.join(' ')).toLowerCase().includes(query));
  }), [search]);
  const selectedRepertoryRubrics = useMemo(() => selectedRepertory?.rubrics.filter((rubric) => {
    const query = search.toLowerCase().trim();
    return !query || (rubric.symptom + ' ' + (rubric.subCategory || '') + ' ' + (rubric.notes || '') + ' ' + rubric.remedies.join(' ')).toLowerCase().includes(query);
  }) || [], [selectedRepertory, search]);
  const questionPool = useMemo(() => {
    const result = quizSubject === 'All subjects' ? allQuestionBank : allQuestionBank.filter((q) => q.subject === quizSubject);
    return result.length ? result : allQuestionBank;
  }, [quizSubject]);
  const currentQuestion = questionPool[questionIndex % questionPool.length];

  const normalizeContentKey = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const chapterKey = normalizeContentKey(selectedChapterTitle);
  const anatomyContent = useMemo(() => {
    if (!selectedSubject || selectedSubject.id !== 'anatomy') return undefined;
    const candidates = Object.entries(anatomyModules).map(([id, module]) => {
      const moduleTitle = normalizeContentKey(module.title || id);
      const key = normalizeContentKey(id);
      let score = 0;
      if (chapterKey && moduleTitle && chapterKey.includes(moduleTitle)) score += 100 + moduleTitle.length;
      if (chapterKey && key.length > 3 && chapterKey.includes(key)) score += 80 + key.length;
      const titleTokens = moduleTitle.split(' ').filter((word) => word.length > 3);
      score += titleTokens.filter((word) => chapterKey.split(' ').includes(word)).length * 4;
      return { id, module, score };
    }).sort((a, b) => b.score - a.score);
    if (!selectedChapterTitle) return getAnatomyModule(candidates[0]?.id || 'clavicle');
    return candidates[0]?.score ? getAnatomyModule(candidates[0].id) : undefined;
  }, [selectedSubject, selectedChapterTitle, chapterKey]);

  const physiologyContent = useMemo(() => {
    if (!selectedSubject || selectedSubject.id !== 'physiology') return undefined;
    const modules = getAllPhysiologyModules();
    const candidates = modules.map((module) => {
      const moduleTitle = normalizeContentKey(module.title);
      let score = 0;
      if (chapterKey && moduleTitle && chapterKey.includes(moduleTitle)) score += 100 + moduleTitle.length;
      const tokens = moduleTitle.split(' ').filter((word) => word.length > 3);
      score += tokens.filter((word) => chapterKey.split(' ').includes(word)).length * 4;
      return { module, score };
    }).sort((a, b) => b.score - a.score);
    if (!selectedChapterTitle) return modules[0];
    return candidates[0]?.score ? candidates[0].module : undefined;
  }, [selectedSubject, selectedChapterTitle, chapterKey]);

  const fmtContent = useMemo(() => {
    if (!selectedSubject || !(selectedSubject.id.toLowerCase().includes('forensic') || selectedSubject.title.toLowerCase().includes('forensic medicine'))) return undefined;
    const candidates = FMT_DETAILED_CHAPTERS.map((chapter) => {
      const title = normalizeContentKey(chapter.title || chapter.id);
      let score = 0;
      if (chapterKey && title && chapterKey.includes(title)) score += 100 + title.length;
      const tokens = title.split(' ').filter((word) => word.length > 3);
      score += tokens.filter((word) => chapterKey.split(' ').includes(word)).length * 4;
      return { chapter, score };
    }).sort((a, b) => b.score - a.score);
    return candidates[0]?.score ? candidates[0].chapter : undefined;
  }, [selectedSubject, selectedChapterTitle, chapterKey]);
  const streak = getStudyStreak(studyDays);
  const chapterCount = allBhmsSubjects.reduce((count, subject) => count + subject.chapters.length, 0);
  const completedPercent = Math.round(completedLessons.length / Math.max(1, chapterCount) * 100);

  const goToTab = (tab: Tab) => { setActiveTab(tab); setScreen('main'); setSearch(''); setFlashcardIndex(0); setIsFlashcardFlipped(false); };
  const openSubject = (id: string) => { setSelectedSubjectId(id); setScreen('subject'); setSearch(''); };
  const openLesson = (subjectId: string, chapterTitle: string) => {
    const subject = allBhmsSubjects.find((item) => item.id === subjectId);
    if (!subject) return;
    setSelectedSubjectId(subjectId);
    setSelectedChapterTitle(chapterTitle);
    setLastLesson({ subjectId, chapterTitle, subjectTitle: subject.title });
    setScreen('lesson');
  };
  const openArticle = (slug: string) => { setSelectedArticleSlug(slug); setScreen('article'); };
  const openRemedy = (id: string) => { setSelectedRemedyId(id); setSearch(''); setScreen('remedy'); };
  const openRepertory = (id: string) => { setSelectedRepertoryId(id); setSearch(''); setScreen('repertory'); };
  const toggleBookmark = (id: string) => setBookmarks((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const completeLesson = () => {
    const lessonId = selectedSubjectId + ':' + selectedChapterTitle;
    setCompletedLessons((items) => items.includes(lessonId) ? items : [...items, lessonId]);
    const today = new Date().toISOString().slice(0, 10);
    recordStudyDay();
    setStudyDays((items) => Array.from(new Set([...items, today])));
  };
  const startQuiz = () => { setQuestionIndex(0); setSelectedAnswer(null); setQuizScore(0); setScreen('quiz'); };
  const rateFlashcard = (known: boolean) => {
    if (!currentFlashcard) return;
    setKnownFlashcards((items) => known ? Array.from(new Set([...items, currentFlashcard.term])) : items.filter((term) => term !== currentFlashcard.term));
    const today = new Date().toISOString().slice(0, 10);
    recordStudyDay();
    setStudyDays((items) => Array.from(new Set([...items, today])));
    setIsFlashcardFlipped(false);
    setFlashcardIndex((index) => (index + 1) % Math.max(1, filteredFlashcards.length));
  };
  const chooseAnswer = (optionIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.answer) setQuizScore((score) => score + 1);
  };
  const nextQuestion = () => {
    if (selectedAnswer === null) return;
    if (questionIndex + 1 >= questionPool.length) {
      const percent = Math.round(quizScore / questionPool.length * 100);
      setQuizHistory((items) => [{ date: new Date().toISOString().slice(0, 10), subject: quizSubject, score: quizScore, total: questionPool.length, percent }, ...items].slice(0, 30));
      const today = new Date().toISOString().slice(0, 10);
      recordStudyDay();
      setStudyDays((items) => Array.from(new Set([...items, today])));
      setScreen('quiz-result');
    } else {
      setQuestionIndex((index) => index + 1);
      setSelectedAnswer(null);
    }
  };
  const progressValue = (subjectId: string, chapters: { title: string }[]) => {
    const done = chapters.filter((chapter) => completedLessons.includes(subjectId + ':' + chapter.title)).length;
    return { done, total: chapters.length, percent: chapters.length ? Math.round(done / chapters.length * 100) : 0 };
  };
  const goBack = () => {
    if (screen === 'quiz-result' || screen === 'quiz') { setScreen('main'); setActiveTab('practice'); }
    else if (screen === 'article' || screen === 'remedy' || screen === 'repertory') { setScreen('main'); setActiveTab('library'); setSearch(''); }
    else if (screen === 'lesson') setScreen('subject');
    else if (screen === 'subject') { setScreen('main'); setActiveTab('learn'); }
    else setScreen('main');
  };
  const renderSubjectCard = (subject: typeof allBhmsSubjects[number], index: number) => {
    const Icon = subjectIconMap[subject.id] || GraduationCap;
    const progress = progressValue(subject.id, subject.chapters);
    return <motion.button key={subject.id} type="button" className="native-subject-card" onClick={() => openSubject(subject.id)} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.025, 0.2), duration: 0.25 }} whileTap={{ scale: 0.985 }}>
      <div className="native-subject-icon"><Icon size={21} /></div>
      <div className="native-subject-main"><div className="native-eyebrow">{subject.year} · {subject.category}</div><h3>{subject.title}</h3><p>{subject.summary}</p><div className="native-progress-track"><span style={{ width: String(progress.percent) + '%' }} /></div><div className="native-progress-meta">{progress.done}/{progress.total} topics completed <span>{progress.percent}%</span></div></div>
      <ChevronRight size={18} className="native-muted-icon" />
    </motion.button>;
  };

  if (splashVisible) return <div className="native-splash"><motion.div initial={{ opacity: 0, scale: 0.82 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 170, damping: 18 }} className="native-splash-mark"><Activity size={34} /></motion.div><motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>curiva</motion.h1><p>Learn with clarity. Recall with confidence.</p><div className="native-splash-loader"><span /></div></div>;

  return <div className="native-app-shell"><div className="native-app">
    <header className="native-topbar">
      {screen !== 'main' ? <button className="native-icon-button" onClick={goBack} aria-label="Go back"><ArrowLeft size={21} /></button> : <div className="native-brand-mark"><Activity size={20} /></div>}
      <div className="native-brand-copy"><span>CURIVA</span><small>{screen === 'main' ? 'MEDICAL LEARNING' : screen === 'subject' ? 'SUBJECT OVERVIEW' : screen === 'lesson' ? 'STUDY SESSION' : screen === 'article' ? 'READING ROOM' : screen === 'remedy' ? 'MATERIA MEDICA' : screen === 'repertory' ? 'REPERTORY LOOKUP' : 'QUESTION PRACTICE'}</small></div>
      <button className="native-icon-button" onClick={() => goToTab('profile')} aria-label="Open learning progress"><Sparkles size={19} /></button>
    </header>

    <AnimatePresence mode="wait">
      {screen === 'main' && <motion.main key={activeTab} className="native-main-content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }}>
        {activeTab === 'home' && <>
          <section className="native-greeting"><div className="native-eyebrow native-eyebrow-light"><Sparkles size={13} /> YOUR LEARNING SPACE</div><h1>Small sessions.<br /><em>Stronger recall.</em></h1><p>Build your medical foundations, one focused topic at a time.</p><div className="native-hero-stats"><div><Flame size={16} /><strong>{streak}</strong><span>day streak</span></div><div><CheckCircle2 size={16} /><strong>{completedLessons.length}</strong><span>topics done</span></div><div><Target size={16} /><strong>{quizHistory.length}</strong><span>quiz sessions</span></div></div><div className="native-hero-orbit native-orbit-one" /><div className="native-hero-orbit native-orbit-two" /></section>
          {lastLesson && <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">PICK UP WHERE YOU LEFT OFF</span><h2>Continue learning</h2></div></div><button className="native-continue-card" onClick={() => openLesson(lastLesson.subjectId, lastLesson.chapterTitle)}><div className="native-continue-icon"><Play size={19} fill="currentColor" /></div><div><strong>{lastLesson.chapterTitle}</strong><span>{lastLesson.subjectTitle}</span></div><ChevronRight size={19} /></button></section>}
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">TODAY'S PLAN</span><h2>Make progress</h2></div><button className="native-text-link" onClick={() => goToTab('learn')}>All subjects <ArrowRight size={15} /></button></div><div className="native-action-grid"><button className="native-action-card native-action-learn" onClick={() => goToTab('learn')}><div className="native-action-icon"><BookOpen size={20} /></div><strong>Study a topic</strong><span>Curriculum-led study</span><ArrowRight size={17} /></button><button className="native-action-card native-action-practice" onClick={() => goToTab('practice')}><div className="native-action-icon"><Brain size={20} /></div><strong>Quick practice</strong><span>Recall with MCQs</span><ArrowRight size={17} /></button></div></section>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">CORE CURRICULUM</span><h2>Explore subjects</h2></div><button className="native-text-link" onClick={() => goToTab('learn')}>View all <ArrowRight size={15} /></button></div><div className="native-compact-subjects">{allBhmsSubjects.slice(0, 4).map((subject, index) => { const Icon = subjectIconMap[subject.id] || GraduationCap; return <motion.button key={subject.id} className="native-compact-subject" onClick={() => openSubject(subject.id)} whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}><span><Icon size={19} /></span><strong>{subject.title.replace(' (Paper I & II)', '')}</strong><small>{subject.year}</small></motion.button>; })}</div></section>
          <section className="native-featured-quiz"><div className="native-featured-quiz-icon"><Zap size={21} /></div><div><span className="native-eyebrow">SHORT REVISION</span><h3>Test what you remember</h3><p>Instant feedback with a clear explanation.</p></div><button onClick={() => { setQuizSubject('All subjects'); startQuiz(); }} aria-label="Start quick revision"><ArrowRight size={20} /></button></section>
          <div className="native-disclaimer"><ShieldCheck size={16} /><span>For education only. Check current guidance and qualified faculty before using clinical information in practice.</span></div>
        </>}

        {activeTab === 'learn' && <>
          <div className="native-page-intro"><span className="native-eyebrow">BHMS STUDY CENTER</span><h1>Learn the <em>why.</em></h1><p>Explore syllabus-led subjects and track the topics you finish.</p></div>
          <div className="native-search-wrap"><Search size={18} /><input aria-label="Search subjects and topics" placeholder="Search subjects, chapters, concepts…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
          <div className="native-filter-row">{yearFilters.map((year) => <button key={year} className={'native-filter-chip ' + (yearFilter === year ? 'is-selected' : '')} onClick={() => setYearFilter(year)}>{year}</button>)}</div>
          <div className="native-result-count">{subjects.length} subjects available · progress saves on this device</div>
          <div className="native-subject-list">{subjects.map(renderSubjectCard)}</div>
          {subjects.length === 0 && <div className="native-empty-state"><Search size={24} /><strong>No matching subjects</strong><span>Try another search term or year.</span></div>}
        </>}

        {activeTab === 'practice' && <>
          <div className="native-page-intro"><span className="native-eyebrow">ACTIVE RECALL</span><h1>Practice makes <em>progress.</em></h1><p>Answer, get an explanation, and learn from every choice.</p></div>
          <div className="native-quiz-hero"><div className="native-quiz-hero-orb"><Brain size={32} /></div><div><span className="native-eyebrow native-eyebrow-light">QUICK MIX</span><h2>Question bank</h2><p>Anatomy, physiology, pathology, pharmacology and more.</p></div><div className="native-quiz-hero-footer"><span><Clock3 size={15} /> 5–8 minutes</span><span><ListChecks size={15} /> Explanations included</span></div></div>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">CHOOSE A FOCUS</span><h2>Question set</h2></div></div><label className="native-field-label" htmlFor="native-quiz-subject">Subject</label><select id="native-quiz-subject" className="native-select" value={quizSubject} onChange={(event) => setQuizSubject(event.target.value)}>{allQuestionSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select><div className="native-quiz-summary"><div><strong>{(quizSubject === 'All subjects' ? allQuestionBank : allQuestionBank.filter((q) => q.subject === quizSubject)).length || allQuestionBank.length}</strong><span>questions</span></div><div><strong>Instant</strong><span>feedback</span></div><div><strong>Offline</strong><span>available</span></div></div><button className="native-primary-button" onClick={startQuiz}>Start practice <ArrowRight size={18} /></button></section>
          {quizHistory.length > 0 && <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">RECENT SESSIONS</span><h2>Your attempts</h2></div></div><div className="native-history-list">{quizHistory.slice(0, 3).map((result, index) => <div className="native-history-row" key={result.date + '-' + index}><span className="native-history-badge"><Award size={17} /></span><div><strong>{result.subject}</strong><small>{result.date} · {result.score}/{result.total} correct</small></div><b>{result.percent}%</b></div>)}</div></section>}
          <div className="native-disclaimer"><ShieldCheck size={16} /><span>Questions support revision and do not replace your prescribed curriculum or supervised clinical training.</span></div>
        </>}

        {activeTab === 'flashcards' && <>
          <div className="native-page-intro"><span className="native-eyebrow">SPACED RECALL</span><h1>Make it <em>stick.</em></h1><p>Review Curiva's bundled flashcards, flip to reveal the answer, then rate how well you recalled it.</p></div>
          <div className="native-search-wrap"><Search size={18} /><input aria-label="Search flashcards" placeholder="Search terms and definitions…" value={search} onChange={(event) => { setSearch(event.target.value); setFlashcardIndex(0); setIsFlashcardFlipped(false); }} /><button onClick={() => { setSearch(''); setFlashcardIndex(0); }} aria-label="Clear search"><X size={16} /></button></div>
          <div className="native-filter-row">{flashcardCategories.map((category) => <button key={category} className={'native-filter-chip ' + (flashcardCategory === category ? 'is-selected' : '')} onClick={() => { setFlashcardCategory(category); setFlashcardIndex(0); setIsFlashcardFlipped(false); }}>{category}</button>)}</div>
          <div className="native-flashcard-count"><span>{filteredFlashcards.length ? flashcardIndex % filteredFlashcards.length + 1 : 0} of {filteredFlashcards.length} cards</span><span>{knownFlashcards.length} mastered on this device</span></div>
          {currentFlashcard ? <>
            <div className="native-flashcard-instruction"><Sparkles size={14} /> Try to recall the definition before revealing the back</div>
            <AnimatePresence mode="wait">
              <motion.button key={currentFlashcard.term + '-' + String(isFlashcardFlipped)} type="button" className={'native-flashcard ' + (isFlashcardFlipped ? 'is-flipped' : '')} onClick={() => setIsFlashcardFlipped((value) => !value)} initial={{ opacity: 0, y: 10, rotateY: -7, scale: 0.985 }} animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }} exit={{ opacity: 0, y: -8, rotateY: 7, scale: 0.985 }} transition={{ duration: 0.22 }}>
                <span className="native-flashcard-label">{isFlashcardFlipped ? 'REVEALED · TAP TO FLIP BACK' : 'TERM · TAP TO REVEAL'}</span>
                {!isFlashcardFlipped ? <><span className="native-flashcard-decoration"><Layers size={22} /></span><strong>{currentFlashcard.term}</strong><span className="native-flashcard-category">{currentFlashcard.subType}</span><span className="native-flashcard-tap">Tap card to reveal <ArrowRight size={15} /></span></> : <><strong className="native-flashcard-definition">{currentFlashcard.definition}</strong><span className="native-flashcard-category">STUDY SIGNIFICANCE</span><p>{currentFlashcard.clinicalSignificance}</p></>}
              </motion.button>
            </AnimatePresence>
            <div className="native-flashcard-actions"><button className="native-flashcard-again" onClick={() => rateFlashcard(false)}><RotateCcw size={17} /><span>Review again</span></button><button className="native-flashcard-known" onClick={() => rateFlashcard(true)}><CheckCircle2 size={17} /><span>Got it</span></button></div>
            <div className="native-flashcard-footer"><button onClick={() => { setFlashcardIndex((index) => (index - 1 + filteredFlashcards.length) % filteredFlashcards.length); setIsFlashcardFlipped(false); }} disabled={filteredFlashcards.length < 2}><ArrowLeft size={15} /> Previous</button><button onClick={() => { setFlashcardIndex((index) => (index + 1) % filteredFlashcards.length); setIsFlashcardFlipped(false); }} disabled={filteredFlashcards.length < 2}>Next card <ArrowRight size={15} /></button></div>
          </> : <div className="native-empty-state"><Layers size={24} /><strong>No matching flashcards</strong><span>Try another search or card category.</span></div>}
          <div className="native-disclaimer"><ShieldCheck size={16} /><span>These cards include traditional homoeopathic terminology. Educational summaries are not evidence of treatment effectiveness; use reliable medical references for clinical decisions.</span></div>
        </>}

        {activeTab === 'library' && <>
          <div className="native-page-intro"><span className="native-eyebrow">CURIVA STUDY LIBRARY</span><h1>{libraryView === 'articles' ? <>Read. Reflect. <em>Remember.</em></> : libraryView === 'remedies' ? <>Materia <em>Medica.</em></> : <>Explore a <em>rubric.</em></>}</h1><p>{libraryView === 'articles' ? 'Existing Curiva articles, bundled for in-app reading.' : libraryView === 'remedies' ? 'Browse traditional materia medica profiles as academic study material.' : 'Explore repertory chapters and rubric terminology for coursework.'}</p></div>
          <div className="native-filter-row native-library-switcher">
            {[{ id: 'articles', label: 'Articles' }, { id: 'remedies', label: 'Materia Medica' }, { id: 'repertory', label: 'Repertory' }].map((view) => <button key={view.id} className={'native-filter-chip ' + (libraryView === view.id ? 'is-selected' : '')} onClick={() => { setLibraryView(view.id as 'articles' | 'remedies' | 'repertory'); setSearch(''); setShowAllArticles(false); }}>{view.label}</button>)}
          </div>

          {libraryView === 'articles' && <>
            <div className="native-search-wrap"><Search size={18} /><input aria-label="Search library" placeholder="Search articles and concepts…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
            <div className="native-filter-row">{categories.map((category) => <button key={category} className={'native-filter-chip ' + (articleCategory === category ? 'is-selected' : '')} onClick={() => { setArticleCategory(category); setShowAllArticles(false); }}>{category}</button>)}</div>
            <div className="native-result-count">{articles.length} articles shown · read without opening a browser</div>
            <div className="native-article-list">{articles.map((post, index) => { const id = 'article:' + (post.slug || post.id); return <motion.button key={post.id} className="native-article-card" onClick={() => openArticle(post.slug || post.id)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.2) }} whileTap={{ scale: 0.99 }}><div className="native-article-art"><BookOpen size={24} /><span>{(post.category || 'CURIVA').toUpperCase()}</span></div><div className="native-article-copy"><span className="native-eyebrow">{post.category || 'Study note'}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.date || 'Study reading'} · {Math.max(2, Math.round((post.content || '').split(/\s+/).length / 180))} min read</small></div><span className="native-bookmark-button" aria-label="Bookmark article" role="button" onClick={(event) => { event.stopPropagation(); toggleBookmark(id); }}>{bookmarks.includes(id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}</span></motion.button>; })}</div>
            {!showAllArticles && articles.length >= 12 && <button className="native-secondary-button" onClick={() => setShowAllArticles(true)}>Show more articles <ChevronRight size={17} /></button>}
            {articles.length === 0 && <div className="native-empty-state"><Library size={24} /><strong>No articles found</strong><span>Try another topic or search phrase.</span></div>}
          </>}

          {libraryView === 'remedies' && <>
            <div className="native-search-wrap"><Search size={18} /><input aria-label="Search materia medica" placeholder="Search remedy, family or keynote…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
            <div className="native-result-count">{filteredRemedies.length} profiles shown from the bundled materia medica dataset</div>
            <div className="native-remedy-list">{filteredRemedies.map((remedy, index) => <motion.button key={remedy.id} type="button" className="native-remedy-card" onClick={() => openRemedy(remedy.id)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.2) }} whileTap={{ scale: 0.99 }}><span className="native-remedy-avatar"><BookMarked size={20} /></span><div><span className="native-eyebrow">{remedy.family}</span><h3>{remedy.name}</h3><p>{remedy.commonName}</p><small>{remedy.keynotes.slice(0, 2).join(' · ')}</small></div><ChevronRight size={17} /></motion.button>)}</div>
            {filteredRemedies.length === 0 && <div className="native-empty-state"><Search size={24} /><strong>No matching profiles</strong><span>Try another remedy name or keynote.</span></div>}
            <div className="native-disclaimer"><ShieldCheck size={16} /><span>Materia medica profiles describe traditional homoeopathic concepts for academic study. They are not evidence that a remedy treats disease; this app intentionally omits dosage directions.</span></div>
          </>}

          {libraryView === 'repertory' && <>
            <div className="native-search-wrap"><Search size={18} /><input aria-label="Search repertory" placeholder="Search chapters, symptoms or rubric terms…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
            <div className="native-result-count">{filteredRepertoryChapters.length} repertory chapters · bundled locally</div>
            <div className="native-repertory-list">{filteredRepertoryChapters.map((chapter, index) => <motion.button key={chapter.id} type="button" className="native-repertory-card" onClick={() => openRepertory(chapter.id)} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.2) }} whileTap={{ scale: 0.99 }}><span className="native-repertory-icon"><Compass size={20} /></span><div><h3>{chapter.name}</h3><p>{chapter.description}</p><small>{chapter.rubrics.length} rubrics</small></div><ChevronRight size={17} /></motion.button>)}</div>
            <div className="native-disclaimer"><ShieldCheck size={16} /><span>Repertory is a traditional academic reference. It does not diagnose conditions or establish that listed remedies are effective; patient care requires evidence-based clinical judgement.</span></div>
          </>}
        </>}

        {activeTab === 'profile' && <>
          <div className="native-page-intro"><span className="native-eyebrow">YOUR LEARNING JOURNEY</span><h1>Look how far <em>you've come.</em></h1><p>Your progress and bookmarks stay on this device.</p></div>
          <div className="native-progress-hero"><div className="native-progress-ring" style={{ '--progress': String(completedPercent * 3.6) + 'deg' } as React.CSSProperties}><div><strong>{completedPercent}%</strong><span>complete</span></div></div><div><span className="native-eyebrow">CURRICULUM PROGRESS</span><h2>One topic at a time</h2><p>{completedLessons.length} lessons checked off your study list.</p></div></div>
          <div className="native-stats-grid"><div><span><Flame size={18} /></span><strong>{streak}</strong><small>Current streak</small></div><div><span><CheckCircle2 size={18} /></span><strong>{completedLessons.length}</strong><small>Topics completed</small></div><div><span><Trophy size={18} /></span><strong>{quizHistory.length}</strong><small>Quiz sessions</small></div><div><span><Bookmark size={18} /></span><strong>{bookmarks.length}</strong><small>Saved items</small></div><div><span><Layers size={18} /></span><strong>{knownFlashcards.length}</strong><small>Cards mastered</small></div></div>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">SAVED FOR LATER</span><h2>Your bookmarks</h2></div></div>
            {bookmarks.length === 0 ? <div className="native-empty-inline"><Bookmark size={20} /><span>Save articles, subjects, remedy profiles or repertory chapters to keep them close.</span></div> : <div className="native-history-list">{bookmarks.map((item) => { const parts = item.split(':'); const kind = parts[0]; const id = parts.slice(1).join(':'); if (kind === 'article') { const post = allBlogPosts.find((article) => article.slug === id || article.id === id); return post ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openArticle(id)}><span className="native-history-badge"><BookOpen size={17} /></span><div><strong>{post.title}</strong><small>Reading room · saved</small></div><ChevronRight size={17} /></button> : null; } if (kind === 'remedy') { const remedy = materiaMedicaData.find((entry) => entry.id === id); return remedy ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openRemedy(id)}><span className="native-history-badge"><BookMarked size={17} /></span><div><strong>{remedy.name}</strong><small>Materia Medica · saved profile</small></div><ChevronRight size={17} /></button> : null; } if (kind === 'repertory') { const chapter = repertoryDatabase.find((entry) => entry.id === id); return chapter ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openRepertory(id)}><span className="native-history-badge"><Compass size={17} /></span><div><strong>{chapter.name}</strong><small>Repertory · saved chapter</small></div><ChevronRight size={17} /></button> : null; } const subject = allBhmsSubjects.find((entry) => entry.id === id); return subject ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openSubject(id)}><span className="native-history-badge"><GraduationCap size={17} /></span><div><strong>{subject.title}</strong><small>{subject.year} · saved subject</small></div><ChevronRight size={17} /></button> : null; })}</div>}
          </section>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">RECENT QUIZZES</span><h2>Performance review</h2></div></div>{quizHistory.length === 0 ? <div className="native-empty-inline"><Brain size={20} /><span>Complete a practice session to see results here.</span></div> : <div className="native-history-list">{quizHistory.slice(0, 5).map((result, index) => <div className="native-history-row" key={result.date + '-profile-' + index}><span className="native-history-badge"><Award size={17} /></span><div><strong>{result.subject}</strong><small>{result.date} · {result.score}/{result.total} correct</small></div><b>{result.percent}%</b></div>)}</div>}</section>
          <button className="native-secondary-button" onClick={() => { setCompletedLessons([]); setQuizHistory([]); setStudyDays([]); setKnownFlashcards([]); setLastLesson(null); }}>Reset study progress <RotateCcw size={16} /></button><p className="native-reset-note">Reset clears completed topics, streak, quiz history, mastered-card count and continue-learning state on this device. It keeps your bookmarks and does not delete website content.</p>
        </>}
      </motion.main>}

      {screen === 'subject' && selectedSubject && <motion.main key="subject-detail" className="native-detail-content" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
        <div className="native-subject-hero"><div className="native-subject-hero-icon">{React.createElement(subjectIconMap[selectedSubject.id] || GraduationCap, { size: 25 })}</div><span className="native-eyebrow">{selectedSubject.year} · {selectedSubject.category}</span><h1>{selectedSubject.title}</h1><p>{selectedSubject.summary}</p><div className="native-subject-meta"><span><BookOpen size={15} /> {selectedSubject.chapters.length} topics</span><span><Award size={15} /> {selectedSubject.totalMarks} marks</span></div></div>
        <div className="native-detail-actions"><button className="native-primary-button" onClick={() => openLesson(selectedSubject.id, selectedSubject.chapters[0]?.title || selectedSubject.title)}><Play size={17} fill="currentColor" /> Start studying</button><button className={'native-round-action ' + (bookmarks.includes('subject:' + selectedSubject.id) ? 'is-saved' : '')} aria-label="Bookmark subject" onClick={() => toggleBookmark('subject:' + selectedSubject.id)}>{bookmarks.includes('subject:' + selectedSubject.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}</button></div>
        <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">CHAPTER MAP</span><h2>Topics to master</h2></div><span className="native-count-pill">{progressValue(selectedSubject.id, selectedSubject.chapters).done}/{selectedSubject.chapters.length}</span></div><div className="native-chapter-list">{selectedSubject.chapters.map((chapter, index) => { const done = completedLessons.includes(selectedSubject.id + ':' + chapter.title); return <motion.button key={selectedSubject.id + '-' + chapter.title} className={'native-chapter-row ' + (done ? 'is-complete' : '')} onClick={() => openLesson(selectedSubject.id, chapter.title)} whileTap={{ scale: 0.99 }}><span className="native-chapter-number">{done ? <Check size={15} /> : String(index + 1).padStart(2, '0')}</span><span className="native-chapter-copy"><strong>{chapter.title}</strong><small>{chapter.tag || 'Study topic'}</small></span><ChevronRight size={17} /></motion.button>; })}</div></section>
        <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">HIGH-YIELD REVIEW</span><h2>Remember these</h2></div></div><div className="native-keypoint-list">{selectedSubject.highYieldTopics.map((topic, index) => <div className="native-keypoint" key={topic}><span>{String(index + 1).padStart(2, '0')}</span><p>{topic}</p></div>)}</div></section>
        <div className="native-disclaimer"><ShieldCheck size={16} /><span>Use your prescribed syllabus and current faculty guidance as primary references.</span></div>
      </motion.main>}

      {screen === 'lesson' && selectedSubject && <motion.main key="lesson-detail" className="native-detail-content native-reading-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
        <div className="native-reading-meta"><span className="native-eyebrow">{selectedSubject.title}</span><span>{completedLessons.includes(selectedSubject.id + ':' + selectedChapterTitle) ? 'COMPLETED' : 'STUDY NOTE'}</span></div>
        <h1>{selectedChapterTitle}</h1><p className="native-reading-lead">{selectedSubject.summary}</p>
        <div className="native-study-callout"><Sparkles size={19} /><div><strong>Learning objective</strong><p>Explain the central concepts in your own words, connect them to foundational science, and identify what you need to revise.</p></div></div>

        {anatomyContent && <section className="native-reading-section">
          <span className="native-eyebrow">IMPORTED COURSE NOTES · ANATOMY</span>
          <h2>{anatomyContent.title}</h2>
          <p>{anatomyContent.introduction}</p>
          <div className="native-fact-grid">
            <div className="native-fact-card"><span>DEFINITION</span><p>{anatomyContent.quickFacts.definition}</p></div>
            <div className="native-fact-card"><span>LOCATION & FUNCTION</span><p>{anatomyContent.quickFacts.location} {anatomyContent.quickFacts.function}</p></div>
            <div className="native-fact-card native-fact-highlight"><span>CLINICAL IMPORTANCE</span><p>{anatomyContent.quickFacts.clinicalImportance}</p></div>
            <div className="native-fact-card"><span>ONE-LINE REVISION</span><p>{anatomyContent.quickFacts.oneLineRevision}</p></div>
          </div>
          <h2>Learning objectives</h2>
          <div className="native-keypoint-list">{anatomyContent.learningObjectives.slice(0, 6).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          <h2>Gross anatomy</h2>
          <div className="native-keypoint-list">{[...anatomyContent.grossAnatomy.parts, ...anatomyContent.grossAnatomy.relations].slice(0, 8).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          {anatomyContent.grossAnatomy.anatomicalFeatures.length > 0 && <><h2>Anatomical features</h2><div className="native-keypoint-list">{anatomyContent.grossAnatomy.anatomicalFeatures.slice(0, 6).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></>}
          <h2>Applied anatomy & clinical correlation</h2>
          <p>{anatomyContent.appliedAnatomy}</p><p>{anatomyContent.clinicalCorrelation}</p>
          <div className="native-study-callout"><BookOpen size={18} /><div><strong>Blood & nerve supply</strong><p><b>Blood supply:</b> {anatomyContent.bloodSupply}<br /><b>Nerve supply:</b> {anatomyContent.nerveSupply}</p></div></div>
          {anatomyContent.vivaQuestions.length > 0 && <><h2>Viva quick check</h2><div className="native-viva-list">{anatomyContent.vivaQuestions.slice(0, 5).map((item, index) => <details className="native-viva-row" key={item.q + index}><summary>{item.q}</summary><p>{item.a}</p>{item.tip && <small>Exam tip: {item.tip}</small>}</details>)}</div></>}
          {anatomyContent.references.length > 0 && <p className="native-content-citation">Course references: {anatomyContent.references.slice(0, 4).join(' · ')}</p>}
        </section>}

        {physiologyContent && <section className="native-reading-section">
          <span className="native-eyebrow">IMPORTED COURSE NOTES · PHYSIOLOGY</span>
          <h2>{physiologyContent.title}</h2>
          <p>{physiologyContent.introduction}</p>
          <div className="native-fact-grid">
            <div className="native-fact-card"><span>DEFINITION</span><p>{physiologyContent.quickFacts.definition}</p></div>
            <div className="native-fact-card"><span>REFERENCE RANGE</span><p>{physiologyContent.quickFacts.normalRange}</p></div>
            <div className="native-fact-card native-fact-highlight"><span>CLINICAL IMPORTANCE</span><p>{physiologyContent.quickFacts.clinicalImportance}</p></div>
            <div className="native-fact-card"><span>ONE-LINE REVISION</span><p>{physiologyContent.quickFacts.oneLineRevision}</p></div>
          </div>
          <h2>Learning objectives</h2>
          <div className="native-keypoint-list">{physiologyContent.learningObjectives.slice(0, 6).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          <h2>Core concept</h2><p>{physiologyContent.definition}</p><p>{physiologyContent.basicConcepts}</p><p>{physiologyContent.detailedExplanation}</p>
          {physiologyContent.physiologicalMechanism.length > 0 && <><h2>Mechanism, step by step</h2><div className="native-mechanism-list">{physiologyContent.physiologicalMechanism.slice(0, 8).map((step) => <div className="native-mechanism-step" key={step.step}><span>{String(step.step).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></div>)}</div></>}
          {physiologyContent.flowchart.steps.length > 0 && <><h2>{physiologyContent.flowchart.title}</h2><div className="native-mechanism-list">{physiologyContent.flowchart.steps.slice(0, 6).map((step, index) => <div className="native-mechanism-step" key={step.label}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.label}</strong><p>{step.desc}</p></div></div>)}</div></>}
          <h2>Clinical correlation</h2><p>{physiologyContent.clinicalCorrelation}</p><p>{physiologyContent.appliedPhysiology}</p>
          <h2>High-yield review</h2><div className="native-keypoint-list">{physiologyContent.highYieldPoints.slice(0, 8).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          {physiologyContent.vivaQuestions.length > 0 && <><h2>Viva quick check</h2><div className="native-viva-list">{physiologyContent.vivaQuestions.slice(0, 5).map((item, index) => <details className="native-viva-row" key={item.q + index}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></>}
          {physiologyContent.references.length > 0 && <p className="native-content-citation">Course references: {physiologyContent.references.slice(0, 4).join(' · ')}</p>}
        </section>}

        {fmtContent && <section className="native-reading-section">
          <span className="native-eyebrow">IMPORTED COURSE NOTES · FORENSIC MEDICINE</span>
          <h2>{fmtContent.title}</h2><p>{fmtContent.introduction}</p><div className="native-study-callout"><ShieldCheck size={18} /><div><strong>Why this matters</strong><p>{fmtContent.whyThisMatters}</p></div></div>
          <h2>Learning objectives</h2><div className="native-keypoint-list">{fmtContent.learningObjectives.slice(0, 7).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          <h2>Concept explained</h2><p>{fmtContent.simpleExplanation}</p>{fmtContent.detailedNotes && <p>{fmtContent.detailedNotes}</p>}
          {fmtContent.stepByStep.length > 0 && <><h2>Step-by-step</h2><div className="native-mechanism-list">{fmtContent.stepByStep.slice(0, 7).map((step) => <div className="native-mechanism-step" key={step.stepNumber}><span>{String(step.stepNumber).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.description}</p><small>{step.keyTakeaway}</small></div></div>)}</div></>}
          {fmtContent.keyTerms.length > 0 && <><h2>Key terms</h2><div className="native-viva-list">{fmtContent.keyTerms.slice(0, 8).map((term) => <details className="native-viva-row" key={term.term}><summary>{term.term}</summary><p>{term.definition}</p>{term.simpleExplanation && <small>{term.simpleExplanation}</small>}</details>)}</div></>}
          <h2>High-yield points</h2><div className="native-keypoint-list">{fmtContent.highYieldPoints.slice(0, 8).map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div>
          <h2>Summary</h2><p>{fmtContent.summary}</p>
          {fmtContent.vivaQuestions.length > 0 && <><h2>Viva quick check</h2><div className="native-viva-list">{fmtContent.vivaQuestions.slice(0, 5).map((item, index) => <details className="native-viva-row" key={(item.question || '') + index}><summary>{item.question}</summary><p>{item.answer}</p>{item.clinicalPearl && <small>Clinical pearl: {item.clinicalPearl}</small>}</details>)}</div></>}
          <p className="native-content-citation">Refer to current legal and institutional guidance for forensic and medico-legal matters.</p>
        </section>}

        <section className="native-reading-section"><span className="native-eyebrow">WHAT TO FOCUS ON</span><h2>High-yield objectives</h2><div className="native-keypoint-list">{selectedSubject.highYieldTopics.map((topic, index) => <div className="native-keypoint" key={topic}><span>{String(index + 1).padStart(2, '0')}</span><p>{topic}</p></div>)}</div></section>
        <section className="native-reading-section"><span className="native-eyebrow">ACTIVE RECALL</span><h2>Close your notes and explain</h2><p>Can you define the key terms, describe the mechanism or anatomy, and identify one clinical or practical correlation? Explain it aloud or write it in your own words before checking your course material.</p><div className="native-reflection-card"><NotebookPen size={19} /><div><strong>One-minute reflection</strong><span>What is the single most important concept here, and what part still feels unclear?</span></div></div></section>
        <div className="native-reading-source"><ShieldCheck size={16} /><p>This topic roadmap is generated from Curiva's bundled subject catalogue. It is not a replacement for full lecture notes, textbooks, practical training, or clinical protocols.</p></div>
        <button className={'native-primary-button native-complete-button ' + (completedLessons.includes(selectedSubject.id + ':' + selectedChapterTitle) ? 'is-complete' : '')} onClick={completeLesson}>{completedLessons.includes(selectedSubject.id + ':' + selectedChapterTitle) ? <><CheckCircle2 size={18} /> Topic completed</> : <><Check size={18} /> Mark topic complete</>}</button>
        <button className="native-secondary-button" onClick={() => { setQuizSubject(selectedSubject.title.toLowerCase().includes('anatomy') ? 'Anatomy' : selectedSubject.title.toLowerCase().includes('physiology') ? 'Physiology' : 'All subjects'); startQuiz(); }}>Practice recall questions <ArrowRight size={17} /></button>
      </motion.main>}

      {screen === 'article' && selectedArticle && <motion.main key="article-detail" className="native-detail-content native-reading-view" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
        <div className="native-article-banner"><BookOpen size={25} /><span>{(selectedArticle.category || 'CURIVA LIBRARY').toUpperCase()}</span></div><div className="native-reading-meta"><span className="native-eyebrow">{selectedArticle.category || 'Study article'}</span><span>{selectedArticle.date || 'CURIVA LIBRARY'}</span></div>
        <h1>{selectedArticle.title}</h1><p className="native-reading-lead">{selectedArticle.excerpt}</p>
        <div className="native-article-reading-tools"><span><Clock3 size={15} /> {Math.max(2, Math.round((selectedArticle.content || '').split(/\s+/).length / 180))} min read</span><button onClick={() => toggleBookmark('article:' + (selectedArticle.slug || selectedArticle.id))}>{bookmarks.includes('article:' + (selectedArticle.slug || selectedArticle.id)) ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{bookmarks.includes('article:' + (selectedArticle.slug || selectedArticle.id)) ? 'Saved' : 'Save article'}</button></div>
        <div className="native-markdown"><ReactMarkdown>{selectedArticle.content || selectedArticle.excerpt}</ReactMarkdown></div>
        <div className="native-reading-source"><ShieldCheck size={16} /><p>Imported from Curiva's existing content library and bundled inside the app. Editorial review may be needed; verify medical claims with current evidence and trusted references.</p></div><button className="native-secondary-button" onClick={() => { setScreen('main'); setActiveTab('library'); }}>Back to reading room <ArrowRight size={17} /></button>
      </motion.main>}

      {screen === 'remedy' && selectedRemedy && <motion.main key="remedy-detail" className="native-detail-content native-reading-view" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
        <div className="native-subject-hero"><div className="native-subject-hero-icon"><BookMarked size={25} /></div><span className="native-eyebrow">TRADITIONAL MATERIA MEDICA</span><h1>{selectedRemedy.name}</h1><p>{selectedRemedy.commonName} · {selectedRemedy.family}</p><div className="native-subject-meta"><span><BookOpen size={15} /> {selectedRemedy.keynotes.length} keynotes</span><span><Brain size={15} /> Symptom profile</span></div></div>
        <div className="native-detail-actions"><button className="native-primary-button" onClick={() => { setScreen('main'); setActiveTab('library'); setLibraryView('remedies'); }}>Back to profiles <ArrowLeft size={17} /></button><button className={'native-round-action ' + (bookmarks.includes('remedy:' + selectedRemedy.id) ? 'is-saved' : '')} aria-label="Save remedy profile" onClick={() => toggleBookmark('remedy:' + selectedRemedy.id)}>{bookmarks.includes('remedy:' + selectedRemedy.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}</button></div>
        <section className="native-reading-section"><span className="native-eyebrow">KEYNOTES</span><h2>Remember these themes</h2><div className="native-keypoint-list">{selectedRemedy.keynotes.map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></section>
        <section className="native-reading-section"><span className="native-eyebrow">TRADITIONAL PROFILE</span><h2>Mind and emotional themes</h2><div className="native-keypoint-list">{selectedRemedy.mind.map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></section>
        <section className="native-reading-section"><span className="native-eyebrow">TRADITIONAL PROFILE</span><h2>Physical descriptions</h2><div className="native-keypoint-list">{selectedRemedy.physical.map((item, index) => <div className="native-keypoint" key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p></div>)}</div></section>
        <section className="native-reading-section"><span className="native-eyebrow">MODALITIES</span><h2>Reported better and worse conditions</h2><div className="native-fact-grid"><div className="native-fact-card"><span>BETTER · TRADITIONAL REPERTORY</span><div className="native-mini-chip-list">{selectedRemedy.modalities.better.map((item) => <span className="native-mini-chip" key={item}>{item}</span>)}</div></div><div className="native-fact-card"><span>WORSE · TRADITIONAL REPERTORY</span><div className="native-mini-chip-list">{selectedRemedy.modalities.worse.map((item) => <span className="native-mini-chip is-warm" key={item}>{item}</span>)}</div></div></div></section>
        <div className="native-disclaimer"><ShieldCheck size={16} /><span>Academic profile imported from Curiva. These traditional symptom associations are not proof of efficacy, diagnosis, or a treatment recommendation. No dosage instructions are shown.</span></div>
      </motion.main>}

      {screen === 'repertory' && selectedRepertory && <motion.main key="repertory-detail" className="native-detail-content native-reading-view" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
        <div className="native-subject-hero"><div className="native-subject-hero-icon"><Compass size={25} /></div><span className="native-eyebrow">REPERTORY STUDY</span><h1>{selectedRepertory.name}</h1><p>{selectedRepertory.description}</p><div className="native-subject-meta"><span><ListChecks size={15} /> {selectedRepertory.rubrics.length} rubrics</span><span><Search size={15} /> Search within chapter</span></div></div>
        <div className="native-detail-actions"><button className="native-primary-button" onClick={() => { setScreen('main'); setActiveTab('library'); setLibraryView('repertory'); setSearch(''); }}>All repertory chapters <ArrowLeft size={17} /></button><button className={'native-round-action ' + (bookmarks.includes('repertory:' + selectedRepertory.id) ? 'is-saved' : '')} aria-label="Save repertory chapter" onClick={() => toggleBookmark('repertory:' + selectedRepertory.id)}>{bookmarks.includes('repertory:' + selectedRepertory.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}</button></div>
        <div className="native-search-wrap native-rubric-search"><Search size={18} /><input aria-label="Search rubrics in chapter" placeholder="Filter symptoms and rubric terms…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
        <div className="native-result-count">{selectedRepertoryRubrics.length} matching rubrics</div>
        <div className="native-rubric-list">{selectedRepertoryRubrics.slice(0, 100).map((rubric) => <details className="native-rubric-row" key={rubric.id}><summary><span>{rubric.symptom}</span>{rubric.subCategory && <small>{rubric.subCategory}</small>}</summary><div className="native-rubric-content"><span className="native-eyebrow">TRADITIONAL RUBRIC TERMS</span><p>{rubric.notes || 'Review this rubric in its original academic context and confirm its wording against your course reference.'}</p><div className="native-rubric-remedies">{rubric.remedies.map((remedy) => <span key={remedy}>{remedy}</span>)}</div></div></details>)}</div>
        {selectedRepertoryRubrics.length > 100 && <p className="native-content-citation">Showing the first 100 matching rubrics. Narrow your search to explore more precise terms.</p>}
        <div className="native-disclaimer"><ShieldCheck size={16} /><span>Traditional repertory content is provided for academic review. It is not a diagnostic tool or evidence that any listed remedy is effective.</span></div>
      </motion.main>}

      {screen === 'quiz' && currentQuestion && <motion.main key={'quiz-' + questionIndex} className="native-detail-content native-quiz-screen" initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
        <div className="native-quiz-progress-meta"><span>{quizSubject === 'All subjects' ? currentQuestion.subject : quizSubject}</span><span>Question {questionIndex + 1} of {questionPool.length}</span></div><div className="native-progress-track native-quiz-track"><span style={{ width: String((questionIndex + 1) / questionPool.length * 100) + '%' }} /></div>
        <div className="native-question-label"><span>Q{String(questionIndex + 1).padStart(2, '0')}</span><span>{currentQuestion.difficulty}</span></div><h1>{currentQuestion.prompt}</h1>
        <div className="native-answer-list">{currentQuestion.options.map((option, index) => { const isCorrect = index === currentQuestion.answer; const isSelected = index === selectedAnswer; const stateClass = selectedAnswer === null ? '' : isCorrect ? 'is-correct' : isSelected ? 'is-wrong' : 'is-muted'; return <button key={option} className={'native-answer-option ' + stateClass} onClick={() => chooseAnswer(index)} disabled={selectedAnswer !== null}><span>{String.fromCharCode(65 + index)}</span><strong>{option}</strong>{selectedAnswer !== null && isCorrect && <CheckCircle2 size={19} />}{selectedAnswer !== null && isSelected && !isCorrect && <X size={19} />}</button>; })}</div>
        <AnimatePresence>{selectedAnswer !== null && <motion.div className={'native-answer-explanation ' + (selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect')} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}><div><CheckCircle2 size={17} /><strong>{selectedAnswer === currentQuestion.answer ? 'Correct — nice recall' : 'Not quite — learn the concept'}</strong></div><p>{currentQuestion.explanation}</p></motion.div>}</AnimatePresence>
        <div className="native-quiz-bottom"><span><Target size={16} /> Score: {quizScore}/{questionIndex + (selectedAnswer !== null ? 1 : 0)}</span><button className="native-primary-button" disabled={selectedAnswer === null} onClick={nextQuestion}>{questionIndex + 1 === questionPool.length ? 'See results' : 'Next question'} <ArrowRight size={17} /></button></div>
      </motion.main>}

      {screen === 'quiz-result' && <motion.main key="quiz-result" className="native-detail-content native-quiz-result" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}><div className="native-result-illustration"><Trophy size={35} /></div><span className="native-eyebrow">SESSION COMPLETE</span><h1>Good work. Keep <em>going.</em></h1><p className="native-result-copy">Every question is a chance to reinforce understanding.</p><div className="native-result-score"><strong>{quizScore}/{questionPool.length}</strong><span>correct answers</span><div className="native-progress-track"><span style={{ width: String(Math.round(quizScore / questionPool.length * 100)) + '%' }} /></div><b>{Math.round(quizScore / questionPool.length * 100)}% accuracy</b></div><div className="native-result-actions"><button className="native-primary-button" onClick={startQuiz}><RotateCcw size={17} /> Try again</button><button className="native-secondary-button" onClick={() => { setScreen('main'); setActiveTab('practice'); }}>Back to practice</button></div></motion.main>}
    </AnimatePresence>

    {screen === 'main' && <nav className="native-bottom-nav" aria-label="Main navigation">{tabItems.map((tab) => { const Icon = tab.icon; const selected = activeTab === tab.id; return <button key={tab.id} className={selected ? 'is-active' : ''} onClick={() => goToTab(tab.id)} aria-current={selected ? 'page' : undefined}><span><Icon size={20} /></span><small>{tab.label}</small></button>; })}</nav>}
  </div></div>;
}
