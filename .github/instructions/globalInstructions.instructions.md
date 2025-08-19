---
applyTo: '**'
---

## Workflow Requirements

- Before starting code changes Provide a brief step-by-step plan
- Check status of the files before start planning/coding

## Core Principles

- Must follow DDD, SOLID, Clean Architecture
- Folder structure must follow DDD
- Use design patterns and follow international standards
- No over-engineering
- No premature optimization

## Code Standards

- No file should exceed 60 lines; if longer, split
- No line should exceed 80 characters, if a line exceeds this limit, it must be
  split
- Code must be well formatted and readable
- Every variable, parameter, or attribute must have a descriptive name that
  clearly expresses its purpose in context
- Vars, comments and code must be in English

## File Requirements

- Every file must have a header comment with the file name, file-specific
  purpose (at least 3 sentences, all related to the logic and functionality),
  and a brief legend: 'All Rights Reserved. Arodi Emmanuel'
- Check file sizes by reading them (no shell commands)

## Documentation Requirements

- All code must be documented in /docs following the standard folder structure
  (overview, architecture, domains, api, standards, operations, security)
- Each module must have its own file in /docs/domains/ including: scope, RFs,
  data model, API references, permissions, and acceptance criteria
- API contracts (OpenAPI) must live in /docs/api/ and be referenced from domain
  docs
- Give each task a .md file in 'docs/' with the task description, the expected
  result, and the actual result and update after every modification

## Architecture Rules

- Abstractions over implementations: Define ports/interfaces in
  Domain/Application and depend only on them (DIP)
- Adapters live in Infrastructure
- No direct imports of 3rd-party libs (HTTP/DB/SDK) outside Infrastructure
- Wiring only in a composition root via constructor injection
- Avoid static singletons; prefer dependency injection
- All env vars must be typed, validated at startup, and documented

## Front/Back Anti-Drift

- OpenAPI → SDK (no direct fetch/axios)
- Zod at runtime
- React Query with stable/invalidated keys
- ETag + If-Match and Idempotency-Key
- v1 additive only (breaking → v2)
- No hardcoded URLs
- No direct date/time manipulation; use a centralized date/time utility

## Testing & CI

### Husky

- pre-commit: lint + format + max-lines
- pre-push: test + typecheck + build
- Commit changes after every task completion

### Commitlint

- CI fails on: lint/tests/build failure, Invalid OpenAPI, SDK/type mismatch

## Error Handling

- All errors should be explicitly handled or resolved in the code or tests
- Errors should never be suppressed, hidden, or ignored to reduce visibility
- No direct error messages from backend to UI; map to localized user-friendly
  messages

## External References

- BackEnd rules defined at '.github/chatmodes/backend.chatmode.md' (Must be read
  if you will interact with backend)
- FrontEnd rules defined at '.github/chatmodes/frontEnd.chatmode.md' (Must be
  read if you will interact with frontend)
