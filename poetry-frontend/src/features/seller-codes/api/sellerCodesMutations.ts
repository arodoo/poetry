/*
 * File: sellerCodesMutations.ts
 * Purpose: Mutation operations using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createSellerCode as createSellerCodeSdk,
  updateSellerCode as updateSellerCodeSdk,
  deleteSellerCode as deleteSellerCodeSdk,
  type SellerCodeResponse,
} from '../../../api/generated'
import { extractSdkData } from '../../../shared/api/extractSdkData'
import {
  CreateSellerCodeSchema,
  UpdateSellerCodeSchema,
  type CreateSellerCodeInput,
  type UpdateSellerCodeInput,
  type SellerCodeDetail,
} from '../model/SellerCodesSchemas'
import { parseSellerCodeDetail } from './sellerCodesApiShared'

export async function createSellerCode(
  input: CreateSellerCodeInput
): Promise<SellerCodeDetail> {
  const validatedInput: CreateSellerCodeInput =
    CreateSellerCodeSchema.parse(input)
  const response = await createSellerCodeSdk({
    body: validatedInput,
  })
  if (!response.data) {
    throw new Error('Create seller code response missing data')
  }
  return parseSellerCodeDetail(response.data)
}

export async function updateSellerCode(
  id: string,
  input: UpdateSellerCodeInput,
  etag?: string
): Promise<SellerCodeDetail> {
  const validatedInput: UpdateSellerCodeInput =
    UpdateSellerCodeSchema.parse(input)
  const headers = etag ? { 'If-Match': etag } : {}
  const response = await updateSellerCodeSdk({
    path: { id: Number(id) },
    body: validatedInput,
    headers,
  })
  if (!response.data) {
    throw new Error('Update seller code response missing data')
  }
  return parseSellerCodeDetail(response.data)
}

export async function deleteSellerCode(
  id: string,
  _input: unknown,
  etag?: string
): Promise<SellerCodeDetail> {
  const headers = etag ? { 'If-Match': etag } : {}
  // SDK delete signature: pass path and headers
  const responseUnknown = (await deleteSellerCodeSdk({
    path: { id: Number(id) },
    headers,
  } as unknown as Parameters<typeof deleteSellerCodeSdk>[0])) as unknown

  const data = extractSdkData(responseUnknown) as SellerCodeResponse
  return parseSellerCodeDetail(data)
}
