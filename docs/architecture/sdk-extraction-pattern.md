# SDK Response Extraction Pattern

**File:** `docs/architecture/sdk-extraction-pattern.md`  
**Purpose:** Documents the mandatory pattern for extracting data from generated SDK responses to ensure consistency, maintainability, and DRY principles across all API wrappers.  
**All Rights Reserved. Arodi Emmanuel**

---

## Overview

All SDK wrapper functions (mutations and queries) MUST use the centralized `extractSdkData()` helper when extracting response data from generated SDK calls.

## The Pattern

### ✅ Correct Usage

```typescript
import { extractSdkData } from '../../../shared/api/extractSdkData'
import { someApiCall, type SomeResponse } from '../../../api/generated'

export async function myWrapper(input: SomeInput): Promise<SomeDetail> {
  const responseUnknown = (await someApiCall({
    body: input,
  } as unknown as Parameters<typeof someApiCall>[0])) as unknown
  
  const data = extractSdkData(responseUnknown) as SomeResponse
  return parseDetail(data)
}
```

### ❌ Incorrect Usage (Forbidden)

```typescript
// DON'T: Inline extraction pattern
const resp = responseUnknown as { data?: unknown }
const data = (resp.data ?? {}) as SomeResponse

// DON'T: Direct casting
const data = (responseUnknown as { data?: unknown }).data as SomeResponse
```

## Rationale

1. **DRY Principle**: Single location for response extraction logic
2. **Maintainability**: Changes to SDK response shape require one fix
3. **Type Safety**: Centralized narrowing reduces casting errors
4. **Consistency**: All wrappers follow identical pattern
5. **Scalability**: Easy to add logging, error handling, or metrics

## Enforcement

This pattern is enforced by CI/CD:

```bash
npm run check:sdk-extraction
```

The checker scans all SDK wrapper files and fails if inline extraction patterns are detected.

## Integration Points

- **Pre-commit**: Husky runs the checker before commits
- **CI Pipeline**: Automated checks in GitHub Actions
- **Package Scripts**: `npm run check:sdk-extraction`

## Migration Guide

When updating existing SDK wrappers:

1. Import `extractSdkData` from `src/shared/api/extractSdkData.ts`
2. Replace inline extraction with `extractSdkData(responseUnknown) as YourType`
3. Remove intermediate variables like `resp = responseUnknown as { data?: unknown }`
4. Run `npm run check:sdk-extraction` to verify compliance

## Examples

See reference implementations:
- `src/features/zones/api/zonesMutations.ts`
- `src/features/seller-codes/api/sellerCodesMutations.ts`
- `src/features/memberships/api/membershipsMutations.ts`

## Questions?

This pattern keeps generated SDK files untouched while providing type-safe, maintainable wrappers. If you encounter edge cases or need clarification, document them in this file.
