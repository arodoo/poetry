<!--
File: 31-backend-dev-logging.md
Purpose: Introduce backend dev/build logging scripts that stream
Spring Boot output to logs/backend for observability and parity with
frontend logging utilities. All Rights Reserved. Arodi Emmanuel
-->

# Task 31 — Backend Dev Logging

Description

- Add `tools/logs/backend/dev-with-log.mjs` to run Spring Boot
  (`spring-boot:run`) and tee stdout/stderr to `logs/backend/backend-dev.log`.
- Add `tools/logs/backend/build-with-log.mjs` to run a Maven build with
  `-DskipTests` and capture output in `logs/backend/backend-build.log`.
- Expose npm scripts `dev:backend` and `build:backend:log` at repo root for
  consistent DX.

Expected Result

- Running `npm run dev:backend` starts the backend; log file is created and
  appended live. Stopping process writes a `dev:stop` line with exit code or
  signal.
- Running `npm run build:backend:log` produces a build and writes build
  lifecycle events to the build log file.

Prerequisites

- Maven wrapper present (`poetry-backend/mvnw*`).
- Java toolchain installed (JDK 21 per pom.xml).

Actual Result

- Pending manual verification.

Status: Pending Last updated: 2025-09-20 Links

- Backend root: ../../poetry-backend
- Logging tools: ../../tools/logs/backend
