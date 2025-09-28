/*
 * File: tokenService.ts
 * Purpose: Helper functions for token acquisition used by e2e tokenProvider.
 */
import { request, type APIRequestContext } from '@playwright/test'

interface RawTokenResponse {
  username: string
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface CachedTokens {
  accessToken: string
  refreshToken: string
  username: string
  expiresAt: number
}

const USER: string = 'admin'
const PASS: string = 'ChangeMe123!'

async function api(): Promise<APIRequestContext> {
  const ctx: APIRequestContext = await request.newContext({
    baseURL: 'http://localhost:8080',
  })
  return ctx
}

export async function login(): Promise<CachedTokens> {
  const ctx: APIRequestContext = await api()
  const resp: import('@playwright/test').APIResponse = await ctx.post(
    '/api/v1/auth/login',
    {
      data: { username: USER, password: PASS },
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    }
  )
  if (!resp.ok()) throw new Error('login failed ' + String(resp.status()))
  const data: RawTokenResponse = (await resp.json()) as RawTokenResponse
  const expiresAt: number = Date.now() + (data.expiresIn - 10) * 1000
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    username: data.username,
    expiresAt,
  }
}

export async function refresh(existing: CachedTokens): Promise<CachedTokens> {
  const ctx: APIRequestContext = await api()
  const resp: import('@playwright/test').APIResponse = await ctx.post(
    '/api/v1/auth/refresh',
    {
      data: { refreshToken: existing.refreshToken },
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    }
  )
  if (!resp.ok()) return login()
  const data: RawTokenResponse = (await resp.json()) as RawTokenResponse
  const expiresAt: number = Date.now() + (data.expiresIn - 10) * 1000
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    username: data.username,
    expiresAt,
  }
}
