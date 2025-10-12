/*
 * File: SellerCodesSchemas.test.ts
 * Purpose: Test Zod schemas for seller codes model validation. Ensures data
 * integrity and type safety. Validates both valid and invalid inputs.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import { CreateSellerCodeSchema } from '../../../../features/seller-codes/model/SellerCodesCommands'

describe('SellerCodesSchemas', () => {
  it('CreateSellerCodeSchema should accept valid create payload', () => {
    const valid = {
      code: 'ABC123',
      userId: 1,
      organizationId: 'org-1',
      status: 'active',
    }
    const result = CreateSellerCodeSchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('CreateSellerCodeSchema should reject short code', () => {
    const invalid = { code: 'A', userId: 1 }
    const result = CreateSellerCodeSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})
