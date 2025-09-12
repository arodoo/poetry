# Git Hooks Strategy

# File: docs/operations/git-hooks.md

# Purpose: Document local Git hook responsibilities and ordering.

# All Rights Reserved. Arodi Emmanuel

## Overview

This document defines the enforced local workflow using Git hooks managed by
Husky. The objective is to:

- Fail fast on formatting, structure, and contract issues.
- Validate commit message semantics before expensive tasks.
- Defer slow quality gates (types, tests, builds) until push time.

## Hook Order (Git Native)

Git executes relevant hooks in this order during a commit/push lifecycle:

1. `pre-commit`
2. `prepare-commit-msg` (not used here)
3. `commit-msg`
4. (Later) `pre-push`

## Responsibilities by Hook

### pre-commit (FAST + TS typecheck)

Static validations under ~15s total, plus lightweight TypeScript typecheck to
surface IDE errors during the commit attempt:

- File headers present
- Line length / file length limits
- i18n hardcoded string scan
- OpenAPI contract validation
- SDK drift check
- Module structure check (DDD compliance)
- Frontend i18n key generation + verification
- TypeScript typecheck (frontend only, `tsc --noEmit`)
- Lint-staged formatting
- Frontend lint (strict, autofix where safe)
- Backend lint

### commit-msg

- Enforces Conventional Commit format via `commitlint`.
- Fails immediately if the commit message is invalid. This ensures we do not run
  heavy tasks for commits that would be rejected in review / automation.

### pre-push (HEAVY)

Runs only when code is about to leave the workstation:

- Type checking (workspace; redundantly ensures no drift since commit time)
- Frontend tests
- Backend tests
- Frontend production build
- Backend Maven package (skip test re-run)

If any step fails, the push is blocked.

## Rationale

| Concern              | Placement  | Reason                                                |
| -------------------- | ---------- | ----------------------------------------------------- |
| Commit format        | commit-msg | Semantic correctness tied to the commit object itself |
| Fast static checks   | pre-commit | Immediate feedback; low cost                          |
| Expensive validation | pre-push   | Avoid re-running on every amend / small fix           |

## Developer Workflow Impact

- You get quick failures for formatting or missing headers before writing a full
  commit message.
- A malformed commit message fails instantly after editing without wasting
  test/build time.
- Heavy tasks only run when sharing work (push), reducing local friction.

## Bypass Policy

Developers SHOULD NOT bypass hooks. If an emergency bypass is required:

```
git commit --no-verify
```

Follow-up: fix issues before pushing (pre-push will still enforce heavy gates).

## Future Enhancements (Optional)

- Add a `prepare-commit-msg` hook to auto-suggest scopes based on changed paths.
- Cache typecheck results (e.g., incremental TS build) to reduce pre-push
  latency.
- Parallelize frontend/backend tests if CI parity maintained.

## Acceptance Criteria

- Commit with bad message: blocked before heavy tasks.
- Commit with TS errors: blocked in pre-commit with clear file/line output.
- Commit with lint error: blocked in pre-commit.
- Push with failing tests: blocked in pre-push.
- No builds run in pre-commit.

## Security & Integrity

- No secrets exposed in hooks.
- All scripts exit non-zero on failure.

## Maintenance

Keep hook scripts under 80 lines; refactor into `tools/ci` helpers if they grow.
