/*
 File: index.ts
 Purpose: Frontend SDK surface wrapping HTTP client with stable, typed
 functions. Provides ETag-aware tokens retrieval and health endpoint.
 All Rights Reserved. Arodi Emmanuel
*/
import { fetchJson } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import { createTokensFetcher, type TokensRawResult } from './tokensFetcher'

export interface HealthDto {
  readonly status: string
}

export interface SdkClient {
  getHealth(): Promise<HealthDto>
  getTokensRaw<T = unknown>(): Promise<TokensRawResult<T>>
}

export function createSdk(env: Env = getEnv()): SdkClient {
  const fetchTokens: () => Promise<TokensRawResult<unknown>> =
    createTokensFetcher(env)
  return {
    getHealth: async (): Promise<HealthDto> => {
      return fetchJson<HealthDto>('/api/v1/health')
    },
    getTokensRaw<R = unknown>(): Promise<TokensRawResult<R>> {
      return fetchTokens() as Promise<TokensRawResult<R>>
    },
  } satisfies SdkClient
}

// Default singleton (DI-friendly: callers can inject createSdk())
const defaultClient: SdkClient = createSdk()

export function getHealth(): Promise<HealthDto> {
  return defaultClient.getHealth()
}

export function getTokensRaw<T = unknown>(): Promise<TokensRawResult<T>> {
  return defaultClient.getTokensRaw<T>()
}
export * from './exportsA'
export * from './users'
export * from './sellerCodesClient'
