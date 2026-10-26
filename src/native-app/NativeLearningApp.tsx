import React, { useEffect, useMemo, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import { LiveUpdate } from '@capawesome/capacitor-live-update';
import ReactMarkdown from 'react-markdown';
import { AnimatePresence, motion } from 'motion/react';
import {
  Activity, ArrowLeft, ArrowRight, Award, Bookmark, BookmarkCheck, BookOpen,
  Brain, Check, CheckCircle2, ChevronRight, Clock3, Compass, Flame, GraduationCap,
  HeartPulse, Home, Library, ListChecks, Search, ShieldCheck, Sparkles, Stethoscope,
  Target, TrendingUp, Trophy, X, Zap, Play, RotateCcw, NotebookPen, Microscope, FlaskConical, BookMarked
} from 'lucide-react';
import { allBhmsSubjects } from '../pages/AllSubjectsHub';
import { allBlogPosts } from '../data/blogPosts';
import { nativeQuestionBank, nativeQuestionSubjects } from './quizBank';
import './native-learning.css';

type Tab = 'home' | 'learn' | 'practice' | 'library' | 'profile';
type Screen = 'main' | 'subject' | 'lesson' | 'article' | 'quiz' | 'quiz-result';
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
  date.setHours(0, 0, 0, 0);
  let streak = 0;
  if (!values.has(date.toISOString().slice(0, 10))) date.setDate(date.getDate() - 1);
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
  { id: 'library', label: 'Library', icon: Library },
  { id: 'profile', label: 'Progress', icon: TrendingUp }
];
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
  const selectedArticle = allBlogPosts.find((post) => post.slug === selectedArticleSlug || post.id === selectedArticleSlug);
  const questionPool = useMemo(() => {
    const result = quizSubject === 'All subjects' ? nativeQuestionBank : nativeQuestionBank.filter((q) => q.subject === quizSubject);
    return result.length ? result : nativeQuestionBank;
  }, [quizSubject]);
  const currentQuestion = questionPool[questionIndex % questionPool.length];
  const streak = getStudyStreak(studyDays);
  const chapterCount = allBhmsSubjects.reduce((count, subject) => count + subject.chapters.length, 0);
  const completedPercent = Math.round(completedLessons.length / Math.max(1, chapterCount) * 100);

  const goToTab = (tab: Tab) => { setActiveTab(tab); setScreen('main'); setSearch(''); };
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
  const toggleBookmark = (id: string) => setBookmarks((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const completeLesson = () => {
    const lessonId = selectedSubjectId + ':' + selectedChapterTitle;
    setCompletedLessons((items) => items.includes(lessonId) ? items : [...items, lessonId]);
    const today = new Date().toISOString().slice(0, 10);
    recordStudyDay();
    setStudyDays((items) => Array.from(new Set([...items, today])));
  };
  const startQuiz = () => { setQuestionIndex(0); setSelectedAnswer(null); setQuizScore(0); setScreen('quiz'); };
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
    else if (screen === 'article') { setScreen('main'); setActiveTab('library'); }
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
      <div className="native-brand-copy"><span>CURIVA</span><small>{screen === 'main' ? 'MEDICAL LEARNING' : screen === 'subject' ? 'SUBJECT OVERVIEW' : screen === 'lesson' ? 'STUDY SESSION' : screen === 'article' ? 'READING ROOM' : 'QUESTION PRACTICE'}</small></div>
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
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">CHOOSE A FOCUS</span><h2>Question set</h2></div></div><label className="native-field-label" htmlFor="native-quiz-subject">Subject</label><select id="native-quiz-subject" className="native-select" value={quizSubject} onChange={(event) => setQuizSubject(event.target.value)}>{nativeQuestionSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select><div className="native-quiz-summary"><div><strong>{(quizSubject === 'All subjects' ? nativeQuestionBank : nativeQuestionBank.filter((q) => q.subject === quizSubject)).length || nativeQuestionBank.length}</strong><span>questions</span></div><div><strong>Instant</strong><span>feedback</span></div><div><strong>Offline</strong><span>available</span></div></div><button className="native-primary-button" onClick={startQuiz}>Start practice <ArrowRight size={18} /></button></section>
          {quizHistory.length > 0 && <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">RECENT SESSIONS</span><h2>Your attempts</h2></div></div><div className="native-history-list">{quizHistory.slice(0, 3).map((result, index) => <div className="native-history-row" key={result.date + '-' + index}><span className="native-history-badge"><Award size={17} /></span><div><strong>{result.subject}</strong><small>{result.date} · {result.score}/{result.total} correct</small></div><b>{result.percent}%</b></div>)}</div></section>}
          <div className="native-disclaimer"><ShieldCheck size={16} /><span>Questions support revision and do not replace your prescribed curriculum or supervised clinical training.</span></div>
        </>}

        {activeTab === 'library' && <>
          <div className="native-page-intro"><span className="native-eyebrow">YOUR READING ROOM</span><h1>Read. Reflect. <em>Remember.</em></h1><p>Existing Curiva articles, bundled for in-app reading.</p></div>
          <div className="native-search-wrap"><Search size={18} /><input aria-label="Search library" placeholder="Search articles and concepts…" value={search} onChange={(event) => setSearch(event.target.value)} /><button onClick={() => setSearch('')} aria-label="Clear search"><X size={16} /></button></div>
          <div className="native-filter-row">{categories.map((category) => <button key={category} className={'native-filter-chip ' + (articleCategory === category ? 'is-selected' : '')} onClick={() => { setArticleCategory(category); setShowAllArticles(false); }}>{category}</button>)}</div>
          <div className="native-result-count">{articles.length} articles shown · read without opening a browser</div>
          <div className="native-article-list">{articles.map((post, index) => { const id = 'article:' + (post.slug || post.id); return <motion.button key={post.id} className="native-article-card" onClick={() => openArticle(post.slug || post.id)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.2) }} whileTap={{ scale: 0.99 }}><div className="native-article-art"><BookOpen size={24} /><span>{(post.category || 'CURIVA').toUpperCase()}</span></div><div className="native-article-copy"><span className="native-eyebrow">{post.category || 'Study note'}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.date || 'Study reading'} · {Math.max(2, Math.round((post.content || '').split(/\s+/).length / 180))} min read</small></div><span className="native-bookmark-button" aria-label="Bookmark article" role="button" onClick={(event) => { event.stopPropagation(); toggleBookmark(id); }}>{bookmarks.includes(id) ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}</span></motion.button>; })}</div>
          {!showAllArticles && articles.length >= 12 && <button className="native-secondary-button" onClick={() => setShowAllArticles(true)}>Show more articles <ChevronRight size={17} /></button>}
          {articles.length === 0 && <div className="native-empty-state"><Library size={24} /><strong>No articles found</strong><span>Try another topic or search phrase.</span></div>}
        </>}

        {activeTab === 'profile' && <>
          <div className="native-page-intro"><span className="native-eyebrow">YOUR LEARNING JOURNEY</span><h1>Look how far <em>you've come.</em></h1><p>Your progress and bookmarks stay on this device.</p></div>
          <div className="native-progress-hero"><div className="native-progress-ring" style={{ '--progress': String(completedPercent * 3.6) + 'deg' } as React.CSSProperties}><div><strong>{completedPercent}%</strong><span>complete</span></div></div><div><span className="native-eyebrow">CURRICULUM PROGRESS</span><h2>One topic at a time</h2><p>{completedLessons.length} lessons checked off your study list.</p></div></div>
          <div className="native-stats-grid"><div><span><Flame size={18} /></span><strong>{streak}</strong><small>Current streak</small></div><div><span><CheckCircle2 size={18} /></span><strong>{completedLessons.length}</strong><small>Topics completed</small></div><div><span><Trophy size={18} /></span><strong>{quizHistory.length}</strong><small>Quiz sessions</small></div><div><span><Bookmark size={18} /></span><strong>{bookmarks.length}</strong><small>Saved items</small></div></div>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">SAVED FOR LATER</span><h2>Your bookmarks</h2></div></div>
            {bookmarks.length === 0 ? <div className="native-empty-inline"><Bookmark size={20} /><span>Save an article or subject to keep it close.</span></div> : <div className="native-history-list">{bookmarks.map((item) => { const parts = item.split(':'); const kind = parts[0]; const id = parts.slice(1).join(':'); if (kind === 'article') { const post = allBlogPosts.find((article) => article.slug === id || article.id === id); return post ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openArticle(id)}><span className="native-history-badge"><BookOpen size={17} /></span><div><strong>{post.title}</strong><small>Reading room · saved</small></div><ChevronRight size={17} /></button> : null; } const subject = allBhmsSubjects.find((entry) => entry.id === id); return subject ? <button className="native-history-row native-history-row-button" key={item} onClick={() => openSubject(id)}><span className="native-history-badge"><GraduationCap size={17} /></span><div><strong>{subject.title}</strong><small>{subject.year} · saved subject</small></div><ChevronRight size={17} /></button> : null; })}</div>}
          </section>
          <section className="native-section"><div className="native-section-heading"><div><span className="native-eyebrow">RECENT QUIZZES</span><h2>Performance review</h2></div></div>{quizHistory.length === 0 ? <div className="native-empty-inline"><Brain size={20} /><span>Complete a practice session to see results here.</span></div> : <div className="native-history-list">{quizHistory.slice(0, 5).map((result, index) => <div className="native-history-row" key={result.date + '-profile-' + index}><span className="native-history-badge"><Award size={17} /></span><div><strong>{result.subject}</strong><small>{result.date} · {result.score}/{result.total} correct</small></div><b>{result.percent}%</b></div>)}</div>}</section>
          <button className="native-secondary-button" onClick={() => { setCompletedLessons([]); setQuizHistory([]); setStudyDays([]); }}>Reset study progress <RotateCcw size={16} /></button><p className="native-reset-note">Reset clears completed topics, streak and quiz history on this device. It does not delete your account or website content.</p>
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
