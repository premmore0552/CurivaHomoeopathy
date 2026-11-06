import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { auth, db, doc, getDoc, onAuthStateChanged, onSnapshot, runTransaction, serverTimestamp } from '../lib/firebase';
import { mergeStudyToolkitStates } from '../utils/studyToolkitSync';

export type StudyTask = { id: string; title: string; done: boolean; date: string; updatedAt?: string; subject?: string; chapter?: string };
export type StudyNote = { id: string; title: string; content: string; subject?: string; chapter?: string; updatedAt: string };
export type StudyFlashcard = { id: string; front: string; back: string; subject?: string; chapter?: string; createdAt: string };
export type StudySession = { id: string; date: string; minutes: number; topic: string; subject?: string };
export type StudyReadingLog = { id: string; date: string; subject: string; chapter: string; pages?: string; notes?: string };
export type StudyReflection = { id: string; date: string; learned: string; improve: string };
export type StudyTimerMode = 'focus' | 'break';
export type StudyTimer = { mode: StudyTimerMode; durationMinutes: number; remainingSeconds: number; running: boolean; deadlineAt: number | null; topic: string };

export type StudyToolkitState = {
  version: 1;
  tasks: StudyTask[];
  notes: StudyNote[];
  cards: StudyFlashcard[];
  sessions: StudySession[];
  readingLogs: StudyReadingLog[];
  reflections: StudyReflection[];
  dailyGoal: number;
  weeklyGoal: number;
  examDate: string;
  focusMode: boolean;
  timer: StudyTimer;
};

const STORAGE_VERSION = 'curiva-study-toolkit-v1';
const emptyState = (): StudyToolkitState => ({
  version: 1, tasks: [], notes: [], cards: [], sessions: [], readingLogs: [], reflections: [],
  dailyGoal: 60, weeklyGoal: 300, examDate: '', focusMode: false,
  timer: { mode: 'focus', durationMinutes: 25, remainingSeconds: 1500, running: false, deadlineAt: null, topic: 'General revision' }
});

export const studyDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const id = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto
  ? crypto.randomUUID()
  : `study-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const boundedString = (value: unknown, max: number, fallback = '') =>
  typeof value === 'string' ? value.slice(0, max) : fallback;

function normalizeState(value: unknown): StudyToolkitState {
  const base = emptyState();
  if (!value || typeof value !== 'object') return base;
  const raw = value as Partial<StudyToolkitState>;
  const list = <T,>(items: unknown, mapper: (item: any, index: number) => T, max: number): T[] =>
    Array.isArray(items) ? items.slice(0, max).map((item, index) => mapper(item || {}, index)) : [];
  const timer = raw.timer && typeof raw.timer === 'object' ? raw.timer as Partial<StudyTimer> : base.timer;

  return {
    version: 1,
    tasks: list(raw.tasks, (item, index) => ({
      id: boundedString(item.id, 100, `task-${index}`),
      title: boundedString(item.title, 180),
      done: item.done === true,
      date: boundedString(item.date, 10, studyDateKey()),
      updatedAt: boundedString(item.updatedAt, 40, `${boundedString(item.date, 10, studyDateKey())}T00:00:00.000Z`),
      ...(typeof item.subject === 'string' ? { subject: boundedString(item.subject, 120) } : {}),
      ...(typeof item.chapter === 'string' ? { chapter: boundedString(item.chapter, 180) } : {})
    }), 300).filter(task => task.title.trim()),
    notes: list(raw.notes, (item, index) => ({
      id: boundedString(item.id, 100, `note-${index}`),
      title: boundedString(item.title, 160, 'Study note'),
      content: boundedString(item.content, 4000),
      ...(typeof item.subject === 'string' ? { subject: boundedString(item.subject, 120) } : {}),
      ...(typeof item.chapter === 'string' ? { chapter: boundedString(item.chapter, 180) } : {}),
      updatedAt: boundedString(item.updatedAt, 40, new Date().toISOString())
    }), 40).filter(note => note.content.trim()),
    cards: list(raw.cards, (item, index) => ({
      id: boundedString(item.id, 100, `card-${index}`),
      front: boundedString(item.front, 300),
      back: boundedString(item.back, 800),
      ...(typeof item.subject === 'string' ? { subject: boundedString(item.subject, 120) } : {}),
      ...(typeof item.chapter === 'string' ? { chapter: boundedString(item.chapter, 180) } : {}),
      createdAt: boundedString(item.createdAt, 40, new Date().toISOString())
    }), 150).filter(card => card.front.trim() && card.back.trim()),
    sessions: list(raw.sessions, (item, index) => ({
      id: boundedString(item.id, 100, `session-${index}`),
      date: boundedString(item.date, 10, studyDateKey()),
      minutes: Number.isFinite(item.minutes) ? Math.min(720, Math.max(0, Math.round(item.minutes))) : 0,
      topic: boundedString(item.topic, 180, 'Study session'),
      ...(typeof item.subject === 'string' ? { subject: boundedString(item.subject, 120) } : {})
    }), 500).filter(session => session.minutes > 0),
    readingLogs: list(raw.readingLogs, (item, index) => ({
      id: boundedString(item.id, 100, `reading-${index}`),
      date: boundedString(item.date, 10, studyDateKey()),
      subject: boundedString(item.subject, 120),
      chapter: boundedString(item.chapter, 180),
      ...(typeof item.pages === 'string' ? { pages: boundedString(item.pages, 80) } : {}),
      ...(typeof item.notes === 'string' ? { notes: boundedString(item.notes, 500) } : {})
    }), 150).filter(log => log.subject || log.chapter),
    reflections: list(raw.reflections, (item, index) => ({
      id: boundedString(item.id, 100, `reflection-${index}`),
      date: boundedString(item.date, 10, studyDateKey()),
      learned: boundedString(item.learned, 1000),
      improve: boundedString(item.improve, 1000)
    }), 50).filter(reflection => reflection.learned || reflection.improve),
    dailyGoal: Number.isFinite(raw.dailyGoal) ? Math.min(720, Math.max(5, Math.round(raw.dailyGoal!))) : base.dailyGoal,
    weeklyGoal: Number.isFinite(raw.weeklyGoal) ? Math.min(5000, Math.max(30, Math.round(raw.weeklyGoal!))) : base.weeklyGoal,
    examDate: boundedString(raw.examDate, 10),
    focusMode: raw.focusMode === true,
    timer: {
      mode: timer.mode === 'break' ? 'break' : 'focus',
      durationMinutes: Number.isFinite(timer.durationMinutes) ? Math.min(120, Math.max(5, Math.round(timer.durationMinutes!))) : 25,
      remainingSeconds: Number.isFinite(timer.remainingSeconds) ? Math.min(7200, Math.max(0, Math.round(timer.remainingSeconds!))) : 1500,
      running: timer.running === true && Number.isFinite(timer.deadlineAt),
      deadlineAt: Number.isFinite(timer.deadlineAt) ? timer.deadlineAt! : null,
      topic: boundedString(timer.topic, 180, 'General revision')
    }
  };
}


const baseStorageKey = (scope: string) => `${STORAGE_VERSION}:${scope}:synced-base`;

function readStoredState(key: string): StudyToolkitState | null {
  try {
    const saved = localStorage.getItem(key);
    return saved ? normalizeState(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function writeStoredState(key: string, value: StudyToolkitState): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Curiva study workspace cache could not be updated in this browser.', error);
  }
}

function persistableState(value: StudyToolkitState): StudyToolkitState {
  const snapshot = normalizeState(value);
  // Running timers are synchronized by their absolute deadline, not every tick.
  return snapshot.timer.running
    ? { ...snapshot, timer: { ...snapshot.timer, remainingSeconds: 0 } }
    : snapshot;
}

function sameWorkspace(left: StudyToolkitState, right: StudyToolkitState): boolean {
  return JSON.stringify(left) === JSON.stringify(right);
}

function loadGuestState(): StudyToolkitState {
  try {
    const saved = localStorage.getItem(`${STORAGE_VERSION}:guest`);
    if (saved) return normalizeState(JSON.parse(saved));
  } catch { /* Start a fresh guest workspace when local data is unreadable. */ }

  // One-time-compatible read of the original single-page toolkit. This is guest-only:
  // signing in never imports this data into an account workspace.
  const legacyRead = <T,>(key: string, fallback: T): T => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback; }
    catch { return fallback; }
  };
  const state = emptyState();
  const oldTasks = legacyRead<any[]>('curiva-toolkit-tasks', []);
  const oldCards = legacyRead<any[]>('curiva-toolkit-cards', []);
  const oldSessions = legacyRead<any[]>('curiva-toolkit-sessions', []);
  state.tasks = oldTasks.map((task, index) => ({
    id: boundedString(task.id, 100, `legacy-task-${index}`),
    title: boundedString(task.title, 180),
    done: task.done === true,
    date: boundedString(task.date, 10, studyDateKey())
  })).filter(task => task.title);
  state.cards = oldCards.map((card, index) => ({
    id: boundedString(card.id, 100, `legacy-card-${index}`),
    front: boundedString(card.front, 500),
    back: boundedString(card.back, 2000),
    createdAt: new Date().toISOString()
  })).filter(card => card.front && card.back);
  state.sessions = oldSessions.map((session, index) => ({
    id: `legacy-session-${index}`, date: boundedString(session.date, 10, studyDateKey()),
    minutes: Number.isFinite(session.minutes) ? Math.max(0, session.minutes) : 0,
    topic: boundedString(session.topic, 180, 'Study session')
  })).filter(session => session.minutes > 0);
  const oldNotes = legacyRead('curiva-toolkit-notes', '');
  if (typeof oldNotes === 'string' && oldNotes.trim()) {
    state.notes.push({ id: id(), title: 'Imported quick notes', content: oldNotes.slice(0, 12000), updatedAt: new Date().toISOString() });
  }
  const oldReading = legacyRead('curiva-toolkit-reading-log', '');
  if (typeof oldReading === 'string' && oldReading.trim()) {
    state.readingLogs.push({ id: id(), date: studyDateKey(), subject: 'General', chapter: oldReading.slice(0, 180), notes: '' });
  }
  const oldReflection = legacyRead('curiva-toolkit-reflection', '');
  if (typeof oldReflection === 'string' && oldReflection.trim()) {
    state.reflections.push({ id: id(), date: studyDateKey(), learned: oldReflection.slice(0, 2000), improve: '' });
  }
  state.dailyGoal = Number(legacyRead('curiva-toolkit-goal', 60)) || 60;
  state.weeklyGoal = Number(legacyRead('curiva-toolkit-weekly-target', 300)) || 300;
  state.examDate = boundedString(legacyRead('curiva-toolkit-exam-date', ''), 10);
  return normalizeState(state);
}

type StudyToolkitSyncStatus = 'local' | 'synced' | 'pending' | 'syncing' | 'offline';

type StudyToolkitContextValue = {
  state: StudyToolkitState;
  ready: boolean;
  signedIn: boolean;
  syncStatus: StudyToolkitSyncStatus;
  todayMinutes: number;
  weeklyMinutes: number;
  streak: number;
  addTask: (title: string, subject?: string, chapter?: string) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  saveNote: (note: Omit<StudyNote, 'id' | 'updatedAt'> & { id?: string }) => void;
  deleteNote: (noteId: string) => void;
  addCard: (front: string, back: string, subject?: string, chapter?: string) => void;
  addSession: (minutes: number, topic: string, subject?: string) => void;
  addReadingLog: (log: Omit<StudyReadingLog, 'id' | 'date'>) => void;
  saveReflection: (learned: string, improve: string) => void;
  setGoals: (daily: number, weekly: number) => void;
  setExamDate: (date: string) => void;
  setFocusMode: (enabled: boolean) => void;
  startTimer: (topic?: string) => void;
  pauseTimer: () => void;
  resetTimer: (mode?: StudyTimerMode, minutes?: number) => void;
  clearSessions: () => void;
};

const StudyToolkitContext = createContext<StudyToolkitContextValue | null>(null);

export function StudyToolkitProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudyToolkitState>(emptyState);
  const [ready, setReady] = useState(false);
  const [scope, setScope] = useState<string | null>(null);
  const [signedIn, setSignedIn] = useState(false);
  const [syncStatus, setSyncStatus] = useState<StudyToolkitSyncStatus>('local');
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const baseState = useRef<StudyToolkitState | null>(null);
  const stateRef = useRef(state);
  const scopeRef = useRef(scope);
  const syncRunning = useRef(false);
  const syncQueued = useRef(false);
  const retryCount = useRef(0);
  const cacheSignature = useRef('');
  const preferLocalScalarConflicts = useRef(true);
  const authRequest = useRef(0);
  const completedDeadline = useRef<number | null>(null);

  stateRef.current = state;
  scopeRef.current = scope;

  const syncAccountWorkspace = useCallback(async (uid: string) => {
    if (syncRunning.current) {
      syncQueued.current = true;
      return;
    }

    syncRunning.current = true;
    const accountScope = \`account:\${uid}\`;
    setSyncStatus('syncing');
    const localSnapshot = persistableState(stateRef.current);
    const baseSnapshot = baseState.current || emptyState();
    const reference = doc(db, 'studyToolkitProgress', uid);

    try {
      const merged = await runTransaction(db, async transaction => {
        const remoteSnapshot = await transaction.get(reference);
        const remote = remoteSnapshot.exists()
          ? normalizeState(remoteSnapshot.data())
          : emptyState();
        const reconciled = mergeStudyToolkitStates(
          baseSnapshot,
          localSnapshot,
          remote,
          preferLocalScalarConflicts.current
        );
        transaction.set(reference, {
          uid,
          ...reconciled,
          updatedAt: serverTimestamp()
        });
        return reconciled;
      });

      if (scopeRef.current === accountScope) {
        baseState.current = merged;
        preferLocalScalarConflicts.current = true;
        retryCount.current = 0;
        if (retryTimeout.current) clearTimeout(retryTimeout.current);
        retryTimeout.current = null;
        writeStoredState(baseStorageKey(accountScope), merged);

        // Rebase edits made while the transaction was in flight instead of
        // replacing them with the older snapshot that was just committed.
        const latestLocal = persistableState(stateRef.current);
        const rebased = mergeStudyToolkitStates(localSnapshot, latestLocal, merged);
        if (!sameWorkspace(rebased, latestLocal)) setState(rebased);
        writeStoredState(\`\${STORAGE_VERSION}:\${accountScope}\`, rebased);
        setSyncStatus(sameWorkspace(rebased, merged) ? 'synced' : 'pending');
      }
    } catch (error) {
      if (scopeRef.current === accountScope) {
        setSyncStatus('offline');
        console.warn('Curiva study workspace sync was deferred; the account-specific local cache is preserved.', error);
        if (retryTimeout.current) clearTimeout(retryTimeout.current);
        const delay = Math.min(60_000, 2_000 * (2 ** Math.min(retryCount.current, 5)));
        retryCount.current += 1;
        retryTimeout.current = setTimeout(() => {
          retryTimeout.current = null;
          void syncAccountWorkspace(uid);
        }, delay);
      }
    } finally {
      syncRunning.current = false;
      if (syncQueued.current) {
        syncQueued.current = false;
        const activeScope = scopeRef.current;
        if (activeScope?.startsWith('account:')) {
          if (saveTimeout.current) clearTimeout(saveTimeout.current);
          saveTimeout.current = setTimeout(() => {
            saveTimeout.current = null;
            void syncAccountWorkspace(activeScope.slice('account:'.length));
          }, 100);
        }
      }
    }
  }, []);

  const scheduleSync = useCallback((uid: string, delay = 650) => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    if (retryTimeout.current) clearTimeout(retryTimeout.current);
    retryTimeout.current = null;
    saveTimeout.current = setTimeout(() => {
      saveTimeout.current = null;
      void syncAccountWorkspace(uid);
    }, delay);
  }, [syncAccountWorkspace]);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async user => {
      const requestId = ++authRequest.current;
      const nextScope = user ? \`account:\${user.uid}\` : 'guest';
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
      saveTimeout.current = null;
      retryTimeout.current = null;
      cacheSignature.current = '';
      setReady(false);
      setScope(null);
      setSignedIn(Boolean(user));
      setSyncStatus(user ? 'syncing' : 'local');

      let nextState = emptyState();
      let nextBase = emptyState();
      let cloudAvailable = !user;
      let hasKnownBase = false;

      if (!user) {
        nextState = loadGuestState();
        nextBase = nextState;
      } else {
        const cached = readStoredState(\`\${STORAGE_VERSION}:\${nextScope}\`);
        const cachedBase = readStoredState(baseStorageKey(nextScope));
        hasKnownBase = Boolean(cachedBase);

        try {
          const snapshot = await getDoc(doc(db, 'studyToolkitProgress', user.uid));
          const remote = snapshot.exists() ? normalizeState(snapshot.data()) : emptyState();
          cloudAvailable = true;
          nextBase = remote;

          if (!cached) {
            nextState = remote;
          } else if (cachedBase) {
            nextState = mergeStudyToolkitStates(cachedBase, cached, remote);
          } else {
            // Older app versions did not store a last-synced baseline. Preserve
            // any unique cached entries, but prefer cloud scalar settings.
            nextState = mergeStudyToolkitStates(emptyState(), cached, remote, false);
          }
        } catch (error) {
          nextState = cached || emptyState();
          nextBase = cachedBase || emptyState();
          console.warn('Curiva study workspace is using its account-specific local cache while cloud sync is unavailable.', error);
        }
      }

      if (!active || requestId !== authRequest.current) return;
      baseState.current = nextBase;
      preferLocalScalarConflicts.current = cloudAvailable || hasKnownBase;
      if (user && cloudAvailable) writeStoredState(baseStorageKey(nextScope), nextBase);
      setState(nextState);
      setScope(nextScope);
      setReady(true);
      setSyncStatus(!user ? 'local' : cloudAvailable
        ? (sameWorkspace(persistableState(nextState), persistableState(nextBase)) ? 'synced' : 'pending')
        : 'offline');
    });

    return () => {
      active = false;
      unsubscribe();
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
      if (retryTimeout.current) clearTimeout(retryTimeout.current);
    };
  }, []);

  // Keep each signed-in device live with remote workspace changes. Three-way
  // reconciliation retains pending local edits while adopting untouched remote
  // changes; deletes win conflicts to prevent stale offline data reappearing.
  useEffect(() => {
    if (!ready || !scope?.startsWith('account:')) return;
    let active = true;
    const uid = scope.slice('account:'.length);
    const unsubscribe = onSnapshot(doc(db, 'studyToolkitProgress', uid), snapshot => {
      if (!active) return;
      const remote = snapshot.exists() ? normalizeState(snapshot.data()) : emptyState();
      const base = baseState.current || remote;
      const local = persistableState(stateRef.current);
      const reconciled = mergeStudyToolkitStates(
        base,
        local,
        remote,
        preferLocalScalarConflicts.current
      );
      baseState.current = remote;
      writeStoredState(baseStorageKey(scope), remote);
      if (!sameWorkspace(reconciled, local)) setState(reconciled);
      setSyncStatus(sameWorkspace(reconciled, remote) ? 'synced' : 'pending');
    }, error => {
      if (!active) return;
      setSyncStatus('offline');
      console.warn('Live Curiva study workspace updates are temporarily unavailable; local changes are retained.', error);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [ready, scope]);

  useEffect(() => {
    if (!ready || !scope) return;
    const snapshot = persistableState(state);
    const serialized = JSON.stringify(snapshot);
    const signature = \`\${scope}:\${serialized}\`;

    if (cacheSignature.current !== signature) {
      writeStoredState(\`\${STORAGE_VERSION}:\${scope}\`, snapshot);
      cacheSignature.current = signature;
    }

    if (!scope.startsWith('account:')) {
      setSyncStatus('local');
      return;
    }

    const baseline = baseState.current || emptyState();
    if (sameWorkspace(snapshot, baseline)) {
      setSyncStatus(current => current === 'syncing' ? current : 'synced');
      return;
    }

    setSyncStatus(current => current === 'syncing' ? current : 'pending');
    scheduleSync(scope.slice('account:'.length));
  }, [state, ready, scope, scheduleSync]);

  useEffect(() => {
    if (!state.timer.running || !state.timer.deadlineAt) return;
    const refresh = () => {
      const remaining = Math.max(0, Math.ceil((state.timer.deadlineAt! - Date.now()) / 1000));
      if (remaining > 0) {
        setState(current => current.timer.remainingSeconds === remaining ? current : ({
          ...current, timer: { ...current.timer, remainingSeconds: remaining }
        }));
        return;
      }
      const deadline = state.timer.deadlineAt!;
      if (completedDeadline.current === deadline) return;
      completedDeadline.current = deadline;
      setState(current => {
        if (!current.timer.running || current.timer.deadlineAt !== deadline) return current;
        const sessions = current.timer.mode === 'focus'
          ? [{ id: id(), date: studyDateKey(), minutes: current.timer.durationMinutes, topic: current.timer.topic }, ...current.sessions] .slice(0, 500)
          : current.sessions;
        return {
          ...current,
          sessions,
          timer: { ...current.timer, running: false, remainingSeconds: 0, deadlineAt: null }
        };
      });
    };
    refresh();
    const timerId = window.setInterval(refresh, 1000);
    window.addEventListener('focus', refresh);
    window.addEventListener('pageshow', refresh);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      window.clearInterval(timerId);
      window.removeEventListener('focus', refresh);
      window.removeEventListener('pageshow', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, [state.timer.running, state.timer.deadlineAt, state.timer.mode, state.timer.durationMinutes, state.timer.topic]);

  const addTask = useCallback((title: string, subject?: string, chapter?: string) => {
    const clean = title.trim();
    if (!clean) return;
    setState(current => ({ ...current, tasks: [{ id: id(), title: clean.slice(0, 160), done: false, date: studyDateKey(), ...(subject ? { subject } : {}), ...(chapter ? { chapter } : {}) }, ...current.tasks].slice(0, 300) }));
  }, []);
  const toggleTask = useCallback((taskId: string) => setState(current => ({ ...current, tasks: current.tasks.map(task => task.id === taskId ? { ...task, done: !task.done } : task) })), []);
  const deleteTask = useCallback((taskId: string) => setState(current => ({ ...current, tasks: current.tasks.filter(task => task.id !== taskId) })), []);
  const saveNote = useCallback((note: Omit<StudyNote, 'id' | 'updatedAt'> & { id?: string }) => {
    const clean = note.content.trim();
    if (!clean) return;
    const next: StudyNote = { id: note.id || id(), title: note.title.trim().slice(0, 160) || 'Study note', content: clean.slice(0, 4000), ...(note.subject ? { subject: note.subject.slice(0, 120) } : {}), ...(note.chapter ? { chapter: note.chapter.slice(0, 180) } : {}), updatedAt: new Date().toISOString() };
    setState(current => ({ ...current, notes: [next, ...current.notes.filter(item => item.id !== next.id)] .slice(0, 40) }));
  }, []);
  const deleteNote = useCallback((noteId: string) => setState(current => ({ ...current, notes: current.notes.filter(note => note.id !== noteId) })), []);
  const addCard = useCallback((front: string, back: string, subject?: string, chapter?: string) => {
    if (!front.trim() || !back.trim()) return;
    setState(current => ({ ...current, cards: [{ id: id(), front: front.trim().slice(0, 300), back: back.trim().slice(0, 800), ...(subject ? { subject } : {}), ...(chapter ? { chapter } : {}), createdAt: new Date().toISOString() }, ...current.cards] .slice(0, 150) }));
  }, []);
  const addSession = useCallback((minutes: number, topic: string, subject?: string) => {
    const duration = Math.min(720, Math.max(1, Math.round(minutes)));
    setState(current => ({ ...current, sessions: [{ id: id(), date: studyDateKey(), minutes: duration, topic: topic.slice(0, 180), ...(subject ? { subject } : {}) }, ...current.sessions].slice(0, 500) }));
  }, []);
  const addReadingLog = useCallback((log: Omit<StudyReadingLog, 'id' | 'date'>) => {
    if (!log.subject.trim() && !log.chapter.trim()) return;
    setState(current => ({ ...current, readingLogs: [{ ...log, id: id(), date: studyDateKey() }, ...current.readingLogs].slice(0, 150) }));
  }, []);
  const saveReflection = useCallback((learned: string, improve: string) => {
    const date = studyDateKey();
    setState(current => {
      const next = { id: id(), date, learned: learned.slice(0, 1000), improve: improve.slice(0, 1000) };
      return { ...current, reflections: [next, ...current.reflections.filter(item => item.date !== date)].slice(0, 50) };
    });
  }, []);
  const setGoals = useCallback((daily: number, weekly: number) => setState(current => ({
    ...current, dailyGoal: Math.min(720, Math.max(5, Math.round(daily))),
    weeklyGoal: Math.min(5000, Math.max(30, Math.round(weekly)))
  })), []);
  const setExamDate = useCallback((date: string) => setState(current => ({ ...current, examDate: /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : '' })), []);
  const setFocusMode = useCallback((enabled: boolean) => setState(current => ({ ...current, focusMode: enabled })), []);
  const startTimer = useCallback((topic?: string) => setState(current => {
    const seconds = current.timer.remainingSeconds > 0 ? current.timer.remainingSeconds : current.timer.durationMinutes * 60;
    return { ...current, timer: { ...current.timer, topic: topic?.trim().slice(0, 180) || current.timer.topic, running: true, remainingSeconds: seconds, deadlineAt: Date.now() + seconds * 1000 } };
  }), []);
  const pauseTimer = useCallback(() => setState(current => {
    const remainingSeconds = current.timer.deadlineAt ? Math.max(0, Math.ceil((current.timer.deadlineAt - Date.now()) / 1000)) : current.timer.remainingSeconds;
    return { ...current, timer: { ...current.timer, running: false, remainingSeconds, deadlineAt: null } };
  }), []);
  const resetTimer = useCallback((mode: StudyTimerMode = 'focus', minutes?: number) => setState(current => {
    const durationMinutes = Math.min(120, Math.max(5, Math.round(minutes || (mode === 'focus' ? current.timer.durationMinutes : 5))));
    completedDeadline.current = null;
    return { ...current, timer: { ...current.timer, mode, durationMinutes, remainingSeconds: durationMinutes * 60, running: false, deadlineAt: null } };
  }), []);
  const clearSessions = useCallback(() => setState(current => ({ ...current, sessions: [] })), []);

  const today = studyDateKey();
  const todayMinutes = state.sessions.filter(session => session.date === today).reduce((sum, session) => sum + session.minutes, 0);
  const weekStart = new Date(); weekStart.setHours(0, 0, 0, 0); weekStart.setDate(weekStart.getDate() - 6);
  const weeklyMinutes = state.sessions.filter(session => {
    const date = new Date(`${session.date}T00:00:00`).getTime();
    return Number.isFinite(date) && date >= weekStart.getTime();
  }).reduce((sum, session) => sum + session.minutes, 0);
  const activeDates = [...new Set(state.sessions.map(session => session.date))].sort().reverse();
  let streak = 0;
  if (activeDates.length) {
    const start = new Date(`${activeDates[0]}T00:00:00`);
    const todayDate = new Date(`${today}T00:00:00`);
    const gap = Math.round((todayDate.getTime() - start.getTime()) / 86400000);
    if (gap <= 1) {
      let expected = new Date(start);
      for (const date of activeDates) {
        if (date !== studyDateKey(expected)) break;
        streak += 1;
        expected.setDate(expected.getDate() - 1);
      }
    }
  }

  const value = useMemo<StudyToolkitContextValue>(() => ({
    state, ready, signedIn, todayMinutes, weeklyMinutes, streak,
    addTask, toggleTask, deleteTask, saveNote, deleteNote, addCard, addSession, addReadingLog,
    saveReflection, setGoals, setExamDate, setFocusMode, startTimer, pauseTimer, resetTimer, clearSessions
  }), [state, ready, signedIn, todayMinutes, weeklyMinutes, streak, addTask, toggleTask, deleteTask, saveNote, deleteNote, addCard, addSession, addReadingLog, saveReflection, setGoals, setExamDate, setFocusMode, startTimer, pauseTimer, resetTimer, clearSessions]);

  return <StudyToolkitContext.Provider value={value}>{children}</StudyToolkitContext.Provider>;
}

export function useStudyToolkit() {
  const value = useContext(StudyToolkitContext);
  if (!value) throw new Error('useStudyToolkit must be used inside StudyToolkitProvider.');
  return value;
}
