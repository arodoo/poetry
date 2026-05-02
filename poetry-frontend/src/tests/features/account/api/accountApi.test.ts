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
      data: {},
      request: new Request('http://localhost/api/v1/account/password'),
      response: new Response(),
    })
    await updatePassword({
      currentPassword: 'current-secret',
      newPassword: 'NewSecret123!',
    })
    expect(spy).toHaveBeenCalledWith({
      body: {
        currentPassword: 'current-secret',
        newPassword: 'NewSecret123!',
      },
    })
  })

  it('throws when password update returns sdk error', async () => {
    vi.spyOn(generatedSdk, 'changePassword').mockResolvedValue({
      error: {},
      request: new Request('http://localhost/api/v1/account/password'),
      response: new Response(null, { status: 403 }),
    })
    await expect(
      updatePassword({
        currentPassword: 'bad-current-secret',
        newPassword: 'BetterSecret1!',
      })
    ).rejects.toThrow('HTTP 403')
  })
})
