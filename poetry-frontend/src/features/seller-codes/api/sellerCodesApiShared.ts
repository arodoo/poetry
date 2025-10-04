/*
 * File: sellerCodesApiShared.ts
 * Purpose: Parsers for seller codes API responses using SDK types directly.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  SellerCodesCollection,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'

export function parseSellerCodesCollection(
  dto: unknown
): SellerCodesCollection {
  // SDK types are already validated by OpenAPI contract
  return dto as SellerCodesCollection
}

export function parseSellerCodeDetail(dto: unknown): SellerCodeDetail {
  // SDK types are already validated by OpenAPI contract
  return dto as SellerCodeDetail
}
