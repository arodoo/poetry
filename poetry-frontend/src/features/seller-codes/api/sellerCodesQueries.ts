/*
 * File: sellerCodesQueries.ts
 * Purpose: Query operations for seller codes using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listSellerCodes,
  getSellerCodeById,
  type SellerCodeResponse,
} from '../../../api/generated'
import type {
  SellerCodesCollection,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import {
  parseSellerCodeDetail,
  parseSellerCodesCollection,
} from './sellerCodesApiShared'

export async function fetchSellerCodesList(): Promise<
  SellerCodesCollection
> {
  const response = await listSellerCodes()
  const data = response.data as SellerCodeResponse[]
  return parseSellerCodesCollection(data)
}

export async function fetchSellerCodeById(
  id: string
): Promise<SellerCodeDetail> {
  const response = await getSellerCodeById({
    path: { id: Number(id) },
  })
  const data = response.data as SellerCodeResponse
  return parseSellerCodeDetail(data)
}
