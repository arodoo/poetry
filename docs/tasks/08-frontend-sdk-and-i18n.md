<!--
File: 08-frontend-sdk-and-i18n.md
Purpose: Task log for migrating frontend to generated SDK and setting up
an i18n provider scaffold. Locale-prefixed routes and full translations
are deferred to Task 19. All Rights Reserved. Arodi Emmanuel
-->

# Task 08 — Frontend SDK baseline and i18n scaffold

Description

- Generate/import SDK and replace direct fetch/axios in a sample hook.
- Add i18n provider scaffold with default locale and message loader.
- Do not change routes yet; locale prefix happens in Task 19.

Expected Result

- SDK available and used in one sample feature. i18n provider mounted at app
  root with basic messages.

Actual Result

- Implemented temporary SDK wrapper at src/shared/sdk/index.ts.
- Added i18n scaffold at src/shared/i18n and wrapped App in main.tsx.
- No direct fetch usage in app code for health sample.

Status: Completed Last updated: 2025-08-18 Links

- SDK: 22-sdk-generation-and-integration.md
- i18n completion: 19-frontend-i18n-and-a11y.md
