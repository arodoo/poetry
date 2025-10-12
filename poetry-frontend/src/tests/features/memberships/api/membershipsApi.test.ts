/*
 * File: membershipsApi.test.ts
 * Purpose: Validate that memberships API re-exports exist and basic functions are callable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import * as api from '../../../../features/memberships/api/membershipsApi'

describe('Memberships API', () => {
  it('should export fetchMembershipsList and friends', () => {
    expect(typeof api.fetchMembershipsList).toBe('function')
    expect(typeof api.fetchMembershipsPage).toBe('function')
    expect(typeof api.fetchMembershipById).toBe('function')
  })
})
