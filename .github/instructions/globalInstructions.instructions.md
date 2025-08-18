---
applyTo: '**'
---

-  Before starting code changes Provide a brief step-by-step plan.
- Must follow DDD, SOLID, Clean Architecture.
- Folder structure must follow DDD.
- No file should exceed 60 lines; if longer, split.
- No line should exceed 80 characters, if a line exceeds this limit, it must be split.
- Code must be well formated and readable .
- Every variable, parameter, or attribute must have a descriptive name that clearly expresses its purpose in context.
- Check file sizes by reading them (no shell commands).
- All code must be documented in /docs following the standard folder structure (overview, architecture, domains, api, standards, operations, security).
- Each module must have its own file in /docs/domains/ including: scope, RFs, data model, API references, permissions, and acceptance criteria.
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain docs.
- Vars, comments and code must be in English.
- Every file must have a header comment with the file name, file-specific purpose (at least 3 sentences, all related to the logic and functionality), and a brief legend: 'All Rights Reserved. Arodi Emmanuel'.
- Give each task a .md file in 'docs/' with the task description, the expected result, and the actual result and update after every modification. Check status of the files before start planning/coding.

BackEnd rules defined at '.github/chatmodes/backend.chatmode.md'.

FrontEnd rules defined at '.github/chatmodes/frontEnd.chatmode.md'.

Front/Back anti-drift

- OpenAPI → SDK (no direct fetch/axios).
- Zod at runtime.
- React Query with stable/invalidated keys.
- ETag + If-Match and Idempotency-Key.
- v1 additive only (breaking → v2).
- No hardcoded URLs.
- No direct date/time manipulation; use a centralized date/time utility.

CI

- Husky:
  - pre-commit: lint + format + max-lines.
  - pre-push: test + typecheck + build.
- Commitlint.
- CI fails on:
  - lint/tests/build failure.
  - Invalid OpenAPI.
  - SDK/type mismatch.
- Abstractions over implementations:
  - Define ports/interfaces in Domain/Application and depend only on them (DIP).
  - Adapters live in Infrastructure.
  - No direct imports of 3rd-party libs (HTTP/DB/SDK) outside Infrastructure.
  - Wiring only in a composition root via constructor injection.
- Use design patterns and follow international standards.

Limits

- No over-engineering.
- No premature optimization.
- No direct error messages from backend to UI; map to localized user-friendly messages
- Avoid static singletons; prefer dependency injection.
- All env vars must be typed, validated at startup, and documented
