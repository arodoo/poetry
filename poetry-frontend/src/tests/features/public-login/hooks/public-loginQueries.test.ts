/*
 * File: public-loginQueries.test.ts
 * Purpose: Ensure login query keys remain stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { publicLoginKeys } from '../../../../features/public-login'

describe('publicLoginKeys', () => {
  it('builds request key deterministically', () => {
    expect(publicLoginKeys.request()).toEqual(['publicLogin', 'request'])
  })
})
