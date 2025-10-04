/*
 * File: SellerCodesSummary.base.ts
 * Purpose: Base summary types for seller code listings.
 * Field names aligned with SDK SellerCodeResponse to maintain SSOT.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { SellerCodeStatusSchema } from './SellerCodesBasics'

export const fallbackTimestamp: string = new Date(0).toISOString()

export const sellerCodeSummaryBaseSchema = z.object({
  id: z.number(),
  code: z.string(),
  status: SellerCodeStatusSchema.optional(),
  organizationId: z.string().optional(),
  userId: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  version: z.union([z.string(), z.number()]).optional(),
})

export interface NormalizedSellerCodeSummary {
  readonly id: number
  readonly code: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly organizationId?: string
  readonly userId?: number
  readonly createdAt: string
  readonly updatedAt: string
  readonly version: string
}
