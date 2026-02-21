/*
 * File: userAddressApi.ts
 * Purpose: HTTP calls for /api/v1/users/{userId}/address.
 * Uses fetchJson with bearer token from tokenStorage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'

export interface UserAddressDto {
  id?: number
  userId?: number
  line1?: string | null
  line2?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  country?: string | null
}

export async function getUserAddress(
  userId: number
): Promise<UserAddressDto | null> {
  try {
    return await fetchJson<UserAddressDto>(
      `/api/v1/users/${String(userId)}/address`
    )
  } catch {
    return null
  }
}

export async function upsertUserAddress(
  userId: number,
  data: UserAddressDto
): Promise<UserAddressDto> {
  return fetchJson<UserAddressDto>(
    `/api/v1/users/${String(userId)}/address`,
    {
      method: 'PUT',
      body: data,
    }
  )
}
