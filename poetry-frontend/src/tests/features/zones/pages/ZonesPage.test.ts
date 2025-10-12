/*
 * File: ZonesPage.test.ts
 * Purpose: Smoke test for ZonesListPage component import.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import ZonesListPage from '../../../../features/zones/pages/ZonesListPage'

describe('ZonesPage', () => {
  it('should import ZonesListPage component', () => {
    expect(typeof ZonesListPage).toBe('function')
  })
})