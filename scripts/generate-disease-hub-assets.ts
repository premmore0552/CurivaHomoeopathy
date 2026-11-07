import { mkdir, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { diseaseHubData } from '../src/data/diseaseHubData';
import { DISEASE_SYSTEMS } from '../src/data/diseaseHubSystems';

const outputRoot = path.resolve('public/data/disease-hub');
const systemOutput = path.join(outputRoot, 'systems');

const systemMap = new Map(DISEASE_SYSTEMS.map((system) => [system.id, system]));
const diseasesBySystem = new Map<string, typeof diseaseHubData>();

for (const disease of diseaseHubData) {
  const current = diseasesBySystem.get(disease.system) || [];
  current.push(disease);
  diseasesBySystem.set(disease.system, current);
}

const missingSystems = [...diseasesBySystem.keys()].filter((id) => !systemMap.has(id));
if (missingSystems.length) {
  throw new Error('Disease data references systems without metadata: ' + missingSystems.join(', '));
}

const ids = new Set<string>();
const routeKeys = new Set<string>();
for (const disease of diseaseHubData) {
  if (ids.has(disease.id)) throw new Error('Duplicate disease ID in source data: ' + disease.id);
  const routeKey = `${disease.system}/${disease.slug}`;
  if (routeKeys.has(routeKey)) throw new Error('Duplicate disease route in source data: ' + routeKey);
  ids.add(disease.id);
  routeKeys.add(routeKey);
}

await mkdir(systemOutput, { recursive: true });

const summary = diseaseHubData.map((disease) => ({
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

const catalog = {
  generatedAt: new Date().toISOString(),
  totalDiseases: diseaseHubData.length,
  systems: DISEASE_SYSTEMS.map((system) => ({
    ...system,
    diseaseCount: diseasesBySystem.get(system.id)?.length || 0,
  })),
  diseases: summary,
};

await writeFile(path.join(outputRoot, 'catalog.json'), JSON.stringify(catalog), 'utf8');

const activeFiles = new Set<string>();
for (const system of DISEASE_SYSTEMS) {
  const fileName = `${system.id}.json`;
  activeFiles.add(fileName);
  await writeFile(path.join(systemOutput, fileName), JSON.stringify(diseasesBySystem.get(system.id) || []), 'utf8');
}

for (const fileName of await readdir(systemOutput)) {
  if (fileName.endsWith('.json') && !activeFiles.has(fileName)) {
    await unlink(path.join(systemOutput, fileName));
  }
}

console.log(
  `Generated disease hub catalog for ${diseaseHubData.length} records across ${diseasesBySystem.size} data systems.`,
);
