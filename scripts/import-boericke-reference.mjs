#!/usr/bin/env node
/**
 * Importer for the historical Boericke reference indexes.
 *
 * Sources:
 *  - William Boericke, Homoeopathic Materia Medica:
 *    https://www.homeoint.org/books/boericmm/index.htm
 *  - Oscar E. Boericke, Repertory:
 *    https://www.homeoint.org/books4/boerirep/index.htm
 *
 * Run: npm run import:boericke
 *
 * This intentionally preserves the source hierarchy and URLs. It merges
 * existing entries by normalized stable key, keeping existing curated fields.
 * It does not invent missing source content or treat the generated index as
 * clinical advice. Network access to homeoint.org is required.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'boericke');
const MM_ROOT = 'https://www.homeoint.org/books/boericmm/';
const REP_ROOT = 'https://www.homeoint.org/books4/boerirep/';

function decodeHtml(value = '') {
  return value
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&').replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'").replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/[\u00a0\t\r]+/g, ' ').replace(/\s+/g, ' ').trim();
}
function plainText(html = '') {
  return decodeHtml(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n').replace(/<\/(?:p|div|li|h[1-6]|tr|td|blockquote)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')).split('\n').map(x => x.trim()).filter(Boolean).join('\n');
}
function anchors(html, baseUrl) {
  const found = [];
  for (const match of html.matchAll(/<a\b([^>]*)href\s*=\s*["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const label = plainText(match[4]).replace(/\s+/g, ' ').trim();
    if (!label) continue;
    try {
      const url = new URL(match[2], baseUrl);
      if (url.hostname !== 'www.homeoint.org' && url.hostname !== 'homeoint.org') continue;
      if (!/\.htm(?:l)?$/i.test(url.pathname)) continue;
      found.push({ label, url: url.href });
    } catch { /* Ignore malformed external links. */ }
  }
  return found;
}
async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: { 'user-agent': 'CurivaHomoeopathy-reference-index-import/1.0 (historical bibliography import)' },
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error(`Fetch failed (${response.status}) for ${url}`);
  return response.text();
}
function key(value) {
  return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
async function readExisting(filename) {
  try { return JSON.parse(await readFile(path.join(OUT, filename), 'utf8')); }
  catch (error) { if (error.code === 'ENOENT') return []; throw error; }
}
function mergeByKey(existing, incoming, getKey) {
  const map = new Map(existing.map(item => [getKey(item), item]));
  for (const item of incoming) {
    const k = getKey(item);
    if (!map.has(k)) map.set(k, item);
    else {
      const old = map.get(k);
      // Keep existing manually curated fields; only fill blank fields from source.
      for (const [field, value] of Object.entries(item)) {
        if (old[field] == null || old[field] === '' || (Array.isArray(old[field]) && old[field].length === 0)) old[field] = value;
      }
    }
  }
  return [...map.values()];
}
async function saveJson(name, data) {
  await writeFile(path.join(OUT, name), JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function importMateriaMedica() {
  const indexUrl = MM_ROOT + 'index.htm';
  const indexHtml = await fetchHtml(indexUrl);
  const indexLinks = anchors(indexHtml, indexUrl);
  const letterPages = [...new Set(indexLinks.filter(x => /^[a-z]\.htm$/i.test(new URL(x.url).pathname.split('/').pop())).map(x => x.url))];
  const pages = letterPages.length ? letterPages : Array.from('abcdefghijklmnopqrstuvwxyz', letter => MM_ROOT + letter + '.htm');
  const remedies = [];
  for (const pageUrl of pages) {
    const html = await fetchHtml(pageUrl);
    const pageLinks = anchors(html, pageUrl);
    const pageLetter = new URL(pageUrl).pathname.split('/').pop().replace(/\.htm$/i, '').toUpperCase();
    for (const link of pageLinks) {
      if (!link.url.startsWith(MM_ROOT) || /index\.htm$/i.test(link.url)) continue;
      const slug = new URL(link.url).pathname.split('/').pop().replace(/\.htm(?:l)?$/i, '');
      if (!slug || /^[a-z]$/i.test(slug) || /^(?:index|main|preface|remedies|repertory)$/i.test(slug)) continue;
      const label = link.label.replace(/\s*[-–—]+>.*$/, '').trim();
      if (!label || label.length > 100) continue;
      remedies.push({
        id: key(slug || label),
        abbreviation: label.toUpperCase(),
        name: label,
        letter: pageLetter,
        sourceUrl: link.url,
        source: 'William Boericke, Homoeopathic Materia Medica',
      });
    }
  }
  const unique = mergeByKey([], remedies, x => x.id);
  if (unique.length < 100) throw new Error(`Safety stop: only ${unique.length} remedy links were discovered; expected a substantially larger index. No output written.`);
  const existing = await readExisting('materia-medica-index.json');
  const merged = mergeByKey(existing, unique, x => key(x.id || x.name));
  await saveJson('materia-medica-index.json', merged);
  return { discovered: unique.length, totalAfterMerge: merged.length, pages: pages.length };
}

const REP_SECTIONS = [
  'mind','head','eyes','ears','nose','face','mouth','tongue','taste','gums','teeth',
  'throat','stomach','abdomen','urinary','male','female','circulatory','locomotor',
  'respiratory','skin','fever','nervous','generalities','modalities',
];
async function importRepertory() {
  const indexUrl = REP_ROOT + 'index.htm';
  const html = await fetchHtml(indexUrl);
  const links = anchors(html, indexUrl);
  const sectionLinks = links.filter(link => {
    const slug = new URL(link.url).pathname.split('/').pop().replace(/\.htm(?:l)?$/i, '').toLowerCase();
    return REP_SECTIONS.some(prefix => slug === prefix || slug.startsWith(prefix + '-'));
  });
  const uniqueSections = [...new Map(sectionLinks.map(x => [x.url, x])).values()];
  if (uniqueSections.length < 15) throw new Error(`Safety stop: only ${uniqueSections.length} repertory sections were discovered; no output written.`);
  const existing = await readExisting('repertory-index.json');
  const sections = [];
  for (const sectionLink of uniqueSections) {
    const sectionHtml = await fetchHtml(sectionLink.url);
    const sectionName = sectionLink.label.replace(/\s+/g, ' ').trim();
    const subsectionLinks = anchors(sectionHtml, sectionLink.url).filter(link => {
      const url = new URL(link.url);
      return url.pathname.startsWith(new URL(REP_ROOT).pathname) &&
        url.pathname !== new URL(sectionLink.url).pathname &&
        !/index\.htm$/i.test(url.pathname);
    });
    const headings = [];
    // Source markup varies between pages. Preserve visible source lines as well as
    // anchor hierarchy; never fabricate missing rubric/remedy associations.
    const lines = plainText(sectionHtml).split('\n').map(x => x.trim()).filter(Boolean);
    const knownSubsections = new Set(subsectionLinks.map(x => x.label.toLowerCase()));
    for (const line of lines) {
      if (line.length > 160 || line.length < 2) continue;
      if (knownSubsections.has(line.toLowerCase()) || /^[A-Z][A-Z\s,()'/-]{1,90}$/.test(line)) {
        headings.push({ id: key(line), title: line, children: [] });
      }
    }
    sections.push({
      id: key(sectionName),
      title: sectionName,
      sourceUrl: sectionLink.url,
      source: 'Oscar E. Boericke, Repertory',
      subsections: subsectionLinks.map(x => ({ id: key(x.label), title: x.label, sourceUrl: x.url })),
      headings: [...new Map(headings.map(x => [x.id, x])).values()],
      sourceLines: lines,
    });
  }
  const merged = mergeByKey(existing, sections, x => key(x.id || x.title));
  await saveJson('repertory-index.json', merged);
  return { discovered: sections.length, totalAfterMerge: merged.length };
}

await mkdir(OUT, { recursive: true });
const started = new Date().toISOString();
try {
  const materia = await importMateriaMedica();
  const repertory = await importRepertory();
  await saveJson('import-manifest.json', {
    generatedAt: started,
    sources: [
      { title: 'Homoeopathic Materia Medica, William Boericke', url: MM_ROOT + 'index.htm' },
      { title: 'Repertory, Oscar E. Boericke', url: REP_ROOT + 'index.htm' },
    ],
    materia,
    repertory,
    note: 'Source-derived indexes and headings. Verify every entry against the original source; this manifest is not a medical recommendation.',
  });
  console.log(JSON.stringify({ ok: true, materia, repertory }, null, 2));
} catch (error) {
  console.error('Boericke import stopped safely:', error.message);
  process.exitCode = 1;
}
