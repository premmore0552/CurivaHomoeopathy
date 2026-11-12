# Curiva website and Organon learning audit — 12 November 2026

## Audited baseline

- Repository: curivahomoeopathy/CurivaHomoeopathy
- Base commit: 568565a223d737f2420e86c426bdd8e380019f74
- Website: React + TypeScript + Vite
- Main landing page: CurivaHome
- Organon routes: /organon-philosophy, four professional-year pages, and /organon-library
- Existing source-preservation lock: src/data/organon_aphorism_text.lock.json

## Findings

### Organon learning journey

The four NCH-mapped year pages and the separate original-text reader were already present. Year pages linked to year-filtered aphorism reading, flashcards and practice quizzes. They also tracked term completion in sessionStorage, scoped to the current browser tab.

The central Organon hub was a static year selector. It did not provide cross-year curriculum search, a consolidated view of term completion, or quick launch links to the reader and practice modes. The general BHMS student landing page linked to the syllabus and subject directories but did not directly feature the Organon pathway.

### Build and CI

At the audited baseline, Website verification and CodeQL failed during npm ci, before application compilation and tests. The npm logs reported stale lockfile resolution records, including missing @opentelemetry/api and an @rolldown/pluginutils version mismatch. The previous lock refresh command preserved the stale dependency graph by running package-lock-only against the existing lockfile.

The repair workflow in this branch removes the stale lockfile before a fresh npm resolution, runs a clean npm ci, typechecks, validates the Organon curriculum and navigation, and builds the website. It commits the generated lockfile only after those steps succeed.

### Security and release readiness

P0 issue #46 remains open and contains repository-control and production-configuration tasks that require owner-level GitHub/Netlify/Firebase access. This code change does not attempt to change repository rulesets, account security settings, production secrets, Firebase rules or live service configuration.

## Upgrades included

- Add cross-year search for course codes, term names, topics, learning outcomes, assessment items and aphorism numbers.
- Show the four-year core aphorism coverage, curriculum-term totals and current tab-scoped progress in the Organon hub.
- Add direct year-pathway, original-text reader, flashcard, quiz and NCH source links on each year card.
- Add the Organon portal as a direct destination on the BHMS student homepage.
- Centralise the existing progress key and validation logic without changing the storage key or expanding data collection.
- Add tests proving the core ranges cover aphorisms §§1–294 exactly once, search routes to the correct year, and saved progress is validated.
- Refresh the npm lockfile from a clean resolution and rerun website/Organon checks.

## Editorial safeguards

- src/data/organon_data.ts is not edited.
- Original wording, punctuation, edition labels, order and footnotes remain protected by the Git blob hash lock.
- No simple explanations, summaries, interpretations or placeholder explanations are generated.
- The year-wise syllabus remains a study map; the official NCH PDF remains the source authority.

## Deployment

This branch is marked [skip netlify]. No Deploy Preview or production deployment is requested or created. Review the pull request and its CI before any merge or release.
