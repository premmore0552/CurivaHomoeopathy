import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { auth, onAuthStateChanged } from '../lib/firebase';

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

const STORAGE_VERSION = 'curiva-study-toolkit-v2-session';
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


const scopedStorageKey = (scope: string) => `${STORAGE_VERSION}:${scope}`;

function readStoredState(key: string): StudyToolkitState | null {
  try {
    const saved = typeof sessionStorage === 'undefined' ? null : sessionStorage.getItem(key);
    return saved ? normalizeState(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function writeStoredState(key: string, value: StudyToolkitState): void {
  try {
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(key, JSON.stringify(normalizeState(value)));
  } catch {
    // The workspace remains available in memory if browser storage is unavailable.
  }
}

function clearLegacyPersistentWorkspace(scope: string): void {
  if (typeof localStorage === 'undefined') return;
  const exactKeys = [
    'curiva-toolkit-tasks', 'curiva-toolkit-cards', 'curiva-toolkit-sessions',
    'curiva-toolkit-notes', 'curiva-toolkit-reading-log', 'curiva-toolkit-reflection',
    'curiva-toolkit-goal', 'curiva-toolkit-weekly-target', 'curiva-toolkit-exam-date',
    'curiva-study-toolkit-v1:guest',
    `curiva-study-toolkit-v1:${scope}`,
    `curiva-study-toolkit-v1:${scope}:synced-base`
  ];
  try {
    exactKeys.forEach(key => localStorage.removeItem(key));
  } catch {
    // Browser storage may be disabled by policy.
  }
}

function readLegacyPersistentState(scope: string): StudyToolkitState | null {
  try {
    const raw = localStorage.getItem(`curiva-study-toolkit-v1:${scope}`);
    return raw ? normalizeState(JSON.parse(raw)) : null;
  } catch {
    return null;
  } finally {
    clearLegacyPersistentWorkspace(scope);
  }
}

function loadScopedState(scope: string): StudyToolkitState {
  return readStoredState(scopedStorageKey(scope)) || readLegacyPersistentState(scope) || emptyState();
}

function loadGuestState(): StudyToolkitState {
  const current = readStoredState(scopedStorageKey('guest'));
  if (current) {
    clearLegacyPersistentWorkspace('guest');
    return current;
  }

  // Migrate the previous guest workspace once into tab-scoped storage, then
  // remove its persistent localStorage copy from this browser.
  const previous = readLegacyPersistentState('guest');
  if (previous) {
    clearLegacyPersistentWorkspace('guest');
    return previous;
  }

  const legacyRead = <T,>(key: string, fallback: T): T => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : fallback;
    } catch {
      return fallback;
    }
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
    front: boundedString(card.front, 300),
    back: boundedString(card.back, 800),
    createdAt: new Date().toISOString()
  })).filter(card => card.front && card.back);
  state.sessions = oldSessions.map((session, index) => ({
    id: `legacy-session-${index}`,
    date: boundedString(session.date, 10, studyDateKey()),
    minutes: Number.isFinite(session.minutes) ? Math.max(0, session.minutes) : 0,
    topic: boundedString(session.topic, 180)
  })).filter(session => session.minutes > 0);
  const oldNotes = legacyRead('curiva-toolkit-notes', '');
  if (typeof oldNotes === 'string' && oldNotes.trim()) {
    state.notes.push({ id: id(), title: 'Imported quick notes', content: oldNotes.slice(0, 4000), updatedAt: new Date().toISOString() });
  }
  const oldReading = legacyRead('curiva-toolkit-reading-log', '');
  if (typeof oldReading === 'string' && oldReading.trim()) {
    state.readingLogs.push({ id: id(), date: studyDateKey(), subject: 'General', chapter: oldReading.slice(0, 180) });
  }
  const oldReflection = legacyRead('curiva-toolkit-reflection', '');
  if (typeof oldReflection === 'string' && oldReflection.trim()) {
    state.reflections.push({ id: id(), date: studyDateKey(), learned: oldReflection.slice(0, 1000), improve: '' });
  }
  state.dailyGoal = Number(legacyRead('curiva-toolkit-goal', 60)) || 60;
  state.weeklyGoal = Number(legacyRead('curiva-toolkit-weekly-target', 300)) || 300;
  state.examDate = boundedString(legacyRead('curiva-toolkit-exam-date', ''), 10);
  clearLegacyPersistentWorkspace('guest');
  return normalizeState(state);
}

type StudyToolkitSyncStatus = 'local';

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
  const syncStatus: StudyToolkitSyncStatus = 'local';
  const authRequest = useRef(0);
  const completedDeadline = useRef<number | null>(null);

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, user => {
      const requestId = ++authRequest.current;
      const nextScope = user ? `account:${user.uid}` : 'guest';
      setReady(false);
      setScope(null);
      setSignedIn(Boolean(user));
      setState(emptyState());

      const nextState = loadScopedState(nextScope);
      if (!active || requestId !== authRequest.current) return;
      setState(nextState);
      setScope(nextScope);
      setReady(true);
    });

    return () => {
      active = false;
      authRequest.current += 1;
      unsubscribe();
    };
  }, []);

  // Free-text study material is intentionally not sent to Firestore or any
  // other service. It is kept in tab-scoped sessionStorage and is cleared when
  // the tab/session ends. A signed-in account uses a separate local namespace.
  useEffect(() => {
    if (!ready || !scope) return;
    writeStoredState(scopedStorageKey(scope), state);
  }, [state, ready, scope]);

  const addTask = useCallback((title: string, subject?: string, chapter?: string) => {
    const clean = title.trim();
    if (!clean) return;
    setState(current => ({ ...current, tasks: [{ id: id(), title: clean.slice(0, 160), done: false, date: studyDateKey(), updatedAt: new Date().toISOString(), ...(subject ? { subject } : {}), ...(chapter ? { chapter } : {}) }, ...current.tasks].slice(0, 300) }));
  }, []);
  const toggleTask = useCallback((taskId: string) => setState(current => ({ ...current, tasks: current.tasks.map(task => task.id === taskId ? { ...task, done: !task.done, updatedAt: new Date().toISOString() } : task) })), []);
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
    state, ready, signedIn, syncStatus, todayMinutes, weeklyMinutes, streak,
    addTask, toggleTask, deleteTask, saveNote, deleteNote, addCard, addSession, addReadingLog,
    saveReflection, setGoals, setExamDate, setFocusMode, startTimer, pauseTimer, resetTimer, clearSessions
  }), [state, ready, signedIn, syncStatus, todayMinutes, weeklyMinutes, streak, addTask, toggleTask, deleteTask, saveNote, deleteNote, addCard, addSession, addReadingLog, saveReflection, setGoals, setExamDate, setFocusMode, startTimer, pauseTimer, resetTimer, clearSessions]);

  return <StudyToolkitContext.Provider value={value}>{children}</StudyToolkitContext.Provider>;
}

export function useStudyToolkit() {
  const value = useContext(StudyToolkitContext);
  if (!value) throw new Error('useStudyToolkit must be used inside StudyToolkitProvider.');
  return value;
}
