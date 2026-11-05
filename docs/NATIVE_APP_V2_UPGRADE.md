# Curiva native app — V2 foundation

This change set introduces a first, reviewable V2 milestone for the native Capacitor learning experience.

## Included
- A native welcome and authentication gate with distinct BHMS Student and Practitioner account-category paths.
- Firebase email/password sign-in, account creation, and password-reset email.
- Optional offline/guest access so the existing bundled learning experience remains usable without an account or network.
- A native account card in the Progress tab with sign-out and a route back to account entry.
- A branded botanical/open-book vector mark used by the native splash, header, and authentication screen.
- A daily study planner with selectable 15/30/45/60-minute targets and four check-off activities. It is stored locally by day.
- Android adaptive and legacy launcher-icon resources generated from the Curiva botanical/open-book identity during the APK workflow.

## Important boundaries
- The student/practitioner category is self-selected profile metadata, not proof of registration, qualification, or authority to practise.
- Both categories use the existing educational learning content. This milestone does not create a privileged clinical or patient-record workflow.
- Learning history, bookmarks, quizzes, and the new planner remain local-device data. Authentication does not yet imply cloud backup or cross-device progress sync.
- The new native login uses Firebase Email/Password. Enable that provider in Firebase Authentication before expecting online sign-in to work. Password reset uses Firebase's configured email action.
- Google popup sign-in is intentionally not used inside the native WebView in this milestone.
- No Firestore rules, production hosting settings, Android permissions, payment endpoints, or public website routes are changed.

## Validation still required
1. Run `npm ci`, `npm run lint`, `npm test` (where configured), and `npm run build` on the feature branch.
2. Verify Email/Password is enabled in Firebase Authentication and test student and practitioner account creation, repeat sign-in, invalid password, password reset, sign-out, and offline guest mode.
3. Test the APK on a physical Android device, including first launch, process restart, keyboard resize, small screens, and returning from offline mode to sign-in.
4. Verify an existing install retains its current local study progress after upgrading.
5. Confirm the Android workflow generates adaptive/legacy launcher icon resources and validate the icon mask on API 24 and API 26+ devices before production release.
6. Review account category wording and privacy notice before public distribution.

Do not merge or deploy this milestone to production until the feature build, Firebase tests, and device checks pass.
