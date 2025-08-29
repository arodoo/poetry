/*
 File: i18nProvider.test.tsx
 Purpose: Legacy aggregate test file replaced by granular provider
 test specs to satisfy line-count constraints. See individual
 provider.*.test.tsx files in this folder. All Rights Reserved.
 Arodi Emmanuel
*/
import { describe, it } from 'vitest'

// Tests moved to granular files due to 40-line limit:
// - provider.fetchLocale.test.tsx
// - provider.interpolate.test.tsx
// - provider.missingKey.test.tsx
// - provider.fallback.test.tsx
// - provider.allKeys.test.tsx
// - provider.manualSwitch.test.tsx

describe('I18nProvider Legacy', () => {
  it('redirects to granular test files', () => {
    // This file is kept as a stub for documentation purposes
    // All actual tests are in the granular provider.*.test.tsx files
  })
})
