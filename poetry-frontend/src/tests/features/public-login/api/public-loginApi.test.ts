/*
 * File: public-loginApi.test.ts
 * Purpose: Ensure public login API wrapper validates responses.
 * Tests now use generated SDK mocks from api/generated.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as generatedSdk from '../../../../api/generated'
import { submitPublicLogin } from '../../../../features/public-login'
import type { TokenResponse } from '../../../../api/generated'

const successDto: TokenResponse = {
  accessToken: 'token-a',
  refreshToken: 'token-b',
}

describe('public-loginApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns parsed tokens', async () => {
    vi.spyOn(generatedSdk, 'login').mockResolvedValue({
      data: successDto,
      request: new Request('http://localhost/api/v1/public/login'),
      response: new Response(),
    })
    const result = await submitPublicLogin({
      username: 'aurora',
      password: 'secret',
    })
    expect(result.accessToken).toBe('token-a')
  })

  it('throws when response invalid', async () => {
    vi.spyOn(generatedSdk, 'login').mockResolvedValue({
      data: {} as unknown as TokenResponse,
      request: new Request('http://localhost/api/v1/public/login'),
      response: new Response(),
    })
    await expect(
      submitPublicLogin({ username: 'aurora', password: 'secret' })
    ).rejects.toThrow()
  })
})
