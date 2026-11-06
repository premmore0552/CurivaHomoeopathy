import test from 'node:test';
import assert from 'node:assert/strict';
import { mergeStudyToolkitStates } from '../src/utils/studyToolkitSync.ts';

type Workspace = {
  tasks: Array<{ id: string; title: string; done: boolean; updatedAt: string }>;
  notes: Array<{ id: string; title: string; content: string; updatedAt: string }>;
  cards: Array<{ id: string; front: string; back: string; createdAt: string }>;
  sessions: Array<{ id: string; date: string; minutes: number; topic: string }>;
  readingLogs: Array<{ id: string; date: string; subject: string; chapter: string }>;
  reflections: Array<{ id: string; date: string; learned: string; improve: string }>;
  dailyGoal: number;
  weeklyGoal: number;
  examDate: string;
  focusMode: boolean;
  timer: { mode: string; durationMinutes: number };
};

const empty = (): Workspace => ({
  tasks: [], notes: [], cards: [], sessions: [], readingLogs: [], reflections: [],
  dailyGoal: 60, weeklyGoal: 300, examDate: '', focusMode: false,
  timer: { mode: 'focus', durationMinutes: 25 },
});

test('merges independent additions from two devices without overwriting either', () => {
  const base = empty();
  const local = { ...base, tasks: [{ id: 'local-task', title: 'Anatomy', done: false, updatedAt: '2026-11-06T10:00:00.000Z' }] };
  const remote = { ...base, tasks: [{ id: 'remote-task', title: 'Physiology', done: false, updatedAt: '2026-11-06T10:01:00.000Z' }] };

  const merged = mergeStudyToolkitStates(base, local, remote);
  assert.deepEqual(merged.tasks.map(task => task.id).sort(), ['local-task', 'remote-task']);
});

test('preserves remote updates to fields the local device did not change', () => {
  const base = empty();
  const existing = { id: 'task-1', title: 'Revise cells', done: false, updatedAt: '2026-11-06T09:00:00.000Z' };
  const remoteCard = { id: 'card-1', front: 'Mitochondria', back: 'ATP production', createdAt: '2026-11-06T10:00:00.000Z' };
  const local = { ...base, tasks: [existing], dailyGoal: 90 };
  const remote = { ...base, tasks: [existing], cards: [remoteCard], weeklyGoal: 450 };

  const merged = mergeStudyToolkitStates(base, local, remote);
  assert.equal(merged.dailyGoal, 90);
  assert.equal(merged.weeklyGoal, 450);
  assert.deepEqual(merged.cards, [remoteCard]);
});

test('resolves concurrent task edits using the newest updatedAt timestamp', () => {
  const base = empty();
  const original = { id: 'task-1', title: 'Revise cells', done: false, updatedAt: '2026-11-06T09:00:00.000Z' };
  const local = { ...base, tasks: [{ ...original, done: true, updatedAt: '2026-11-06T10:00:00.000Z' }] };
  const remote = { ...base, tasks: [{ ...original, title: 'Revise cell membrane', updatedAt: '2026-11-06T10:05:00.000Z' }] };

  const merged = mergeStudyToolkitStates({ ...base, tasks: [original] }, local, remote);
  assert.deepEqual(merged.tasks, remote.tasks);
});

test('deletions win conflicting edits to avoid resurrecting stale tasks', () => {
  const original = { id: 'task-1', title: 'Revise cells', done: false, updatedAt: '2026-11-06T09:00:00.000Z' };
  const base = { ...empty(), tasks: [original] };
  const local = { ...base, tasks: [] };
  const remote = { ...base, tasks: [{ ...original, title: 'Edited on another device', updatedAt: '2026-11-06T10:05:00.000Z' }] };

  assert.deepEqual(mergeStudyToolkitStates(base, local, remote).tasks, []);
  assert.deepEqual(mergeStudyToolkitStates(base, remote, local).tasks, []);
});

test('legacy cache migration unions unique records but keeps cloud scalar values', () => {
  const base = empty();
  const local = {
    ...base,
    tasks: [{ id: 'cached-task', title: 'Cached revision', done: false, updatedAt: '2026-11-06T10:00:00.000Z' }],
    dailyGoal: 120,
  };
  const remote = {
    ...base,
    tasks: [{ id: 'cloud-task', title: 'Cloud revision', done: false, updatedAt: '2026-11-06T10:01:00.000Z' }],
    dailyGoal: 45,
  };

  const merged = mergeStudyToolkitStates(base, local, remote, false);
  assert.deepEqual(merged.tasks.map(task => task.id).sort(), ['cached-task', 'cloud-task']);
  assert.equal(merged.dailyGoal, 45);
});
