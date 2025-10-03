/*
 * File: accountClient.ts
 * Purpose: SDK surface for account endpoints backed by generated OpenAPI
 * client once available. Provides default singleton helpers that wrap the
 * shared fetch client and remain easily swappable for real codegen.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createFetchClient } from '../../http/fetchClient'
import { getEnv, type Env } from '../../config/env'
import type { HttpOptions } from '../../http/httpTypes'

export interface AccountLocaleDto {
  readonly locale: string
}

export interface AccountPasswordChangeRequestDto {
  readonly currentPassword: string
  readonly newPassword: string
}

export interface AccountSdk {
  getLocale(): Promise<AccountLocaleDto>
  changePassword(body: AccountPasswordChangeRequestDto): Promise<void>
}

export function createAccountSdk(env: Env = getEnv()): AccountSdk {
  const fetchJson: <T>(path: string, options?: HttpOptions) => Promise<T> =
    createFetchClient(env)
  return {
    async getLocale(): Promise<AccountLocaleDto> {
      return fetchJson<AccountLocaleDto>('/api/v1/me/locale')
    },
    async changePassword(body: AccountPasswordChangeRequestDto): Promise<void> {
      await fetchJson('/api/v1/me/password', {
        method: 'POST',
        body,
      })
    },
  }
}

const defaultAccountSdk: AccountSdk = createAccountSdk()

export function getAccountLocaleRaw(): Promise<AccountLocaleDto> {
  return defaultAccountSdk.getLocale()
}

export function postAccountPassword(
  body: AccountPasswordChangeRequestDto
): Promise<void> {
  return defaultAccountSdk.changePassword(body)
}
