/*
 * File: FingerprintSchemas.ts
 * Purpose: Zod validation schemas for fingerprint API types.
 * Validates enrollment requests, verification requests, and responses.
 * Ensures slot IDs are within R503 hardware range of zero to 1500.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod'
import type {
  EnrollRequest as SDKEnrollRequest,
  VerifyRequest as SDKVerifyRequest,
  FingerprintResponse as SDKFingerprintResponse,
  VerifyResponse as SDKVerifyResponse,
} from '../../../api/generated'

export const EnrollRequestSchema = z.object({
  r503SlotId: z.number().int().min(0).max(1500),
})

export const VerifyRequestSchema = z.object({
  r503SlotId: z.number().int().min(0).max(1500),
})

export const FingerprintResponseSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
  r503SlotId: z.number().optional(),
  status: z.string().optional(),
  enrolledAt: z.string().optional(),
  archivedAt: z.string().optional(),
  version: z.number().optional(),
})

export const VerifyResponseSchema = z.object({
  matched: z.boolean().optional(),
  userId: z.number().optional(),
  fingerprintId: z.number().optional(),
  message: z.string().optional(),
})

export type EnrollRequest = z.infer<typeof EnrollRequestSchema>
export type VerifyRequest = z.infer<typeof VerifyRequestSchema>
export type FingerprintResponse = z.infer<typeof FingerprintResponseSchema>
export type VerifyResponse = z.infer<typeof VerifyResponseSchema>

export type {
  SDKEnrollRequest,
  SDKVerifyRequest,
  SDKFingerprintResponse,
  SDKVerifyResponse,
}
