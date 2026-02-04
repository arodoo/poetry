/*
 * File: FingerprintSchemas.ts
 * Purpose: Zod validation schemas for fingerprint API types.
 * Validates enrollment requests, verification requests, and responses.
 * Replaced legacy R503 slotId with FMD string validation.
 * All Rights Reserved Arodi Emmanuel
 */

import { z } from 'zod'
import type {
  EnrollRequest as SDKEnrollRequest,
  VerifyRequest as SDKVerifyRequest,
  FingerprintResponse as SDKFingerprintResponse,
  VerifyResponse as SDKVerifyResponse,
} from '../../../api/generated'

export const EnrollRequestSchema = z.object({
  fmd: z.string().min(10, 'FMD too short').max(20000, 'FMD too long'),
})

export const VerifyRequestSchema = z.object({
  fmd: z.string().min(10, 'FMD too short').max(20000, 'FMD too long'),
})

export const FingerprintResponseSchema = z.object({
  id: z.number().optional(),
  userId: z.number().optional(),
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
