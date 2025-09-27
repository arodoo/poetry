/*
 * File: accountApi.test.ts
 * Purpose: Ensure account API wrappers call the SDK and validate payloads.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import {
  fetchAccountLocale,
  updatePassword,
} from '../../../../features/account'

describe('accountApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses locale response through schema', async () => {
    vi.spyOn(sdk, 'getAccountLocaleRaw').mockResolvedValue({ locale: 'es' })
    const result = await fetchAccountLocale()
    expect(result.locale).toBe('es')
  })

  it('validates password payload before calling sdk', async () => {
    const spy = vi
      .spyOn(sdk, 'postAccountPassword')
      .mockResolvedValue(undefined)
    await updatePassword({
      currentPassword: 'current-secret',
      newPassword: 'new-secret-value',
    })
    expect(spy).toHaveBeenCalledWith({
      currentPassword: 'current-secret',
      newPassword: 'new-secret-value',
    })
  })
})
