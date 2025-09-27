/*
 * File: profileClient.ts
 * Purpose: SDK helpers for profile endpoints backed by the shared HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import type { HttpOptions } from '../http/httpTypes'

export interface ProfileSummaryDto {
  readonly username: string
  readonly email: string
  readonly locale: string
  readonly version: string
}

export interface ProfileSummaryUpdateDto {
  readonly username: string
  readonly version: string
}

export interface ProfileSdk {
  getSummary(): Promise<ProfileSummaryDto>
  updateSummary(body: ProfileSummaryUpdateDto): Promise<ProfileSummaryDto>
}

export function createProfileSdk(env: Env = getEnv()): ProfileSdk {
  const fetchJson: <T>(path: string, options?: HttpOptions) => Promise<T> =
    createFetchClient(env)
  return {
    getSummary(): Promise<ProfileSummaryDto> {
      return fetchJson<ProfileSummaryDto>('/api/v1/me/profile')
    },
    updateSummary(body: ProfileSummaryUpdateDto): Promise<ProfileSummaryDto> {
      return fetchJson<ProfileSummaryDto>('/api/v1/me/profile', {
        method: 'PUT',
        body,
      })
    },
  }
}

const defaultProfileSdk: ProfileSdk = createProfileSdk()

export function getProfileSummaryRaw(): Promise<ProfileSummaryDto> {
  return defaultProfileSdk.getSummary()
}

export function putProfileSummary(
  body: ProfileSummaryUpdateDto
): Promise<ProfileSummaryDto> {
  return defaultProfileSdk.updateSummary(body)
}
