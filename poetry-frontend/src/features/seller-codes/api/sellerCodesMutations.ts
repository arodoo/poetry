/*
 * File: sellerCodesMutations.ts
 * Purpose: Mutation operations using generated SDK.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  createSellerCode as createSellerCodeSdk,
  updateSellerCode as updateSellerCodeSdk,
  type SellerCodeResponse,
} from '../../../api/generated'
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
  const payload: CreateSellerCodeInput =
    CreateSellerCodeSchema.parse(input)
  const response = await createSellerCodeSdk({
    body: {
      code: payload.code,
      organizationId: payload.orgId || 'default-org',
      userId: payload.userId,
      ...(payload.status && { status: payload.status }),
    },
  })
  const data = response.data as SellerCodeResponse
  return parseSellerCodeDetail(data)
}

export async function updateSellerCode(
  id: string,
  input: UpdateSellerCodeInput,
  etag?: string
): Promise<SellerCodeDetail> {
  const payload: UpdateSellerCodeInput =
    UpdateSellerCodeSchema.parse(input)
  const headers = etag ? { 'If-Match': etag } : {}
  const response = await updateSellerCodeSdk({
    path: { id: Number(id) },
    body: {
      code: payload.code,
      organizationId: payload.orgId || 'default-org',
      userId: payload.userId,
      status: payload.status,
    },
    headers,
  })
  const data = response.data as SellerCodeResponse
  return parseSellerCodeDetail(data)
}
