/*
 * File: authApi.test.ts
 * Purpose: Smoke test for auth API wrapper with mocked HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../../shared/http/fetchClient', () => ({
  fetchJson: vi.fn().mockResolvedValue({ authenticated: false }),
}))

import { getAuthStatus } from '../../../../features/auth'

describe('authApi', () => {
  it('returns status', async () => {
    const r = await getAuthStatus()
    expect(r.authenticated).toBe(false)
  })
})
