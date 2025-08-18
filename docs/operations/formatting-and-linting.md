---
File: formatting-and-linting.md
Purpose: Documents repository-wide formatting
and linting standards, including 60-character
line width enforcement and tools used. All Rights
Reserved. Arodi Emmanuel
---

Overview

- We enforce a strict 60-char max line length and <= 60 lines per file.
- Frontend uses Prettier + ESLint with max-len.
- Backend uses Spotless (Eclipse formatter) and Checkstyle LineLength.

Architecture

- Standards are applied across DDD layers without mixing UI concerns with domain
  logic.

Operations

- Frontend
  - npm run format
  - npm run lint
  - npm run build
- Backend
  - ./mvnw clean verify

Standards

- .editorconfig and .prettierrc are the sources of truth for formatting.
- Backend formatter profile is in .eclipse-formatter.xml.
- Checkstyle rules in checkstyle.xml.
