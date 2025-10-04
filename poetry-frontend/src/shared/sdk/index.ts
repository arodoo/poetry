/*
 File: index.ts
 Purpose: Frontend SDK surface wrapping HTTP client with stable, typed
 functions. Provides ETag-aware tokens retrieval and health endpoint.
 Organized by domain for better maintainability.
 
 @deprecated LEGACY MANUAL SDK - MIGRATION IN PROGRESS
 
 This SDK is being replaced by the OpenAPI-generated SDK in src/api/generated.
 Most endpoints have been migrated. Remaining endpoints not yet in OpenAPI:
 - /api/v1/me/profile (profile endpoints)
 - /api/v1/public/landing (public landing page)
 - /api/v1/public/forgot-password (password reset)
 
 For all other endpoints, use the generated SDK from src/api/generated.
 See seller-codes and users features for migration examples.
 
 All Rights Reserved. Arodi Emmanuel
*/
import { fetchJson } from '../http/fetchClient'
import { getEnv, type Env } from '../config/env'
import { createTokensFetcher, type TokensRawResult } from './tokens'

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

// Re-export all domain SDKs
export * from './account'
export * from './dashboard'
export * from './profile'
export * from './public'
export * from './seller-codes'
export * from './tokens'
export * from './users'
