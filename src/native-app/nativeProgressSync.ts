import { db, doc, getDoc, setDoc, serverTimestamp } from '../lib/firebase';
import { safeStudyPlan, type StoredStudyPlan } from './nativeProgressValidation';

export type NativeProgressSyncStatus = 'idle' | 'syncing' | 'synced' | 'offline';

type StoredLesson = { subjectId: string; chapterTitle: string; subjectTitle: string };
type StoredQuizResult = { date: string; subject: string; score: number; total: number; percent: number };

interface NativeProgressSnapshot {
  completedLessons: string[];
  quizHistory: StoredQuizResult[];
  knownFlashcards: string[];
  studyDays: string[];
  lastLesson: StoredLesson | null;
  studyPlan: StoredStudyPlan | null;
}

const OWNER_KEY = 'curiva-native-progress-owner-uid';
const CACHE_PREFIX = 'curiva-native-account-cache:';
const EMPTY_PROGRESS: NativeProgressSnapshot = {
  completedLessons: [], quizHistory: [], knownFlashcards: [], studyDays: [],
  lastLesson: null, studyPlan: null
};

function parseStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function safeStrings(value: unknown, limit: number): string[] {
  return Array.isArray(value)
    ? Array.from(new Set(value.filter((item): item is string => typeof item === 'string' && item.length > 0 && item.length <= 220))).slice(-limit)
    : [];
}

function safeQuizHistory(value: unknown): StoredQuizResult[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is StoredQuizResult =>
    Boolean(item) && typeof item === 'object' &&
    typeof item.date === 'string' && typeof item.subject === 'string' &&
    Number.isFinite(item.score) && Number.isFinite(item.total) && Number.isFinite(item.percent)
  ).slice(0, 200);
}

function safeLastLesson(value: unknown): StoredLesson | null {
  if (!value || typeof value !== 'object') return null;
  const item = value as Record<string, unknown>;
  if (typeof item.subjectId !== 'string' || typeof item.chapterTitle !== 'string' || typeof item.subjectTitle !== 'string') return null;
  return {
    subjectId: item.subjectId.slice(0, 120),
    chapterTitle: item.chapterTitle.slice(0, 220),
    subjectTitle: item.subjectTitle.slice(0, 160)
  };
}

function readLocalProgress(): NativeProgressSnapshot {
  return {
    completedLessons: safeStrings(parseStored('curiva-native-completed-lessons', []), 3000),
    quizHistory: safeQuizHistory(parseStored('curiva-native-quiz-history', [])),
    knownFlashcards: safeStrings(parseStored('curiva-native-known-flashcards', []), 5000),
    studyDays: safeStrings(parseStored('curiva-native-study-days', []), 800),
    lastLesson: safeLastLesson(parseStored('curiva-native-last-lesson', null)),
    studyPlan: safeStudyPlan(parseStored('curiva-native-study-plan', null))
  };
}

function mergeStrings(local: string[], remote: string[], limit: number): string[] {
  return Array.from(new Set([...remote, ...local])).slice(-limit);
}

function mergeQuizHistory(local: StoredQuizResult[], remote: StoredQuizResult[]): StoredQuizResult[] {
  const byKey = new Map<string, StoredQuizResult>();
  for (const item of [...remote, ...local]) {
    byKey.set([item.date, item.subject, item.score, item.total, item.percent].join('|'), item);
  }
  return Array.from(byKey.values()).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 200);
}

function mergeProgress(local: NativeProgressSnapshot, remote: NativeProgressSnapshot): NativeProgressSnapshot {
  let studyPlan = local.studyPlan || remote.studyPlan;
  if (local.studyPlan && remote.studyPlan && local.studyPlan.date === remote.studyPlan.date) {
    studyPlan = { ...local.studyPlan, completed: mergeStrings(local.studyPlan.completed, remote.studyPlan.completed, 4) };
  } else if (local.studyPlan && remote.studyPlan && remote.studyPlan.date > local.studyPlan.date) {
    studyPlan = remote.studyPlan;
  }
  return {
    completedLessons: mergeStrings(local.completedLessons, remote.completedLessons, 3000),
    quizHistory: mergeQuizHistory(local.quizHistory, remote.quizHistory),
    knownFlashcards: mergeStrings(local.knownFlashcards, remote.knownFlashcards, 5000),
    studyDays: mergeStrings(local.studyDays, remote.studyDays, 800),
    lastLesson: local.lastLesson || remote.lastLesson,
    studyPlan
  };
}

function writeLocalProgress(progress: NativeProgressSnapshot) {
  localStorage.setItem('curiva-native-completed-lessons', JSON.stringify(progress.completedLessons));
  localStorage.setItem('curiva-native-quiz-history', JSON.stringify(progress.quizHistory));
  localStorage.setItem('curiva-native-known-flashcards', JSON.stringify(progress.knownFlashcards));
  localStorage.setItem('curiva-native-study-days', JSON.stringify(progress.studyDays));
  localStorage.setItem('curiva-native-last-lesson', JSON.stringify(progress.lastLesson));
  localStorage.setItem('curiva-native-study-plan', JSON.stringify(progress.studyPlan));
  window.dispatchEvent(new Event('curiva-native-progress-restored'));
}

function readLocalAccountCache(owner: string): { progress: NativeProgressSnapshot; bookmarks: string[] } {
  const cache = parseStored<{ progress?: unknown; bookmarks?: unknown }>(CACHE_PREFIX + owner, {});
  const p = (cache.progress || {}) as Partial<NativeProgressSnapshot>;
  return {
    progress: {
      completedLessons: safeStrings(p.completedLessons, 3000),
      quizHistory: safeQuizHistory(p.quizHistory),
      knownFlashcards: safeStrings(p.knownFlashcards, 5000),
      studyDays: safeStrings(p.studyDays, 800),
      lastLesson: safeLastLesson(p.lastLesson),
      studyPlan: safeStudyPlan(p.studyPlan)
    },
    bookmarks: safeStrings(cache.bookmarks, 5000)
  };
}

function writeLocalBookmarks(bookmarks: string[]) {
  localStorage.setItem('curiva-native-bookmarks', JSON.stringify(bookmarks));
}

function prepareLocalOwner(owner: string) {
  const previousOwner = localStorage.getItem(OWNER_KEY);
  if (previousOwner === owner) return;
  if (previousOwner) {
    const previousCache = {
      progress: readLocalProgress(),
      bookmarks: safeStrings(parseStored('curiva-native-bookmarks', []), 5000)
    };
    localStorage.setItem(CACHE_PREFIX + previousOwner, JSON.stringify(previousCache));
    const nextCache = readLocalAccountCache(owner);
    writeLocalProgress(nextCache.progress);
    writeLocalBookmarks(nextCache.bookmarks);
  }
  // When no owner is recorded, preserve the pre-account/legacy local progress for
  // the first account or guest session instead of silently discarding it.
  localStorage.setItem(OWNER_KEY, owner);
  window.dispatchEvent(new Event('curiva-native-progress-restored'));
}

export function prepareNativeGuestProgress() {
  prepareLocalOwner('guest');
}

export function prepareNativeAccountProgress(uid: string) {
  prepareLocalOwner(uid);
}

async function syncOnce(uid: string): Promise<void> {
  prepareLocalOwner(uid);
  const local = readLocalProgress();
  const progressRef = doc(db, 'nativeLearningProgress', uid);
  const snapshot = await getDoc(progressRef);
  const remote = snapshot.exists() ? snapshot.data() as Partial<NativeProgressSnapshot> : EMPTY_PROGRESS;
  const merged = mergeProgress(local, {
    completedLessons: safeStrings(remote.completedLessons, 3000),
    quizHistory: safeQuizHistory(remote.quizHistory),
    knownFlashcards: safeStrings(remote.knownFlashcards, 5000),
    studyDays: safeStrings(remote.studyDays, 800),
    lastLesson: safeLastLesson(remote.lastLesson),
    studyPlan: safeStudyPlan(remote.studyPlan)
  });
  await setDoc(progressRef, { uid, version: 1, ...merged, updatedAt: serverTimestamp() });
  writeLocalProgress(merged);
  localStorage.setItem(OWNER_KEY, uid);
}

export function startNativeProgressSync(uid: string, onStatus: (status: NativeProgressSyncStatus) => void): () => void {
  let stopped = false;
  let inFlight = false;
  let queued = false;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const sync = async () => {
    if (stopped) return;
    if (inFlight) { queued = true; return; }
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      onStatus('offline');
      return;
    }
    inFlight = true;
    onStatus('syncing');
    try {
      await syncOnce(uid);
      if (!stopped) onStatus('synced');
    } catch (error) {
      console.warn('Curiva study progress remains available locally; cloud sync will retry.', error);
      if (!stopped) onStatus('offline');
    } finally {
      inFlight = false;
      if (queued && !stopped) {
        queued = false;
        void sync();
      }
    }
  };

  const schedule = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { void sync(); }, 900);
  };
  const onProgressChanged = () => schedule();
  const onOnline = () => { void sync(); };
  prepareLocalOwner(uid);
  window.addEventListener('curiva-native-progress-updated', onProgressChanged);
  window.addEventListener('online', onOnline);
  void sync();

  return () => {
    stopped = true;
    if (timer) clearTimeout(timer);
    window.removeEventListener('curiva-native-progress-updated', onProgressChanged);
    window.removeEventListener('online', onOnline);
  };
}
