import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (file) => readFileSync(new URL(file, import.meta.url), 'utf8');
const questionPage = read('../src/components/UPSCMDQuestionPractice.tsx');
const questionLoader = read('../src/data/chauhanQuestionBankLoader.ts');
const diseaseAssets = read('../src/data/diseaseHubAssets.ts');
const diseaseGenerator = read('../scripts/generate-disease-hub-assets.ts');
const diseasePages = [
  '../src/pages/DiseaseHub.tsx',
  '../src/pages/DiseaseDirectory.tsx',
  '../src/pages/DiseaseCategoryPage.tsx',
  '../src/pages/DiseasePage.tsx',
  '../src/components/disease-hub/DiseaseSearch.tsx',
  '../src/components/disease-hub/DiseaseCard.tsx',
  '../src/components/disease-hub/DiseaseList.tsx',
  '../src/components/disease-page/DiseaseHero.tsx',
  '../src/components/disease-page/AtAGlance.tsx',
  '../src/components/disease-page/DiseaseSections.tsx',
  '../src/components/disease-page/DiseaseHomoeopathy.tsx',
].map(read);

test('UPSC question JSON is split into eleven deferred import chunks', () => {
  const imports = [...questionLoader.matchAll(/import\('\.\/chauhan-question-bank\/part-\d{2}\.json'\)/g)];
  assert.equal(imports.length, 11);
  assert.match(questionLoader, /Promise\.all\(/);
  assert.match(questionLoader, /loaded\.flat\(\)/);
});

test('the UPSC/MD page does not statically import the full question bank at startup', () => {
  assert.match(questionPage, /loadChauhanQuestionBank/);
  assert.match(questionPage, /if \(!authReady \|\| !authUser\)/);
  assert.match(questionPage, /authUser\?\.uid/);
  assert.match(questionPage, /import type \{ ChauhanQuestion \} from '\.\.\/data\/chauhanQuestionBank'/);
  assert.doesNotMatch(questionPage, /import\s*\{[^}]*\bchauhanQuestionBank\b[^}]*\}\s*from '\.\.\/data\/chauhanQuestionBank'/s);
  assert.doesNotMatch(questionPage, /import\s*\{[^}]*\bscorableChauhanQuestions\b[^}]*\}/s);
  assert.match(questionPage, /bankProgress\.loaded/);
  assert.match(questionPage, /Retry loading/);
});

test('browser disease pages consume lightweight catalog and per-system JSON assets', () => {
  for (const source of diseasePages) {
    assert.doesNotMatch(source, /from ['"][^'"]*\/data\/diseaseHubData['"]/);
  }
  assert.match(diseaseAssets, /\/data\/disease-hub\/catalog\.json/);
  assert.ok(diseaseAssets.includes("const SYSTEMS_URL = '/data/disease-hub/systems';"));
  assert.match(diseaseAssets, /new Map<string, Promise<Disease\[\]>>/);
  const diseaseSearch = read('../src/components/disease-hub/DiseaseSearch.tsx');
  assert.match(diseaseSearch, /key=\{`\$\{disease\.system\}\/\$\{disease\.slug\}`\}/);
  assert.match(diseaseAssets, /systemRequests\.set\(safeId, request\)/);
  assert.match(diseaseGenerator, /new Map<string, typeof diseaseHubData>/);
  assert.match(diseaseGenerator, /diseasesBySystem\.get\(disease\.system\)/);
  assert.match(diseaseGenerator, /diseasesBySystem\.get\(system\.id\) \|\| \[\]/);
});

test('disease detail views load the selected system rather than the complete dataset', () => {
  const category = read('../src/pages/DiseaseCategoryPage.tsx');
  const detail = read('../src/pages/DiseasePage.tsx');
  assert.match(category, /loadDiseaseSystem\(systemSlug\)/);
  assert.match(detail, /loadDiseaseSystem\(systemSlug\)/);
  assert.match(category, /setLoading\(false\)/);
  assert.match(detail, /role="status"/);
});

test('disease navigation uses system and slug instead of globally reused IDs', () => {
  const card = read('../src/components/disease-hub/DiseaseCard.tsx');
  const list = read('../src/components/disease-hub/DiseaseList.tsx');
  const hub = read('../src/pages/DiseaseHub.tsx');
  const detail = read('../src/pages/DiseasePage.tsx');
  assert.match(card, /onClick: \(system: string, slug: string\) => void/);
  assert.match(card, /onClick\(disease\.system, disease\.slug\)/);
  assert.ok(list.includes("onSelectDisease: (system: string, slug: string) => void"));
  assert.ok(list.includes("onSelectDisease(disease.system, disease.slug)"));
  assert.match(hub, /handleSelectDisease = \(system: string, slug: string\)/);
  assert.doesNotMatch(hub, /diseaseCatalog\.find\(d => d\.id === id\)/);
  assert.match(detail, /trackView\(\`\$\{disease\.system\}\/\$\{disease\.slug\}\`/);
});

test('build and development commands generate disease JSON assets before serving', () => {
  const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(packageJson.scripts.prebuild, /generate-disease-hub-assets/);
  assert.match(packageJson.scripts.predev, /generate-disease-hub-assets/);
  assert.match(packageJson.scripts['test:disease-assets'], /disease-hub-assets\.test/);
});
