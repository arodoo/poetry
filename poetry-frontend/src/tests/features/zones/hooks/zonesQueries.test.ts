/*
 * File: zonesQueries.test.ts
 * Purpose: Validate zones query keys and query hook configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { zonesQueryKeys, useZonesListQuery } from '../../../../features/zones/hooks/useZonesQueries'

describe('Zones Queries Hook', () => {
  it('zonesQueryKeys should build stable keys', () => {
    const listKey = zonesQueryKeys.list()
    const pageKey = zonesQueryKeys.page(2, 20, '')
    const detailKey = zonesQueryKeys.detail('id1')
    expect(Array.isArray(listKey)).toBe(true)
    expect(listKey[0]).toBe('zones')
    expect(pageKey[2]).toBe(2)
    expect(detailKey[2]).toBe('id1')
  })

  it('useZonesListQuery should be a function', () => {
    expect(typeof useZonesListQuery).toBe('function')
  })
})