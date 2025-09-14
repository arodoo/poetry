/*
 File: tokenStorage.test.ts
 Purpose: Ensure tokenStorage saves, loads and clears bundles.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { tokenStorage } from '../../../shared/security/tokenStorage'

describe('tokenStorage', () => {
  it('saves and loads', () => {
    tokenStorage.save({ accessToken: 'a', refreshToken: 'r' })
    const v = tokenStorage.load()
    expect(v?.accessToken).toBe('a')
    tokenStorage.clear()
    expect(tokenStorage.load()).toBeNull()
  })
})
