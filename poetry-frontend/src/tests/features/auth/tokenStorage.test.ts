/*
 File: tokenStorage.test.ts
 Purpose: Ensure tokenStorage saves, loads and clears bundles.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { tokenStorage } from '../../../shared/security/tokens/tokenStorage'

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and loads', () => {
    tokenStorage.save({ accessToken: 'a', refreshToken: 'r' })
    const v = tokenStorage.load()
    expect(v?.accessToken).toBe('a')
    tokenStorage.clear()
    expect(tokenStorage.load()).toBeNull()
  })

  it('notifies subscribers on changes', () => {
    const listener = vi.fn()
    const unsubscribe = tokenStorage.subscribe(listener)
    tokenStorage.save({ accessToken: 'a', refreshToken: 'r' })
    tokenStorage.clear()
    expect(listener).toHaveBeenCalledTimes(2)
    listener.mockClear()
    unsubscribe()
    tokenStorage.save({ accessToken: 'x', refreshToken: 'y' })
    expect(listener).not.toHaveBeenCalled()
  })
})
