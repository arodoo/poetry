/*
 * File: publicClient.ts
 * Purpose: SDK helpers for public landing endpoints.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../../http/fetchClient'
import { getEnv, type Env } from '../../config/env'
import type { HttpOptions } from '../../http/httpTypes'

export interface PublicLandingFeatureDto {
  readonly titleKey: string
  readonly descriptionKey: string
}

export interface PublicLandingDto {
  readonly heroTitleKey: string
  readonly heroBodyKey: string
  readonly loginCtaKey: string
  readonly registerCtaKey: string
  readonly features: readonly PublicLandingFeatureDto[]
}

export interface PublicSdk {
  getLanding(): Promise<PublicLandingDto>
}

export function createPublicSdk(env: Env = getEnv()): PublicSdk {
  const fetchJson: <T>(path: string, options?: HttpOptions) => Promise<T> =
    createFetchClient(env)
  return {
    getLanding(): Promise<PublicLandingDto> {
      return fetchJson<PublicLandingDto>('/api/v1/public/landing')
    },
  }
}

const defaultPublicSdk: PublicSdk = createPublicSdk()

export function getPublicLandingRaw(): Promise<PublicLandingDto> {
  return defaultPublicSdk.getLanding()
}
