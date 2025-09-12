/*
 * File: adminApi.test.ts
 * Purpose: Smoke test for admin API wrapper.
 * All Rights Reserved. Arodi Emmanuel
 * TODO
 */
import { describe, it, expect } from 'vitest'
import { adminEcho } from '../../../../features/admin'

describe('adminApi', () => {
  it('echo returns payload', async () => {
    const r = await adminEcho('hi')
    expect(r.message).toBe('hi')
  })
})
