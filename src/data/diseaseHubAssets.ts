import type { Disease, DiseaseHubCatalog } from './diseaseHubTypes';

const CATALOG_URL = '/data/disease-hub/catalog.json';
const SYSTEMS_URL = '/data/disease-hub/systems';
let catalogRequest: Promise<DiseaseHubCatalog> | null = null;
const systemRequests = new Map<string, Promise<Disease[]>>();

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Disease library request failed (${response.status}). Please retry.`);
  }
  return response.json() as Promise<T>;
}

export function loadDiseaseHubCatalog(): Promise<DiseaseHubCatalog> {
  if (!catalogRequest) {
    catalogRequest = fetchJson<DiseaseHubCatalog>(CATALOG_URL).catch((error) => {
      catalogRequest = null;
      throw error;
    });
  }
  return catalogRequest;
}

export function loadDiseaseSystem(systemId: string): Promise<Disease[]> {
  const safeId = systemId.trim();
  if (!/^[a-z0-9-]{1,80}$/.test(safeId)) {
    return Promise.reject(new Error('The requested disease system is invalid.'));
  }

  const cached = systemRequests.get(safeId);
  if (cached) return cached;

  const request = fetchJson<Disease[]>(`${SYSTEMS_URL}/${encodeURIComponent(safeId)}.json`)
    .then((diseases) => {
      if (!Array.isArray(diseases) || diseases.some((disease) => disease.system !== safeId)) {
        throw new Error('The disease library returned an invalid system dataset.');
      }
      return diseases;
    })
    .catch((error) => {
      systemRequests.delete(safeId);
      throw error;
    });

  systemRequests.set(safeId, request);
  return request;
}
