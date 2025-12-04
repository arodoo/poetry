# DDD File Organization Patterns

Rules for organizing files within DDD layers. Prevents "file soup" where
different concerns mix in the same folder.

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

**ALLOWED in pages/:**

- `*Page.tsx` - Route-level page components

**MUST MOVE OUT of pages/:**

- `*helpers.ts` → `model/` or feature-specific `utils/`
- `*handlers.ts` → `hooks/` as mutations or `api/`
- `use*.ts` → `hooks/`
- `*Section.tsx` → `components/`
- `*Form.tsx` → `components/`
- `*columns.tsx` → `components/` or `model/`

### Example Violations (users feature)

| File                                | Current | Should Be      |
| ----------------------------------- | ------- | -------------- |
| `userBreadcrumbHelpers.ts`          | pages/  | model/         |
| `userCreateHandlers.ts`             | pages/  | hooks/ or api/ |
| `useUsersCreatePage.ts`             | pages/  | hooks/         |
| `UsersCreateFingerprintSection.tsx` | pages/  | components/    |
| `userFormSections.tsx`              | pages/  | components/    |
| `usersListColumns.tsx`              | pages/  | components/    |

## Hardware/Backend Adapter Structure

```
infrastructure/adapters/
  <domain>/           → Group by domain/device
    <Device>Adapter.ts
    <Device>Service.ts
    ...
```

### Adapters Folder Rules

**Pattern**: Group related files by domain or device type.

**MUST organize by domain:**

- `fingerprint/` - All R503/fingerprint adapters and services
- `relay/` - All relay adapters
- `bridge/` - HTTP bridge communication (already done)

### Example Violations (poetry-hardware)

| File                          | Current   | Should Be             |
| ----------------------------- | --------- | --------------------- |
| `R503CommandExecutor.ts`      | adapters/ | adapters/fingerprint/ |
| `R503EnrollmentService.ts`    | adapters/ | adapters/fingerprint/ |
| `R503ImageCapture.ts`         | adapters/ | adapters/fingerprint/ |
| `SerialFingerprintAdapter.ts` | adapters/ | adapters/fingerprint/ |
| `UsbFingerprintAdapter.ts`    | adapters/ | adapters/fingerprint/ |
| `MockFingerprintAdapter.ts`   | adapters/ | adapters/fingerprint/ |
| `SerialRelayAdapter.ts`       | adapters/ | adapters/relay/       |
| `MockRelayAdapter.ts`         | adapters/ | adapters/relay/       |

## Validation Checklist

Before committing, verify:

1. **pages/** contains ONLY `*Page.tsx` files
2. **adapters/** files are grouped in domain subfolders
3. No helpers/handlers/hooks mixed in pages/
4. No services mixed directly in adapters/ root

## Future CI Checker

A checker script will enforce:

- `pages/` only contains files matching `*Page.tsx`
- `adapters/` root only contains subdirectories, no loose files
- Each adapter subdirectory groups related concerns

Location: `tools/ci/structure/check-ddd-organization.mjs`
