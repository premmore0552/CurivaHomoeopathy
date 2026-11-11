# Organon major update — content preservation and editorial plan

## Purpose

Prepare the next Organon release as a structured BHMS learning system, while treating the existing aphorism text as protected source material.

## Non-negotiable text-preservation rule

- `src/data/organon_data.ts` is the current verbatim content source for aphorism records.
- Preserve its text exactly as it exists today: wording, spelling, punctuation, ordering, edition labels and footnotes.
- Do not simplify, rewrite, correct, normalise, translate, or regenerate the source aphorisms as part of UI or study-feature work.
- A Git blob SHA-1 lock in `src/data/organon_aphorism_text.lock.json` and an automated test detect any modification to that source file.
- Updating the lock is an editorially significant change. Do not update it merely to make a failing test pass. First obtain explicit approval and review the complete source diff.

## Explanation policy

- No simple explanations or detailed aphorism interpretations are authored in this preparation change.
- The project owner will supply the simple explanations later.
- `src/data/organonAuthoredContent.ts` is an intentionally empty, separate content layer for those owner-supplied explanations.
- Do not populate that layer using AI-generated summaries, inferred interpretations, placeholder prose or generic fallback explanations.
- If an explanation is not supplied, the future UI must show no explanation / a neutral “not added yet” state, not invented explanatory text.
- Never overwrite original aphorism text with an explanation.

## Planned learning-system layers

1. **Verbatim source layer:** the protected aphorism text, edition/version records and footnotes.
2. **Owner-authored explanation layer:** simple explanations supplied by the project owner, kept separate and mapped by aphorism number.
3. **Syllabus layer:** the existing NCH-aligned four-year core and revision blocks.
4. **Study interface:** reading, cross-references, bookmarks, revision status and year-wise navigation.
5. **Assessment layer:** independently sourced or clearly labelled practice questions, flashcards, timed tests and answer rationales. Do not claim a question is a university past-paper question without evidence.
6. **Progress layer:** transparent student study progress with explicit storage and sync behaviour.

## Current data audit

At the preparation baseline, `organon_data.ts` contains:
- 294 unique aphorism records, §§1–294, with no missing IDs in that sequence.
- 305 edition/version entries.
- 9 footnote entries.

The integrity lock protects the complete source file, not just these aggregate counts.

## Release workflow

- Keep this groundwork on a feature branch and review it through a pull request.
- Run the existing Organon curriculum test command and the full website verification workflow.
- Do not merge or deploy production as part of preparation.
- Keep Netlify Deploy Preview disabled for this PR with `[skip netlify]`.
- Add owner-supplied explanation content only in a later, separately reviewed change.
