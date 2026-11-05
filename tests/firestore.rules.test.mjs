import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { after, before, test } from 'node:test';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rules = readFileSync(path.resolve(__dirname, '../firestore.rules'), 'utf8');
let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-curiva-firestore-rules',
    firestore: { rules },
  });
});

after(async () => {
  await testEnv?.cleanup();
});

function appointmentRequest(userId = 'alice', userEmail = 'alice@example.test') {
  return {
    userId,
    userEmail,
    displayName: 'Alice Example',
    phoneNumber: '',
    serviceType: 'initial-consultation',
    preferredDate: '2027-11-15',
    preferredTime: 'morning',
    timezone: 'Asia/Kolkata',
    status: 'requested',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
}

function orderRecord(userId, status = 'pending') {
  return {
    userId,
    userEmail: userId === 'guest' ? 'guest@example.test' : `${userId}@example.test`,
    resourceId: 'Homoeopathy-modalities-cheat-sheet',
    resourceTitle: 'Homoeopathy Modalities Cheat Sheet',
    paymentId: 'pay_test_only',
    status,
    createdAt: serverTimestamp(),
  };
}

test('appointment requests cannot be created while signed out', async () => {
  const db = testEnv.unauthenticatedContext().firestore();
  await assertFails(
    setDoc(doc(db, 'appointmentRequests', 'signed-out'), appointmentRequest()),
  );
});

test('appointment request owners can read/cancel their request but cannot confirm it or read another user\'s request', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.test' }).firestore();
  const requestRef = doc(alice, 'appointmentRequests', 'owner-request');

  await assertSucceeds(setDoc(requestRef, appointmentRequest()));
  await assertSucceeds(getDoc(requestRef));
  await assertFails(getDoc(doc(bob, 'appointmentRequests', 'owner-request')));
  const admin = testEnv.authenticatedContext('clinic-admin', { email: 'premmore0552@gmail.com' }).firestore();
  await assertFails(updateDoc(doc(admin, 'appointmentRequests', 'owner-request'), {
    status: 'confirmed',
    adminResponse: 'Must use server API',
    updatedAt: serverTimestamp(),
  }));

  await assertFails(updateDoc(requestRef, {
    status: 'confirmed',
    updatedAt: serverTimestamp(),
  }));

  await assertSucceeds(updateDoc(requestRef, {
    status: 'cancelled',
    updatedAt: serverTimestamp(),
  }));
});

test('clients may create pending order records but cannot mark orders paid or update them later', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.test' }).firestore();
  const pendingRef = doc(alice, 'orders', 'pending-order');
  const paidRef = doc(alice, 'orders', 'client-paid-order');

  await assertSucceeds(setDoc(pendingRef, orderRecord('alice', 'pending')));
  await assertFails(setDoc(paidRef, orderRecord('alice', 'paid')));
  await assertFails(updateDoc(pendingRef, { status: 'paid' }));
  await assertSucceeds(getDoc(pendingRef));
  await assertFails(getDoc(doc(bob, 'orders', 'pending-order')));
});

function nativeLearningProgress(uid = 'alice') {
  return {
    uid,
    version: 1,
    completedLessons: ['anatomy:cell-structure'],
    quizHistory: [{ date: '2026-11-06', subject: 'Anatomy', score: 8, total: 10, percent: 80 }],
    knownFlashcards: ['card-1'],
    studyDays: ['2026-11-06'],
    lastLesson: { subjectId: 'anatomy', chapterTitle: 'Cell structure', subjectTitle: 'Anatomy' },
    studyPlan: { date: '2026-11-06', goal: 30, completed: ['topic'] },
    updatedAt: serverTimestamp(),
  };
}

test('native learning progress is private to its account and accepts bounded owner sync writes', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.test' }).firestore();
  const ref = doc(alice, 'nativeLearningProgress', 'alice');

  await assertSucceeds(setDoc(ref, nativeLearningProgress()));
  await assertSucceeds(getDoc(ref));
  await assertFails(getDoc(doc(bob, 'nativeLearningProgress', 'alice')));
  await assertFails(setDoc(doc(bob, 'nativeLearningProgress', 'alice'), nativeLearningProgress('alice')));
  await assertSucceeds(updateDoc(ref, {
    completedLessons: ['anatomy:cell-structure', 'physiology:cell-membrane'],
    updatedAt: serverTimestamp(),
  }));
});

test('native learning progress rejects malformed study plans and signed-out access', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const signedOut = testEnv.unauthenticatedContext().firestore();
  const invalid = nativeLearningProgress();
  invalid.studyPlan = { date: 'not-a-date', goal: 999, completed: ['anything'] };

  await assertFails(setDoc(doc(alice, 'nativeLearningProgress', 'alice'), invalid));
  await assertFails(getDoc(doc(signedOut, 'nativeLearningProgress', 'alice')));
});
