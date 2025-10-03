/*
 * File: tokenStorage.stability.test.ts
 * Purpose: Verify tokenStorage returns stable object references to prevent
 * infinite re-render loops in useSyncExternalStore.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { tokenStorage } from '../../../shared/security/tokenStorage'

describe('tokenStorage object stability', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns same object reference when localStorage unchanged', () => {
    const tokens = { accessToken: 'test-access', refreshToken: 'test-refresh' }
    tokenStorage.save(tokens)

    const load1 = tokenStorage.load()
    const load2 = tokenStorage.load()

    expect(load1).toBe(load2) // SAME REFERENCE - critical for useSyncExternalStore!
  })

  it('returns new object only when localStorage changes', () => {
    tokenStorage.save({ accessToken: 'token1', refreshToken: 'refresh1' })
    const load1 = tokenStorage.load()

    tokenStorage.save({ accessToken: 'token2', refreshToken: 'refresh2' })
    const load2 = tokenStorage.load()

    expect(load1).not.toBe(load2) // Different reference after change
    expect(load1?.accessToken).toBe('token1')
    expect(load2?.accessToken).toBe('token2')
  })

  it('returns same null reference when empty', () => {
    const load1 = tokenStorage.load()
    const load2 = tokenStorage.load()

    expect(load1).toBeNull()
    expect(load2).toBeNull()
  })

  it('returns new reference after clear', () => {
    tokenStorage.save({ accessToken: 'test', refreshToken: 'test' })
    const load1 = tokenStorage.load()

    tokenStorage.clear()
    const load2 = tokenStorage.load()

    expect(load1).not.toBeNull()
    expect(load2).toBeNull()
  })
})
