# Curiva platform transformation

## Working branch
- Branch: `feat/full-platform-transformation`
- Base: `main`
- Production and `main` are intentionally unchanged.

## Repository baseline (source inspection)
- Web: React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Motion.
- Auth/data: Firebase Authentication and Firestore wrappers in `src/lib/firebase.ts`; rules in `firestore.rules`.
- API: Express in `server.ts`, with Razorpay initialization gated by server environment variables and SQLite referenced in the README.
- Android: Capacitor 8; `src/main.tsx` selects `src/native-app/NativeLearningApp.tsx` on native devices. Learning progress is local-device state.
- Deployment: `netlify.toml` publishes static `dist`; the README notes the Express/SQLite server is not automatically persistent/available on standard static Netlify hosting.
- Content: substantial BHMS learning, subject, quiz, flashcard, repertory, and health-education content already exists. Preserve existing route paths and content while refactoring.

## Guardrails
1. Do not merge to `main`, publish a production deploy, or modify live service settings as part of this work.
2. Keep existing URLs and redirects unless a compatibility redirect is added.
3. Do not present sample/demo learner records as real patient records.
4. Do not introduce real clinical-record storage until authentication, access controls, audit trail, backups, retention, and deployment persistence are verified.
5. Keep patient education, student education, and clinician reference clearly separated; educational content is not diagnosis or treatment.
6. Native plugin, permission, or platform changes require a new Android build; web-layer live updates alone cannot deliver native-code changes.

## Audit risks / limitations to verify
- Booking and patient clinical-record workflows were not confirmed as end-to-end production features during initial source inspection.
- Express API deployment and persistent database availability need environment/deployment verification before relying on them.
- Firestore rules include a default-deny rule and owner checks for some collections, but this is not a complete clinical-data security review.
- Firebase configuration is imported from a repository file; confirm it contains only public client configuration and no service-account secrets.
- No build/test execution has been run in this remote repository inspection session. Changes must be validated in CI/local environment before release.
- Website visual appearance could not be independently verified in a browser during the initial audit; this assessment is source-based.

## Delivery sequence
1. Shared visual foundation and public homepage/navigation, preserving route compatibility.
2. Inventory API endpoints, data stores, authentication, and route-level access controls.
3. Booking workflow: discover doctors/services, choose available slot, submit request, confirmation and cancellation; do not claim real-time availability unless backed by a working scheduler.
4. Patient portal: profile and appointments first; clinical documents only after secure storage/access controls and lifecycle are established.
5. Android learning UX: improve navigation, accessibility, offline states and progress persistence without replacing the existing content bank.
6. Build/typecheck, route regression, responsive/accessibility checks, Firebase rules tests, and preview review before any production merge.

## Acceptance checklist
- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Existing high-value routes and redirects still resolve
- [ ] No patient data or secrets in client bundles, logs, or demo fixtures
- [ ] Booking writes are validated server-side and persist in the deployed environment
- [ ] Firestore rules are tested for owner, non-owner, and unauthenticated access
- [ ] Android native build and offline learning flows are tested
- [ ] Production deployment remains untouched until explicit approval
