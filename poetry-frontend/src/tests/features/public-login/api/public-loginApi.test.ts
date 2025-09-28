/*
 * File: public-loginApi.test.ts
 * Purpose: Ensure public login API wrapper validates responses.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import { submitPublicLogin } from '../../../../features/public-login'
import type { PublicLoginResponseDto } from '../../../../shared/sdk'

const successDto: PublicLoginResponseDto = {
  accessToken: 'token-a',
  refreshToken: 'token-b',
}

describe('public-loginApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns parsed tokens', async () => {
    vi.spyOn(sdk, 'postPublicLogin').mockResolvedValue(successDto)
    const result = await submitPublicLogin({
      username: 'aurora',
      password: 'secret',
    })
    expect(result.accessToken).toBe('token-a')
  })

  it('throws when response invalid', async () => {
    vi.spyOn(sdk, 'postPublicLogin').mockResolvedValue(
      {} as unknown as PublicLoginResponseDto
    )
    await expect(
      submitPublicLogin({ username: 'aurora', password: 'secret' })
    ).rejects.toThrow()
  })
})
