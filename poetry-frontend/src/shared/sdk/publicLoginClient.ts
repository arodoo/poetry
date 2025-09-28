/*
 * File: publicLoginClient.ts
 * Purpose: SDK helper for public login endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import { createIdempotencyKey } from '../http/idempotency'

export interface PublicLoginRequestDto {
  readonly username: string
  readonly password: string
}

export interface PublicLoginResponseDto {
  readonly accessToken: string
  readonly refreshToken: string
}

export interface PublicLoginSdk {
  authenticate(body: PublicLoginRequestDto): Promise<PublicLoginResponseDto>
}

export function createPublicLoginSdk(env: Env = getEnv()): PublicLoginSdk {
  const fetchJson: <T>(
    path: string,
    options?: import('../http/httpTypes').HttpOptions
  ) => Promise<T> = createFetchClient(env)
  return {
    authenticate(body: PublicLoginRequestDto): Promise<PublicLoginResponseDto> {
      return fetchJson<PublicLoginResponseDto>('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': createIdempotencyKey(),
        },
        body,
      })
    },
  }
}
const defaultPublicLoginSdk: PublicLoginSdk = createPublicLoginSdk()

export function postPublicLogin(
  body: PublicLoginRequestDto
): Promise<PublicLoginResponseDto> {
  return defaultPublicLoginSdk.authenticate(body)
}
