# CI Fixing Report (fresh)

Date: 2025-10-24

Summary
-------
- Goal: Run CI checkers one-by-one and produce a current status report for follow-up fixes.
- Scope: headers, frontend lint, frontend typecheck, frontend build, frontend unit tests, OpenAPI/SDK hash, Playwright E2E.

Results (per-check)
-------------------
1) Headers check
   - Command: `node tools/ci/headers/check-headers.mjs`
   - Result: PASS — "✅ Headers valid (1503 files checked)"

2) Frontend lint (ESLint)
   - Command: `npm --prefix poetry-frontend run lint`
   - Result: PASS with deprecation warning
   - Notes: ESLint ran and returned without reported rule failures in this run. A deprecation warning was emitted:
     - "ESLintIgnoreWarning: The ".eslintignore" file is no longer supported. Switch to using the 'ignores' property in eslint.config.js"
   - Action: Replace `.eslintignore` by declaring ignores in `eslint.config.js` to eliminate the warning (low risk, non-blocking).

3) Frontend typecheck
   - Command: `npm --prefix poetry-frontend run typecheck`
   - Result: PASS — TypeScript checks completed after i18n generation and verification (no errors printed).

4) Frontend build
   - Command: `npm --prefix poetry-frontend run build`
   - Result: PASS — Vite built production assets successfully (built in ~4.7s).

5) Frontend unit tests (vitest)
   - Command: `npm --prefix poetry-frontend run test`
   - Result: PASS — 126 test files; 188 tests passed. Some i18n fetch warnings visible in test logs but not failing tests (tests use fallback locales).

6) OpenAPI / SDK hash check
   - Command: `node tools/ci/openapi/check-openapi-hash.mjs`
   - Result: PASS — SDK hash matches generated spec at `docs/api/backend-generated/v1/openapi.yaml`.
   - Notes: There is an existing temporary `.redocly.lint-ignore.yaml` in the repo (created earlier). The OpenAPI linter was not explicitly executed here; if you want full linting, run Redocly linter and fix the generated spec or update generation.

7) Playwright E2E tests
   - Command: `npm --prefix poetry-frontend run pw:test -- --reporter=list`
   - Result: PARTIAL — 103 tests executed, 93 passed, 10 failed. (Command exited with code 1.)
   - Failures (10):
     1. `tests/e2e/memberships/membership-detail-delete-navigation.spec.ts` — Timeout waiting for `getByTestId('delete-membership-button')` to be visible
     2. `tests/e2e/subscriptions/subscriptions-edit.spec.ts` — Timeout waiting for PUT `/api/v1/subscriptions/:id` response
     3. `tests/e2e/tokens/tokens-ui-font-visual.spec.ts` — Timeout waiting for CSS change after saving tokens
     4. `tests/e2e/tokens/tokens-ui-fontSize-visual.spec.ts` — Timeout waiting for CSS change
     5. `tests/e2e/tokens/tokens-ui-radius-visual.spec.ts` — Timeout waiting for CSS change
     6. `tests/e2e/tokens/tokens-ui-shadow-visual.spec.ts` — Timeout waiting for CSS change
     7. `tests/e2e/tokens/tokens-ui-spacing-visual.spec.ts` — Timeout waiting for CSS change
     8. `tests/e2e/tokens/tokens-ui-theme-visual.spec.ts` — Timeout waiting for CSS change
     9. `tests/e2e/ui/button-vars/individual-buttons.spec.ts` — Expected delete button visible but locator not found
     10. `tests/e2e/ui/button-vars/visual-diff.spec.ts` — Timeout evaluating locators for visual diff

   - Common failure modes observed:
     - Timeouts waiting for DOM visibility or network responses (likely flaky waits in tests).
     - Several token-visual tests rely on CSS property changes; these can be brittle when fonts/styles load slower in CI or when optimistic UI updates are not applied.

Immediate recommendations / next steps
-----------------------------------
1. Prioritize E2E fixes (high):
   - Harden E2E wait helpers used by token tests: increase timeouts, use the `data-tokens-refetched` attribute (app-side marker) or explicit network response waits, and prefer computed style checks where appropriate.
   - Make selectors less brittle: prefer explicit test ids for action buttons used in visual comparisons (e.g., ensure `data-testid` exists on the delete button locator used by tests).
   - Ensure deterministic fonts for CI: confirm `poetry-frontend/public/fonts` contains committed `.woff2` files and that the test loader uses local first in CI.

2. OpenAPI lint (medium):
   - Remove the temporary `.redocly.lint-ignore.yaml` and resolve the problems, or regenerate the OpenAPI spec from backend (`npm run update:openapi`) and re-run the linter. Note: generated specs should be fixed upstream where practical.

3. Cleanup: replace `.eslintignore` usage by adding `ignores` to `eslint.config.js` to remove the deprecation warning.

Appendix: commands I ran
------------------------
- node tools/ci/headers/check-headers.mjs
- npm --prefix poetry-frontend run lint
- npm --prefix poetry-frontend run typecheck
- npm --prefix poetry-frontend run build
- npm --prefix poetry-frontend run test
- node tools/ci/openapi/check-openapi-hash.mjs
- npm --prefix poetry-frontend run pw:test -- --reporter=list

If you want I can now:
- (A) Tackle the E2E failing tests one-by-one (conservative test-side fixes + rerun the failing tests).
- (B) Run a full Redocly OpenAPI lint and generate a detailed list of issues to fix in the generated spec.

— End of report
