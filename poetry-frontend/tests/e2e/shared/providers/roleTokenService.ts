/*
 * File: roleTokenService.ts
 * Purpose: Role-aware token acquisition for E2E tests.
 * Allows logging in as admin, manager, or creating a
 * user-only account for negative access testing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { request, type APIRequestContext } from '@playwright/test'

const BASE = 'http://localhost:8080'
const PASS = 'ChangeMe123!'

interface RawTokenResponse {
  username: string
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface RoleTokens {
  accessToken: string
  refreshToken: string
  username: string
  expiresAt: number
}

const ROLE_USERS: Record<string, string> = {
  admin: 'admin',
  manager: 'gerente1',
}

async function api(): Promise<APIRequestContext> {
  return request.newContext({ baseURL: BASE })
}

export async function loginAs(role: 'admin' | 'manager'): Promise<RoleTokens> {
  const ctx = await api()
  const resp = await ctx.post('/api/v1/auth/login', {
    data: { username: ROLE_USERS[role], password: PASS },
    headers: { 'Content-Type': 'application/json' },
  })
  if (!resp.ok()) {
    throw new Error(`loginAs(${role}) failed: ${resp.status()}`)
  }
  const d = (await resp.json()) as RawTokenResponse
  return {
    accessToken: d.accessToken,
    refreshToken: d.refreshToken,
    username: d.username,
    expiresAt: Date.now() + (d.expiresIn - 10) * 1000,
  }
}
