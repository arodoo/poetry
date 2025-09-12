/*
 * File: authApi.test.ts
 * Purpose: Smoke test for auth API wrapper.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import { describe, it, expect } from 'vitest'
import { getAuthStatus } from '../../../../features/auth'

describe('authApi', () => {
  it('returns status', async () => {
    const r = await getAuthStatus()
    expect(r.authenticated).toBe(false)
  })
})
