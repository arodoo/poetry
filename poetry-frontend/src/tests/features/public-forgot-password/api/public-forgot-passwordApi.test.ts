/*
 * File: public-forgot-passwordApi.test.ts
 * Purpose: Ensure API wrapper validates payload and response.
 * All Rights Reserved. Arodi Emmanuel
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import * as sdk from '../../../../shared/sdk'
import type { PublicForgotPasswordResponseDto } from '../../../../shared/sdk'
import { submitPublicForgotPassword } from '../../../../features/public-forgot-password'

const successDto = {
  messageKey: 'ui.publicForgotPassword.success',
}

describe('public-forgot-passwordApi', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses response from sdk', async () => {
    vi.spyOn(sdk, 'postPublicForgotPassword').mockResolvedValue(successDto)
    const result = await submitPublicForgotPassword({
      email: 'person@example.com',
    })
    expect(result.messageKey).toBe('ui.publicForgotPassword.success')
  })

  it('throws when response is invalid', async () => {
    vi.spyOn(sdk, 'postPublicForgotPassword').mockResolvedValue(
      {} as unknown as PublicForgotPasswordResponseDto
    )
    await expect(
      submitPublicForgotPassword({ email: 'person@example.com' })
    ).rejects.toThrow()
  })
})
