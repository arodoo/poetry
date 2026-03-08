/*
 * File: seedUserRole.ts
 * Purpose: Creates a test user with only the 'user' role via
 * admin API. Provides cleanup function for teardown.
 * All Rights Reserved. Arodi Emmanuel
 */
import { authedApi } from './seedApi'

export interface SeedUser {
  id: number
  username: string
  email: string
}

export const USER_ONLY_PASS = 'E2eUser123!'

export async function seedUserOnlyAccount(): Promise<SeedUser> {
  const unique = `e2e-user-${Date.now()}`
  const api = await authedApi()
  const body = {
    firstName: 'E2E',
    lastName: 'UserOnly',
    email: `${unique}@test.com`,
    username: unique,
    password: USER_ONLY_PASS,
    locale: 'en',
    roles: ['user'],
    status: 'active',
  }
  const resp = await api.post('/api/v1/users', { data: body })
  if (!resp.ok()) {
    const txt = await resp.text().catch(() => '')
    throw new Error(`seedUserOnly: ${resp.status()} ${txt}`)
  }
  const data = (await resp.json()) as SeedUser
  await api.dispose()
  return data
}

export async function deleteUser(id: number): Promise<void> {
  const api = await authedApi()
  await api.delete(`/api/v1/users/${id}`)
  await api.dispose()
}
