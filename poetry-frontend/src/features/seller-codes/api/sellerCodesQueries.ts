/*
 * File: sellerCodesQueries.ts
 * Purpose: Query operations for seller codes using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  listSellerCodes,
  getPaged as getSellerCodesPaged,
  getSellerCodeById,
  type SellerCodeResponse,
  type PageResponseDtoSellerCodeResponse,
} from '../../../api/generated'
import type {
  SellerCodesCollection,
  SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import {
  parseSellerCodeDetail,
  parseSellerCodesCollection,
} from './sellerCodesApiShared'

export async function fetchSellerCodesList(): Promise<SellerCodesCollection> {
  const response = await listSellerCodes()
  // `response.data` comes from generated SDK and can have differing shapes.
  // Cast via unknown first to satisfy TS and then parse safely.
  const data = response.data as unknown as SellerCodeResponse[]
  return parseSellerCodesCollection(data)
}

export async function fetchSellerCodesPage(
  page: number,
  size: number,
  search?: string
): Promise<PageResponseDtoSellerCodeResponse> {
  const response = await getSellerCodesPaged({
    query: {
      page,
      size,
      ...(search ? { search } : {}),
    },
  })
  return response.data as unknown as PageResponseDtoSellerCodeResponse
}

export async function fetchSellerCodeById(
  id: string
): Promise<SellerCodeDetail> {
  const response = await getSellerCodeById({
    path: { id: Number(id) },
  })
  const data = response.data as unknown as SellerCodeResponse
  return parseSellerCodeDetail(data)
}
