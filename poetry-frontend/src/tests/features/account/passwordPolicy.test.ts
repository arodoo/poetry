/*
 * File: passwordPolicy.test.ts
 * Purpose: Verifies frontend password policy helpers.
 * It keeps minimum length aligned with the backend rule.
 * It checks complexity rules enforced before submission.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import {
  isPasswordPolicyValid,
} from '../../../shared/security/passwordPolicy'

describe('password policy', () => {
  it('accepts valid backend-compatible passwords', () => {
    const result = isPasswordPolicyValid('ValidPass123!')
    expect(result).toBe(true)
  })

  it('rejects missing complexity', () => {
    const result = isPasswordPolicyValid('lowercaseonly')
    expect(result).toBe(false)
  })

  it('rejects repeated characters', () => {
    const result = isPasswordPolicyValid('Valid1111Pass!')
    expect(result).toBe(false)
  })
})
