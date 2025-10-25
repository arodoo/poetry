/*
 * File: apiFixtures.ts
 * Purpose: Small deterministic API seeding helpers used by E2E tests.
 * All Rights Reserved.
 */
import { randomUUID } from 'crypto'

const API_BASE = process.env.PW_API_URL ?? 'http://localhost:8080'

export async function createMembership(payload: Record<string, unknown> = {}) {
  const body = {
    name: `e2e-membership-${Date.now()}`,
    active: true,
    // sensible defaults; tests can override
    ...payload,
  }

  const res = await fetch(`${API_BASE}/api/v1/memberships`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `createMembership failed: ${res.status} ${res.statusText} ${text}`
    )
  }

  return await res.json()
}

export async function deleteMembership(id: string) {
  if (!id) return
  await fetch(`${API_BASE}/api/v1/memberships/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}

export async function ensureTestUser() {
  // lightweight helper to create a test user if needed; returns {id, email}
  const res = await fetch(`${API_BASE}/api/v1/users?filter=e2e`, {
    method: 'GET',
  })
  if (res.ok) {
    const list = await res.json().catch(() => [])
    if (Array.isArray(list) && list.length > 0) return list[0]
  }

  const email = `e2e-${randomUUID().slice(0, 8)}@example.test`
  const create = await fetch(`${API_BASE}/api/v1/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name: 'E2E Test' }),
  })
  if (!create.ok) throw new Error('ensureTestUser: create user failed')
  return create.json()
}
