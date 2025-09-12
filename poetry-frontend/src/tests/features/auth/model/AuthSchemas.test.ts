/*
 * File: AuthSchemas.test.ts
 * Purpose: Smoke test for Auth schema.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { AuthStatusSchema } from '../../../../features/auth/model/AuthSchemas'

describe('AuthStatusSchema', () => {
  it('parses', () => {
    expect(AuthStatusSchema.parse({ authenticated: true }).authenticated).toBe(
      true
    )
  })
})
