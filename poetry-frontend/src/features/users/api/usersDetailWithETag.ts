/*
 * File: usersDetailWithETag.ts
 * Purpose: Fetch user detail and capture ETag header for optimistic locking.
 * This helper performs a GET for a single user and returns both the parsed
 * user detail and the ETag header emitted by the backend. The ETag value is
 * required by the backend for subsequent conditional updates (If-Match).
 * All Rights Reserved. Arodi Emmanuel
 */

import { tokenStorage } from '../../../shared/security/tokenStorage'
import { getEnv } from '../../../shared/config/env'
import type { UserDetail } from '../model/UsersSchemas'
import { parseUserDetail } from './usersApiShared'

export interface UserDetailWithETag {
  readonly user: UserDetail
  readonly etag: string | null
}

export async function fetchUserDetailWithETag(
  id: string
): Promise<UserDetailWithETag> {
  const env: ReturnType<typeof getEnv> = getEnv()
  const base: string = env.VITE_API_BASE_URL.replace(/\/$/, '')
  const url: string = `${base}/api/v1/users/${id}`
  const tokens: ReturnType<typeof tokenStorage.load> = tokenStorage.load()
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  if (tokens?.accessToken) {
    headers['Authorization'] = `Bearer ${tokens.accessToken}`
  }
  const response: Response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`HTTP ${String(response.status)}`)
  }
  const json: unknown = await response.json()
  const user: UserDetail = parseUserDetail(json)
  const etag: string | null = response.headers.get('ETag')
  return { user, etag }
}
