/*
 * File: dashboardQueries.test.ts
 * Purpose: Guarantee dashboard query key helpers remain stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { dashboardQueryKeys } from '../../../../features/dashboard'

describe('dashboardQueryKeys', () => {
  it('builds overview key deterministically', () => {
    expect(dashboardQueryKeys.overview()).toEqual(['dashboard', 'overview'])
  })
})
