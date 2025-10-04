/*
 * File: SellerCodesSummary.schema.ts
 * Purpose: Transformation schema producing normalized seller code summary.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  sellerCodeSummaryBaseSchema,
  fallbackTimestamp,
  type NormalizedSellerCodeSummary,
} from './SellerCodesSummary.base'

export const SellerCodeSummarySchema: ReturnType<
  typeof sellerCodeSummaryBaseSchema.transform
> = sellerCodeSummaryBaseSchema.transform(
  (
    sellerCode: (typeof sellerCodeSummaryBaseSchema)['_output']
  ): NormalizedSellerCodeSummary => {
    const status: 'active' | 'inactive' | 'expired' =
      sellerCode.status ?? 'active'
    const createdAt: string = sellerCode.createdAt ?? fallbackTimestamp
    const updatedAt: string = sellerCode.updatedAt ?? createdAt
    const version: string =
      typeof sellerCode.version === 'string'
        ? sellerCode.version
        : sellerCode.version != null
          ? String(sellerCode.version)
          : '1'
    const result: NormalizedSellerCodeSummary = {
      id: sellerCode.id,
      code: sellerCode.code,
      status,
      createdAt,
      updatedAt,
      version,
      ...(sellerCode.organizationId !== undefined && 
        { organizationId: sellerCode.organizationId }),
      ...(sellerCode.userId !== undefined && 
        { userId: sellerCode.userId }),
    }
    return result
  }
)

export type SellerCodeSummary = NormalizedSellerCodeSummary
export const SellerCodesCollectionSchema: z.ZodArray<
  typeof SellerCodeSummarySchema
> = z.array(SellerCodeSummarySchema)
export type SellerCodesCollection = readonly SellerCodeSummary[]
