<!--
File: 22-sdk-generation-and-integration.md
Purpose: Generate a TypeScript SDK from OpenAPI and replace direct
fetch/axios in the frontend. Add build step and CI checks. All Rights
Reserved. Arodi Emmanuel
-->

# Task 22 — SDK Generation and Integration

Description

- Configure codegen, output to frontend shared/sdk. Add npm script and CI check
  for drift. Replace network calls with SDK.

Expected Result

- SDK generated and imported. No direct fetch/axios in app code. Types align
  with OpenAPI.

Prerequisites

- 21 — OpenAPI v1 completion.

Unblocks

- 08, 13, 14, 15, 16, 17, 18, 20, 19.

Actual Result

- Interim handcrafted SDK implemented (`src/shared/sdk/index.ts`) exposing
  `createSdk()` with typed methods (`getHealth`, `getTokensRaw`) using ETag
  conditional requests and centralized fetch client abstractions. No UI
  component performs direct `fetch` / `axios` calls.
- Tokens feature, React Query hooks, and provider consume only the SDK surface
  (ensuring a clean seam for generated client replacement).
- OpenAPI spec present at `docs/api/openapi-v1.yaml`; generation pipeline not
  yet wired (no codegen config, scripts, or drift CI check).
- Next steps:
  1. Choose generator (e.g. `openapi-typescript` for types + custom thin runtime
     or `openapi-fetch` for client) aligning with infra constraints.
  2. Add `scripts`: `sdk:gen` (generate), `sdk:check` (diff or checksum),
     integrate into `build` and CI.
  3. Output generated code into `src/shared/sdk/generated/` (keep manual adapter
     `index.ts` as façade to avoid widespread refactors).
  4. Add a test ensuring generated types match a snapshot of schema version
     (fail fast on drift).
  5. Document regeneration procedure in this file and `backend-setup.md`.

Status: In Progress (manual façade in place, generation pending) Last updated:
2025-09-09 Links

- OpenAPI: ../api/openapi-v1.yaml
- Frontend sdk: ../../poetry-frontend/src/shared/sdk
