/*
 * File: authQueries.test.ts
 * Purpose: Smoke test for auth query keys.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { authQueryKeys } from '../../../../features/auth'

describe('authQueryKeys', () => {
  it('stable keys', () => {
    expect(authQueryKeys.status).toEqual(['auth', 'status'])
  })
})
