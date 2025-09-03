/_ File: module-blueprint.md Purpose: Canonical backend feature module blueprint
ensuring consistent DDD / Clean Architecture structure across all current &
future features. Applies to every CRUD / domain capability (Users, Tokens, Orgs,
etc.) All Rights Reserved. _/

# Backend Feature Module Blueprint

This blueprint defines the mandatory structure, naming and layering rules for
any backend feature. Every new module MUST replicate this layout before code is
merged. No deviations without an ADR.

## 1. Directory & Package Layout

```
domain/<feature>/model/        (aggregates, value objects)
domain/<feature>/service/      (domain services – only if real domain logic)
application/<feature>/port/    (*QueryPort, *CommandPort)
application/<feature>/usecase/ (VerbNounUseCase classes)
infrastructure/jpa/<feature>/  (Entity, Repository, Mapper, JpaAdapter)
infrastructure/memory/<feature>/(InMemoryAdapter, Store, Factory)
interfaces/v1/<feature>/       (Controller, Dtos)
config/<feature>/              (FeatureComposition wiring)
```

## 2. Layer Responsibilities

- Domain: Pure, framework-agnostic. Validation via constructors/factories using
  i18n keys (e.g. user.email.invalid). Immutable preferred (records or final
  fields). No Lombok on new code if a record suffices.
- Application: Orchestrates use cases. One class per action named
  VerbNounUseCase with execute(...). Depends only on ports + domain.
- Infrastructure: Implements ports (JPA, in-memory). Mapping isolated in
  \*Mapper. Transactions only here. No domain → framework imports added.
- Interfaces: REST endpoints → map DTO ↔ domain. Add headers (ETag, caching)
  and HTTP status codes. No business logic.
- Config: Central composition root wiring adapters & use cases.

## 3. Ports & Use Cases

- QueryPort: read operations only (findAll, findById, search...).
- CommandPort: write/state change operations (create, update, delete, activate).
- Each use case: single execute method, explicit parameters (no anemic DTO
  inside application), returns domain model or void.

## 4. DTO & Controller Rules

- Dtos file: <Feature>Dtos with Request/Response records + mapping helpers.
- Controller only: validate (later via @Valid), invoke use case, map result.
- No Map<String,Object> crossing boundaries. Strongly typed records only.

## 5. Naming & Style

- Packages lowercase; classes PascalCase; ports suffix Port; use cases suffix
  UseCase; adapters suffix Adapter; mapper suffix Mapper.
- Descriptive parameter names (firstName not fn). No TODO/FIXME.
- File header comment mandatory.
- <= 80 lines per file (target). Split helpers (Factory, Store, Mapper) early.

## 6. Error & i18n Strategy

- Domain validation throws IllegalArgumentException with i18n key.
- Not found: Define `<Feature>NotFoundException` extending
  `AbstractNotFoundException` (shared base in `domain.shared.exception`).

## 7. Caching / ETag (Read Collections)

- Read model may include version string (semantic or hash). Controller sets:
  ETag: W/"<feature>-<version>".
- Conditional requests honored in future (If-None-Match) – additive only.

## 8. OpenAPI & Frontend Parity

- Each controller path documented under docs/api/openapi/paths/<feature>.
- Any response field change: additive only in v1. Breaking → v2 path segment.
- Frontend consumes via SDK (no raw fetch) + Zod + React Query.

## 9. Tokens Feature Alignment (Action Item)

Refactor Tokens to this blueprint: introduce TokenBundle domain model,
TokensQueryUseCase, TokensDtos, TokensController using typed records only.

## 10. New Feature Checklist

1. Domain model(s) + value objects
2. Ports (QueryPort, CommandPort)
3. Use cases (GetAll, GetById, Create, Update, Delete)
4. Adapter(s) + Mapper + Entity / InMemory
5. Dtos + Controller
6. Composition wiring
7. ETag (if list/read model)
8. OpenAPI path file
9. Domain doc in docs/domains/<feature>.md
10. Tests (domain, use case, adapter, controller)
11. No dynamic Maps crossing layers
12. i18n keys only in messages / errors

## 11. Governance & Enforcement

- Add ArchUnit rules: forbid interfaces layer depending on infrastructure.
- CI script scans for Map<String,Object> in application/ & interfaces/.
- PR template references this file; deviations require ADR.

End of blueprint.
