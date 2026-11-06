# Curiva repository audit and hardening notes

**Audit date:** 7 November 2026  
**Baseline reviewed:** `main` at `2f003933103d66e9afac8a71383f6a4f23e01e54`  
**Change branch:** `codex/security-and-safety-hardening-2026-11-07`  
**Scope:** Source-level review of the React/Vite app, Express/Netlify API, Firestore rules, AI assistant, repertory simulator, privacy notice, CI workflows, and repository layout.

This is an engineering review, not a penetration test, clinical validation, privacy-law opinion, or confirmation of production configuration. Any issue involving Firebase/Netlify/Razorpay/Gemini credentials or live user data requires authorized environment-level verification.

## Changes included in this review branch

1. **Screening-record rules tightened.** The `screenings` collection can represent cervical-health screening information (including HPV vaccination, Pap-test history, symptoms, family history, and recommendations). Create validation now uses a closed field allowlist and bounded values. Updates preserve record ID, owner, and creation timestamp; only approved fields may change, and updates require a server timestamp. Emulator tests cover owner privacy, cross-user writes, unexpected fields, oversized lists, and immutable fields.
2. **AI study API hardened.** The Curiva-care endpoint rejects empty/non-string prompts, caps prompts at 4,000 characters, caps history at 12 messages / 12,000 aggregate characters, validates history roles and text lengths, and returns generic server errors. The model persona and offline fallback now describe an educational assistant rather than a clinician or patient-care service. Instant keyword matches no longer claim that pages are professionally pre-screened or clinically verified.
3. **AI interface reframed.** The chat page now identifies itself as an educational study assistant, warns that AI output may be inaccurate, prohibits clinical diagnosis/prescribing, discourages patient identifiers, and explains that prompts and recent chat context are sent to Google Gemini. Client history is limited to the last 12 messages.
4. **Repertory simulator reframed.** The UI and result labels now disclose that it is a simplified fixed six-profile teaching matrix, not a complete Kent repertory, validated method, diagnostic system, or prescription aid. “Simillimum candidate” and “lead prescription” wording has been removed.
5. **Privacy notice updated.** It now discloses the AI prompt/history data flow to Google Gemini and advises users not to submit identifiable patient information or sensitive health information.
6. **Tests expanded.** Firestore rules tests cover the screening record rules; Netlify API tests cover invalid, oversized, and malformed AI requests.

## Findings requiring follow-up

### High priority

- **Sensitive screening schema needs data governance.** Although the client code currently queries `screenings` for a profile/mock-assessment view and no active writer for the HPV/Pap fields was found in the inspected app source, `firebase-blueprint.json` defines sensitive reproductive-health fields. Keep access owner-scoped, avoid unnecessary collection of health details, and determine whether this collection is still needed. Do not use this as a patient record system without separate approval and design.
- **AI rate limiting is process-local.** The Express AI limiter uses an in-memory counter (30 requests per 15 minutes per running instance). Serverless function instances do not provide a durable shared quota, so this is not a reliable account-wide or IP-wide abuse limit. Add a shared store / edge-level quota before broad public rollout, and consider per-user authenticated quotas and spend alerts.
- **Blog writes are in memory.** `server.ts` describes blog data as a pure JavaScript in-memory representation. Writes can be lost across restarts or serverless instances. Migrate mutable posts to a durable store before relying on admin edits or a publishing workflow. Static `allBlogPosts` fallback is useful for read-only continuity, not persistence.
- **Production integration checks remain necessary.** Passing GitHub Actions validates code, typecheck, build, emulator rules, and selected API flows. It does not prove that deploy-preview secrets, Gemini availability, Razorpay sandbox callbacks/webhooks, Resend delivery, GCS permissions/signed links, Google Calendar permissions, or a production Firebase rules deployment are configured correctly. Complete the documented deploy-preview checklist before enabling the related flows.

### Medium priority

- **AI error fallbacks can hide failures.** `src/services/gemini.ts` returns generic empty arrays/placeholder objects for several failed calls. Consider returning typed result states (success/error) so the interface can distinguish “no results” from “request failed,” and test the empty / timeout / invalid-JSON cases.
- **Repository hygiene is overdue.** The root contains many large extraction/debug artifacts (for example `destination.html`, `direct_share.html`, `shared_content.html`, `decoded_strings.txt`, `extracted_string_2.txt`, several `large_script_*.js`, and many `match_*.txt` files). They may be research inputs, but should be classified into maintained source, reproducible research assets, or disposable outputs. Do not delete them until build scripts and references have been checked.
- **Netlify placeholder environment values should be documented or removed.** `netlify.toml` contains dummy Cloudflare environment placeholders. Verify whether any build step still depends on the variable names before changing them; do not place real secrets in source control.
- **Branch protection is disabled on `main`.** Require pull-request review and green CI checks, disallow force pushes/deletions, and keep deployment approvals separate. This audit did not change repository settings.
- **AI privacy and retention need provider-level confirmation.** The new notice accurately describes what the app sends. It does not claim how long Google or other providers retain data; review provider settings and applicable contractual terms separately.

## Recommended product roadmap

1. **Student-first foundation:** syllabus-to-topic navigation, subject progress, revision planner, bookmarks, offline access, and a unified BHMS dashboard. Reuse the existing native learning and Study Toolkit systems rather than creating parallel progress stores.
2. **Reference-quality learning:** make each Materia Medica / repertory page show edition, author, page/rubric provenance, transcription status, and correction history. Keep traditional claims visibly distinct from contemporary evidence summaries.
3. **Exam preparation:** add a source-linked MCQ/PYQ experience with topic filters, worked explanations, spaced repetition, mock exams, and transparent question provenance.
4. **Academic case simulation:** use fictional cases, explicit learning objectives, facilitator notes, and “not for patient care” boundaries. Do not turn the current scoring matrix into a treatment recommender without clinical, regulatory, and evidence review.
5. **Quality and accessibility:** add screen-reader testing, keyboard navigation, contrast checks, mobile regression tests, and privacy-preserving error telemetry.

## Verification and release checklist

- [ ] Review the Firestore emulator workflow result for this branch; resolve any rule syntax/test failure before merge.
- [ ] Complete a deploy-preview smoke test for website routes and `/api/*` function routes.
- [ ] Verify AI safety behavior for prompts requesting diagnoses, prescriptions, medicine discontinuation, emergency advice, and identifiable patient data.
- [ ] Verify Gemini request logging does not retain full prompts unnecessarily and is not exposed to client logs.
- [ ] Test Razorpay sandbox capture, webhook retry/idempotency, private PDF access, signed URL expiry, and email fallback.
- [ ] Test appointment request/notification, admin authorization, calendar overlap, confirmation, rescheduling, and cancellation with test accounts.
- [ ] Compare the proposed Firestore rules against the currently deployed rules before any Firebase rules deployment. Rules deployment replaces the deployed rules and must remain a separately reviewed operation.
- [ ] Confirm backups, access controls, provider retention configuration, and support contact details before collecting any new category of personal or health information.

## Review limitations

The repository was inspected through GitHub source/metadata access. No local checkout, npm install, local test execution, interactive browser session, device run, live API request, external provider sandbox transaction, production database query, or penetration test was performed in this review. CI results on this change branch are the authoritative code execution check after the pull request is opened.
