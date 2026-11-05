#!/usr/bin/env node
/**
 * Build the William Boericke 8th-edition Materia Medica dataset from the
 * supplied OCR transcription staged in scripts/boericke-source/part-*.txt.
 * Existing curated remedy content is never overwritten. Source aliases are
 * merged into registry/search metadata; partial writes are recovered safely.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_DIR = path.join(ROOT, 'scripts', 'boericke-source');
const DATA_DIR = path.join(ROOT, 'public', 'data', 'materia-medica');
const REMEDIES_DIR = path.join(DATA_DIR, 'remedies');
const SOURCE_FILENAME = '2015.125811.Pocket-Manual-Of-Homoeopathic-Materia-Medica-Ed8th_text (1).txt';
const SOURCE_URL = 'https://www.homeoint.org/books/boericmm/index.htm';
const PARSER_VERSION = 'boericke-ocr-1.1';

const slugify = value => value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const titleCase = value => value.toLowerCase().replace(/\b([a-z])/g, c => c.toUpperCase())
  .replace(/\bX-ray\b/gi, 'X-Ray');
const uniqueStrings = values => [...new Set(values.map(x => String(x || '').trim()).filter(Boolean))];

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

const HEADING_CORRECTIONS = new Map([
  ['2INGIBER', 'Zingiber'],
  ['APOCYNUM ANDROSAE MIFOLIUM', 'Apocynum Androsaemifolium'],
  ['BLATTA URIENTALIS', 'Blatta Orientalis'],
  ['CALAREA ACETICA', 'Calcarea Acetica'],
  ['CALAREA ARSENICA', 'Calcarea Arsenica'],
  ['CALAREA CARBONICA—OSTREARUM', 'Calcarea Carbonica'],
  ['CALAREA FLUORICA', 'Calcarea Fluorica'],
  ['CALAREA PHOSPHORICA', 'Calcarea Phosphorica'],
  ['CALAREA SILICATA', 'Calcarea Silicata'],
  ['CALAREA SULPHURICA', 'Calcarea Sulphurica'],
  ['CALTHA PAIJJRTRLS', 'Caltha Palustris'],
  ['CINCHONA OFF-ICINALIS', 'Cinchona Officinalis'],
  ['CROCTTS SATTVA', 'Crocus Sativa'],
  ['EUONYMUS AXROPURPUREA', 'Euonymus Atropurpurea'],
  ['KALMIA LATTFOLIA', 'Kalmia Latifolia'],
  ['PLUMBUM MBTALLICUM', 'Plumbum Metallicum'],
  ['PTNUS SYLVESTRIS', 'Pinus Sylvestris'],
  ['RUMBX CRISPUS', 'Rumex Crispus'],
  ['TEUCFIUM MARUM', 'Teucrium Marum'],
  ['TONOO', 'Tongo'],
  ['TUBERCUUNUM', 'Tuberculinum']
]);

const SPLIT_HEADING_FRAGMENTS = new Map([
  ['OFFICINALE', { title: 'Boletus Laricis', alias: 'Polyporus Officinale' }],
  ['LANCIOLATUS', { title: 'Bothrops Lanciolatus', alias: 'Lachesis Lanciolatus' }],
  ['MOSA)', { title: 'Cimicifuga Racemosa', alias: 'Actaea Racemosa' }],
  ['RUBER', { title: 'Cinnabaris', alias: 'Mercurius Sulphuratus Ruber' }],
  ['SCOPARIUS', { title: 'Spartium Scoparium', alias: 'Cystisus Scoparius' }],
  ['LYCOPERSICUM ESCULENTUM', { title: 'Solanum Lycopersicum', alias: 'Lycopersicum Esculentum' }]
]);

const SOURCE_TO_EXISTING_SLUG = new Map([
  ['alnus', 'alnus-serrulata'],
  ['aloe', 'aloe-socotrina'],
  ['alstonia', 'alstonia-scholaris'],
  ['ambrosia', 'ambrosia-artemisiaefolia'],
  ['ammoniacum', 'ammoniacum-gummi'],
  ['ammonium-carb', 'ammonium-carbonicum'],
  ['amyl-nitrosum', 'amyl-nitrite'],
  ['anacardium', 'anacardium-orientale'],
  ['anagallis', 'anagallis-arvensis']
]);

const SECTION_NAMES = [
  'Non-Homoeopathic Uses', 'Female Sexual Organs', 'Male Sexual Organs',
  'Back and Extremities', 'Stomach and Abdomen', 'Urinary Organs',
  'Fever and Chill', 'Food and Drinks', 'Clinical Uses', 'Nervous System',
  'Heart and Pulse', 'Relationship', 'Complementary', 'Expectoration',
  'Perspiration', 'Modalities', 'Aggravation', 'Antidotes', 'Comparison',
  'Clinical', 'Proving', 'Generalities', 'Mental', 'Intro', 'Mind', 'Head',
  'Eyes', 'Ears', 'Nose', 'Face', 'Mouth', 'Teeth', 'Tongue', 'Throat',
  'Stomach', 'Abdomen', 'Rectum', 'Bowels', 'Urine', 'Urinary', 'Male',
  'Female', 'Respiratory', 'Chest', 'Heart', 'Circulation', 'Neck', 'Back',
  'Extremities', 'Limbs', 'Joints', 'Sleep', 'Dreams', 'Skin', 'Fever',
  'Chill', 'Nerves', 'Larynx', 'Cough', 'Appetite', 'Stool', 'Bladder',
  'Kidneys', 'Genitalia', 'Glands', 'Bones', 'Muscles', 'Tissue',
  'Temperature', 'Touch', 'Pressure', 'Side', 'Position', 'Time', 'Food',
  'General', 'Relations', 'Pulse', 'Voice', 'Lungs', 'Taste', 'Vision',
  'Nails', 'Dose'
].sort((a, b) => b.length - a.length);
const escapeRegex = value => value.replace(/[.*+?^$()|[\]\\]/g, '\\$&');
const SECTION_RE = new RegExp(
  '(^|\\n\\n)(' + uniqueStrings(SECTION_NAMES).map(escapeRegex).join('|') +
  ')\\s*(?:[.:·]\\s*)?[—–-]\\s*',
  'gim'
);

function getMatterMedicaBounds(lines) {
  const start = lines.findIndex(line => /ABIES CANADENSIS/i.test(line));
  const end = lines.findIndex((line, index) => index > start && line.trim().toUpperCase() === 'REPERTORY');
  if (start < 0 || end < 0 || end <= start) {
    throw new Error('Could not verify Materia Medica start and Repertory boundary in source text.');
  }
  return { start, end };
}

function titleAndAliasesForHeader(rawHeader, fragment) {
  if (fragment) {
    return { title: fragment.title, aliases: [fragment.alias], correction: 'split-heading-fragment' };
  }

  const rawUpper = rawHeader.toUpperCase().trim();
  const correction = HEADING_CORRECTIONS.get(rawUpper);
  if (correction) return { title: correction, aliases: [], correction: 'ocr-heading-correction' };

  let primary = rawHeader.replace(/\*+$/g, '').trim();
  let aliasText = '';
  if (/OXYDENDRON-\*ANDROMEDA ARBOREA/i.test(primary)) {
    primary = 'OXYDENDRON';
    aliasText = 'ANDROMEDA ARBOREA';
  } else {
    const parts = primary.split(/[—–]/);
    primary = parts.shift() || primary;
    aliasText = parts.join(' ').replace(/^\s*[-–—]+\s*/, '').trim();
  }
  primary = primary.replace(/[.·]+$/g, '').replace(/\s*[-–]+\s*$/g, '').trim();

  const aliases = [];
  if (aliasText) {
    const cleanedAlias = aliasText.replace(/[()[\]]/g, ' ').replace(/\s+/g, ' ').trim();
    if (cleanedAlias && cleanedAlias.length <= 90) aliases.push(titleCase(cleanedAlias));
  }
  return { title: titleCase(primary), aliases, correction: null };
}

function collectRemedyHeaders(lines, bounds) {
  const headers = [];
  const excluded = [];
  const upperHeading = /^[A-Z0-9][A-Z0-9 ,.;()\[\]\/—–\-:&'*]+$/;
  let rawHeadingCandidates = 0;

  for (let index = bounds.start; index < bounds.end; index++) {
    const raw = lines[index].trim();
    if (!raw || raw.length > 130 || !upperHeading.test(raw) || !/[A-Z]/.test(raw)) continue;
    if (/^\d{1,4}\s/.test(raw)) continue;

    let next = index + 1;
    while (next < bounds.end && !lines[next].trim()) next++;
    if (next >= bounds.end) continue;
    const following = lines[next].trim();
    if (!(following.startsWith('(') || following.startsWith('—') ||
      following.startsWith('-') || following.startsWith('['))) continue;

    rawHeadingCandidates++;
    if (/^SILICEA[—– -].*\b\d{2,4}$/.test(raw)) {
      excluded.push({ line: index + 1, heading: raw, reason: 'running-page-header-not-remedy' });
      continue;
    }

    const fragment = SPLIT_HEADING_FRAGMENTS.get(raw.toUpperCase());
    let headerIndex = index;
    let headingLines = [raw];
    if (fragment) {
      let previous = index - 1;
      while (previous > bounds.start && !lines[previous].trim()) previous--;
      if (previous <= bounds.start) {
        throw new Error('Could not reconstruct split heading at source line ' + (index + 1));
      }
      headerIndex = previous;
      headingLines = [lines[previous].trim(), raw];
    }

    const parsed = titleAndAliasesForHeader(headingLines.join(' '), fragment);
    const commonNameMatch = following.match(/^\(([^)]{2,90})\)/);
    const commonName = commonNameMatch ? commonNameMatch[1].replace(/\s+/g, ' ').trim() : '';
    const aliases = uniqueStrings([...parsed.aliases, commonName]);
    headers.push({
      lineStart: headerIndex + 1,
      bodyStart: next,
      sourceHeading: headingLines.join(' ').replace(/\s+/g, ' ').trim(),
      rawHeading: raw,
      title: parsed.title,
      slug: slugify(parsed.title),
      aliases,
      headingCorrection: parsed.correction,
      commonName
    });
  }

  headers.sort((a, b) => a.lineStart - b.lineStart);
  const uniqueHeaders = [];
  for (const header of headers) {
    if (uniqueHeaders.length && header.lineStart === uniqueHeaders[uniqueHeaders.length - 1].lineStart) {
      const prior = uniqueHeaders[uniqueHeaders.length - 1];
      prior.aliases = uniqueStrings([...prior.aliases, ...header.aliases]);
      continue;
    }
    uniqueHeaders.push(header);
  }
  return { headers: uniqueHeaders, rawHeadingCandidates, excluded };
}

export function splitRemedySections(bodyLines) {
  const rawBody = bodyLines.join('\n')
    .replace(/\f/g, '\n')
    .replace(/\r/g, '')
    .replace(/\u00ad/g, '')
    .replace(/([A-Za-z])[-–]\s*\n\s*([a-z])/g, '$1$2');

  const paragraphs = rawBody.split(/\n\s*\n+/)
    .map(paragraph => paragraph.split('\n').map(line => line.trim()).filter(Boolean).join(' '))
    .filter(Boolean);
  const normalized = paragraphs.join('\n\n').replace(/[ \t]{2,}/g, ' ').trim();

  const matches = [];
  SECTION_RE.lastIndex = 0;
  let match;
  while ((match = SECTION_RE.exec(normalized)) !== null) {
    matches.push({
      start: match.index + match[1].length,
      end: SECTION_RE.lastIndex,
      label: match[2].replace(/\s+/g, ' ').trim()
    });
  }

  const sections = {};
  if (matches.length) {
    const intro = normalized.slice(0, matches[0].start).trim();
    if (intro) sections.Intro = intro;
    for (let index = 0; index < matches.length; index++) {
      const current = matches[index];
      const text = normalized.slice(
        current.end,
        index + 1 < matches.length ? matches[index + 1].start : normalized.length
      ).trim();
      if (text) sections[current.label] = sections[current.label]
        ? sections[current.label] + '\n\n' + text : text;
    }
    if (!sections.Intro) sections.Intro = '';
  } else {
    sections.Intro = normalized;
  }
  return sections;
}

export function parseMateriaMedicaText(sourceText) {
  const lines = sourceText.replace(/^\uFEFF/, '').split(/\r?\n/);
  const bounds = getMatterMedicaBounds(lines);
  const result = collectRemedyHeaders(lines, bounds);
  const entries = [];

  for (let index = 0; index < result.headers.length; index++) {
    const header = result.headers[index];
    const nextHeader = result.headers[index + 1];
    const end = nextHeader ? nextHeader.lineStart - 1 : bounds.end;
    const bodyLines = lines.slice(header.bodyStart, end);
    const sections = splitRemedySections(bodyLines);
    const allText = Object.values(sections).join(' ');
    const wordCount = (allText.match(/\b[\w'-]+\b/g) || []).length;
    if (!header.slug || !header.title || wordCount < 10 || !allText.trim()) {
      throw new Error('Incomplete source profile detected for "' + header.title + '" at line ' + header.lineStart);
    }
    const sourceLineEnd = Math.max(header.lineStart, end);
    const metadata = {
      slug: header.slug,
      title: header.title,
      alphabet: header.title.charAt(0).toUpperCase(),
      detected_headings: Object.keys(sections),
      word_count: wordCount,
      character_count: allText.length,
      paragraph_count: allText.split(/\n\s*\n/).filter(Boolean).length,
      estimated_reading_time: Math.max(1, Math.ceil(wordCount / 200)) + ' mins',
      import_date: new Date().toISOString().slice(0, 10),
      parser_version: PARSER_VERSION,
      source: 'William Boericke, Pocket Manual of Homoeopathic Materia Medica',
      edition: '8th edition (1922)',
      source_filename: SOURCE_FILENAME,
      source_url: SOURCE_URL,
      source_heading: header.sourceHeading,
      source_line_start: header.lineStart,
      source_line_end: sourceLineEnd,
      commonName: header.commonName,
      aliases: header.aliases,
      content_status: 'ocr-derived-needs-editorial-review',
      review_required: true,
      heading_review_required: Boolean(header.headingCorrection),
      heading_correction: header.headingCorrection || undefined
    };
    entries.push({
      slug: header.slug,
      title: header.title,
      aliases: header.aliases,
      content: { title: header.title, sections },
      metadata
    });
  }

  const slugCounts = new Map();
  for (const entry of entries) slugCounts.set(entry.slug, (slugCounts.get(entry.slug) || 0) + 1);
  const duplicateSlugs = [...slugCounts.entries()].filter(([, count]) => count > 1).map(([slug]) => slug);
  if (duplicateSlugs.length) throw new Error('Duplicate source remedy slugs detected: ' + duplicateSlugs.join(', '));

  return {
    lines,
    bounds,
    entries,
    rawHeadingCandidates: result.rawHeadingCandidates,
    excludedHeadingCandidates: result.excluded,
    sourceMateriaMedicaLines: bounds.end - bounds.start,
    sourceMateriaMedicaHash: createHash('sha256').update(lines.slice(bounds.start, bounds.end).join('\n')).digest('hex')
  };
}

function mergeAliases(previous, incoming) {
  return uniqueStrings([...(previous || []), ...(incoming || [])]);
}

function makeSearchRecord(slug, title, content, aliases, previous) {
  const intro = content.sections?.Intro || Object.values(content.sections || {})[0] || '';
  const modalities = content.sections?.Modalities || '';
  return {
    ...(previous || {}),
    slug,
    title,
    snippet: previous?.snippet || intro.slice(0, 520),
    keynotes: previous?.keynotes || modalities.slice(0, 260),
    aliases: mergeAliases(previous?.aliases, aliases),
    source: previous?.source || 'William Boericke, 8th edition (OCR-derived)'
  };
}

async function main() {
  const partFiles = (await readdir(SOURCE_DIR))
    .filter(name => /^part-\d{2}\.txt$/.test(name))
    .sort();
  const expectedFiles = Array.from({ length: 10 }, (_, index) =>
    'part-' + String(index + 1).padStart(2, '0') + '.txt'
  );
  if (expectedFiles.some((name, index) => partFiles[index] !== name) || partFiles.length !== expectedFiles.length) {
    throw new Error('Boericke source is incomplete; expected exactly part-01.txt through part-10.txt.');
  }

  const sourceText = (await Promise.all(partFiles.map(name =>
    readFile(path.join(SOURCE_DIR, name), 'utf8')
  ))).join('\n');
  const parsed = parseMateriaMedicaText(sourceText);
  if (parsed.rawHeadingCandidates !== 639 || parsed.entries.length !== 638) {
    throw new Error(
      'Source reconciliation stop: expected 639 heading candidates and 638 remedy entries; found ' +
      parsed.rawHeadingCandidates + ' candidates and ' + parsed.entries.length + ' entries.'
    );
  }

  const existingRegistry = await readJson(
    path.join(DATA_DIR, 'registry.json'),
    { total_remedies: 0, import_date: new Date().toISOString().slice(0, 10), remedies: [] }
  );
  const existingSearch = await readJson(path.join(DATA_DIR, 'search-index.json'), []);
  if (!Array.isArray(existingRegistry.remedies) || !Array.isArray(existingSearch)) {
    throw new Error('Existing Materia Medica registry or search index has an invalid shape.');
  }

  const registryBySlug = new Map();
  for (const item of existingRegistry.remedies) {
    if (!item?.slug || !item?.title) throw new Error('Invalid entry in existing Materia Medica registry.');
    if (registryBySlug.has(item.slug)) throw new Error('Duplicate existing registry slug: ' + item.slug);
    registryBySlug.set(item.slug, item);
  }
  const searchBySlug = new Map();
  for (const item of existingSearch) {
    if (!item?.slug || !item?.title) throw new Error('Invalid entry in existing Materia Medica search index.');
    if (searchBySlug.has(item.slug)) throw new Error('Duplicate existing search-index slug: ' + item.slug);
    searchBySlug.set(item.slug, item);
  }

  const created = [];
  const matchedExisting = [];
  const recoveredExisting = [];
  const correctedHeadings = [];
  const aliasMerges = [];
  const plannedWrites = [];

  for (const profile of parsed.entries) {
    if (profile.metadata.heading_review_required) {
      correctedHeadings.push({
        line: profile.metadata.source_line_start,
        sourceHeading: profile.metadata.source_heading,
        title: profile.title,
        correction: profile.metadata.heading_correction
      });
    }

    const targetSlug = SOURCE_TO_EXISTING_SLUG.get(profile.slug) || profile.slug;
    const existing = registryBySlug.get(targetSlug);
    if (existing) {
      const merged = mergeAliases(existing.aliases, [
        ...profile.aliases,
        profile.slug !== targetSlug ? profile.title : ''
      ]);
      if (merged.length) registryBySlug.set(targetSlug, { ...existing, aliases: merged });
      const oldSearch = searchBySlug.get(targetSlug);
      const contentFile = path.join(REMEDIES_DIR, targetSlug, 'content.json');
      const contentData = await readJson(contentFile, null);
      if (!oldSearch && !contentData) {
        throw new Error('Existing remedy "' + targetSlug + '" lacks both search metadata and content.json.');
      }
      searchBySlug.set(targetSlug, makeSearchRecord(
        targetSlug, existing.title, contentData || { sections: {} }, merged, oldSearch
      ));
      matchedExisting.push({ sourceTitle: profile.title, existingTitle: existing.title, slug: targetSlug });
      if (merged.length !== (existing.aliases || []).length) aliasMerges.push({ slug: targetSlug, aliases: merged });
      continue;
    }

    const folder = path.join(REMEDIES_DIR, profile.slug);
    const contentFile = path.join(folder, 'content.json');
    const metadataFile = path.join(folder, 'metadata.json');
    const hasContent = await exists(contentFile);
    const hasMetadata = await exists(metadataFile);
    if (hasContent !== hasMetadata) {
      throw new Error('Partial/orphaned remedy files for "' + profile.slug + '"; refusing to overwrite.');
    }
    if (hasContent && hasMetadata) {
      const [contentData, metadataData] = await Promise.all([
        readJson(contentFile, null), readJson(metadataFile, null)
      ]);
      if (!contentData?.sections || !metadataData?.slug) {
        throw new Error('Existing remedy files are invalid for "' + profile.slug + '".');
      }
      registryBySlug.set(profile.slug, {
        slug: profile.slug, title: contentData.title || profile.title, aliases: profile.aliases
      });
      searchBySlug.set(profile.slug, makeSearchRecord(
        profile.slug, contentData.title || profile.title, contentData, profile.aliases, searchBySlug.get(profile.slug)
      ));
      recoveredExisting.push(profile.slug);
      continue;
    }

    plannedWrites.push(profile);
    registryBySlug.set(profile.slug, { slug: profile.slug, title: profile.title, aliases: profile.aliases });
    searchBySlug.set(profile.slug, makeSearchRecord(profile.slug, profile.title, profile.content, profile.aliases, null));
    created.push({ slug: profile.slug, title: profile.title, words: profile.metadata.word_count });
  }

  // Recover any registry entries whose search records were absent without rewriting content.
  for (const [slug, item] of registryBySlug) {
    if (searchBySlug.has(slug)) continue;
    const contentData = await readJson(path.join(REMEDIES_DIR, slug, 'content.json'), null);
    if (!contentData?.sections) throw new Error('Registry remedy "' + slug + '" has no content/search record.');
    searchBySlug.set(slug, makeSearchRecord(slug, item.title, contentData, item.aliases, null));
  }

  const registry = {
    ...existingRegistry,
    total_remedies: registryBySlug.size,
    import_date: new Date().toISOString().slice(0, 10),
    remedies: [...registryBySlug.values()].sort((a, b) =>
      a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
    ),
    source_note: 'William Boericke, Pocket Manual of Homoeopathic Materia Medica, 8th edition (1922). New source profiles are OCR-derived and require editorial review.'
  };
  const searchIndex = [...searchBySlug.values()].sort((a, b) =>
    a.title.localeCompare(b.title, 'en', { sensitivity: 'base' })
  );

  const registrySlugs = registry.remedies.map(item => item.slug);
  const searchSlugs = searchIndex.map(item => item.slug);
  if (new Set(registrySlugs).size !== registrySlugs.length) throw new Error('Duplicate registry slugs after merge.');
  if (new Set(searchSlugs).size !== searchSlugs.length) throw new Error('Duplicate search-index slugs after merge.');
  if (registrySlugs.length !== searchSlugs.length ||
      registrySlugs.some(slug => !searchBySlug.has(slug))) {
    throw new Error('Registry and search index do not have a one-to-one slug mapping.');
  }
  if (created.length + matchedExisting.length + recoveredExisting.length !== parsed.entries.length) {
    throw new Error('Import reconciliation failed; not every source entry was classified exactly once.');
  }

  // Validate all data before writing; do not touch pre-existing content files.
  for (const profile of plannedWrites) {
    if (!Object.values(profile.content.sections).some(Boolean)) {
      throw new Error('Refusing to write an empty profile: ' + profile.slug);
    }
  }
  await Promise.all(plannedWrites.map(async profile => {
    const folder = path.join(REMEDIES_DIR, profile.slug);
    await saveJson(path.join(folder, 'content.json'), profile.content);
    await saveJson(path.join(folder, 'metadata.json'), profile.metadata);
  }));

  await saveJson(path.join(DATA_DIR, 'registry.json'), registry);
  await saveJson(path.join(DATA_DIR, 'search-index.json'), searchIndex);
  const manifest = {
    generated_at: new Date().toISOString(),
    parser_version: PARSER_VERSION,
    source_filename: SOURCE_FILENAME,
    source_reference: SOURCE_URL,
    source_sha256_materia_medica_section: parsed.sourceMateriaMedicaHash,
    source_materia_medica_lines: parsed.sourceMateriaMedicaLines,
    raw_heading_candidates: parsed.rawHeadingCandidates,
    excluded_heading_candidates: parsed.excludedHeadingCandidates,
    source_remedy_entries: parsed.entries.length,
    newly_created_profiles: created.length,
    matched_existing_profiles: matchedExisting.length,
    recovered_preexisting_profiles: recoveredExisting.length,
    total_registry_remedies: registry.total_remedies,
    search_index_remedies: searchIndex.length,
    duplicate_registry_slugs: 0,
    duplicate_search_slugs: 0,
    profiles_missing_from_search_index: 0,
    dose_sections_found: parsed.entries.filter(entry => entry.content.sections.Dose).length,
    heading_corrections: correctedHeadings,
    alias_merges: aliasMerges,
    short_profiles_below_50_words: parsed.entries.filter(entry => entry.metadata.word_count < 50)
      .map(entry => ({ slug: entry.slug, title: entry.title, words: entry.metadata.word_count })),
    note: 'New remedy profiles are OCR-derived historical reference text and must be proofread against the printed edition. This material is not medical advice.'
  };
  await saveJson(path.join(DATA_DIR, 'boericke-import-manifest.json'), manifest);

  console.log(JSON.stringify({
    ok: true,
    rawHeadingCandidates: parsed.rawHeadingCandidates,
    excludedHeadingCandidates: parsed.excludedHeadingCandidates.length,
    sourceRemedyEntries: parsed.entries.length,
    newlyCreatedProfiles: created.length,
    matchedExistingProfiles: matchedExisting.length,
    recoveredPreexistingProfiles: recoveredExisting.length,
    totalRegistryRemedies: registry.total_remedies,
    searchIndexRemedies: searchIndex.length,
    duplicateSearchSlugs: 0,
    doseSectionsFound: manifest.dose_sections_found,
    correctedHeadingCount: correctedHeadings.length,
    shortProfilesBelow50Words: manifest.short_profiles_below_50_words.length
  }, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => {
    console.error('Boericke OCR import stopped safely:', error.message);
    process.exitCode = 1;
  });
}
