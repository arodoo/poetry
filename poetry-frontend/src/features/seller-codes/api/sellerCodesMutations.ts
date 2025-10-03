/*
 * File: sellerCodesMutations.ts
 * Purpose: Mutation operations for seller codes feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  CreateSellerCodeSchema,
  UpdateSellerCodeSchema,
  type CreateSellerCodeInput,
  type UpdateSellerCodeInput,
  type SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import {
  getSellerCodesSdk,
  parseSellerCodeDetail,
} from './sellerCodesApiShared'

export async function createSellerCode(
  input: CreateSellerCodeInput
): Promise<SellerCodeDetail> {
  const sdk: ReturnType<typeof getSellerCodesSdk> = getSellerCodesSdk()
  const payload: CreateSellerCodeInput = CreateSellerCodeSchema.parse(input)
  const dto: unknown = await sdk.create(payload)
  return parseSellerCodeDetail(dto)
}

export async function updateSellerCode(
  id: string,
  input: UpdateSellerCodeInput,
  etag?: string
): Promise<SellerCodeDetail> {
  const sdk: ReturnType<typeof getSellerCodesSdk> = getSellerCodesSdk()
  const payload: UpdateSellerCodeInput = UpdateSellerCodeSchema.parse(input)
  const dto: unknown = await sdk.update(id, payload, etag)
  return parseSellerCodeDetail(dto)
}
