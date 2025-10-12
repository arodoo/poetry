/*
 * File: ProfileSchemas.test.ts
 * Purpose: Validate profile summary schemas for success and failure cases.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import {
  ProfileSummarySchema,
  ProfileSummaryUpdateSchema,
} from '../../../../features/profile'

const sample = {
  username: 'aurora',
  email: 'aurora@example.com',
  locale: 'en',
  version: 1,
}

describe('ProfileSchemas', () => {
  it('accepts a valid summary payload', () => {
    expect(ProfileSummarySchema.safeParse(sample).success).toBe(true)
  })

  it('rejects invalid update payload', () => {
    const result = ProfileSummaryUpdateSchema.safeParse({
      username: '',
      version: '',
    })
    expect(result.success).toBe(false)
  })
})
