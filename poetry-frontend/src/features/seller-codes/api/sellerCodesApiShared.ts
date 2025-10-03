/*
 * File: sellerCodesApiShared.ts
 * Purpose: Shared helpers for seller codes API wrappers.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'
import {
  createSellerCodesSdk,
  type SellerCodeCollectionDto,
  type SellerCodeDto,
  type SellerCodesSdk,
} from '../../../shared/sdk/seller-codes/sellerCodesClient'
import {
  SellerCodesCollectionSchema,
  SellerCodeDetailSchema,
  type SellerCodesCollection,
  type SellerCodeDetail,
} from '../model/SellerCodesSchemas'

const sdk: SellerCodesSdk = createSellerCodesSdk()

export function getSellerCodesSdk(): SellerCodesSdk {
  return sdk
}

export function parseSellerCodesCollection(
  dto: unknown
): SellerCodesCollection {
  const collection: unknown = dto as SellerCodeCollectionDto
  const parsed: z.infer<typeof SellerCodesCollectionSchema> =
    SellerCodesCollectionSchema.parse(collection)
  return parsed as SellerCodesCollection
}

export function parseSellerCodeDetail(dto: unknown): SellerCodeDetail {
  const detail: unknown = dto as SellerCodeDto
  const parsed: unknown = SellerCodeDetailSchema.parse(detail)
  return parsed as SellerCodeDetail
}
