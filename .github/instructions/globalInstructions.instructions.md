---
applyTo: '**'
---

## Development Workflow Rules

- Before starting a new work, give a brief explanation of the task
- Don't stop coding until the task is fully complete if the plan is clear
- All code contributions must be production ready, no TODO, FIXME, or
  commented-out code.
- Must follow DDD, SOLID, Clean Architecture
- Every variable, parameter, or attribute must have a descriptive name that
  clearly expresses its purpose in context (e.g. `response` instead of `r`)
- Code must be in first place LOGIC in relation to the environment, the
  intention must be long term code (Code which won't get broken in 1 or 2 years)
- Code must follow international formatting standards: ESLint + Prettier for
  TypeScript, and Google Java Style Guide
- Each module must have its own file in /docs/domains/ including: scope, RFs,
  data model, API references, permissions, and acceptance criteria
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain
  docs.
- Vars, comments and code must be in English
- Every file must have a header comment, check 'tools\ci\check-headers.mjs'
- Use design patterns and follow international standards

## CI/CD Quality Gates (Pre-Commit Checks)

All changes are validated by pre-commit hooks before commit. Ensure your code
passes these checks locally to avoid blocked commits:

### 1. File Headers (`node tools/ci/headers/check-headers.mjs`)

- Every file must have a header comment with:
  - File name
  - Purpose (3+ sentences describing what the file does)
  - Rights legend: "All Rights Reserved. Arodi Emmanuel"
- Check format at 'tools\ci\check-headers.mjs'

### 2. Line & Character Limits (`node tools/ci/limits/check-lines.mjs`)

- Max lines per file: **80 lines** (from `code-standards.config.json`)
- Max characters per line:
  - **Backend Java**: 100 characters
  - **Frontend TypeScript/JavaScript**: 80 characters
  - **Default**: 80 characters
- **Exceptions**: JSON files (i18n locales, config files) are excluded
- When limit violations occur:
  - Split files into smaller dedicated files
  - Extract helper classes/functions/components
  - NEVER remove, modify, or compact existing logic to fit limits
  - Always prefer more files than refactoring existing logic

### 3. i18n Hardcoded Strings (`node tools/ci/i18n/i18n-scan.mjs`)

- No hardcoded user-facing messages in code
- All UI text must use i18n keys
- Run `npm --prefix poetry-frontend run i18n:gen` to generate keys
- Run `npm --prefix poetry-frontend run i18n:verify` to verify catalogs

### 4. OpenAPI Contract (`npm run openapi:validate`)

- OpenAPI spec must be valid: `docs/api/openapi-v1.yaml`
- All endpoints must be documented
- Schemas must match implementation

### 5. SDK Sync (`npm run sdk:check`)

- Frontend SDK must be in sync with OpenAPI contract
- If drift detected, run `npm run sdk:sync` to regenerate SDK
- No direct fetch/axios calls; use SDK clients

### 6. Module Structure (`npm run modules:check`)

- All features must follow DDD module structure
- Required files/folders per feature (see blueprints)
- Check detailed report with `npm run modules:check`

### 7. Code Formatting (`npx lint-staged`)

- Prettier for TypeScript/JavaScript
- Spotless for Java
- Auto-formats staged files

### 8. Linting

- **Frontend**: `npm --prefix poetry-frontend run lint:fix -- --max-warnings=0`
  - ESLint with zero tolerance (--max-warnings=0)
- **Backend**: `npm run lint:backend`
  - Spotless + Checkstyle for Java
  - Follows Google Java Style Guide

### 9. Configuration Sync

- ESLint and Checkstyle configs must match `code-standards.config.json`
- Validated automatically during line limit checks
- Run `node tools/ci/config/config-sync.mjs` to fix drift

## Pre-Push Quality Gates (Heavy Checks)

After commit, pre-push hooks run expensive validations before pushing to remote:

### 1. Type Checking (`npm run typecheck`)

- Frontend TypeScript must compile without errors
- Backend Java must compile without errors

### 2. Frontend Tests (`npm run test:frontend`)

- All unit/integration tests must pass
- Tests located in `poetry-frontend/src/tests/<feature>/`

### 3. Backend Tests (`npm run test:backend`)

- All unit/integration tests must pass (Maven)
- Tests located in `poetry-backend/src/test/<feature>/`

### 4. Frontend Build (`npm --prefix poetry-frontend run build`)

- Production build must succeed (Vite)
- Validates all imports, chunks, and assets

### 5. Backend Build (`cd poetry-backend && mvn -q -DskipTests package`)

- Maven package must succeed
- Produces executable JAR

## Commit Message Format

When committing:

- Use exactly one `-m` flag with plain ASCII in double quotes
- Format: `type: subject` (no scope, no body)
  - Examples: `feat: add user login`, `fix: resolve token refresh`
- Never include shell operators or special characters:
  - Forbidden: `; | & $ < > ( ) \ :` LF CR \n \r backticks
- Run `git add` and `git commit` as separate commands
- Keep messages short, descriptive, and in English

  # BackEnd rules

-BackEnd rules are defined at '.github\chatmodes\backend.chatmode.md' (Must be
read if you will create or modify backend code)

BackEnd blueprint for new modules defined at:
'docs\architecture\module-blueprint.md' (Must be read if you will create new
modules or features in the backend) Database architecture blueprint defined at:
'docs\architecture\db-architecture-blueprint.md' (Must be read if you will
create or modify database tables or persistence models)

# FrontEnd rules

- FrontEnd rules are defined at '.github\chatmodes\frontend.chatmode.md' (Must
  be read if you will create or modify frontend code)

FrontEnd blueprint for new modules defined at:
'docs\architecture\frontEnd-module-blueprint.md' (Must be read if you will
create new modules or features in the frontend)

## Front/Back anti-drift

- OpenAPI → SDK (no direct fetch/axios)
- Zod at runtime
- React Query with stable/invalidated keys
- ETag + If-Match and Idempotency-Key
- v1 additive only (breaking → v2)
- No hardcoded URLs
- No direct date/time manipulation; use a centralized date/time utility

  ## Testing & CI

- Reusable login/session defined at
  'tests/e2e/shared/providers/tokenProvider.ts'
- Test must reflect correct application behavior and not only simulate it.
- If test discover an issue, fix the issue and re-run the test. If issue is well
  implemented and test is wrong, fix the test.
- Husky.
- Abstractions over implementations:
  - Define ports/interfaces in Domain/Application and depend only on them (DIP)
  - Adapters live in Infrastructure
  - No direct imports of 3rd-party libs (HTTP/DB/SDK) outside Infrastructure
  - Wiring only in a composition root via constructor injection
  - Test can not lie on text element selectors, use data-testid attributes
  - In frontend test go at 'poetry-frontend\src\tests\<feature\>'
  - Backend test go at 'poetry-backend\src\test\<feature\>'

  ## Error Handling

- All errors should be explicitly handled or resolved in the code or tests
- Errors should never be suppressed, hidden, or ignored to reduce visibility
- No hardcoded error messages; use i18n keys for localization

## Limits

- No over-engineering
- No premature optimization
- Avoid static singletons; prefer dependency injection
- All env vars must be typed, validated at startup, and documented

## Extra notes

- Application will sooner or later be PWA, consider this in your designs.
- Length files limit, type check, linting, headers check, etc. must be checked
  by running npm comands defined at 'tools\ci\'
