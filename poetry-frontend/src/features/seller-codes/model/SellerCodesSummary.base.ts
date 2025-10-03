/*
 * File: SellerCodesSummary.base.ts
 * Purpose: Base summary types and defaults for denormalized seller
 * code listings.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import { SellerCodeStatusSchema } from './SellerCodesBasics'

export const fallbackTimestamp: string = new Date(0).toISOString()

export const sellerCodeSummaryBaseSchema: z.ZodObject<{
  id: z.ZodString
  code: z.ZodString
  status: z.ZodOptional<typeof SellerCodeStatusSchema>
  orgId: z.ZodOptional<z.ZodString>
  orgName: z.ZodOptional<z.ZodString>
  createdAt: z.ZodOptional<z.ZodString>
  updatedAt: z.ZodOptional<z.ZodString>
  version: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>
}> = z.object({
  id: z.string(),
  code: z.string(),
  status: SellerCodeStatusSchema.optional(),
  orgId: z.string().optional(),
  orgName: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  version: z.union([z.string(), z.number()]).optional(),
})

export interface NormalizedSellerCodeSummary {
  readonly id: string
  readonly code: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly orgId?: string
  readonly orgName?: string
  readonly createdAt: string
  readonly updatedAt: string
  readonly version: string
}
