/*
 * File: usersQueries.test.ts
 * Purpose: Keep users query key helpers stable for cache invalidation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { usersQueryKeys } from '../../../../features/users'

describe('usersQueryKeys', () => {
  it('creates stable list and detail keys', () => {
    expect(usersQueryKeys.list()).toEqual(['users', 'list'])
    expect(usersQueryKeys.detail('abc')).toEqual(['users', 'detail', 'abc'])
  })
})
