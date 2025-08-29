/*
 File: errorMapper.test.ts
 Purpose: Test mapping of internal error codes to i18n keys.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { mapErrorCodeToKey } from '../../shared/i18n/errorMapper'

describe('errorMapper', () => {
  it('returns null for undefined', () => {
    expect(mapErrorCodeToKey()).toBeNull()
  })
  it('returns null for unknown code', () => {
    expect(mapErrorCodeToKey('unknown.code')).toBeNull()
  })
  it('maps known code', () => {
    const result = mapErrorCodeToKey('auth.invalid.credentials')
    expect(result).toBe('ui.common.close')
  })
})
