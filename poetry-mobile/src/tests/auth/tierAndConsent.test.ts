/*
 * File: tierAndConsent.test.ts
 * Purpose: Tests Zod validation for SubscriptionTier and
 * BackupConsent schemas. Verifies invalid enum values and
 * non-datetime strings are rejected properly.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  SubscriptionTierSchema,
  isPro,
} from '../../shared/auth/SubscriptionTier'
import {
  BackupConsentSchema,
} from '../../shared/auth/BackupConsent'

describe('SubscriptionTierSchema', () => {
  it('accepts free and pro', () => {
    expect(SubscriptionTierSchema.parse('free'))
      .toBe('free')
    expect(SubscriptionTierSchema.parse('pro'))
      .toBe('pro')
  })

  it('rejects invalid tier', () => {
    expect(
      () => SubscriptionTierSchema.parse('premium')
    ).toThrow()
  })

  it('isPro returns correct boolean', () => {
    expect(isPro('pro')).toBe(true)
    expect(isPro('free')).toBe(false)
  })
})

describe('BackupConsentSchema', () => {
  it('accepts valid consent object', () => {
    const result = BackupConsentSchema.parse({
      granted: true,
      grantedAt: '2026-01-15T10:00:00.000Z',
      revokedAt: null,
    })
    expect(result.granted).toBe(true)
  })

  it('rejects non-datetime grantedAt', () => {
    expect(() =>
      BackupConsentSchema.parse({
        granted: true,
        grantedAt: 'yesterday',
        revokedAt: null,
      })
    ).toThrow()
  })
})
