/*
 * File: PublicLoginSchemas.test.ts
 * Purpose: Provide unit tests for the public login Zod schema.
 * These tests ensure invalid credential shapes are rejected.
 * They ensure required fields and formats are enforced.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import {
  PublicLoginRequestSchema,
  PublicLoginResultSchema,
} from '../../../../features/public-login'

describe('PublicLoginSchemas', () => {
  it('accepts valid credentials', () => {
    expect(
      PublicLoginRequestSchema.safeParse({
        username: 'aurora',
        password: 'secret',
      }).success
    ).toBe(true)
  })

  it('rejects empty password', () => {
    expect(
      PublicLoginRequestSchema.safeParse({
        username: 'aurora',
        password: '',
      }).success
    ).toBe(false)
  })

  it('parses result payload', () => {
    expect(
      PublicLoginResultSchema.safeParse({
        accessToken: 'a',
        refreshToken: 'b',
      }).success
    ).toBe(true)
  })
})
