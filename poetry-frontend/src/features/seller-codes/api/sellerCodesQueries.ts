/*
 * File: sellerCodesQueries.ts
 * Purpose: Query operations for seller codes feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  SellerCodesCollection,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import {
  getSellerCodesSdk,
  parseSellerCodeDetail,
  parseSellerCodesCollection,
} from './sellerCodesApiShared'

export async function fetchSellerCodesList(): Promise<SellerCodesCollection> {
  const sdk: ReturnType<typeof getSellerCodesSdk> = getSellerCodesSdk()
  const dto: unknown = await sdk.list()
  return parseSellerCodesCollection(dto)
}

export async function fetchSellerCodeById(
  id: string
): Promise<SellerCodeDetail> {
  const sdk: ReturnType<typeof getSellerCodesSdk> = getSellerCodesSdk()
  const dto: unknown = await sdk.retrieve(id)
  return parseSellerCodeDetail(dto)
}
