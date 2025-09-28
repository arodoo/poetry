/*
 * File: accountQueries.test.ts
 * Purpose: Keep account query key helpers stable.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { accountQueryKeys } from '../../../../features/account'

describe('accountQueryKeys', () => {
  it('creates stable locale key', () => {
    expect(accountQueryKeys.locale()).toEqual(['account', 'locale'])
  })
})
