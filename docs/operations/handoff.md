<!--
File: handoff.md
Purpose: Handoff notes for the next agent to continue reconstruction work.
All Rights Reserved. Arodi Emmanuel
-->

# Handoff — Reconstruction Work

Date: 2025-08-15

Current State

- Step 1 audit completed (see architecture/reconstruction-audit.md).
- Backend foundation partially aligned: API index, /api/v1/health, RFC7807
  handler, OpenAPI (/v3/api-docs), Actuator restricted, JSON logs; tests
  passing.
- Tasks created under docs/tasks with status.

How to Run

- Backend: Java 21. `mvn -q -DskipTests=false test` then `mvn spring-boot:run`.
- OpenAPI: available at /v3/api-docs, Swagger UI enabled.

Next Steps (brief plan)

1. Refactor remaining files to English and add headers (Task 03).
2. Port Auth and User modules to DDD structure with /api/v1 (Task 04).
3. Implement ETag/If-Match and Idempotency-Key (Task 05).
4. Add typed env validation and config object (Task 06).
5. Configure timeouts/retries for DB/HTTP (Task 07).
6. Generate SDK from OpenAPI and migrate frontend; enforce i18n routes (Task
   08).
7. Enforce 60-line limit and split large files (Task 09).
8. Complete domain docs and CI hooks/guards (Tasks 10–11).

Conventions

- DDD structure; English-only; header in every file; <= 60 lines per file.
- RFC7807 errors; OpenAPI in docs/api; no hardcoded URLs; centralized date/time.

References

- Tasks overview: ../tasks/readme.md
- Audit: ../architecture/reconstruction-audit.md
- Backend code: ../../poetry-backend/
