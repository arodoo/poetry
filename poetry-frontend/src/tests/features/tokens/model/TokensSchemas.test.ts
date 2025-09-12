/*
 * File: TokensSchemas.test.ts
 * Purpose: Ensure TokensSchemas public export compiles and schema
 * re-exports are usable. Minimal as the heavy tests live elsewhere.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { TokenBundleSchema } from '../../../../features/tokens'

describe('TokensSchemas export', () => {
  it('parses minimal', () => {
    const ok = TokenBundleSchema.safeParse({
      themes: [],
      fonts: [],
      fontWeights: [],
      fontSizes: [],
      spacings: [],
      radius: [],
      shadows: [],
      current: {
        theme: '',
        font: '',
        fontSize: '',
        spacing: '',
        radius: '',
        shadow: '',
      },
    })
    expect(ok.success).toBe(false)
  })
})
