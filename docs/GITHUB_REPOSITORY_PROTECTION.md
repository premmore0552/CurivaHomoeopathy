# GitHub repository protection for Curiva

_Last verified: 12 November 2026 (post-PR #84)_

This runbook covers GitHub controls that are repository/account settings, not source-code changes. The connected GitHub integration can read repository files and CI results but cannot administer branch protection, repository rulesets, secret-scanning settings, push protection, or account MFA. A repository owner must complete and verify those settings in GitHub.

## Current verified state

- The default branch is `main`.
- The repository rulesets endpoint returned an empty list on 12 November 2026.
- GitHub's branch listing currently reports `main` as protected, but the embedded protection summary shows required status-check enforcement off and no required contexts/checks. The detailed protection endpoint returns HTTP 403 to this integration. Treat the branch as only partially protected; approval, conversation, force-push and deletion rules are not verified.
- `.github/dependabot.yml` already schedules weekly npm and GitHub Actions updates. This does not prove Dependabot security alerts are enabled.
- There is no `.github/CODEOWNERS` file. The owner has confirmed that `curivahomoeopathy` and `premmore0552` are both their own accounts, so they are not independent reviewers. Do not add either account as a CODEOWNER or count cross-account reviews as independent approval.
- PR #83 merged on 12 November 2026. Its branch checks passed for website verification and Android build; JavaScript/TypeScript CodeQL passed. Recheck the latest main-commit runs before selecting exact required check names.

## Protect `main`

In the repository, open **Settings → Rules → Rulesets → New branch ruleset**.

Use the following baseline:

1. Name the ruleset **Protect main** and set enforcement to **Active**.
2. Target the branch name `main`.
3. Require a pull request before merging. Do not permit direct pushes to `main`.
4. Use **zero required approving reviews while this remains a single-human-maintainer repository**. A PR author cannot independently approve their own PR, and reviews from the owner's other account are not independent. Do not create a fake second reviewer or CODEOWNERS entry. When a second trusted human maintainer is added, change this to at least one approval by someone other than the PR author and dismiss stale approvals.
5. Require all review conversations to be resolved.
6. Block force pushes and branch deletion.
7. Require the following successful checks. The Android workflow has been adjusted to run on every pull request so its result is consistently available as a required check:
   - `Typecheck, build website, and validate free OTA bundle`
   - `Build installable Android debug APK`
   - `Analyze actions`
   - `Analyze java-kotlin`
   - `Analyze javascript-typescript`
8. Consider requiring the branch to be up to date before merging. This gives stronger integration confidence but can require more frequent CI reruns.
9. Keep the bypass list empty. The sole administrator must merge through the same PR and passing-check path; do not add a routine admin bypass.

Do not require a deployment environment as a status check. The production release must remain a separate, deliberate operator action.

## Enable repository security features

Open **Settings → Code security and analysis** and verify:

- Dependabot alerts are enabled.
- Dependabot security updates are enabled. The weekly version-update schedules already exist in `.github/dependabot.yml`.
- Secret scanning is enabled where available for this public repository.
- Push protection is enabled where available.
- Private vulnerability reporting remains enabled so reports are not posted publicly.

After enabling the controls, verify the page shows them as active. Do not infer their status from the presence of workflow files or a Dependabot configuration.

## Verify administrator access

In GitHub account security settings:

- Require a passkey or MFA for every account with repository administration access.
- Review collaborators and remove stale or unnecessary write/admin access.
- The owner has confirmed that `curivahomoeopathy` and `premmore0552` are two accounts operated by one person. Do not count them as two reviewers. `curivahomoeopathy` currently has admin; `premmore0552` currently has write access. If the legacy account is no longer needed, remove its write access or downgrade it to read after verifying recovery and access from the newer owner account. MFA/passkeys should be enabled on both accounts while both retain access.
- For meaningful peer review and continuity, recruit a second trusted human maintainer later. Until then, compensate with required CI, minimal access, external review of security-sensitive changes, and documented recovery procedures.
- Never place PATs, app private keys, provider credentials, service-account JSON, or signing keys in issues, PR comments, build logs, or repository files.

## Post-configuration verification

After saving the ruleset:

1. Open a small test PR against `main`.
2. Confirm GitHub blocks merging until all required jobs pass. With a sole human maintainer, no independent approval can be required; document this limitation rather than approving from the owner's second account.
3. Confirm unresolved review conversations block merging.
4. Confirm direct pushes, force pushes, and branch deletion are blocked by policy. Do not test force-push or deletion against the production branch; inspect the ruleset configuration instead.
5. Record the ruleset name, required checks, reviewer policy, security feature states, and verification date in the security audit document.

## Important distinction

These settings protect the repository from unsafe source changes. They do not configure Firebase App Check, Netlify environment secrets, payment/webhook credentials, email delivery, clinic calendar access, or production deployment. Those remain separate provider-console and release tasks documented in `docs/PRIVACY_SECURITY_CONTROLS.md` and `docs/PRODUCTION_INTEGRATION_VERIFICATION.md`.


## 12 November 2026 live verification

- main head after PR #84: fa14d6014662a127e4159acd0af06fe5183e1fc9. The earlier e65e6a82... reference is the parent commit and is superseded.
- main is flagged protected, but required status-check enforcement is off and no required check contexts are configured. Rulesets are empty. The integration receives 403 when requesting detailed branch protection.
- No CODEOWNERS file exists at repository root or under .github/. A second active human reviewer must be confirmed before enabling a mandatory approval rule.
- Weekly Dependabot schedules are configured; alert/security-update toggles, secret scanning, push protection and private vulnerability reporting cannot be verified through this integration.
- Administrator MFA/passkeys and collaborator permissions cannot be inspected through the available connection.
- Netlify's currently published production deploy is 6af2291dafedaeb655e0dbb2 for commit 32d8df7a2461993a3826b9b831d50e63a95f61fc, not current main. PR #83 and PR #84 merge commits both retained [skip netlify]; no deployment for current main was triggered during these audits. The latest published production deploy remains commit 32d8df7a2461993a3826b9b831d50e63a95f61fc.
- The App Check environment variable exists in Netlify Production but is marked secret and scoped to Builds, Functions and Runtime. Its value is masked, so it cannot be matched against Firebase Console. Recreate with the verified value as a non-secret, Builds-only Production variable after checking the Firebase registration; do not rotate/delete it blindly.
- Netlify team-level variables returned an empty inventory. The site inventory showed only the App Check variable; external provider/account scopes remain outside this evidence.
- Keep issue #46 open until the owner/provider controls and release gates above are verified.


## Post-PR #84 status correction — 12 November 2026

- The current main commit is `fa14d6014662a127e4159acd0af06fe5183e1fc9` (PR #84 merge). The website and CodeQL PR checks passed on PR #84 head; SonarQube itself was skipped because its token, host URL and project key are missing. The Netlify preview test was skipped intentionally.
- The exact names to select as required check runs should be taken from a current successful PR run: `Typecheck, build website, and validate free OTA bundle`, `Analyze actions`, `Analyze java-kotlin`, and `Analyze javascript-typescript`. The Android debug APK workflow must also be required by its exact check-run name from the successful Android PR workflow. Do not guess a display name in settings.
- Netlify currently publishes commit `32d8df7a2461993a3826b9b831d50e63a95f61fc`, not current main. No current-main production build was triggered.
- Site env inventory: only `VITE_FIREBASE_APPCHECK_ENTERPRISE_SITE_KEY` exists. It is marked secret and scoped to Builds/Functions/Runtime; do not change without verified replacement key. No other server-side integration variables were visible. Refer to `docs/PRIVACY_SECURITY_CONTROLS.md` for the exact absent variable list and gating instructions.
- Since the integration cannot manage rulesets/security toggles or inspect MFA/collaborators, the owner must apply and verify these settings in GitHub before issue closure. No CODEOWNERS file should be created until two independent maintainers have been confirmed.


## Single-maintainer policy correction — 13 November 2026

The repository owner confirmed that `curivahomoeopathy` and `premmore0552` are both their own GitHub accounts. They are not separate humans and must never be used to simulate independent review. The newer `curivahomoeopathy` account currently has repository admin; the original `premmore0552` account currently has write access.

Until a second trusted human maintainer is added, the workable protection profile is: active main ruleset; require a pull request; require the website validation, Android debug APK and three CodeQL jobs; require resolved review conversations; prohibit force-push and deletion; bypass list empty; required approving reviews = 0. This removes direct pushes and enforces automated gates without creating a self-approval deadlock. It is intentionally weaker than independent human review. After a second person is added, change required approvals to one independent reviewer and revisit CODEOWNERS.

The Android workflow previously used path filters and could be skipped on documentation-only PRs. A required check that is not triggered can remain pending and prevent merging. Its PR trigger is therefore changed in the accompanying change to run on every PR targeting main. This makes the `Build installable Android debug APK` check consistently available, at the cost of extra CI minutes. The SonarQube scan is not a required check until the owner configures its token, host URL and project key.
