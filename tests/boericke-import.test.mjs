import test from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseMateriaMedicaText, splitRemedySections } from '../scripts/import-boericke-ocr.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'scripts', 'boericke-source');

async function readStagedSource() {
  const names = (await readdir(SOURCE_DIR)).filter(name => /^part-\d{2}\.txt$/.test(name)).sort();
  assert.equal(names.length, 10, 'all ten source segments must be staged');
  return (await Promise.all(names.map(name => readFile(path.join(SOURCE_DIR, name), 'utf8')))).join('');
}

test('source bounds and remedy count reconcile against the 8th-edition OCR text', async () => {
  const parsed = parseMateriaMedicaText(await readStagedSource());
  assert.equal(parsed.rawHeadingCandidates, 639);
  assert.equal(parsed.excludedHeadingCandidates.length, 1);
  assert.match(parsed.excludedHeadingCandidates[0].heading, /^SILICEA/);
  assert.equal(parsed.entries.length, 638);
  assert.equal(parsed.entries[0].title, 'Abies Canadensis');
  assert.equal(parsed.entries.at(-1).title, 'Zingiber');
  assert.equal(new Set(parsed.entries.map(entry => entry.slug)).size, 638);
});

test('OCR heading corrections and split headings produce canonical remedy names', async () => {
  const parsed = parseMateriaMedicaText(await readStagedSource());
  const titles = new Set(parsed.entries.map(entry => entry.title));
  for (const title of [
    'Anacardium', 'Oxydendron', 'Boletus Laricis', 'Bothrops Lanciolatus',
    'Cimicifuga Racemosa', 'Cinnabaris', 'Spartium Scoparium',
    'Solanum Lycopersicum', 'Crocus Sativa', 'Zingiber'
  ]) assert.ok(titles.has(title), 'missing normalized heading: ' + title);
});

test('source sections retain Dose and modalities as distinct headings', () => {
  const sections = splitRemedySections([
    'A source introduction describing the remedy.',
    '',
    'Mind.— An example mental description.',
    '',
    'Dose.— First to third potency.',
    '',
    'Modalities.— Worse in cold air.'
  ]);
  assert.equal(sections.Intro, 'A source introduction describing the remedy.');
  assert.equal(sections.Mind, 'An example mental description.');
  assert.equal(sections.Dose, 'First to third potency.');
  assert.equal(sections.Modalities, 'Worse in cold air.');
});

test('every extracted source remedy has readable content and source line metadata', async () => {
  const parsed = parseMateriaMedicaText(await readStagedSource());
  for (const entry of parsed.entries) {
    assert.ok(entry.metadata.word_count >= 10, entry.title + ' has no usable body text');
    assert.ok(entry.metadata.source_line_start > 0, entry.title + ' has no source line start');
    assert.ok(entry.metadata.source_line_end >= entry.metadata.source_line_start, entry.title + ' has invalid source line range');
    assert.ok(Object.keys(entry.content.sections).length >= 1, entry.title + ' has no sections');
    assert.equal(entry.metadata.content_status, 'ocr-derived-needs-editorial-review');
  }
});
