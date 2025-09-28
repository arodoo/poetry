/*
 * File: AccountSchemas.test.ts
 * Purpose: Validate account schema parsing for locale and password payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import {
  AccountLocaleSchema,
  AccountPasswordChangeSchema,
} from '../../../../features/account'

describe('AccountSchemas', () => {
  it('accepts a valid locale payload', () => {
    const result = AccountLocaleSchema.safeParse({ locale: 'en' })
    expect(result.success).toBe(true)
  })

  it('rejects invalid password payload', () => {
    const result = AccountPasswordChangeSchema.safeParse({
      currentPassword: '',
      newPassword: 'shrt',
    })
    expect(result.success).toBe(false)
  })
})
