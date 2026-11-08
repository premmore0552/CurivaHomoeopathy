import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { User } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { AlertCircle, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, CheckCircle2, Clock3, Filter, Flag, LogOut, Search, ShieldCheck, Trophy, UserRound, XCircle } from 'lucide-react';
import { auth, googleProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from '../lib/firebase';
import { userService } from '../services/userService';
import { getGoogleAuthErrorMessage, shouldUseGoogleRedirectFallback } from '../lib/authErrorMessage';
import SEO from './SEO';
import {
  chauhanQuestionBankStats,
  chauhanQuestionChapters,
  chauhanSourceAttribution,
  loadChauhanQuestionBank
} from '../data/chauhanQuestionBankLoader';
import type { ChauhanQuestion } from '../data/chauhanQuestionBank';

type Props = {
  embedded?: boolean;
  onBack?: () => void;
  onManageAccount?: () => void;
};

type PracticeFilter = 'all' | 'bookmarked' | 'incorrect' | 'source-review';

const BOOKMARK_KEY = 'curiva-chauhan-upsc-md-bookmarks:';
const INCORRECT_KEY = 'curiva-chauhan-upsc-md-incorrect:';
const GOOGLE_REDIRECT_PENDING_KEY = 'curiva-chauhan-google-redirect-pending';
const NATIVE_RETURN_TO_BANK_KEY = 'curiva-native-open-upsc-md-after-auth';

function readIdList(key: string): string[] {
  try {
    const value = JSON.parse(localStorage.getItem(key) || '[]');
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function formatTime(totalSeconds: number) {
  const seconds = Math.max(0, totalSeconds);
  return String(Math.floor(seconds / 60)).padStart(2, '0') + ':' + String(seconds % 60).padStart(2, '0');
}

function questionTypeLabel(question: ChauhanQuestion) {
  switch (question.questionType) {
    case 'assertion_reason': return 'Assertion & reason';
    case 'multiple_statement': return 'Statement-based';
    case 'matching': return 'Matching';
    case 'sequencing': return 'Sequencing';
    case 'short_answer': return 'Written answer';
    default: return 'Single-best answer';
  }
}

function SourceLine({ question }: { question: ChauhanQuestion }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-text-tertiary">
      <span>{question.chapter}</span>
      {question.examSource && <span>Exam reference: {question.examSource}</span>}
      {question.bookPage && <span>Book p. {question.bookPage}</span>}
      {question.sourcePage && <span>PDF p. {question.sourcePage}</span>}
    </div>
  );
}

export default function UPSCMDQuestionPractice({ embedded = false, onBack, onManageAccount }: Props) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState('');
  const [loadedAccountUid, setLoadedAccountUid] = useState<string | null>(null);
  const [mode, setMode] = useState<'practice' | 'mock' | 'results'>('practice');
  const [query, setQuery] = useState('');
  const [chapter, setChapter] = useState('All chapters');
  const [practiceFilter, setPracticeFilter] = useState<PracticeFilter>('all');
  const [index, setIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [incorrectIds, setIncorrectIds] = useState<string[]>([]);
  const [expandedExplanationId, setExpandedExplanationId] = useState<string | null>(null);
  const [mockLength, setMockLength] = useState('50');
  const [mockDuration, setMockDuration] = useState('30');
  const [mockQuestions, setMockQuestions] = useState<ChauhanQuestion[]>([]);
  const [mockAnswers, setMockAnswers] = useState<Record<string, number>>({});
  const [mockIndex, setMockIndex] = useState(0);
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<number | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [questionBank, setQuestionBank] = useState<ChauhanQuestion[]>([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankError, setBankError] = useState('');
  const [bankProgress, setBankProgress] = useState({ loaded: 0, total: 11 });
  const [bankLoadAttempt, setBankLoadAttempt] = useState(0);

  const scorableQuestionBank = useMemo(
    () => questionBank.filter((question) => question.scoringEnabled && question.correctIndex !== null),
    [questionBank],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setAuthReady(true);
      if (user && !Capacitor.isNativePlatform()) {
        try {
          if (localStorage.getItem(GOOGLE_REDIRECT_PENDING_KEY) === 'true') {
            localStorage.removeItem(GOOGLE_REDIRECT_PENDING_KEY);
            void userService.syncAuthUser('BHMS Student').catch(() => {
              setAuthError('Google sign-in succeeded, but Curiva could not synchronize your scholar profile. Check your connection and refresh the page.');
            });
          }
        } catch { /* Auth remains available if optional browser storage is blocked. */ }
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!authUser) {
      setBookmarks([]);
      setIncorrectIds([]);
      setLoadedAccountUid(null);
      return;
    }
    const uid = authUser.uid;
    setBookmarks(readIdList(BOOKMARK_KEY + uid));
    setIncorrectIds(readIdList(INCORRECT_KEY + uid));
    setLoadedAccountUid(uid);
  }, [authUser?.uid]);

  // Keep the complete source question collection out of the signed-out entry path.
  useEffect(() => {
    if (!authReady || !authUser) {
      setQuestionBank([]);
      setBankLoading(false);
      setBankError('');
      return;
    }

    let active = true;
    setQuestionBank([]);
    setBankError('');
    setBankProgress({ loaded: 0, total: 11 });
    setBankLoading(true);

    void loadChauhanQuestionBank((loaded, total) => {
      if (active) setBankProgress({ loaded, total });
    })
      .then((questions) => {
        if (active) setQuestionBank(questions);
      })
      .catch((error: unknown) => {
        if (active) setBankError(error instanceof Error ? error.message : 'The question collection could not be loaded.');
      })
      .finally(() => {
        if (active) setBankLoading(false);
      });

    return () => {
      active = false;
    };
  }, [authReady, authUser?.uid, bankLoadAttempt]);

  useEffect(() => {
    if (!authUser || loadedAccountUid !== authUser.uid) return;
    try { localStorage.setItem(BOOKMARK_KEY + authUser.uid, JSON.stringify(bookmarks)); } catch { /* Account-local storage is optional. */ }
  }, [authUser?.uid, loadedAccountUid, bookmarks]);

  useEffect(() => {
    if (!authUser || loadedAccountUid !== authUser.uid) return;
    try { localStorage.setItem(INCORRECT_KEY + authUser.uid, JSON.stringify(incorrectIds)); } catch { /* Account-local storage is optional. */ }
  }, [authUser?.uid, loadedAccountUid, incorrectIds]);

  const handleGoogleSignIn = async () => {
    setAuthBusy(true);
    setAuthError('');
    try {
      const isMobileBrowser = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobileBrowser) {
        localStorage.setItem(GOOGLE_REDIRECT_PENDING_KEY, 'true');
        await signInWithRedirect(auth, googleProvider);
        return;
      }

      let credential: Awaited<ReturnType<typeof signInWithPopup>>;
      try {
        credential = await signInWithPopup(auth, googleProvider);
      } catch (authError: unknown) {
        if (shouldUseGoogleRedirectFallback(authError)) {
          localStorage.setItem(GOOGLE_REDIRECT_PENDING_KEY, 'true');
          await signInWithRedirect(auth, googleProvider);
          return;
        }
        throw authError;
      }

      // Authentication succeeded: reveal the account-gated study bank independently
      // of profile persistence, and report profile sync failures as a separate issue.
      setAuthUser(credential.user);
      try {
        await userService.syncAuthUser('BHMS Student');
      } catch {
        setAuthError('Google sign-in succeeded, but Curiva could not synchronize your scholar profile. Check your connection and refresh the page.');
      }
    } catch (error: unknown) {
      try { localStorage.removeItem(GOOGLE_REDIRECT_PENDING_KEY); } catch { /* Ignore optional cleanup failures. */ }
      setAuthError(getGoogleAuthErrorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  };

  const handleNativeSignIn = () => {
    try { localStorage.setItem(NATIVE_RETURN_TO_BANK_KEY, 'true'); } catch { /* Return navigation is optional. */ }
    onManageAccount?.();
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMode('practice');
      setPracticeAnswers({});
      setExpandedExplanationId(null);
    } catch (error) {
      setAuthError('Sign out could not be completed. Please retry.');
    }
  };

  const filteredQuestions = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return questionBank.filter((question) => {
      const matchesChapter = chapter === 'All chapters' || question.chapter === chapter;
      const matchesSearch = !term || [
        question.prompt, question.explanation, question.examSource || '',
        question.chapter, question.sourceAnswerText || ''
      ].join(' ').toLocaleLowerCase().includes(term);
      const matchesFilter =
        practiceFilter === 'all' ||
        (practiceFilter === 'bookmarked' && bookmarks.includes(question.id)) ||
        (practiceFilter === 'incorrect' && incorrectIds.includes(question.id)) ||
        (practiceFilter === 'source-review' && !question.scoringEnabled);
      return matchesChapter && matchesSearch && matchesFilter;
    });
  }, [questionBank, query, chapter, practiceFilter, bookmarks, incorrectIds]);

  useEffect(() => { setIndex(0); setExpandedExplanationId(null); }, [query, chapter, practiceFilter]);

  const currentQuestion = filteredQuestions[index];
  const isBookmarked = currentQuestion ? bookmarks.includes(currentQuestion.id) : false;
  const selectedPracticeAnswer = currentQuestion ? practiceAnswers[currentQuestion.id] : undefined;
  const isCurrentScorable = Boolean(currentQuestion?.scoringEnabled && currentQuestion.correctIndex !== null);
  const isCurrentExplanationExpanded = Boolean(currentQuestion && expandedExplanationId === currentQuestion.id);

  const mockPool = useMemo(
    () => chapter === 'All chapters'
      ? scorableQuestionBank
      : scorableQuestionBank.filter((question) => question.chapter === chapter),
    [chapter, scorableQuestionBank]
  );
  const currentMockQuestion = mockQuestions[mockIndex];
  const mockScore = mockQuestions.filter(
    (question) => mockAnswers[question.id] === question.correctIndex
  ).length;
  const mockAttempted = Object.keys(mockAnswers).length;

  useEffect(() => {
    if (mode !== 'mock' || deadline === null) return;
    const refresh = () => setRemainingSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    refresh();
    const timer = window.setInterval(refresh, 1000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [mode, deadline]);

  const finishMock = useCallback(() => {
    if (mode !== 'mock') return;
    const misses = mockQuestions
      .filter((question) => mockAnswers[question.id] !== question.correctIndex)
      .map((question) => question.id);
    setIncorrectIds((items) => Array.from(new Set([...items, ...misses])));
    setMode('results');
    setDeadline(null);
  }, [mode, mockQuestions, mockAnswers]);

  useEffect(() => {
    if (mode === 'mock' && remainingSeconds === 0) finishMock();
  }, [mode, remainingSeconds, finishMock]);

  const toggleBookmark = (id: string) => {
    setBookmarks((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const choosePracticeAnswer = (question: ChauhanQuestion, optionIndex: number) => {
    if (practiceAnswers[question.id] !== undefined) return;
    setPracticeAnswers((items) => ({ ...items, [question.id]: optionIndex }));

    if (question.scoringEnabled && question.correctIndex !== null && optionIndex !== question.correctIndex) {
      setIncorrectIds((items) => Array.from(new Set([...items, question.id])));
    }
  };

  const toggleExplanation = (id: string) => {
    setExpandedExplanationId((current) => current === id ? null : id);
  };

  const startMock = () => {
    if (bankLoading || bankError || !mockPool.length) return;
    const shuffled = [...mockPool];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const length = Math.min(Number(mockLength), shuffled.length);
    if (!length) return;
    const selected = shuffled.slice(0, length);
    const duration = Math.max(1, Number(mockDuration) || 30);
    setMockQuestions(selected);
    setMockAnswers({});
    setFlaggedIds([]);
    setMockIndex(0);
    setRemainingSeconds(duration * 60);
    setDeadline(Date.now() + duration * 60 * 1000);
    setMode('mock');
  };

  const exitToPractice = () => {
    setMode('practice');
    setDeadline(null);
    setMockQuestions([]);
    setMockAnswers({});
    setMockIndex(0);
  };

  const toggleFlag = (id: string) => {
    setFlaggedIds((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  };

  const wrapperClass = embedded
    ? 'native-detail-content space-y-5 pb-8'
    : 'mx-auto min-h-screen max-w-7xl space-y-7 px-4 py-8 text-text-primary sm:px-6 lg:px-8';

  return (
    <main className={wrapperClass}>
      {!embedded && <SEO title="UPSC & MD Homoeopathy Entrance Question Practice | Curiva" description="Practise the complete Dr. V. K. Chauhan UPSC and MD entrance question collection, with subject filters, explanations, bookmarks and timed mock tests." />}
      <header className="space-y-3">
        {embedded && onBack && <button type="button" className="native-secondary-button" onClick={onBack}><ArrowLeft size={16} /> Back to practice</button>}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-primary">National and postgraduate entrance preparation</span>
            <h1 className={embedded ? 'text-2xl font-serif font-bold' : 'text-3xl font-serif font-bold sm:text-4xl'}>UPSC &amp; MD Entrance Question Practice</h1>
            <p className="text-sm leading-relaxed text-text-secondary">A searchable practice collection covering the book’s subject chapters, UPSC screening questions and NHMC, RPSC and UPSC solved papers.</p>
          </div>
          <div className="rounded-2xl border border-border bg-bg-secondary px-4 py-3 text-sm">
            <strong className="block text-xl font-black tabular-nums">{chauhanQuestionBankStats.total.toLocaleString('en-IN')}</strong>
            <span className="text-xs text-text-secondary">questions in this collection</span>
            <div className="mt-1 text-[11px] text-text-tertiary">{chauhanQuestionBankStats.scorable.toLocaleString('en-IN')} keyed · {chauhanQuestionBankStats.sourceReview} source-review</div>
          </div>
        </div>
      </header>

      {authReady && authUser && bankLoading && (
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-4" role="status" aria-live="polite">
          <div className="flex items-center justify-between gap-3 text-xs font-bold text-text-primary">
            <span>Loading the complete source question collection</span>
            <span className="tabular-nums">{bankProgress.loaded}/{bankProgress.total}</span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-bg-primary">
            <div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${Math.round(bankProgress.loaded / Math.max(1, bankProgress.total) * 100)}%` }} />
          </div>
          <p className="mt-2 text-[11px] text-text-secondary">All source sections are loaded before the full searchable practice session opens.</p>
        </section>
      )}
      {authReady && authUser && bankError && (
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-red-500/25 bg-red-500/5 p-4" role="alert">
          <p className="min-w-0 flex-1 text-xs leading-relaxed text-text-secondary">The question collection could not be loaded: {bankError}</p>
          <button type="button" onClick={() => setBankLoadAttempt((attempt) => attempt + 1)} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white">Retry loading</button>
        </section>
      )}
      {!authReady ? (
        <section className="rounded-3xl border border-border bg-bg-secondary p-8 text-center">
          <div className="mx-auto mb-3 h-9 w-9 animate-spin rounded-full border-2 border-primary/25 border-t-primary" />
          <p className="text-sm font-semibold text-text-secondary">Checking your Curiva account…</p>
        </section>
      ) : !authUser ? (
        <section className="mx-auto w-full max-w-xl space-y-4 rounded-3xl border border-border bg-bg-secondary p-6 text-center shadow-sm sm:p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><ShieldCheck size={27} /></div>
          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-[0.15em] text-primary">Your Curiva study account</span>
            <h2 className="text-2xl font-serif font-bold text-text-primary">Sign in to practise</h2>
            <p className="text-sm leading-relaxed text-text-secondary">Sign in to open the complete UPSC & MD question bank. Your bookmarks and incorrect-answer list will be kept separately for your account on this device.</p>
          </div>
          {Capacitor.isNativePlatform() ? (
            <button type="button" disabled={!onManageAccount} onClick={handleNativeSignIn} className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 py-3.5 text-sm font-bold text-white disabled:opacity-40">
              <UserRound size={18} /> Sign in to your Curiva account
            </button>
          ) : (
            <button type="button" disabled={authBusy} onClick={() => void handleGoogleSignIn()} className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 disabled:opacity-50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 text-sm font-black text-[#4285F4]">G</span>
              {authBusy ? 'Connecting to Google…' : 'Continue with Google'}
            </button>
          )}
          {authError && <p role="alert" className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-left text-xs leading-relaxed text-red-700 dark:text-red-300">{authError}</p>}
          {!Capacitor.isNativePlatform() && <p className="text-[11px] text-text-tertiary">Google sign-in is handled securely by Firebase Authentication. Curiva does not receive or store your Google password.</p>}
          {Capacitor.isNativePlatform() && <p className="text-[11px] text-text-tertiary">Use the sign-in screen provided by the Curiva Android app to continue.</p>}
        </section>
      ) : (
        <>
          {!embedded && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-bg-secondary px-4 py-3">
              <div className="flex min-w-0 items-center gap-3">
                {authUser.photoURL ? <img src={authUser.photoURL} alt="" className="h-9 w-9 rounded-full" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary"><UserRound size={17} /></span>}
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-text-primary">{authUser.displayName || 'Curiva learner'}</p>
                  <p className="truncate text-xs text-text-tertiary">{authUser.email}</p>
                </div>
              </div>
              <button type="button" onClick={() => void handleSignOut()} className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-bold text-text-secondary hover:bg-bg-primary"><LogOut size={14} /> Sign out</button>
            </div>
          )}
      {mode === 'practice' && <>
        <section className="rounded-2xl border border-border bg-bg-secondary p-4 sm:p-5">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(13rem,0.45fr)]">
            <label className="relative block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full rounded-xl border border-border bg-bg-primary py-3 pl-9 pr-3 text-sm" placeholder="Search questions, key phrases, source papers or explanations…" />
            </label>
            <label className="flex items-center gap-2 text-xs font-bold text-text-secondary">
              <Filter size={15} />
              <select value={chapter} onChange={(event) => setChapter(event.target.value)} className="min-w-0 flex-1 rounded-xl border border-border bg-bg-primary p-3 text-xs">
                <option>All chapters</option>
                {chauhanQuestionChapters.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {([
              ['all', 'All questions'],
              ['bookmarked', 'Bookmarked'],
              ['incorrect', 'Incorrect answers'],
              ['source-review', 'Source review / written']
            ] as [PracticeFilter, string][]).map(([value, label]) => (
              <button key={value} type="button" onClick={() => setPracticeFilter(value)} className={'rounded-full border px-3 py-2 text-xs font-bold ' + (practiceFilter === value ? 'border-primary bg-primary text-white' : 'border-border bg-bg-primary text-text-secondary')}>
                {label}
                {value === 'bookmarked' ? ` · ${bookmarks.length}` : value === 'incorrect' ? ` · ${incorrectIds.length}` : value === 'source-review' ? ` · ${chauhanQuestionBankStats.sourceReview}` : ''}
              </button>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-text-tertiary">
            <span>{filteredQuestions.length.toLocaleString('en-IN')} questions match your filters</span>
            <button type="button" onClick={startMock} disabled={bankLoading || Boolean(bankError) || !mockPool.length} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 font-bold text-white disabled:opacity-40"><Clock3 size={15} /> Start timed mock</button>
          </div>
        </section>

        {currentQuestion ? <article className="space-y-4 rounded-3xl border border-border bg-bg-secondary p-5 shadow-sm sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-3">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-lg bg-primary/10 px-2 py-1 font-mono text-[11px] font-bold text-primary">Q. {currentQuestion.questionNumber}</span>
                <span className="rounded-full border border-border bg-bg-primary px-2.5 py-1 text-[11px] font-semibold text-text-secondary">{questionTypeLabel(currentQuestion)}</span>
                {currentQuestion.scoringEnabled
                  ? <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">Answer key available</span>
                  : <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-bold text-amber-800 dark:text-amber-300">Source review · unscored</span>}
              </div>
              <SourceLine question={currentQuestion} />
            </div>
            <button type="button" onClick={() => toggleBookmark(currentQuestion.id)} className="inline-flex items-center gap-2 rounded-xl border border-border bg-bg-primary px-3 py-2 text-xs font-bold text-text-secondary">
              {isBookmarked ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              {isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>
          </div>

          <h2 className="whitespace-pre-wrap text-base font-semibold leading-relaxed text-text-primary sm:text-lg">{currentQuestion.prompt || 'Question text was not extractable from the source text layer. See the cited page in the original book.'}</h2>

          {currentQuestion.options.length > 0 && <div className="space-y-2.5">
            {currentQuestion.options.map((option, optionIndex) => {
              const selected = selectedPracticeAnswer === optionIndex;
              const correct = isCurrentScorable && currentQuestion.correctIndex === optionIndex;
              const showState = selectedPracticeAnswer !== undefined && isCurrentScorable;
              const style = showState && correct
                ? 'border-emerald-500 bg-emerald-500/10 text-text-primary'
                : selected && showState
                  ? 'border-red-400 bg-red-500/10 text-text-primary'
                  : selected
                    ? 'border-primary bg-primary/10 text-text-primary'
                    : 'border-border bg-bg-primary text-text-secondary hover:border-primary/50';
              return (
                <button key={optionIndex} type="button" disabled={selectedPracticeAnswer !== undefined} onClick={() => choosePracticeAnswer(currentQuestion, optionIndex)} className={'flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm transition-colors ' + style}>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/30 text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span>
                  <span className="whitespace-pre-wrap pt-1">{option.replace(/^[A-D]\.\s*/, '')}</span>
                  {showState && correct && <CheckCircle2 className="ml-auto mt-1 shrink-0 text-emerald-600" size={17} />}
                  {showState && selected && !correct && <XCircle className="ml-auto mt-1 shrink-0 text-red-500" size={17} />}
                </button>
              );
            })}
          </div>}

          {selectedPracticeAnswer !== undefined && (
            <div className={'rounded-xl border p-3 text-xs leading-relaxed ' + (isCurrentScorable
              ? selectedPracticeAnswer === currentQuestion.correctIndex
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
                : 'border-red-500/30 bg-red-500/10 text-red-800 dark:text-red-200'
              : 'border-amber-500/30 bg-amber-500/10 text-amber-900 dark:text-amber-200')}>
              {isCurrentScorable
                ? selectedPracticeAnswer === currentQuestion.correctIndex ? 'Correct answer.' : 'Not quite. Review the source explanation below.'
                : 'This item is retained for practice, but the source does not provide a reliably scorable A–D key.'}
            </div>
          )}

          <button
            type="button"
            onClick={() => toggleExplanation(currentQuestion.id)}
            aria-expanded={isCurrentExplanationExpanded}
            aria-controls={'chauhan-explanation-' + currentQuestion.id}
            className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-bold text-primary hover:bg-primary/10"
          >
            {isCurrentExplanationExpanded ? 'Hide full explanation' : 'View full explanation'}
            <ArrowRight size={15} className={isCurrentExplanationExpanded ? 'rotate-90' : ''} />
          </button>

          {isCurrentExplanationExpanded && (
            <section
              id={'chauhan-explanation-' + currentQuestion.id}
              className="space-y-4 rounded-2xl border border-border bg-bg-primary p-4 sm:p-5"
            >
              <div className="space-y-1">
                <h3 className="text-sm font-black text-primary">Full source explanation</h3>
                <p className="text-[11px] text-text-tertiary">The complete explanation text extracted for this question is shown below.</p>
              </div>
              {isCurrentScorable && currentQuestion.correctIndex !== null && (
                <div className="rounded-xl bg-emerald-500/10 p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">Correct answer</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold text-text-primary">{currentQuestion.options[currentQuestion.correctIndex]}</p>
                </div>
              )}
              {!isCurrentScorable && currentQuestion.sourceAnswerText && (
                <div className="rounded-xl bg-bg-secondary p-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-text-tertiary">Source answer</p>
                  <p className="mt-1 whitespace-pre-wrap break-words text-sm text-text-primary">{currentQuestion.sourceAnswerText}</p>
                </div>
              )}
              {currentQuestion.explanation?.trim()
                ? <div className="whitespace-pre-wrap break-words [overflow-wrap:anywhere] text-sm leading-7 text-text-secondary">{currentQuestion.explanation}</div>
                : <p className="text-sm text-text-tertiary">No separate explanation text was present in the extracted source for this question.</p>}
            </section>
          )}

          {!currentQuestion.scoringEnabled && currentQuestion.reviewFlags.length > 0 && <p className="text-[11px] text-text-tertiary">Import note: {currentQuestion.reviewFlags.join(', ').replaceAll('_', ' ')}.</p>}

          <div className="flex items-center justify-between border-t border-border pt-4">
            <button type="button" disabled={index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))} className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-bold disabled:opacity-40"><ArrowLeft size={15} /> Previous</button>
            <span className="text-xs font-semibold text-text-tertiary">{index + 1} / {filteredQuestions.length}</span>
            <button type="button" disabled={index >= filteredQuestions.length - 1} onClick={() => setIndex((value) => Math.min(filteredQuestions.length - 1, value + 1))} className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold text-white disabled:opacity-40">Next <ArrowRight size={15} /></button>
          </div>
        </article> : <div className="rounded-2xl border border-border bg-bg-secondary p-8 text-center text-sm text-text-secondary">{bankLoading ? `Loading source questions (${bankProgress.loaded}/${bankProgress.total} parts loaded)…` : bankError ? 'The question bank could not be loaded. Use the retry control above.' : 'No questions match this selection. Clear the search or choose another filter.'}</div>}

        <section className="rounded-2xl border border-border bg-bg-secondary p-4 text-xs leading-relaxed text-text-secondary">
          <strong className="text-text-primary">Timed mock paper presets:</strong> 50 questions / 30 minutes, 100 / 60 minutes, or 200 / 120 minutes. The source book describes approximately 200 MCQs in 2 hours as a general preparation guide; these are practice presets, not a claim about a current official exam pattern.
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <label className="space-y-1 font-semibold">Paper length
              <select value={mockLength} onChange={(event) => setMockLength(event.target.value)} className="w-full rounded-xl border border-border bg-bg-primary p-2.5 text-xs">
                <option value="50">50 questions</option><option value="100">100 questions</option><option value="200">200 questions</option>
              </select>
            </label>
            <label className="space-y-1 font-semibold">Time limit
              <select value={mockDuration} onChange={(event) => setMockDuration(event.target.value)} className="w-full rounded-xl border border-border bg-bg-primary p-2.5 text-xs">
                <option value="30">30 minutes</option><option value="60">60 minutes</option><option value="120">120 minutes</option>
              </select>
            </label>
            <div className="flex items-end"><button type="button" onClick={startMock} disabled={!mockPool.length} className="w-full rounded-xl bg-primary px-3 py-2.5 text-xs font-bold text-white disabled:opacity-40">Start mock examination</button></div>
          </div>
          <p className="mt-2 text-[11px] text-text-tertiary">{mockPool.length.toLocaleString('en-IN')} scored questions available in {chapter === 'All chapters' ? 'the full collection' : chapter}.</p>
        </section>
      </>}

      {mode === 'mock' && currentMockQuestion && <>
        <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-bg-secondary p-4">
          <div><span className="text-[10px] font-black uppercase tracking-wider text-primary">Timed mock examination</span><p className="text-sm font-bold">{mockIndex + 1} of {mockQuestions.length} · {mockAttempted} attempted</p></div>
          <div className="flex items-center gap-2 rounded-xl bg-bg-primary px-3 py-2 font-mono text-lg font-black tabular-nums"><Clock3 size={17} /> {formatTime(remainingSeconds)}</div>
          <button type="button" onClick={finishMock} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white">Submit paper</button>
        </section>
        <article className="space-y-4 rounded-3xl border border-border bg-bg-secondary p-5 sm:p-7">
          <div className="flex flex-wrap justify-between gap-2 text-xs text-text-tertiary"><span>{currentMockQuestion.chapter} · {questionTypeLabel(currentMockQuestion)}</span><button type="button" onClick={() => toggleFlag(currentMockQuestion.id)} className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5"><Flag size={13} /> {flaggedIds.includes(currentMockQuestion.id) ? 'Marked for review' : 'Mark for review'}</button></div>
          <h2 className="whitespace-pre-wrap text-base font-semibold leading-relaxed sm:text-lg">{currentMockQuestion.prompt}</h2>
          <div className="space-y-2.5">{currentMockQuestion.options.map((option, optionIndex) => <button key={optionIndex} type="button" disabled={mockAnswers[currentMockQuestion.id] !== undefined} onClick={() => setMockAnswers((items) => ({ ...items, [currentMockQuestion.id]: optionIndex }))} className={'flex w-full items-start gap-3 rounded-xl border p-3 text-left text-sm ' + (mockAnswers[currentMockQuestion.id] === optionIndex ? 'border-primary bg-primary/10' : 'border-border bg-bg-primary')}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current/30 text-xs font-black">{String.fromCharCode(65 + optionIndex)}</span><span className="whitespace-pre-wrap pt-1">{option.replace(/^[A-D]\.\s*/, '')}</span>
          </button>)}</div>
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
            <button type="button" disabled={mockIndex === 0} onClick={() => setMockIndex((value) => Math.max(0, value - 1))} className="rounded-xl border border-border px-4 py-2 text-xs font-bold disabled:opacity-40">Previous</button>
            <span className="text-xs text-text-tertiary">{mockAnswers[currentMockQuestion.id] === undefined ? 'Not answered' : 'Answer saved'}{flaggedIds.includes(currentMockQuestion.id) ? ' · Marked for review' : ''}</span>
            <button type="button" disabled={mockIndex >= mockQuestions.length - 1} onClick={() => setMockIndex((value) => Math.min(mockQuestions.length - 1, value + 1))} className="rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white disabled:opacity-40">Next</button>
          </div>
          <div className="flex flex-wrap gap-1.5">{mockQuestions.map((question, questionIndex) => <button key={question.id} type="button" onClick={() => setMockIndex(questionIndex)} aria-label={'Go to question ' + (questionIndex + 1)} className={'h-8 w-8 rounded-lg text-[11px] font-bold ' + (questionIndex === mockIndex ? 'bg-primary text-white' : flaggedIds.includes(question.id) ? 'bg-amber-500/20 text-amber-800' : mockAnswers[question.id] !== undefined ? 'bg-emerald-500/15 text-emerald-700' : 'bg-bg-primary text-text-tertiary')}>{questionIndex + 1}</button>)}</div>
        </article>
      </>}

      {mode === 'results' && <>
        <section className="rounded-3xl border border-border bg-bg-secondary p-6 text-center sm:p-9">
          <Trophy size={32} className="mx-auto text-primary" />
          <span className="mt-3 block text-xs font-black uppercase tracking-wider text-primary">Mock paper submitted</span>
          <h2 className="mt-2 text-3xl font-black tabular-nums">{mockScore} / {mockQuestions.length}</h2>
          <p className="mt-1 text-sm text-text-secondary">{mockQuestions.length ? Math.round(mockScore / mockQuestions.length * 100) : 0}% accuracy · {mockAttempted} attempted · {mockQuestions.length - mockAttempted} unanswered</p>
          <div className="mx-auto mt-5 max-w-sm"><button type="button" onClick={startMock} className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white">Start another mock</button><button type="button" onClick={exitToPractice} className="mt-2 w-full rounded-xl border border-border px-4 py-3 text-sm font-bold">Back to question practice</button></div>
        </section>
        <div className="space-y-3">
          {mockQuestions.map((question, questionIndex) => {
            const selected = mockAnswers[question.id];
            const correct = selected === question.correctIndex;
            return <article key={question.id} className="space-y-3 rounded-2xl border border-border bg-bg-secondary p-4">
              <div className="flex flex-wrap justify-between gap-2 text-xs text-text-tertiary"><span>Q{questionIndex + 1} · {question.chapter}</span><strong className={correct ? 'text-emerald-600' : 'text-red-500'}>{correct ? 'Correct' : selected === undefined ? 'Unanswered' : 'Incorrect'}</strong></div>
              <h3 className="whitespace-pre-wrap text-sm font-semibold">{question.prompt}</h3>
              <p className="text-xs"><strong>Your answer:</strong> {selected === undefined ? 'Not answered' : question.options[selected]}</p>
              <p className="text-xs"><strong>Key:</strong> {question.options[question.correctIndex as number]}</p>
              {question.explanation && <p className="whitespace-pre-wrap border-t border-border pt-3 text-xs leading-relaxed text-text-secondary">{question.explanation}</p>}
            </article>;
          })}
        </div>
      </>}

      <footer className="rounded-2xl border border-border bg-bg-secondary p-4 text-[11px] leading-relaxed text-text-tertiary">
        <p className="font-bold text-text-secondary">{chauhanSourceAttribution.title}</p>
        <p>{chauhanSourceAttribution.author} · {chauhanSourceAttribution.edition} · {chauhanSourceAttribution.publisher} · ISBN {chauhanSourceAttribution.isbn}</p>
        <p className="mt-1">Source answers and explanations are retained from the supplied edition. Items without a clear answer key or complete extracted options remain visibly unscored; consult the cited page in the original edition where necessary. Public distribution permission was confirmed by the Curiva content owner.</p>
        <p className="mt-1">This is an educational revision tool. The book is a historical preparation compilation and is not represented as a current official UPSC or MD entrance syllabus.</p>
      </footer>
        </>
      )}
    </main>
  );
}
