---
applyTo: '**'
---

## Development Workflow Rules

## Development Workflow Rules

- For file length/size checks, use: `npm run max-lines:check`
- For ESLint validation, use: `npm run lint`

- Before starting a new work, give a brief explanation of the task
- Don't stop coding until the task is fully complete if the plan is clear
- All code contributions must be production ready, no TODO, FIXME, or
  commented-out code.
- Must follow DDD, SOLID, Clean Architecture
- Every variable, parameter, or attribute must have a descriptive name that
  clearly expresses its purpose in context (e.g. `response` instead of `r`)
- Code must be in first place LOGIC in relation to the environment, the
  intention must be long term code (Code which won't get broken in 1 or 2 years)
- IMPORTANT: No file should exceed 60 lines; (test files < 40 lines>), in
  frontEnd no line should exceed 80 characters, in backend is 100,
  (fixtures/helpers/components, etc)
- Code must follow international formatting standards: ESLint + Prettier for
  TypeScript, and Google Java Style Guide
- Each module must have its own file in /docs/domains/ including: scope, RFs,
  data model, API references, permissions, and acceptance criteria
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain
  docs.
- Vars, comments and code must be in English
- Every file must have a header comment, check 'tools\ci\check-headers.mjs'
- Use design patterns and follow international standards

## Commit musts

When commit:  
Use exactly one `-m` with plain ASCII in double quotes, formatted as
`type: subject` (no scope).  
Never include any chaining, substitution, redirection, or line-break symbols
(e.g. `; | & $ < > ( ) \` LF CR \n \r backticks or any shell operator). When
line/length limit violation occurs, split big files into smaller dedicated ones.
Never remove, modify, compact existing logic to fit the line/length limit. I'll
always prefer more files than refactoring or compacting existing logic.

- Run git add and git commit as separate commands
- Check .husky\commit-msg for commit message must

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
