import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { test } from 'node:test';
import { diseaseHubData } from '../src/data/diseaseHubData';
import { DISEASE_SYSTEMS } from '../src/data/diseaseHubSystems';

const root = path.resolve('public/data/disease-hub');

test('the generated disease catalog exactly preserves the source summary for every record', async () => {
  const catalog = JSON.parse(await readFile(path.join(root, 'catalog.json'), 'utf8'));
  const expected = diseaseHubData.map((disease) => ({
    id: disease.id,
    name: disease.name,
    slug: disease.slug,
    system: disease.system,
    category: disease.category,
    definition: disease.definition,
    simpleExplanation: disease.simpleExplanation,
    examPriority: disease.examPriority,
    clinicalPriority: disease.clinicalPriority,
    emergencyLevel: disease.emergencyLevel,
    relatedRemedyCount: disease.relatedRemedies?.length || 0,
  }));

  assert.equal(catalog.totalDiseases, diseaseHubData.length);
  assert.deepEqual(catalog.diseases, expected);
  assert.equal(catalog.systems.length, DISEASE_SYSTEMS.length);
  assert.deepEqual(
    catalog.systems.map((system) => system.id),
    DISEASE_SYSTEMS.map((system) => system.id),
  );
});

test('every disease-system asset exactly matches its source records', async () => {
  const allLoaded = [];
  for (const system of DISEASE_SYSTEMS) {
    const assetPath = path.join(root, 'systems', `${system.id}.json`);
    const actual = JSON.parse(await readFile(assetPath, 'utf8'));
    const expected = diseaseHubData.filter((disease) => disease.system === system.id);
    assert.deepEqual(actual, expected, `source fidelity failed for system ${system.id}`);
    allLoaded.push(...actual);
  }

  assert.equal(allLoaded.length, diseaseHubData.length);
  assert.deepEqual(
    allLoaded.map((disease) => disease.id).sort(),
    diseaseHubData.map((disease) => disease.id).sort(),
  );
  assert.equal(new Set(allLoaded.map((disease) => disease.id)).size, diseaseHubData.length);
});

test('every source disease system has metadata and a generated asset, including empty route aliases', async () => {
  const metadata = new Set(DISEASE_SYSTEMS.map((system) => system.id));
  const sourceIds = new Set(diseaseHubData.map((disease) => disease.system));
  for (const systemId of sourceIds) assert.ok(metadata.has(systemId), `missing metadata for ${systemId}`);

  for (const system of DISEASE_SYSTEMS) {
    const assetPath = path.join(root, 'systems', `${system.id}.json`);
    const records = JSON.parse(await readFile(assetPath, 'utf8'));
    assert.ok(Array.isArray(records), `missing JSON array for ${system.id}`);
    assert.ok(records.every((record) => record.system === system.id));
  }
});
