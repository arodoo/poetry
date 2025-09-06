<!--
File: 05-idempotency-and-etag.md
Purpose: Task log for ETag/If-Match and Idempotency-Key on idempotent endpoints.
All Rights Reserved. Arodi Emmanuel
-->

> ### COMPLETED

# Task 05 — Idempotency and ETag

Description

- Implement ETag/If-Match validators and Idempotency-Key handling for applicable
  endpoints.

Expected Result

- Safe retriable operations with no duplication; tests and docs.

Actual Result

- ETag header via ResponseBodyAdvice using canonical JSON and SHA-256 ETagPort.
- If-Match enforced on PUT/DELETE /api/v1/users/{id}; 428 when missing, 412 on
  mismatch.
- Idempotency-Key persisted via JPA; duplicates across restarts return 409.
- Docs and OpenAPI updated to include headers; tests added and pass locally.

Status: Done Last updated: 2025-08-17
