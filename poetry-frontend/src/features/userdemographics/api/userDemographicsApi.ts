/*
 * File: userDemographicsApi.ts
 * Purpose: HTTP calls for /api/v1/users/{userId}/demographics.
 * Uses fetchJson with bearer token from tokenStorage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

export interface UserDemographicsDto {
  id?: number
  userId?: number
  birthDate?: string | null
  gender?: string | null
  phone?: string | null
}

function authHeader(): Record<string, string> {
  const token = tokenStorage.load()?.accessToken
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function getUserDemographics(
  userId: number
): Promise<UserDemographicsDto | null> {
  try {
    return await fetchJson<UserDemographicsDto>(
      `/api/v1/users/${String(userId)}/demographics`,
      { headers: authHeader() }
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
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
      },
      body: JSON.stringify(data),
    }
  )
}
