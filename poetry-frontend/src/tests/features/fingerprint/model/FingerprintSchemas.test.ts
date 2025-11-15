/*
 * File: FingerprintSchemas.test.ts
 * Purpose: Unit tests for fingerprint Zod schemas.
 * Validates enrollment and verification request schemas.
 * Tests slot ID range validation and type checking.
 * All Rights Reserved. Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import {
  EnrollRequestSchema,
  VerifyRequestSchema,
} from '../../../../features/fingerprint/model/FingerprintSchemas'

describe('FingerprintSchemas', () => {
  describe('EnrollRequestSchema', () => {
    it('should validate valid slot ID', () => {
      const result = EnrollRequestSchema.safeParse({ r503SlotId: 100 })
      expect(result.success).toBe(true)
    })

    it('should reject slot ID below zero', () => {
      const result = EnrollRequestSchema.safeParse({ r503SlotId: -1 })
      expect(result.success).toBe(false)
    })

    it('should reject slot ID above 1500', () => {
      const result = EnrollRequestSchema.safeParse({ r503SlotId: 1501 })
      expect(result.success).toBe(false)
    })
  })

  describe('VerifyRequestSchema', () => {
    it('should validate valid slot ID', () => {
      const result = VerifyRequestSchema.safeParse({ r503SlotId: 999 })
      expect(result.success).toBe(true)
    })
  })
})
