/*
 * File: userDemographicsApi.ts
 * Purpose: HTTP calls for /api/v1/users/{userId}/demographics.
 * Uses fetchJson with bearer token from tokenStorage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'

export interface UserDemographicsDto {
  id?: number
  userId?: number
  birthDate?: string | null
  gender?: string | null
  phone?: string | null
}

export async function getUserDemographics(
  userId: number
): Promise<UserDemographicsDto | null> {
  try {
    return await fetchJson<UserDemographicsDto>(
      `/api/v1/users/${String(userId)}/demographics`
    )
  } catch {
    return null
  }
}

export async function upsertUserDemographics(
  userId: number,
  data: UserDemographicsDto
): Promise<UserDemographicsDto> {
  return fetchJson<UserDemographicsDto>(
    `/api/v1/users/${String(userId)}/demographics`,
    {
      method: 'PUT',
      body: data,
    }
  )
}
