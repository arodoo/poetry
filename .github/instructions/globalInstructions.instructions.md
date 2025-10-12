---
applyTo: '**'
---

## Global Considerations

- Backend, Frontend and Mobile are always running in default ports and the three run with hot-reload
- backend has drop-create at startup, so db is recreated each time 
- backend endpoints require authentication
- Frontend can't have types or schemas definitios if they are not fixed to generated SDK gems
- don't adjust my app to your solution, adjust your solution to my app

## Architecture & Documentation

### Architecture References
- Backend rules: `.github/chatmodes/backend.chatmode.md`
- Backend blueprint: `docs/architecture/module-blueprint.md`
- Database blueprint: `docs/architecture/db-architecture-blueprint.md`
- Frontend rules: `.github/chatmodes/frontend.chatmode.md`
- Frontend blueprint: `docs/architecture/frontEnd-module-blueprint.md`
- Mobile rules: `.github/chatmodes/mobile.chatmode.md`
- Mobile blueprint: `docs/architecture/mobile-module-blueprint.md`

### Logs
- Backend logs at logs\backend\backend-dev.log
- Frontend logs at logs\frontend/frontend-dev.log
- Mobile logs at logs\mobile/mobile-dev.log

## Development Standards

### Code Quality Rules
- Production-ready code only (no TODO, FIXME, or commented-out code)
- Follow DDD, SOLID, Clean Architecture
- Long-term focus: write code that won't break in 1-2 years
- Descriptive naming (e.g. `response` vs `r`)
- English for code, comments, and vars
- When try/catch, catch should always trow the specific error, never be empty 

### Formatting & Style
- ESLint + Prettier (TS/JS), Google Java Style Guide (Java)
- File header required: name, 3+ sentence purpose, rights legend
- Module docs in /docs/domains/, API contracts in /docs/api/

### Error Handling
- All errors explicitly handled or resolved
- Never suppress, hide, or ignore errors
- No hardcoded messages; use i18n keys
- No over-engineering or premature optimization
- Prefer dependency injection over static singletons
- All env vars typed, validated at startup, documented

## API & SDK Management

### OpenAPI & SDK
- **CRITICAL**: Update OpenAPI spec using `npm run update:openapi` ONLY (uses /v3/api-docs.yaml endpoint)
- OpenAPI contracts defined at 'docs\api\backend-generated\v1\openapi.yaml
- OpenAPI → SDK (no direct fetch/axios)
- SDK FrontEnd generation (`npm run sdk:generate`): SDK up to date with OpenAPI. Command at poetry-frontend\package.json
- Mobile SDK generation (`npm run mobile-sdk:generate`): Mobile SDK up to date with OpenAPI. Command at poetry-mobile\package.json

### Front-Mobile/Back Anti-Drift
- Zod at runtime validation
- React Query with stable/invalidated keys
- ETag + If-Match, Idempotency-Key headers
- v1 additive only (breaking → v2)
- No hardcoded URLs or direct date manipulation

## Testing Strategy

### Test Organization
- Frontend tests: `poetry-frontend/src/tests/<feature>/`
- Frontend e2e: `poetry-frontend/tests/e2e/<feature>/`
- Mobile tests: `poetry-mobile/src/tests/<feature>/`
- Mobile e2e: `poetry-mobile/tests/e2e/<feature>/`
- Backend tests: `poetry-backend/src/test/<feature>/`

### Test Utilities
- Reusable login: `poetry-frontend\tests\e2e\shared\providers\tokenProvider.ts`
- Reusable mobile: `poetry-mobile\tests\e2e\shared\providers\tokenProvider.ts`

### Test Best Practices
- Tests must reflect correct behavior, not simulate it
- Fix issues discovered by tests, don't mask them
- Use data-testid, not text selectors
- DIP: Domain/Application define ports, Infrastructure implements
- No 3rd-party lib imports outside Infrastructure

## Pre-Commit Checks (Husky)

1. File Headers (`node tools/ci/headers/check-headers.mjs`): name, 3+ sentence purpose, rights legend
2. Line/Char Limits (`node tools/ci/limits/check-lines.mjs`): 80 lines/file, 80 chars/line (JSON excluded). Split large files. Don't compress code.
3. i18n Strings (`node tools/ci/i18n/i18n-scan.mjs`): No hardcoded UI text, use i18n keys
4. OpenAPI (`npm run validate:openapi`): Valid spec at `docs/api/openapi-v1.yaml`
5. SDK Sync (`npm run check:sdk-sync`): Frontend SDK matches OpenAPI, no direct fetch/axios
6. Module Structure (`npm run check:backend-modules`): DDD structure per blueprints
7. Formatting (`npx lint-staged`): Prettier (TS/JS), Spotless (Java)
8. Linting: ESLint --max-warnings=0 (frontend), Checkstyle (backend)
9. Config Sync: ESLint/Checkstyle match `code-standards.config.json`
10. Theme checker (`npm run check:hardcoded-colors`): No hardcoded colors, use theme tokens
11. SDK FrontEnd generation (`npm run sdk:generate`): SDK up to date with OpenAPI. Command at poetry-frontend\package.json
12. Mobile SDK generation (`npm run mobile-sdk:generate`): Mobile SDK up to date with OpenAPI. Command at poetry-mobile\package.json

## Pre-Push Checks

1. Typecheck (`npm run typecheck`): TS/Java compile without errors
2. Tests: `npm run test:frontend`, `npm run test:backend` (all pass)
3. Builds: Frontend (Vite), Backend (Maven package)

## Commit Format

Use one `-m` flag with plain ASCII: `type: subject` (no scope/body)

- Examples: `feat: add user login`, `fix: resolve token refresh`
- Forbidden chars: `;, |, &, $, <, >, (, ), \, :` LF CR \n \r backticks
- Keep messages short, descriptive, English only.
- Execute one command at a time, don't chain with `&&` or `;`

## Extra Notes

- PWA-ready architecture (consider offline, caching, service workers)
- Avoid using python scripts for tasks npm can handle
- Length, typecheck, lint, headers validated via `tools/ci/` scripts
- Check limits: `npm run check:file-length`
- Check headers: `npm run check:file-headers`
- Check colors: `npm run check:hardcoded-colors`
- Scan i18n: `npm run check:hardcoded-strings`
- Check modules: `npm run check:backend-modules` and `npm run check:frontend-modules`
- Validate OpenAPI: `npm run validate:openapi`
- Check SDK sync: `npm run check:sdk-sync`
- Check manual fetch calls: `npm run check:manual-fetch-calls`
- Full CI suite: `npm run ci`
