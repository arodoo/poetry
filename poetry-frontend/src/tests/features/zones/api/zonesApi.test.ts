/*
 * File: zonesApi.test.ts
 * Purpose: Validate that zones API re-exports exist and basic functions are callable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import * as api from '../../../../features/zones/api/zonesApi'

describe('Zones API', () => {
  it('should export fetchZonesList and friends', () => {
    expect(typeof api.fetchZonesList).toBe('function')
    expect(typeof api.fetchZonesPage).toBe('function')
    expect(typeof api.fetchZoneById).toBe('function')
  })
})