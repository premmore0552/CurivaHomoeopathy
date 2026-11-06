import assert from 'node:assert/strict';
import test from 'node:test';
import {
  chauhanQuestionBank,
  chauhanQuestionBankStats,
  scorableChauhanQuestions,
  unscoredChauhanQuestions
} from '../src/data/chauhanQuestionBank';

test('the complete source collection is present exactly once', () => {
  assert.equal(chauhanQuestionBankStats.total, 3196);
  assert.equal(chauhanQuestionBank.length, 3196);
  assert.equal(new Set(chauhanQuestionBank.map((question) => question.id)).size, 3196);
  assert.equal(scorableChauhanQuestions.length, 3100);
  assert.equal(unscoredChauhanQuestions.length, 96);
});

test('every extracted question retains its question stem and source chapter', () => {
  for (const question of chauhanQuestionBank) {
    assert.ok(question.prompt.trim().length > 0, question.id + ' has an empty prompt');
    assert.ok(question.chapter.trim().length > 0, question.id + ' has no chapter label');
    assert.ok(question.sourcePage === null || (question.sourcePage >= 1 && question.sourcePage <= 1367), question.id + ' has an invalid source page');
  }
});

test('only source-keyed questions can be used for scored practice', () => {
  for (const question of scorableChauhanQuestions) {
    assert.equal(question.scoringEnabled, true);
    assert.notEqual(question.correctIndex, null);
    assert.ok((question.correctIndex as number) >= 0);
    assert.ok((question.correctIndex as number) < question.options.length);
    assert.equal(question.answerStatus, 'keyed');
  }
  for (const question of unscoredChauhanQuestions) {
    assert.equal(question.scoringEnabled, false);
    assert.equal(question.correctIndex, null);
    assert.ok(question.reviewFlags.length > 0);
  }
});

test('question formats and the three separately labelled solved papers remain represented', () => {
  const types = new Set(chauhanQuestionBank.map((question) => question.questionType));
  assert.ok(types.has('single_best'));
  assert.ok(types.has('matching'));
  assert.ok(types.has('sequencing'));
  assert.ok(types.has('assertion_reason'));
  assert.ok(chauhanQuestionBank.some((question) => question.chapter === 'Question Paper NHMC 2008'));
  assert.ok(chauhanQuestionBank.some((question) => question.chapter === 'Question Paper RPSC 2008'));
  assert.ok(chauhanQuestionBank.some((question) => question.chapter === 'Question Paper UPSC 2008'));
});
