/*
 * File: adminQueries.test.ts
 * Purpose: Smoke test for admin query hook keys.
 * All Rights Reserved. Arodi Emmanuel TODO
 */
import { describe, it, expect } from 'vitest'
import { adminQueryKeys } from '../../../../features/admin'

describe('adminQueryKeys', () => {
  it('builds stable keys', () => {
    expect(adminQueryKeys.echo('x')).toEqual(['admin', 'echo', 'x'])
  })
})
