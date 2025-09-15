/*
 * File: PublicForgotSchemas.test.ts
 * Purpose: Validate the Zod schema used for the public "forgot password"
 * feature. These tests assert the schema rejects invalid payloads and
 * prevent malformed data from reaching the API. They protect the API
 * surface by enforcing expected shapes and types.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import * as ForgotModel from '../../../../features/public-forgot-password/model'

describe('PublicForgotSchemas', () => {
  it('rejects invalid email', () => {
    const result = ForgotModel.ForgotFormSchema.safeParse({
      email: 'not-an-email',
    })
    expect(result.success).toBe(false)
  })
})
