import { enhancedRemedies } from '../data/enhancedRemedies';
import type { Rubric } from '../data/repertoryDatabase';

export type SymptomPriority = 1 | 2 | 3;

export interface RepertorizationSelection {
  rubric: Rubric;
  chapterName: string;
  priority: SymptomPriority;
}

export interface RemedyEvidence {
  rubricId: string;
  rubric: string;
  chapter: string;
  priority: SymptomPriority;
}

export interface RepertorizationResult {
  key: string;
  abbreviation: string;
  name: string;
  remedyId: string | null;
  family: string;
  weightedPoints: number;
  matchedRubrics: number;
  totalRubrics: number;
  coveragePercent: number;
  evidence: RemedyEvidence[];
}

/**
 * Common Kent-style abbreviations mapped only when the abbreviation is
 * sufficiently distinctive. Unrecognised abbreviations remain separate.
 * This is an alias map, not a claim that OCR remedy names have been verified.
 */
const remedyAliases: Record<string, string> = {
  acon: 'aconite',
  aconit: 'aconite',
  aconitum: 'aconite',
  arn: 'arnica',
  arnica: 'arnica',
  ars: 'arsenicum-album',
  arsen: 'arsenicum-album',
  arsenicalbum: 'arsenicum-album',
  bell: 'belladonna',
  bry: 'bryonia',
  bryonia: 'bryonia',
  cham: 'chamomilla',
  chamomilla: 'chamomilla',
  coff: 'coffea',
  coffea: 'coffea',
  gels: 'gelsemium',
  gelsemium: 'gelsemium',
  ign: 'ignatia',
  ignatia: 'ignatia',
  lyc: 'lycopodium',
  lyco: 'lycopodium',
  lycopodium: 'lycopodium',
  natm: 'nat-mur',
  natmuriaticum: 'nat-mur',
  nuxv: 'nux-vomica',
  nuxvomica: 'nux-vomica',
  puls: 'pulsatilla',
  pulsatilla: 'pulsatilla',
  rhust: 'rhus-tox',
  rhustoxicodendron: 'rhus-tox',
  sep: 'sepia',
  sepia: 'sepia',
  sil: 'silicea',
  silicea: 'silicea',
  staph: 'staphysagria',
  staphysagria: 'staphysagria',
  sulph: 'sulphur',
  sulphur: 'sulphur',
  thuj: 'thuja',
  thuja: 'thuja',
};

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function canonicalKey(abbreviation: string): string {
  const token = normalizeToken(abbreviation);
  return remedyAliases[token] || token;
}

function findRemedyDetail(key: string) {
  return enhancedRemedies.find((remedy) => {
    const id = remedy.id.toLowerCase();
    return id === key || id.replace(/[^a-z0-9]/g, '') === key.replace(/[^a-z0-9]/g, '');
  });
}

/**
 * Scores only the remedy lists present in the selected curated rubrics.
 *
 * priority is a user-assigned importance weight for the symptom (1–3).
 * It is deliberately separate from Kent's remedy grades; the imported OCR
 * does not contain a verified structured grade field.
 */
export function scoreRepertorization(
  selections: RepertorizationSelection[],
): RepertorizationResult[] {
  if (selections.length === 0) return [];

  const totalPriority = selections.reduce((sum, item) => sum + item.priority, 0);
  const scores = new Map<string, RepertorizationResult>();

  selections.forEach((selection) => {
    const uniqueRemedies = new Set(selection.rubric.remedies.map(canonicalKey));

    uniqueRemedies.forEach((key) => {
      if (!key) return;

      const existing = scores.get(key);
      const evidence: RemedyEvidence = {
        rubricId: selection.rubric.id,
        rubric: selection.rubric.symptom,
        chapter: selection.chapterName,
        priority: selection.priority,
      };

      if (existing) {
        existing.weightedPoints += selection.priority;
        existing.matchedRubrics += 1;
        existing.evidence.push(evidence);
        return;
      }

      const detail = findRemedyDetail(key);
      const abbreviation =
        selection.rubric.remedies.find((remedy) => canonicalKey(remedy) === key) || key;

      scores.set(key, {
        key,
        abbreviation,
        name: detail?.name || abbreviation,
        remedyId: detail?.id || null,
        family: detail?.family || 'No linked Materia Medica entry',
        weightedPoints: selection.priority,
        matchedRubrics: 1,
        totalRubrics: selections.length,
        coveragePercent: 0,
        evidence: [evidence],
      });
    });
  });

  return Array.from(scores.values())
    .map((result) => ({
      ...result,
      coveragePercent: totalPriority > 0
        ? Math.round((result.weightedPoints / totalPriority) * 100)
        : 0,
    }))
    .sort((a, b) =>
      b.weightedPoints - a.weightedPoints ||
      b.matchedRubrics - a.matchedRubrics ||
      a.name.localeCompare(b.name),
    );
}
