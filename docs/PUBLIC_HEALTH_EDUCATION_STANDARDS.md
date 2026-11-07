# Public Health Education: Content, Reader, Privacy and Security Roadmap

_Last reviewed: 7 November 2026_

This plan covers the public website and its educational reading experiences. It is an engineering and editorial checklist, not a certification that any live deployment, legal compliance programme, or security control has already been independently audited.

## What this reader rebuild changes

- Replaces the old directory-then-reader layout with one responsive, animated public library.
- Searches titles, descriptions, chapter headings, and the full chapter text.
- Adds category filters, per-book chapter lists, mobile contents navigation, and previous/next chapter controls.
- Adds light, sepia, and dark reader themes, adjustable type size, serif/sans type, and browser text-to-speech.
- Adds chapter bookmarks, completion markers, and last-read chapter restoration in browser local storage only.
- Respects the reduced-motion preference for the new library animations.
- Uses the uploaded Curiva app mark in the first-paint splash, React loading screens, and PWA manifest.
- Moves the homepage introduction banner to the end of the home content and removes its fixed 1200px/700px dimensions so it stays in normal document flow.

Reading state is device/browser local. This change does not add an account, cloud reading history, advertising tracker, or user-level analytics.

## 1. Public-health editorial standard

Use this checklist for every new or revised eBook and health article.

### Plain-language structure

1. State the main message in the opening paragraph. Avoid promotional claims and long introductory passages.
2. Write for a general reader. Prefer familiar words, short paragraphs, active voice, and one main idea per paragraph. Explain unavoidable medical terms immediately.
3. Give the reader a predictable structure:
   - What the condition/topic is
   - What happens in the body
   - Common signs and symptoms
   - Common causes and risk factors
   - What a person can do safely
   - What does not prevent or treat the condition
   - When to contact a clinician and when to seek urgent help
   - Questions to ask a healthcare professional
   - Sources, author/reviewer, and last-reviewed date
4. Add a short chapter summary, a glossary, and practical take-away points. Use tables or illustrations only when they genuinely make the topic easier to understand.
5. Use meaningful headings, descriptive image alternative text, accessible contrast, keyboard operation, and readable mobile layouts.
6. Offer translations only after qualified review; do not rely on raw machine translation for clinical safety statements.

### Evidence and medical safety

- Separate established medical facts, clinical guidelines, areas of uncertainty, and traditional or historical beliefs. Label each clearly.
- Cite the original guideline, government health service, systematic review, or peer-reviewed publication for specific medical statements. Include source title, organisation/authors, publication or update date, and link.
- Do not present homoeopathy, supplements, herbs, lifestyle products, or other complementary approaches as proven treatment unless reliable evidence supports the specific claim.
- Do not say that extreme dilution automatically makes a product safe, effective, or free of interactions.
- Never advise a reader to stop prescribed treatment, delay emergency care, skip vaccination, or replace evidence-based care with a complementary product.
- Avoid universal dosing instructions, individual diagnosis, and treatment plans. Refer readers to qualified clinicians for personal advice.
- Put red-flag symptoms and emergency instructions where readers will see them; do not hide them at the end of a long eBook.
- Give each publication a named author/editor, qualified medical reviewer where appropriate, conflict-of-interest declaration, source list, version, and next review date.
- Keep a correction channel and a visible change log. Withdraw or amend unsafe/outdated material promptly.

### Content backlog

- Audit all 17 current guides and their 155 existing sections for plain-language readability, completeness, unsupported claims, and missing source links.
- Expand each guide with a lay summary, learning objectives, body-system explanation, risk factors, prevention, practical self-care boundaries, red flags, frequently asked questions, glossary, references, and a one-page recap.
- Add diagrams and infographics with captions, alt text, and source/licence metadata.
- Add Bengali and Hindi editions through human translation and clinical review.
- Add source metadata to the data model instead of leaving citations as unstructured prose only.
- Add an editorial review dashboard with draft, fact-check, clinical review, legal/copyright check, approved, published, and archived states.

## 2. Content ownership and anti-misuse protections

- Maintain a rights register for every article, eBook, cover, photograph, diagram, and downloadable file: owner, source URL, licence/permission, attribution wording, and expiry where relevant.
- Do not copy copyrighted books, paid databases, question banks, or images into public bundles without permission or a suitable licence.
- Treat client-side React content as public. Anything bundled into JavaScript or delivered to a public browser can be copied; hiding a button or disabling right-click is not access control.
- For genuinely restricted or paid content, store the original files in private object storage and return short-lived signed URLs only after server-side authentication, entitlement checks, and payment verification.
- Apply per-user and per-IP rate limits to download endpoints; log security events without storing the contents of private documents in logs.
- Use visible publication attribution and version IDs. Watermarks may deter casual redistribution but do not replace licensing or server-side access control.
- Publish correction and takedown procedures, including a contact that is verified and monitored.

## 3. User information and privacy safeguards

- Collect only fields required for a clearly stated feature. Do not ask for patient history, diagnoses, medical reports, photographs, identity documents, or clinical case details in public education, contact, appointment, or study forms unless a separately reviewed feature truly needs them.
- Keep public reading anonymous by default. Do not upload reading history, search terms, bookmarks, or completion patterns to an account unless the user explicitly opts into sync and is told what is shared.
- Keep educational reading progress separate from appointment, payment, authentication, and any future clinical systems.
- Never put patient-identifiable or sensitive health information into AI prompts, analytics events, URLs, support tickets, logs, or crash reports. Use warnings and input controls; do not rely on a disclaimer alone.
- Use a specific privacy notice for each feature: purpose, data fields, lawful basis/consent where applicable, processors, retention period, cross-border transfers, rights, and contact details.
- Provide a practical way to access, correct, export, and request deletion of account data, and document the limits of deleting legally required payment or security records.
- Define retention periods for account profiles, appointment requests, payments, feedback, security logs, AI prompts, and backups. Delete or anonymize data when it is no longer needed.
- Do not describe analytics, personalization, advertising, or tracking unless the code actually implements them. Optional non-essential analytics should remain off until the user gives valid consent where required; honour withdrawal.
- Verify that all privacy contacts and business details in policy pages are real, monitored, and correct before publication.

## 4. Authentication, authorization, and application security

- Enforce authorization on the server and database rules, not only in React route guards or hidden UI. Use least-privilege role-based access and trusted server-side administrator assignment.
- Require MFA or passkeys for administrators, protect account recovery, rate-limit sign-in and password-reset attempts, and alert on suspicious privilege changes.
- Review Firebase Authentication and Firestore rules for signed-out, owner, non-owner, and administrator cases. Deny by default and prevent broad collection reads.
- Validate every API input on the server, constrain lengths/types/enums, reject unexpected fields, and return safe error messages.
- Use same-origin APIs where possible, explicit CORS allowlists, request rate limits, and CSRF protection when cookie-authenticated endpoints are used.
- Keep API keys, payment credentials, email credentials, service-account keys, and signing keys server-side. Never put private secrets in `VITE_*` variables or commit them to Git.
- Verify payment signatures and webhook events server-side; use idempotency keys and authoritative server-side prices.
- Keep purchased downloads private, time-limited, and bound to a verified entitlement.
- Turn on and test a restrictive Content Security Policy. Start in report-only mode, inventory required script/connect/frame sources, then enforce; do not simply add broad wildcards or unsafe script allowances.
- Review headers, HTTPS/HSTS scope, dependency updates, secret scanning, CodeQL, and vulnerability alerts on a regular schedule.
- Back up production data, restrict backup access, encrypt backups, and perform restore drills. A backup that has never been restored is not a tested recovery plan.

## 5. Browser, cache, and device safeguards

- Do not cache signed-in account pages, private downloads, payment responses, appointment data, or API responses in the service worker. Use explicit network-only handling and server-side `Cache-Control: no-store` for sensitive responses.
- Version static asset caches and delete obsolete caches. Ensure offline fallbacks never display one user's data to another user on a shared device.
- Explain what is stored locally, provide a clear local reading-history reset, and keep device-local data separate from cloud sync.
- Respect reduced-motion settings, provide keyboard focus states, use semantic controls and labels, and test at mobile widths and zoomed text sizes.
- Avoid exposing personal information in page titles, URLs, share links, public profile pages, or notification previews.

## 6. Monitoring and release gates

### Dependency audit follow-up
A GitHub Actions dependency-install log for this change reported **33 npm audit findings (2 low, 9 moderate, 17 high, and 5 critical)**. This is a package-audit report, not proof that the live site is exploitable, but the high and critical findings need triage before a production release. Generate a fresh `npm audit --json`, identify direct versus transitive paths and whether affected code ships to browsers or servers, update the owning dependencies, and rerun the full test suite. Do not apply a blanket force-upgrade without reviewing breaking changes.



Before a public release, verify:
- Typecheck, production build, unit tests, Firestore rules emulator tests, and CodeQL complete successfully.
- A manual review covers mobile, desktop, screen reader/keyboard use, slow networks, offline state, and reduced-motion preferences.
- Every eBook has source links, content owner, reviewer, review date, safety wording, and rights clearance.
- Signed-out, ordinary-user, non-owner, and administrator access tests all pass.
- A private resource cannot be downloaded by changing an ID or calling an API directly.
- A user can withdraw optional consent and request account-data export/deletion.
- Error monitoring and audit logging do not contain raw health details or credentials.
- A deployment preview is reviewed before production. Do not deploy production or change live database rules as part of an ordinary content PR.

## 7. India privacy and legal review

Curiva should obtain a qualified India-focused review of the Digital Personal Data Protection Act, 2023 and Digital Personal Data Protection Rules, 2025, including phased commencement, notice/consent language, children's data, processor contracts, user rights, breach response, and cross-border processing. Applicability and commencement dates should be checked against the current Gazette and MeitY notifications before each release. This section is an engineering checklist, not legal advice.

## Reference guidance

- WHO, Plain language: https://www.who.int/about/communications/understandable/plain-language
- NHS inform, Homeopathy: https://www.nhsinform.scot/tests-and-treatments/medicines-and-medical-aids/complementary-medicine/homeopathy/
- US National Center for Complementary and Integrative Health, Homeopathy: https://www.nccih.nih.gov/health/homeopathy
- Ministry of Electronics and Information Technology, Digital Personal Data Protection Rules, 2025: https://www.meity.gov.in/documents/act-and-policies/digital-personal-data-protection-rules-2025-gDOxUjMtQWa?pageTitle=Digital-Personal-Data-Protection-Rules-2025-2
