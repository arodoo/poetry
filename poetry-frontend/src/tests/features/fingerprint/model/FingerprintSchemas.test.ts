/*
 * File: FingerprintSchemas.test.ts
 * Purpose: Unit tests for fingerprint Zod schemas.
 * Validates enrollment and verification request schemas for FMD data.
 * All Rights Reserved Arodi Emmanuel
 */

import { describe, it, expect } from 'vitest'
import {
  EnrollRequestSchema,
  VerifyRequestSchema,
} from '../../../../features/fingerprint/model/FingerprintSchemas'

describe('FingerprintSchemas', () => {
  describe('EnrollRequestSchema', () => {
    it('should validate valid FMD string', () => {
      const result = EnrollRequestSchema.safeParse({ fmd: 'a'.repeat(100) })
      expect(result.success).toBe(true)
    })

    it('should reject empty FMD', () => {
      const result = EnrollRequestSchema.safeParse({ fmd: '' })
      expect(result.success).toBe(false)
    })

    it('should reject too short FMD', () => {
      const result = EnrollRequestSchema.safeParse({ fmd: 'abc' })
      expect(result.success).toBe(false)
    })
  })

  describe('VerifyRequestSchema', () => {
    it('should validate valid FMD string', () => {
      const result = VerifyRequestSchema.safeParse({ fmd: 'b'.repeat(200) })
      expect(result.success).toBe(true)
    })
  })
})
