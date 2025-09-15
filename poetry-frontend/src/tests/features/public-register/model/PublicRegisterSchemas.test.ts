/*
 * File: PublicRegisterSchemas.test.ts
 * Purpose: Unit tests for the public registration Zod schema.
 * They assert invalid payloads (bad emails, short passwords) are rejected.
 * These tests prevent client-side validation regressions and keep the API
 * contract consistent with the backend.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { RegisterFormSchema } from '../../../../features/public-register/model'

describe('PublicRegisterSchemas', () => {
  it('rejects invalid email and short password', () => {
    const result = RegisterFormSchema.safeParse({
      username: 'a',
      email: 'bad',
      password: '123',
    })
    expect(result.success).toBe(false)
  })
})
