/*
 * File: PublicLoginSchemas.test.ts
 * Purpose: Provide unit tests for the public login Zod schema.
 * These tests ensure invalid credential shapes are rejected.
 * They ensure required fields and formats are enforced.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { LoginFormSchema } from '../../../../features/public-login/model'

describe('PublicLoginSchemas', () => {
  it('rejects empty fields', () => {
    const result = LoginFormSchema.safeParse({
      username: '',
      password: '',
    })
    expect(result.success).toBe(false)
  })
})
