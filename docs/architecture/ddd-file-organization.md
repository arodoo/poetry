/\*\*

- File: ddd-file-organization.md
- Purpose: Documents DDD file organization patterns for frontend and hardware.
- Prevents "file soup" where different concerns mix in the same folder.
- All Rights Reserved. Arodi Emmanuel \*/

# DDD File Organization Patterns

## Frontend Feature Structure

```
features/<feature>/
  api/           → SDK wrappers, fetch functions
  components/    → Presentational React components
  hooks/         → React Query hooks (useX)
  model/         → Types, Zod schemas, mappers
  pages/         → Route-level pages ONLY (*.Page.tsx)
  routing/       → Route config, guards
  locales/       → i18n JSON files
```

### Pages Folder Rules

**ALLOWED:** `*Page.tsx` only

**MUST MOVE OUT:**

- `*helpers.ts` → `model/`
- `*handlers.ts` → `hooks/` or `api/`
- `use*.ts` → `hooks/`
- `*Section.tsx` → `components/`
- `*Form.tsx` → `components/`
- `*columns.tsx` → `components/` or `model/`

## Hardware Adapter Structure

```
infrastructure/adapters/
  <domain>/           → Group by domain/device
    <Device>Adapter.ts
    <Device>Service.ts
```

**Pattern**: Group related files by domain (fingerprint/, relay/, bridge/).

## Validation

Run: `npm run check:ddd-organization`

Location: `tools/ci/structure/check-ddd-organization.mjs`
