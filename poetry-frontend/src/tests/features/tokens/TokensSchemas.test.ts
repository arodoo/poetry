/*
 File: TokensSchemas.test.ts
 Purpose: Validate the TokenBundle Zod schema accepts well-formed
 payloads and rejects malformed ones. Tests include a positive case
 with a complete, valid token bundle and a negative case missing the
 required `current` section to ensure runtime validation is robust.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { TokenBundleSchema } from '../../../features/tokens/model/TokensSchemas'
import { validTokenBundle } from './validTokenBundle'

describe('TokenBundleSchema', () => {
  it('parses valid payload', () => {
    const parsed = TokenBundleSchema.parse(validTokenBundle)
    expect(parsed).toBeTruthy()
  })
  it('rejects missing current', () => {
    const bad: typeof validTokenBundle = {
      ...validTokenBundle,
      current: undefined as unknown as never,
    }
    expect(() => TokenBundleSchema.parse(bad)).toThrow()
  })
})
