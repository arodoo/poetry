---
File: header-policy.md
Purpose: Define the repository header policy, enforcement tools, and
process to remediate violations. Provides examples of valid headers and
explains CI/Husky integration that blocks merges when missing. All
Rights Reserved. Arodi Emmanuel
---

Overview

- Every source file must start with a C-style comment header containing:
  - File: <fileName>
  - Purpose: at least three sentences describing logic and responsibilities.
  - Legend: All Rights Reserved. Arodi Emmanuel
- Unsupported formats (JSON, YAML, MD, XML configs) are excluded.

Valid example

/_ File: clientCore.ts Purpose: Core HTTP JSON execution with timeout and retry
policies. Isolates control flow from the client factory to keep files short and
responsibilities separated per SRP. All Rights Reserved. Arodi Emmanuel _/

Tooling

- Local: npm run headers:check
- Pre-commit: runs automatically
- CI: GitHub Actions job step runs and fails on violations

Remediation

- Add or fix the header at the top of the file.
- Ensure the Purpose section has three sentences minimum.
- Keep lines <= configured char limit.
