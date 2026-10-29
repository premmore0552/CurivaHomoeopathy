#!/usr/bin/env node
/**
 * Build the William Boericke 8th-edition Materia Medica dataset from the
 * user-supplied OCR transcription staged in scripts/boericke-source/part-*.txt.
 *
 * Existing curated remedy files are never overwritten. New remedies are
 * written as content.json + metadata.json and added to the registry/search index.
 * OCR-derived text is a historical reference; it is not treatment advice.
 */
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'scripts', 'boericke-source');
const DATA_DIR = path.join(ROOT, 'public', 'data', 'materia-medica');
const REMEDIES_DIR = path.join(DATA_DIR, 'remedies');
const SOURCE_FILENAME = '2015.125811.Pocket-Manual-Of-Homoeopathic-Materia-Medica-Ed8th_text (1).txt';
const SOURCE_URL = 'https://www.homeoint.org/books/boericmm/index.htm';
const IMPORT_DATE = '2026-10-30';

const slugify = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const titleCase = value => value.toLowerCase().replace(/\b([a-z])/g, c => c.toUpperCase());
const escapeRegex = value => value.replace(/[.*+?^$\{\}()|[\]\\]/g, '\\$&');
async function readJson(file, fallback) {
  try { return JSON.parse(await readFile(file, 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return fallback; throw error; }
}
async function exists(file) {
  try { await access(file); return true; } catch { return false; }
}
async function saveJson(file, data) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

const CORRECTIONS = new Map([
  ['2INGIBER', 'Zingiber'],
  ['CALAREA ACETICA', 'Calcarea Acetica'],
  ['CALAREA ARSENICA', 'Calcarea Arsenica'],
  ['CALAREA CARBONICA—OSTREARUM', 'Calcarea Carbonica'],
  ['CALAREA CARBONICA', 'Calcarea Carbonica'],
  ['CALAREA FLUORICA', 'Calcarea Fluorica'],
  ['CALAREA PHOSPHORICA', 'Calcarea Phosphorica'],
  ['CALAREA SILICATA', 'Calcarea Silicata'],
  ['CALAREA SULPHURICA', 'Calcarea Sulphurica'],
  ['CALTHA PAIJJRTRLS', 'Caltha Palustris'],
  ['BLATTA URIENTALIS', 'Blatta Orientalis'],
  ['CINCHONA OFF-ICINALIS', 'Cinchona Officinalis'],
  ['PTNUS SYLVESTRIS', 'Pinus Sylvestris'],
  ['PLUMBUM MBTALLICUM', 'Plumbum Metallicum'],
  ['RUMBX CRISPUS', 'Rumex Crispus'],
  ['TEUCFIUM MARUM', 'Teucrium Marum'],
  ['TONOO', 'Tongo'],
  ['TUBERCUUNUM', 'Tuberculinum'],
  ['OFFICINALE', 'Boletus Laricis'],
  ['LANCIOLATUS', 'Bothrops Lanciolatus'],
  ['MOSA)', 'Cimicifuga Racemosa'],
  ['RUBER', 'Cinnabaris'],
  ['SCOPARIUS', 'Spartium Scoparium'],
  ['LYCOPERSICUM ESCULENTUM', 'Solanum Lycopersicum']
]);
const SPLIT_HEADER_FRAGMENTS = new Set([
  'OFFICINALE', 'LANCIOLATUS', 'MOSA)', 'RUBER', 'SCOPARIUS', 'LYCOPERSICUM ESCULENTUM'
]);
const ALIASES_TO_EXISTING = new Map([
  ['alnus', 'alnus-serrulata'],
  ['aloe', 'aloe-socotrina'],
  ['alstonia', 'alstonia-scholaris'],
  ['ammoniacum', 'ammoniacum-gummi'],
  ['amyl-nitrosum', 'amyl-nitrite'],
  ['anacardium', 'anacardium-orientale'],
  ['anagallis', 'anagallis-arvensis']
]);

const SECTION_NAMES = [
  'Female Sexual Organs','Male Sexual Organs','Urinary Organs','Generalities','Fever and Chill',
  'Food and Drinks','Clinical Uses','Nervous System','Heart and Pulse','Female','Relationship',
  'Complementary','Aggravation','Expectoration','Perspiration','Modalities','Antidotes','Compare',
  'Clinical','Proving','Intro','Mind','Head','Eyes','Ears','Nose','Face','Mouth','Teeth','Tongue',
  'Throat','Stomach','Abdomen','Rectum','Bowels','Urine','Urinary','Male','Respiratory','Chest',
  'Heart','Circulation','Neck','Back','Extremities','Limbs','Joints','Sleep','Dreams','Skin','Fever',
  'Chill','Nerves','Larynx','Cough','Appetite','Stool','Bladder','Kidneys','Genitalia','Glands',
  'Bones','Muscles','Tissue','Temperature','Touch','Pressure','Side','Position','Time','Food',
  'General','Relations','Pulse','Voice','Lungs','Taste','Vision','Nails'
].sort((a,b) => b.length - a.length);
const SECTION_RE = new RegExp('(^|\\n\\n)(' + SECTION_NAMES.map(escapeRegex).join('|') +
  ')\\s*(?:[.:·]\\s*)?[—–-]\\s*', 'gim');

function normalizeBody(lines) {
  const cleaned = lines.join('\n')
    .replace(/\f/g, '\n').replace(/\r/g, '')
    .replace(/\u00ad/g, '')
    .replace(/([A-Za-z])[-–]\s*\n\s*([a-z])/g, '$1$2');
  return cleaned.split(/\n\s*\n+/)
    .map(p => p.split('\n').map(x => x.trim()).filter(Boolean).join(' '))
    .filter(Boolean).join('\n\n').replace(/[ \t]{2,}/g, ' ').trim();
}
function findHeaders(lines, start, end) {
  const headers = [];
  const isUpperHeader = s => /^[A-Z0-9][A-Z0-9 ,.;()\[\]/—–\-:&']+$/.test(s) &&
    /[A-Z]/.test(s) && s.length <= 130;
  for (let i = start; i < end; i++) {
    const raw = lines[i].trim();
    if (!raw || !isUpperHeader(raw) || /^\d{1,4}\s/.test(raw)) continue;
    let next = i + 1;
    while (next < end && !lines[next].trim()) next++;
    const following = lines[next]?.trim() || '';
    if (!(following.startsWith('(') || following.startsWith('—') ||
      following.startsWith('-') || following.startsWith('['))) continue;
    if (/^SILICEA[—– -].*\b\d{2,4}$/.test(raw)) continue;
    let idx = i, title = raw, corrected = CORRECTIONS.get(raw.toUpperCase());
    if (SPLIT_HEADER_FRAGMENTS.has(raw.toUpperCase())) {
      let previous = i - 1;
      while (previous > start && !lines[previous].trim()) previous--;
      idx = previous;
      title = corrected || titleCase(raw);
    } else {
      const unwrapped = raw.split(/[—–]/)[0].trim().replace(/\s*[-–]\s*$/, '');
      title = corrected || titleCase(unwrapped.replace(/\s*\d{1,4}\s*$/, '').trim());
    }
    // A few OCR hyphenation/spacing variants that otherwise collide or mis-slug.
    if (/^Cinchona Off-icinalis$/i.test(title)) title = 'Cinchona Officinalis';
    headers.push({ idx, next, raw, title });
  }
  headers.sort((a,b) => a.idx - b.idx);
  return headers.filter((h,i) => i === 0 || h.idx > headers[i-1].idx);
}
function buildProfile(header, bodyLines) {
  const normalized = normalizeBody(bodyLines);
  const sections = {};
  const matches = [];
  let match;
  SECTION_RE.lastIndex = 0;
  while ((match = SECTION_RE.exec(normalized)) !== null) {
    matches.push({
      start: match.index + match[1].length,
      end: SECTION_RE.lastIndex,
      label: match[2].replace(/\s+/g, ' ').trim()
    });
  }
  if (matches.length) {
    const intro = normalized.slice(0, matches[0].start).trim();
    if (intro) sections.Intro = intro;
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const body = normalized.slice(current.end, i + 1 < matches.length ? matches[i + 1].start : normalized.length).trim();
      if (body) {
        const key = current.label === 'Fever and Chill' ? 'Fever' : current.label;
        sections[key] = sections[key] ? sections[key] + '\n\n' + body : body;
      }
    }
    if (!sections.Intro) sections.Intro = '';
  } else {
    sections.Intro = normalized;
  }
  const allText = Object.values(sections).join(' ');
  const words = (allText.match(/\b[\w'-]+\b/g) || []).length;
  const slug = slugify(header.title);
  return {
    slug,
    title: header.title,
    content: { title: header.title, sections },
    metadata: {
      slug,
      title: header.title,
      alphabet: header.title.charAt(0).toUpperCase(),
      detected_headings: Object.keys(sections),
      word_count: words,
      character_count: allText.length,
      paragraph_count: allText.split(/\n\s*\n/).filter(Boolean).length,
      estimated_reading_time: Math.max(1, Math.ceil(words / 200)) + ' mins',
      import_date: IMPORT_DATE,
      parser_version: 'boericke-ocr-1.0',
      source_filename: SOURCE_FILENAME,
      source_url: SOURCE_URL,
      content_status: 'OCR-derived; review transcription artifacts before scholarly use'
    }
  };
}

async function main() {
  const partFiles = (await readdir(SOURCE_DIR))
    .filter(x => /^part-\d{2}\.txt$/.test(x)).sort();
  if (partFiles.length < 10) throw new Error('Boericke source text is incomplete: expected all 10 staged segments.');
  const source = (await Promise.all(partFiles.map(x => readFile(path.join(SOURCE_DIR, x), 'utf8')))).join('');
  const lines = source.replace(/^\uFEFF/, '').split(/\r?\n/);
  const materiaStart = lines.findIndex(x => x.toUpperCase().includes('ABIES CANADENSIS'));
  const repertoryStart = lines.findIndex((x,i) => i > materiaStart && x.trim().toUpperCase() === 'REPERTORY');
  if (materiaStart < 0 || repertoryStart < 0) throw new Error('Could not verify start/end of the Materia Medica section.');
  const headers = findHeaders(lines, materiaStart, repertoryStart);
  if (headers.length < 500) throw new Error('Safety stop: too few remedy headings detected; no catalogue update written.');

  const existingRegistry = await readJson(path.join(DATA_DIR, 'registry.json'), { total_remedies: 0, import_date: IMPORT_DATE, remedies: [] });
  const existingSearch = await readJson(path.join(DATA_DIR, 'search-index.json'), []);
  const existingSlugs = new Set(existingRegistry.remedies.map(x => slugify(x.slug)));
  const registryBySlug = new Map(existingRegistry.remedies.map(x => [x.slug, x]));
  const searchBySlug = new Map(existingSearch.map(x => [x.slug, x]));
  const created = [];
  const skippedExisting = [];
  const duplicateSlugs = new Set();

  for (let i = 0; i < headers.length; i++) {
    const header = headers[i];
    const end = i + 1 < headers.length ? headers[i + 1].idx : repertoryStart;
    if (end <= header.next) continue;
    const profile = buildProfile(header, lines.slice(header.next, end));
    const aliasTarget = ALIASES_TO_EXISTING.get(profile.slug);
    if (aliasTarget) profile.slug = aliasTarget;
    const existingMatch = registryBySlug.get(profile.slug) || [...registryBySlug.values()].find(x => slugify(x.slug) === profile.slug);
    if (existingMatch) {
      skippedExisting.push(profile.slug);
      const srcSearch = searchBySlug.get(existingMatch.slug);
      if (srcSearch && header.title !== existingMatch.title) {
        srcSearch.aliases = [...new Set([...(srcSearch.aliases || []), header.title])];
      }
      continue;
    }
    if (duplicateSlugs.has(profile.slug)) continue;
    duplicateSlugs.add(profile.slug);
    profile.title = profile.slug === profile.metadata.slug ? profile.title : profile.title;
    profile.content.title = profile.title;
    profile.metadata.slug = profile.slug;
    profile.metadata.title = profile.title;
    const folder = path.join(REMEDIES_DIR, profile.slug);
    const contentFile = path.join(folder, 'content.json');
    const metadataFile = path.join(folder, 'metadata.json');
    if (await exists(contentFile) && await exists(metadataFile)) {
      skippedExisting.push(profile.slug);
      registryBySlug.set(profile.slug, { slug: profile.slug, title: profile.title });
      existingSlugs.add(profile.slug);
      continue;
    }
    await saveJson(contentFile, profile.content);
    await saveJson(metadataFile, profile.metadata);
    const intro = profile.content.sections.Intro || Object.values(profile.content.sections)[0] || '';
    registryBySlug.set(profile.slug, { slug: profile.slug, title: profile.title });
    searchBySlug.set(profile.slug, {
      slug: profile.slug,
      title: profile.title,
      snippet: intro.slice(0, 520),
      keynotes: (profile.content.sections.Modalities || '').slice(0, 260),
      source: 'William Boericke, 8th edition (OCR-derived)'
    });
    created.push({ slug: profile.slug, title: profile.title, words: profile.metadata.word_count });
  }

  const registry = {
    ...existingRegistry,
    total_remedies: registryBySlug.size,
    import_date: IMPORT_DATE,
    remedies: [...registryBySlug.values()].sort((a,b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })),
    source_note: 'Expanded from the supplied OCR transcription of William Boericke, Pocket Manual of Homoeopathic Materia Medica, 8th edition (1922). Individual OCR-derived entries require editorial review.'
  };
  const searchIndex = [...searchBySlug.values()].sort((a,b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));
  await saveJson(path.join(DATA_DIR, 'registry.json'), registry);
  await saveJson(path.join(DATA_DIR, 'search-index.json'), searchIndex);
  await saveJson(path.join(DATA_DIR, 'boericke-import-manifest.json'), {
    source: SOURCE_FILENAME,
    sourceReference: SOURCE_URL,
    generatedAt: new Date().toISOString(),
    materiaMedicaStartLine: materiaStart + 1,
    repertoryStartLine: repertoryStart + 1,
    detectedHeadingCandidates: headers.length,
    newRemediesWritten: created.length,
    existingRemediesPreserved: skippedExisting.length,
    totalRegistryRemedies: registry.total_remedies,
    duplicateSlugsSuppressed: duplicateSlugs.size - created.length,
    note: 'Historical reference text extracted from OCR. This catalogue is for study/reference only, not medical advice.'
  });
  console.log(JSON.stringify({
    ok: true,
    headingCandidates: headers.length,
    newRemediesWritten: created.length,
    preservedExisting: skippedExisting.length,
    totalRegistryRemedies: registry.total_remedies,
    duplicateSearchSlugs: searchIndex.length - new Set(searchIndex.map(x => x.slug)).size,
    sampleNewEntries: created.slice(0, 8)
  }, null, 2));
}
main().catch(error => {
  console.error('Boericke OCR import stopped safely:', error.message);
  process.exitCode = 1;
});
