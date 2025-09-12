/*
 * File: adminApi.test.ts
 * Purpose: Tests for admin API wrapper.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as fetchModule from '../../../../shared/http/fetchClient'
import { adminEcho } from '../../../../features/admin'

describe('adminApi', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('echo returns parsed payload', async () => {
    const spy = vi
      .spyOn(fetchModule, 'fetchJson')
      .mockResolvedValueOnce({ message: 'hi' })
    const r = await adminEcho('hi')
    expect(r.message).toBe('hi')
    expect(spy).toHaveBeenCalled()
  })

  it('echo rejects invalid payload', async () => {
    // Return a value that doesn't satisfy the schema to trigger parse error
    vi.spyOn(fetchModule, 'fetchJson').mockResolvedValueOnce({
      foo: 'bar',
    } as unknown)
    await expect(adminEcho('x')).rejects.toBeTruthy()
  })
})
