/*
 * File: tokensQueries.test.ts
 * Purpose: Smoke test for tokens query keys and hook typing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { tokensQueryKeys } from '../../../../features/tokens'

describe('tokensQueryKeys', () => {
  it('stable keys', () => {
    expect(tokensQueryKeys.all).toEqual(['tokens'])
  })
})
