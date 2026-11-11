import assert from 'node:assert/strict';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { organonData } from '../src/data/organon_data';
import { ORGANON_SIMPLE_EXPLANATIONS } from '../src/data/organonAuthoredContent';
import { getOrganonReaderPath, ORGANON_CURRICULUM_YEARS } from '../src/data/organonCurriculum';

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


test('legacy reader ranges match the NCH core and revision blocks for each year', async () => {
  const { getOrganonStudyAphorismRanges } = await import('../src/data/organonCurriculum');

  assert.deepEqual(getOrganonStudyAphorismRanges('1st-bhms'), [[1, 27], [105, 145]]);
  assert.deepEqual(getOrganonStudyAphorismRanges('2nd-bhms'), [[28, 104]]);
  assert.deepEqual(getOrganonStudyAphorismRanges('3rd-bhms'), [
    [1, 70], [71, 145], [146, 209], [231, 294]
  ]);
  assert.deepEqual(getOrganonStudyAphorismRanges('4th-bhms'), [
    [1, 70], [71, 104], [105, 145], [146, 209], [210, 230], [231, 294]
  ]);
});

test('legacy range helper leaves unknown years empty', async () => {
  const { getOrganonStudyAphorismRanges } = await import('../src/data/organonCurriculum');
  assert.deepEqual(getOrganonStudyAphorismRanges('final-year'), []);
});


test('year-wise reader links open the matching year, range and practice mode', () => {
  assert.equal(
    getOrganonReaderPath('1st-bhms', { tab: 'matrix', aphorism: 105 }),
    '/organon-library?year=1st&tab=matrix&aphorism=105'
  );
  assert.equal(
    getOrganonReaderPath('3rd-bhms', { tab: 'matrix', aphorism: 231 }),
    '/organon-library?year=3rd&tab=matrix&aphorism=231'
  );
  assert.equal(
    getOrganonReaderPath('4th-bhms', { tab: 'study', mode: 'quiz' }),
    '/organon-library?year=4th&tab=study&mode=quiz'
  );
});

test('reader deep links cannot select an aphorism outside that year syllabus', () => {
  assert.equal(
    getOrganonReaderPath('1st-bhms', { tab: 'matrix', aphorism: 104 }),
    '/organon-library?year=1st&tab=matrix&aphorism=1'
  );
  assert.equal(
    getOrganonReaderPath('unknown-year', { tab: 'matrix', aphorism: 1 }),
    '/organon-philosophy'
  );
});


test('the source aphorism text and footnotes retain their protected Git blob identity', () => {
  const lockUrl = new URL('../src/data/organon_aphorism_text.lock.json', import.meta.url);
  const sourceUrl = new URL('../src/data/organon_data.ts', import.meta.url);
  const lock = JSON.parse(readFileSync(lockUrl, 'utf8')) as {
    sourceFile: string;
    gitBlobSha: string;
    aphorismCount: number;
    editionVersionCount: number;
    footnoteCount: number;
  };
  const sourceBytes = readFileSync(sourceUrl);
  const gitBlobHeader = Buffer.from(`blob ${sourceBytes.length}\\0`, 'utf8');
  const actualBlobSha = createHash('sha1').update(gitBlobHeader).update(sourceBytes).digest('hex');

  assert.equal(lock.sourceFile, 'src/data/organon_data.ts');
  assert.equal(actualBlobSha, lock.gitBlobSha,
    'Original Organon aphorism text changed. Do not rewrite, normalise or paraphrase it without explicit editorial approval.');
  assert.equal(organonData.length, lock.aphorismCount);
  assert.equal(organonData.reduce((count, aphorism) => count + aphorism.versions.length, 0), lock.editionVersionCount);
  assert.equal(organonData.reduce((count, aphorism) => count + aphorism.versions.reduce((total, version) => total + version.footnotes.length, 0), 0), lock.footnoteCount);
});

test('the complete source dataset has one non-empty text record for every aphorism from 1 through 294', () => {
  assert.deepEqual(organonData.map(({ id }) => id), Array.from({ length: 294 }, (_, index) => index + 1));
  for (const aphorism of organonData) {
    assert.ok(aphorism.versions.length > 0, `Aphorism §${aphorism.id} has no text version.`);
    for (const version of aphorism.versions) {
      assert.ok(version.content.trim().length > 0, `Aphorism §${aphorism.id} has an empty text version.`);
    }
  }
});

test('the future author-controlled simple-explanation layer is empty until supplied', () => {
  assert.deepEqual(Object.keys(ORGANON_SIMPLE_EXPLANATIONS), []);
});
