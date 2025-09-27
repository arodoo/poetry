/*
 * File: publicQueries.test.ts
 * Purpose: Ensure public query key helpers remain stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { publicQueryKeys } from '../../../../features/public'

describe('publicQueryKeys', () => {
  it('builds landing key deterministically', () => {
    expect(publicQueryKeys.landing()).toEqual(['public', 'landing'])
  })
})
