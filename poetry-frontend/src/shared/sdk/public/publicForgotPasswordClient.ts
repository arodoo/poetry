/*
 * File: publicForgotPasswordClient.ts
 * Purpose: SDK helper for public forgot-password endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../../http/fetchClient'
import { getEnv, type Env } from '../../config/env'
import { createIdempotencyKey } from '../../http/idempotency'

export interface PublicForgotPasswordRequestDto {
  readonly email: string
}

export interface PublicForgotPasswordResponseDto {
  readonly messageKey: string
}

export interface PublicForgotPasswordSdk {
  sendRequest(
    body: PublicForgotPasswordRequestDto
  ): Promise<PublicForgotPasswordResponseDto>
}

export function createPublicForgotPasswordSdk(
  env: Env = getEnv()
): PublicForgotPasswordSdk {
  const fetchJson: <T>(
    path: string,
    options?: import('../../http/httpTypes').HttpOptions
  ) => Promise<T> = createFetchClient(env)
  return {
    sendRequest(
      body: PublicForgotPasswordRequestDto
    ): Promise<PublicForgotPasswordResponseDto> {
      return fetchJson<PublicForgotPasswordResponseDto>(
        '/api/v1/public/forgot-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Idempotency-Key': createIdempotencyKey(),
          },
          body,
        }
      )
    },
  }
}
const defaultPublicForgotPasswordSdk: PublicForgotPasswordSdk =
  createPublicForgotPasswordSdk()

export function postPublicForgotPassword(
  body: PublicForgotPasswordRequestDto
): Promise<PublicForgotPasswordResponseDto> {
  return defaultPublicForgotPasswordSdk.sendRequest(body)
}
