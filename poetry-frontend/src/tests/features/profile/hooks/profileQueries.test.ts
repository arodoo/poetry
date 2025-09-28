/*
 * File: profileQueries.test.ts
 * Purpose: Ensure profile query key helpers remain stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { profileQueryKeys } from '../../../../features/profile'

describe('profileQueryKeys', () => {
  it('builds summary key deterministically', () => {
    expect(profileQueryKeys.summary()).toEqual(['profile', 'summary'])
  })
})
