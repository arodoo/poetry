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
type Matcher = (
  this: unknown,
  ...args: unknown[]
) => { pass: boolean; message: () => string }
type MatcherRecord = Record<string, Matcher>

const modDefault: MatcherRecord | undefined = getDefault(jestDomMatchers) as
  | MatcherRecord
  | undefined
const matchers: MatcherRecord =
  modDefault ?? (jestDomMatchers as Record<string, Matcher>)

try {
  // Attempt to extend expect with matchers. If matchers is undefined or the
  // shape is unexpected, expect.extend will throw and be handled below.
  if (Object.keys(matchers).length > 0) expect.extend(matchers)
} catch {
  // Fallback: don't throw during test environment setup if matchers
  // couldn't be resolved. This avoids CI failing on environment/type
  // mismatches for third-party packages.

  // i18n-ignore
  const warnMsg = '[setupTests] jest-dom matchers not available;'
  const warnSuffix = ' skipping'
  console.warn(warnMsg + warnSuffix)
}
