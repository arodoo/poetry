/*
 * File: PublicForgotPasswordSchemas.test.ts
 * Purpose: Validate forgot-password schema invariants.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import {
  PublicForgotPasswordRequestSchema,
  PublicForgotPasswordResultSchema,
} from '../../../../features/public-forgot-password'

describe('PublicForgotPasswordSchemas', () => {
  it('accepts valid email input', () => {
    expect(
      PublicForgotPasswordRequestSchema.safeParse({
        email: 'person@example.com',
      }).success
    ).toBe(true)
  })

  it('rejects empty email', () => {
    expect(
      PublicForgotPasswordRequestSchema.safeParse({ email: '' }).success
    ).toBe(false)
  })

  it('parses result payload', () => {
    expect(
      PublicForgotPasswordResultSchema.safeParse({
        messageKey: 'ui.publicForgotPassword.success',
      }).success
    ).toBe(true)
  })
})
