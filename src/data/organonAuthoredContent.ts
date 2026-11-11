/**
 * Owner-authored simple explanations for Organon aphorisms.
 *
 * This collection intentionally starts empty. Do not generate, infer, paraphrase,
 * or fill explanations automatically. Add text only when the project owner
 * supplies or explicitly approves the wording.
 *
 * The verbatim aphorism text remains in organon_data.ts and is protected by
 * organon_aphorism_text.lock.json. Keep interpretations in this separate layer.
 */
export interface OrganonSimpleExplanation {
  /** Aphorism number in the verbatim source dataset. */
  aphorismId: number;
  /** Exact simple explanation supplied or explicitly approved by the project owner. */
  text: string;
}

export const ORGANON_SIMPLE_EXPLANATIONS: Readonly<Partial<Record<number, OrganonSimpleExplanation>>> =
  Object.freeze({});

/** Returns null until an owner-authored explanation is available for this aphorism. */
export function getOrganonSimpleExplanation(aphorismId: number): OrganonSimpleExplanation | null {
  const explanation = ORGANON_SIMPLE_EXPLANATIONS[aphorismId];
  if (!explanation || explanation.aphorismId !== aphorismId || !explanation.text.trim()) {
    return null;
  }
  return explanation;
}
