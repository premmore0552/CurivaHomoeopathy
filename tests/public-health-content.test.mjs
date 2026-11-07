import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const ebooks = read('../src/data/ebooksData.ts');
const publicEducation = read('../src/pages/PublicEducation.tsx');
const privacyPolicy = read('../src/pages/PrivacyPolicy.tsx');
const splash = read('../index.html');
const manifest = JSON.parse(read('../public/manifest.json'));
const home = read('../src/pages/Home.tsx');
const homeHero = read('../src/components/home/HighImpactHero.tsx');
const app = read('../src/App.tsx');

const expandedGuides = [
  'understanding-stroke-guide',
  'pCOS-and-women-menstrual-health',
  'childhood-fever-guide',
  'asthma-and-allergy-survival-guide',
  'acidity-and-gerd-handbook',
  'arthritis-and-joint-care-guide',
  'stress-and-anxiety-self-help'
];

function getBookBlock(id) {
  const marker = 'id: "' + id + '",';
  const start = ebooks.indexOf(marker);
  assert.notEqual(start, -1, 'ebook must exist: ' + id);
  const next = ebooks.indexOf('\n  {\n    id: "', start + marker.length);
  return ebooks.slice(start, next === -1 ? ebooks.length : next);
}

test('all expanded public-health guides have substantial chapter structures and sources', () => {
  for (const id of expandedGuides) {
    const block = getBookBlock(id);
    const chapterCount = (block.match(/^\s{8}id: "/gm) || []).length;
    assert.ok(chapterCount >= 8, id + ' should retain its eight-section public guide');
    assert.match(block, /Sources & Further Reading/, id + ' must retain a source chapter');
    assert.match(block, /https?:\/\//, id + ' must link to external public-health sources');
  }
});

test('public education distinguishes traditional homoeopathy from evidence-based care', () => {
  assert.match(publicEducation, /Evidence note/);
  assert.match(publicEducation, /not treatment recommendations/);
  assert.match(publicEducation, /Good-quality evidence has not shown reliable benefit/);
  assert.doesNotMatch(publicEducation, /maximize the healing properties|safe and non-toxic because/i);
});

test('ebook reading progress is disclosed as device-local', () => {
  assert.match(privacyPolicy, /Public Health eBook bookmarks/);
  assert.match(privacyPolicy, /does not upload that reading history/);
});

test('latest Curiva mark is used in boot, app loaders and PWA manifest', () => {
  assert.match(splash, /src="\/app_icon\.png\.png"/);
  assert.match(app, /src="\/app_icon\.png\.png"/);
  assert.ok(manifest.icons.every((icon) => icon.src === '/app_icon.png.png' && icon.type === 'image/jpeg'));
  assert.match(splash, /prefers-reduced-motion/);
});

test('homepage intro is after the study content and has no fixed desktop canvas', () => {
  assert.ok(home.lastIndexOf('<HighImpactHero />') > home.lastIndexOf('<StudyQuickReferenceModal'));
  assert.doesNotMatch(homeHero, /width:\s*'1200px'|height:\s*'700px'/);
  assert.match(homeHero, /w-full overflow-hidden/);
});
