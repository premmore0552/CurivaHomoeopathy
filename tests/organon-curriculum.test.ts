import assert from 'node:assert/strict';
import test from 'node:test';
import { ORGANON_CURRICULUM_YEARS } from '../src/data/organonCurriculum';

test('four professional-year course codes are mapped', () => {
  assert.equal(ORGANON_CURRICULUM_YEARS.length, 4);
  assert.deepEqual(ORGANON_CURRICULUM_YEARS.map((year) => year.courseCode), ['HomUG-OM-I', 'HomUG-OM-II', 'HomUG-OM-III', 'HomUG-OM-IV']);
});
test('first-year aphorism blocks are separate and Psychology appears', () => {
  const year = ORGANON_CURRICULUM_YEARS.find((item) => item.slug === '1st-bhms');
  assert.ok(year);
  assert.deepEqual(year.coreAphorismRanges.map(({ start, end }) => [start, end]), [[1, 27], [105, 145]]);
  assert.ok(year.terms.some((term) => term.term.includes('Psychology')));
});
test('second and third year prescribed blocks are distinct', () => {
  const second = ORGANON_CURRICULUM_YEARS.find((item) => item.slug === '2nd-bhms');
  const third = ORGANON_CURRICULUM_YEARS.find((item) => item.slug === '3rd-bhms');
  assert.ok(second && third);
  assert.deepEqual(second.coreAphorismRanges.map(({ start, end }) => [start, end]), [[28, 104]]);
  assert.deepEqual(third.coreAphorismRanges.map(({ start, end }) => [start, end]), [[146, 209], [231, 294]]);
});
test('fourth year core range and table discrepancy are disclosed', () => {
  const year = ORGANON_CURRICULUM_YEARS.find((item) => item.slug === '4th-bhms');
  assert.ok(year);
  assert.deepEqual(year.coreAphorismRanges.map(({ start, end }) => [start, end]), [[210, 230]]);
  assert.match(year.sourceNote, /boundary discrepancy/i);
  assert.match(year.sourceNote, /detailed teaching-hours table/i);
});
test('every year has an official NCH source and study structure', () => {
  for (const year of ORGANON_CURRICULUM_YEARS) {
    assert.match(year.sourceUrl, /^https:\/\/nch\.org\.in\/upload\//);
    assert.ok(year.terms.length && year.learningOutcomes.length && year.assessment.length);
    assert.ok(year.teachingHours.lectures > 0 && year.teachingHours.nonLectures > 0);
  }
});
