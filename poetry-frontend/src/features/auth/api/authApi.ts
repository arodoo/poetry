/*
 * File: authApi.ts
 * Purpose: Auth API wrapper. Uses shared HTTP client and Zod parsing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { fetchJson } from '../../../shared/http/fetchClient'
import { AuthStatusSchema, type AuthStatus } from '../model/AuthSchemas'
import {
  AuthTokensSchema,
  type AuthTokens,
  MeSchema,
  type Me,
} from '../model/AuthTokensSchemas'

export async function getAuthStatus(): Promise<AuthStatus> {
  return AuthStatusSchema.parse(
    await fetchJson<unknown>('/api/v1/auth/status', { method: 'GET' })
  )
}

export async function postLogin(
  username: string,
  password: string
): Promise<AuthTokens> {
  return AuthTokensSchema.parse(
    await fetchJson<unknown>('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

export async function postRefresh(refreshToken: string): Promise<AuthTokens> {
  return AuthTokensSchema.parse(
    await fetchJson<unknown>('/api/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: { 'Content-Type': 'application/json' },
    })
  )
}

export async function postLogout(refreshToken: string): Promise<void> {
  await fetchJson<unknown>('/api/v1/auth/logout', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
    headers: { 'Content-Type': 'application/json' },
  })
}

export async function getMe(): Promise<Me> {
  return MeSchema.parse(
    await fetchJson<unknown>('/api/v1/auth/me', { method: 'GET' })
  )
}
