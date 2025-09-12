/*
 * File: authApi.ts
 * Purpose: Auth API wrapper. Uses shared HTTP client and Zod parsing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'
import { AuthStatusSchema, type AuthStatus } from '../model/AuthSchemas'

export async function getAuthStatus(): Promise<AuthStatus> {
  return AuthStatusSchema.parse(
    await fetchJson<unknown>('/api/v1/auth/status', { method: 'GET' })
  )
}
