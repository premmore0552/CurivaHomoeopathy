import assert from 'node:assert/strict';
import test from 'node:test';
import { safeStudyPlan } from '../src/native-app/nativeProgressValidation';

test('preserves a valid YYYY-MM-DD study plan', () => {
  assert.deepEqual(
    safeStudyPlan({ date: '2026-11-06', goal: 45, completed: ['topic', 'mcq'] }),
    { date: '2026-11-06', goal: 45, completed: ['topic', 'mcq'] }
  );
});

test('rejects malformed date strings', () => {
  assert.equal(safeStudyPlan({ date: '2026-11-06', goal: 30, completed: [] })?.date, '2026-11-06');
  assert.equal(safeStudyPlan({ date: '\\d{4}-\\d{2}-\\d{2}', goal: 30, completed: [] }), null);
  assert.equal(safeStudyPlan({ date: '2026/11/06', goal: 30, completed: [] }), null);
});

test('rejects impossible calendar dates', () => {
  assert.equal(safeStudyPlan({ date: '2026-02-30', goal: 30, completed: [] }), null);
  assert.equal(safeStudyPlan({ date: '2026-13-01', goal: 30, completed: [] }), null);
});

test('normalizes goal values and only keeps known, unique tasks', () => {
  assert.deepEqual(
    safeStudyPlan({
      date: '2026-11-06',
      goal: 20,
      completed: ['topic', 'topic', 'unknown', 'mcq', 'cards', 'materia'],
    }),
    { date: '2026-11-06', goal: 30, completed: ['topic', 'mcq', 'cards', 'materia'] }
  );
});

test('rejects non-object study plan values', () => {
  assert.equal(safeStudyPlan(null), null);
  assert.equal(safeStudyPlan([]), null);
  assert.equal(safeStudyPlan('2026-11-06'), null);
});
