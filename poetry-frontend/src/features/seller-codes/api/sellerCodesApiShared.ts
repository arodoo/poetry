/*
 * File: sellerCodesApiShared.ts
 * Purpose: Parsers for seller codes API responses.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  SellerCodesCollectionSchema,
  SellerCodeDetailSchema,
  type SellerCodesCollection,
  type SellerCodeDetail,
} from '../model/SellerCodesSchemas'

export function parseSellerCodesCollection(
  dto: unknown
): SellerCodesCollection {
  const parsed: z.infer<typeof SellerCodesCollectionSchema> =
    SellerCodesCollectionSchema.parse(dto)
  return parsed as SellerCodesCollection
}

export function parseSellerCodeDetail(dto: unknown): SellerCodeDetail {
  const parsed: unknown = SellerCodeDetailSchema.parse(dto)
  return parsed as SellerCodeDetail
}
