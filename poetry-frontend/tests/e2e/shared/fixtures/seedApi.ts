/*
 * File: seedApi.ts
 * Purpose: Authenticated API seeding helpers for E2E tests.
 * Provides create/delete functions for zones, memberships,
 * and other entities with real backend authentication.
 * All Rights Reserved. Arodi Emmanuel
 */
import { request, type APIRequestContext } from '@playwright/test'
import { getAuthTokens } from '../providers/tokenProvider'

const BASE = process.env.PW_API_URL ?? 'http://localhost:8080'

export async function authedApi(): Promise<APIRequestContext> {
  const t = await getAuthTokens()
  return request.newContext({
    baseURL: BASE,
    extraHTTPHeaders: {
      Authorization: `Bearer ${t.accessToken}`,
      'Content-Type': 'application/json',
    },
  })
}

export interface SeedZone {
  id: number
  name: string
  description: string
  status: string
  managerId: number
  version: number
}

export async function seedZone(
  overrides: Record<string, unknown> = {}
): Promise<SeedZone> {
  const api = await authedApi()
  const body = {
    name: `e2e-zone-${Date.now()}`,
    description: 'E2E test zone',
    status: 'ACTIVE',
    managerId: 1,
    ...overrides,
  }
  const resp = await api.post('/api/v1/zones', { data: body })
  if (!resp.ok()) {
    const text = await resp.text().catch(() => '')
    throw new Error(`seedZone failed: ${resp.status()} ${text}`)
  }
  const data = (await resp.json()) as SeedZone
  await api.dispose()
  return data
}

export async function deleteZone(id: number): Promise<void> {
  const api = await authedApi()
  await api.delete(`/api/v1/zones/${id}`)
  await api.dispose()
}

export interface SeedMembership {
  id: number
  userId: number
  subscriptionId: number
  sellerCode: string
  status: string
}

export async function seedMembership(
  overrides: Record<string, unknown> = {}
): Promise<SeedMembership> {
  const api = await authedApi()
  const body = {
    userId: 1,
    subscriptionId: 1,
    sellerCode: 'codigo001',
    ...overrides,
  }
  const resp = await api.post('/api/v1/memberships', { data: body })
  if (!resp.ok()) {
    const text = await resp.text().catch(() => '')
    throw new Error(`seedMembership: ${resp.status()} ${text}`)
  }
  const data = (await resp.json()) as SeedMembership
  await api.dispose()
  return data
}

export async function deleteMembership(id: number): Promise<void> {
  const api = await authedApi()
  await api.delete(`/api/v1/memberships/${id}`)
  await api.dispose()
}
