import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { after, before, beforeEach, test } from 'node:test';
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from '@firebase/rules-unit-testing';
import {
  doc,
  collection,
  deleteDoc,
  getDoc,
  getDocs,
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

beforeEach(async () => {
  // Keep authorization and document fixtures isolated between top-level tests.
  await testEnv.clearFirestore();
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

function screeningRecord(userId = 'alice', id = 'screen-1') {
  return {
    id,
    userId,
    age: '34',
    hpvVaxStatus: 'unknown',
    lastPapSmearYears: '3',
    symptoms: ['example symptom'],
    familyHistory: false,
    riskLevel: 'moderate',
    recommendation: 'Discuss screening schedule with a qualified clinician.',
    createdAt: serverTimestamp(),
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

test('inactive administrator memberships never grant privileged access', async () => {
  const owner = testEnv.authenticatedContext('owner', { email: 'owner@example.test' }).firestore();
  const inactiveAdmin = testEnv.authenticatedContext('inactive-admin', { email: 'inactive@example.test' }).firestore();
  const pendingRef = doc(owner, 'questions', 'pending-owned-question');

  await assertSucceeds(setDoc(pendingRef, {
    userId: 'owner',
    subject: 'A valid academic question',
    content: 'This is a sufficiently long academic question.',
    status: 'pending',
    isAnonymous: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));

  await testEnv.withSecurityRulesDisabled( async context => {
    await setDoc(doc(context.firestore(), 'admins', 'inactive-admin'), {
      active: false,
      createdAt: new Date().toISOString(),
    });
  });

  await assertFails(updateDoc(pendingRef, {
    status: 'answered',
    answer: 'Should not be allowed.',
    answeredBy: 'inactive-admin',
    answeredAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));
});

test('administrator grants are privileged-only and profiles cannot grant roles', async () => {
  const alice = testEnv.authenticatedContext('alice', {
    email: 'premmore0552@gmail.com',
    email_verified: true,
  }).firestore();
  const bob = testEnv.authenticatedContext('bob', {
    email: 'bob@example.test',
    email_verified: true,
  }).firestore();

  // Seed a legitimate membership through the emulator's privileged context,
  // representing an audited Admin SDK / Firebase Console operation.
  await testEnv.withSecurityRulesDisabled( async context => {
    await setDoc(doc(context.firestore(), 'admins', 'trusted-admin'), {
      active: true,
      createdAt: new Date().toISOString(),
    });
  });

  const trustedAdmin = testEnv.authenticatedContext('trusted-admin', {
    email: 'admin@example.test',
    email_verified: true,
  }).firestore();

  // A verified historic bootstrap email is not an admin without a grant.
  await assertSucceeds(getDoc(doc(alice, 'admins', 'alice')));
  await assertFails(setDoc(doc(alice, 'admins', 'alice'), { active: true }));
  await assertFails(setDoc(doc(alice, 'admins', 'bob'), { active: true }));
  await assertFails(getDoc(doc(alice, 'admins', 'trusted-admin')));

  // A granted administrator can discover only their own membership. Even an
  // administrator cannot edit or mint grants from the web client.
  await assertSucceeds(getDoc(doc(trustedAdmin, 'admins', 'trusted-admin')));
  await assertFails(setDoc(doc(trustedAdmin, 'admins', 'bob'), { active: true }));
  await assertFails(updateDoc(doc(trustedAdmin, 'admins', 'trusted-admin'), { active: false }));
  await assertFails(deleteDoc(doc(trustedAdmin, 'admins', 'trusted-admin')));

  await assertFails(setDoc(doc(bob, 'users', 'bob'), {
    uid: 'bob',
    email: 'bob@example.test',
    profession: 'Administrator',
    createdAt: serverTimestamp(),
  }));

  const safeProfile = doc(bob, 'users', 'bob');
  await assertSucceeds(setDoc(safeProfile, {
    uid: 'bob',
    email: 'bob@example.test',
    displayName: 'Bob',
    profession: 'BHMS Student',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));
  await assertFails(updateDoc(safeProfile, {
    profession: 'Administrator',
    updatedAt: serverTimestamp(),
  }));
  await assertFails(updateDoc(safeProfile, {
    phoneNumber: '+911234567890',
    updatedAt: serverTimestamp(),
  }));
  await assertFails(updateDoc(safeProfile, {
    clinicAddress: 'A private address',
    updatedAt: serverTimestamp(),
  }));
  await assertFails(updateDoc(safeProfile, {
    bio: 'x'.repeat(501),
    updatedAt: serverTimestamp(),
  }));
});

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

function studyToolkitProgress(uid = 'alice') {
  return {
    uid,
    version: 1,
    tasks: [{ id: 'task-1', title: 'Revise anatomy', done: false, date: '2026-11-06', subject: 'Anatomy', chapter: 'Thorax' }],
    notes: [{ id: 'note-1', title: 'Thorax', content: 'Review the mediastinal relations.', subject: 'Anatomy', chapter: 'Thorax', updatedAt: '2026-11-06T10:00:00.000Z' }],
    cards: [{ id: 'card-1', front: 'Define cardiac output.', back: 'Volume of blood pumped per minute.', subject: 'Physiology', createdAt: '2026-11-06T10:00:00.000Z' }],
    sessions: [{ id: 'session-1', date: '2026-11-06', minutes: 25, topic: 'Thorax revision', subject: 'Anatomy' }],
    readingLogs: [{ id: 'reading-1', date: '2026-11-06', subject: 'Anatomy', chapter: 'Thorax', pages: '12-18', notes: 'Revise pleural reflections.' }],
    reflections: [{ id: 'reflection-1', date: '2026-11-06', learned: 'Mediastinal divisions', improve: 'Relations of the heart' }],
    dailyGoal: 60,
    weeklyGoal: 300,
    examDate: '2027-03-12',
    focusMode: false,
    timer: { mode: 'focus', durationMinutes: 25, remainingSeconds: 1500, running: false, deadlineAt: null, topic: 'General revision' },
    updatedAt: serverTimestamp(),
  };
}

test('legacy kits, reproductive screenings and free-text workspace deny every client operation for all roles', async () => {
  await testEnv.withSecurityRulesDisabled(async context => {
    const privilegedDb = context.firestore();
    // Seed existing records and a real active admin so the role matrix is meaningful.
    await setDoc(doc(privilegedDb, 'admins', 'trusted-admin'), { active: true });
    await setDoc(doc(privilegedDb, 'kits', 'legacy-case'), {
      userId: 'alice',
      notes: 'Legacy fictional case note',
      createdAt: new Date().toISOString(),
    });
    await setDoc(doc(privilegedDb, 'screenings', 'legacy-screening'), {
      userId: 'alice',
      createdAt: new Date().toISOString(),
    });
    await setDoc(doc(privilegedDb, 'studyToolkitProgress', 'alice'), {
      uid: 'alice',
      notes: [{ content: 'Legacy free text' }],
    });
  });

  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const trustedAdmin = testEnv.authenticatedContext('trusted-admin', { email: 'admin@example.test' }).firestore();
  const signedOut = testEnv.unauthenticatedContext().firestore();
  const protectedCollections = [
    { name: 'kits', existingId: 'legacy-case', newId: 'new-case' },
    { name: 'screenings', existingId: 'legacy-screening', newId: 'new-screening' },
    { name: 'studyToolkitProgress', existingId: 'alice', newId: 'new-workspace' },
  ];

  for (const db of [alice, trustedAdmin, signedOut]) {
    for (const item of protectedCollections) {
      const existingRef = doc(db, item.name, item.existingId);
      await assertFails(getDoc(existingRef), `get denied: ${item.name}`);
      await assertFails(getDocs(collection(db, item.name)), `list denied: ${item.name}`);
      await assertFails(setDoc(doc(db, item.name, item.newId), { userId: 'alice', uid: 'alice' }), `create denied: ${item.name}`);
      await assertFails(updateDoc(existingRef, { notes: 'must remain inaccessible' }), `update denied: ${item.name}`);
      await assertFails(deleteDoc(existingRef), `delete denied: ${item.name}`);
    }
  }
});

test('native learning progress rejects malformed study plans and signed-out access', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const signedOut = testEnv.unauthenticatedContext().firestore();
  const invalid = nativeLearningProgress();
  invalid.studyPlan = { date: 'not-a-date', goal: 999, completed: ['anything'] };

  await assertFails(setDoc(doc(alice, 'nativeLearningProgress', 'alice'), invalid));
  await assertFails(getDoc(doc(signedOut, 'nativeLearningProgress', 'alice')));
});


test('question submissions contain no submitter contact fields and stay private until admin publication', async () => {
  const alice = testEnv.authenticatedContext('alice', { email: 'alice@example.test' }).firestore();
  const bob = testEnv.authenticatedContext('bob', { email: 'bob@example.test' }).firestore();
  const signedOut = testEnv.unauthenticatedContext().firestore();
  const questionRef = doc(alice, 'questions', 'alice-question');

  const safeSubmission = {
    userId: 'alice',
    subject: 'Academic Materia Medica question',
    content: 'Explain the historical meaning of a common Materia Medica term.',
    isAnonymous: true,
    status: 'pending',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await assertSucceeds(setDoc(questionRef, safeSubmission));
  await assertSucceeds(getDoc(questionRef));
  await assertFails(getDoc(doc(bob, 'questions', 'alice-question')));
  await assertFails(getDoc(doc(signedOut, 'questions', 'alice-question')));
  await assertFails(setDoc(doc(alice, 'questions', 'published-by-client'), {
    ...safeSubmission,
    status: 'featured',
  }));
  await assertFails(setDoc(doc(alice, 'questions', 'email-copy'), {
    ...safeSubmission,
    userEmail: 'alice@example.test',
  }));
  await assertFails(setDoc(doc(alice, 'questions', 'name-copy'), {
    ...safeSubmission,
    userName: 'Alice Example',
  }));
  await assertFails(updateDoc(questionRef, {
    status: 'featured',
    updatedAt: serverTimestamp(),
  }));
  await assertFails(deleteDoc(questionRef));

  await testEnv.withSecurityRulesDisabled( async context => {
    await setDoc(doc(context.firestore(), 'admins', 'trusted-admin'), { active: true });
  });
  const trustedAdmin = testEnv.authenticatedContext('trusted-admin', { email: 'admin@example.test' }).firestore();
  await assertSucceeds(updateDoc(doc(trustedAdmin, 'questions', 'alice-question'), {
    status: 'featured',
    answer: 'This is an academic explanation, not a clinical recommendation.',
    answeredBy: 'Curiva Editorial Team',
    answeredAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }));
  await assertSucceeds(getDoc(doc(signedOut, 'questions', 'alice-question')));
});
