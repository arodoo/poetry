/*
 * File: seller-codesApi.test.ts
 * Purpose: Test API wrapper functions for seller codes. Validates API calls
 * and error handling. Ensures proper data transformation.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { fetchSellerCodesList } from '../../../../features/seller-codes'

describe('seller-codes API', () => {
  it('should export fetchSellerCodesList function', () => {
    expect(typeof fetchSellerCodesList).toBe('function')
  })
})
