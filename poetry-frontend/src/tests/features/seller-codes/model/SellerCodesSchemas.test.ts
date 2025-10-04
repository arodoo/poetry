/*
 * File: SellerCodesSchemas.test.ts
 * Purpose: Test Zod schemas for seller codes model validation. Ensures data
 * integrity and type safety. Validates both valid and invalid inputs.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { SellerCodeSummarySchema } from '../../../../features/seller-codes'

describe('SellerCodesSchemas', () => {
  describe('SellerCodeSummarySchema', () => {
    it('should parse valid seller code summary', () => {
      const validData = {
        id: 123,
        code: 'ABC123',
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      }

      const result = SellerCodeSummarySchema.safeParse(validData)
      expect(result.success).toBe(true)
    })

    it('should reject invalid status', () => {
      const invalidData = {
        id: 123,
        code: 'ABC123',
        status: 'invalid-status',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
      }

      const result = SellerCodeSummarySchema.safeParse(invalidData)
      expect(result.success).toBe(false)
    })
  })
})
