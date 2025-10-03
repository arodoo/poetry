/*
 * File: SellerCodesDetail.ts
 * Purpose: Detailed seller code schema including concurrency version field.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  SellerCodeSummarySchema,
  type SellerCodeSummary,
} from './SellerCodesSummary.schema'

export const SellerCodeDetailSchema: typeof SellerCodeSummarySchema =
  SellerCodeSummarySchema

export type SellerCodeDetail = SellerCodeSummary
