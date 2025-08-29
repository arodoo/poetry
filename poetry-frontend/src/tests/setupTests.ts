/*
 File: setupTests.ts
 Purpose: Global test setup for frontend unit tests. Registers
 testing-library jest-dom matchers with Vitest expect.
 All Rights Reserved. Arodi Emmanuel
*/
import { expect } from 'vitest'
// import matcher module in a way that is resilient to ESM/CJS shapes
import * as jestDomMatchers from '@testing-library/jest-dom/matchers'

function getDefault(mod: unknown): unknown {
  if (mod && typeof mod === 'object' && 'default' in mod) {
    const asRecord: Record<string, unknown> = mod as Record<string, unknown>
    return asRecord['default']
  }
  return undefined
}

// Support both `export default` and named exports from the module
type Matcher = (this: unknown, ...args: unknown[]) => unknown
type MatcherRecord = Record<string, Matcher> | undefined

const matchers: MatcherRecord =
  (getDefault(jestDomMatchers) as MatcherRecord) ??
  (jestDomMatchers as unknown as MatcherRecord)

try {
  // Attempt to extend expect with matchers. If matchers is undefined or the
  // shape is unexpected, expect.extend will throw and be handled below.
  if (matchers && Object.keys(matchers).length > 0) {
    const extendFn: (m: MatcherRecord) => void = expect.extend as unknown as (
      m: MatcherRecord
    ) => void
    extendFn(matchers)
  }
} catch {
  // Fallback: don't throw during test environment setup if matchers
  // couldn't be resolved. This avoids CI failing on environment/type
  // mismatches for third-party packages.

  // i18n-ignore
  const warnMsg: string = '[setupTests] jest-dom matchers not available;'
  const warnSuffix: string = ' skipping'
  console.warn(warnMsg + warnSuffix)
}
