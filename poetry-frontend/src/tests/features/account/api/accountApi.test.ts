/*
 * File: accountApi.test.ts
 * Purpose: Ensure account API wrappers call the SDK and validate payloads.
 * Tests now use generated SDK mocks from api/generated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as generatedSdk from '../../../../api/generated'
import {
  fetchAccountLocale,
  updatePassword,
} from '../../../../features/account'

describe('accountApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses locale response through schema', async () => {
    vi.spyOn(generatedSdk, 'getLocale').mockResolvedValue({
      data: { locale: 'es' },
      request: new Request('http://localhost/api/v1/account/locale'),
      response: new Response(),
    })
    const result = await fetchAccountLocale()
    expect(result.locale).toBe('es')
  })

  it('validates password payload before calling sdk', async () => {
    const spy = vi.spyOn(generatedSdk, 'changePassword').mockResolvedValue({
      data: undefined,
      request: new Request('http://localhost/api/v1/account/password'),
      response: new Response(),
    })
    await updatePassword({
      currentPassword: 'current-secret',
      newPassword: 'new-secret-value',
    })
    expect(spy).toHaveBeenCalledWith({
      body: {
        currentPassword: 'current-secret',
        newPassword: 'new-secret-value',
      },
    })
  })
})
