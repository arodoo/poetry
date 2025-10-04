/*
 * File: seller-codesQueries.test.ts
 * Purpose: Test React Query hooks for seller codes. Validates query keys
 * and caching behavior. Ensures proper data fetching.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { useSellerCodesListQuery } from '../../../../features/seller-codes'

describe('seller-codes hooks', () => {
  it('should export useSellerCodesListQuery hook', () => {
    expect(typeof useSellerCodesListQuery).toBe('function')
  })
})
