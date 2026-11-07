import assert from 'node:assert/strict';
import { readdir, stat, access } from 'node:fs/promises';
import path from 'node:path';

const assetsDir = path.resolve('dist/assets');
const publicDataDir = path.resolve('dist/data/disease-hub');
const files = await readdir(assetsDir);
const jsFiles = files.filter((file) => file.endsWith('.js'));
assert.ok(jsFiles.length > 0, 'Vite did not emit any JavaScript assets');

const sized = await Promise.all(jsFiles.map(async (file) => ({
  file,
  bytes: (await stat(path.join(assetsDir, file))).size,
})));

const largest = [...sized].sort((a, b) => b.bytes - a.bytes);
const largestChunk = largest[0];

const questionPage = sized.find((asset) => asset.file.startsWith('UPSCMDQuestionPractice'));
assert.ok(questionPage, 'The UPSC/MD practice route chunk was not emitted');
assert.ok(
  questionPage.bytes < 600 * 1024,
  `UPSC/MD page chunk must stay below 600 KB; got ${Math.round(questionPage.bytes / 1024)} KB`,
);

const monolithicDiseaseChunk = sized.find((asset) => /diseaseHubData/i.test(asset.file));
assert.equal(monolithicDiseaseChunk, undefined, 'A monolithic diseaseHubData JavaScript chunk was emitted');

const questionPartChunks = sized.filter((asset) => /part-(?:0[1-9]|1[01])[-.]/.test(asset.file));
assert.equal(questionPartChunks.length, 11, 'All eleven question source parts should be emitted as separate deferred chunks');
for (const chunk of questionPartChunks) {
  assert.ok(
    chunk.bytes < 600 * 1024,
    `Question source chunk ${chunk.file} is unexpectedly large (${Math.round(chunk.bytes / 1024)} KB)`,
  );
}

assert.ok(
  largestChunk.bytes < 1500 * 1024,
  `Largest client chunk must stay below 1.5 MB; ${largestChunk.file} is ${Math.round(largestChunk.bytes / 1024)} KB`,
);

const catalogPath = path.join(publicDataDir, 'catalog.json');
await access(catalogPath);
const catalog = JSON.parse(await (await import('node:fs/promises')).readFile(catalogPath, 'utf8'));
assert.ok(Array.isArray(catalog.systems) && catalog.systems.length >= 20, 'Disease catalog is missing its system index');
assert.ok(
  Array.isArray(catalog.diseases) &&
  catalog.diseases.length === catalog.totalDiseases &&
  catalog.diseases.length > 0,
  'Disease catalog records do not match the generated total',
);

for (const system of catalog.systems) {
  const filePath = path.join(publicDataDir, 'systems', `${system.id}.json`);
  await access(filePath);
}

console.log('Client bundle budgets passed.');
console.log(`UPSC/MD page chunk: ${Math.round(questionPage.bytes / 1024)} KB`);
console.log(`Largest client chunk: ${largestChunk.file} (${Math.round(largestChunk.bytes / 1024)} KB)`);
console.log(`Deferred source-question chunks: ${questionPartChunks.length}`);
console.log(`Disease catalog: ${catalog.diseases.length} records across ${catalog.systems.length} systems`);
console.log('Largest client chunks:', largest.slice(0, 8).map(({ file, bytes }) => `${file}: ${Math.round(bytes / 1024)} KB`).join(' | '));
