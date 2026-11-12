# GitHub repository protection for Curiva

_Last verified: 12 November 2026 (post-PR #84)_

This runbook covers GitHub controls that are repository/account settings, not source-code changes. The connected GitHub integration can read repository files and CI results but cannot administer branch protection, repository rulesets, secret-scanning settings, push protection, or account MFA. A repository owner must complete and verify those settings in GitHub.

## Current verified state

- The default branch is `main`.
- The repository rulesets endpoint returned an empty list on 12 November 2026.
- GitHub's branch listing currently reports `main` as protected, but the embedded protection summary shows required status-check enforcement off and no required contexts/checks. The detailed protection endpoint returns HTTP 403 to this integration. Treat the branch as only partially protected; approval, conversation, force-push and deletion rules are not verified.
- `.github/dependabot.yml` already schedules weekly npm and GitHub Actions updates. This does not prove Dependabot security alerts are enabled.
- There is no `.github/CODEOWNERS` file. Do not enable “Require review from Code Owners” until at least two active human maintainers are listed; otherwise PRs authored by the only listed owner may become impossible to approve.
- PR #83 merged on 12 November 2026. Its branch checks passed for website verification and Android build; JavaScript/TypeScript CodeQL passed. Recheck the latest main-commit runs before selecting exact required check names.

## Protect `main`

In the repository, open **Settings → Rules → Rulesets → New branch ruleset**.

Use the following baseline:

1. Name the ruleset **Protect main** and set enforcement to **Active**.
2. Target the branch name `main`.
3. Require a pull request before merging. Do not permit direct pushes to `main`.
4. Require at least one approval from a person other than the PR author, once a second trusted human maintainer with write access has been verified. If no independent reviewer exists yet, designate one before enabling the approval count; otherwise the ruleset can block every merge.
5. Dismiss stale approvals when new commits are pushed.
6. Require all review conversations to be resolved.
7. Block force pushes and branch deletion.
8. Require the following successful checks. Select the exact check-run names shown by GitHub for a successful PR run; GitHub may display the workflow name alongside each job:
   - `Typecheck, build website, and validate free OTA bundle`
   - `Build installable Android debug APK`
   - `Analyze actions`
   - `Analyze java-kotlin`
   - `Analyze javascript-typescript`
9. Consider requiring the branch to be up to date before merging. This gives stronger integration confidence but can require more frequent CI reruns.
10. Keep the bypass list empty for ordinary contributors. If an emergency bypass is necessary, restrict it to a named, accountable maintainer and review its use.

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
- Keep at least two trusted humans able to review and merge urgent security fixes, if the project needs continuity.
- Never place PATs, app private keys, provider credentials, service-account JSON, or signing keys in issues, PR comments, build logs, or repository files.

## Post-configuration verification

After saving the ruleset:

1. Open a small test PR against `main`.
2. Confirm GitHub blocks merging until all required jobs pass and the required independent approval is present.
3. Confirm a new commit dismisses stale approvals.
4. Confirm unresolved review conversations block merging.
5. Confirm direct pushes, force pushes, and branch deletion are blocked by policy. Do not test force-push or deletion against the production branch; inspect the ruleset configuration instead.
6. Record the ruleset name, required checks, reviewer policy, security feature states, and verification date in the security audit document.

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
