/*
 * File: requestTypes.ts
 * Purpose: Shared type definitions for the HTTP client retry logic so each
 * module stays concise and compliant with repository length limits.
 * All Rights Reserved. Arodi Emmanuel
 */
export type Tokens = { accessToken?: string; refreshToken?: string } | null

export type RefreshFn = () => Promise<{ accessToken: string } | null>

export type DelayFn = (milliseconds: number) => Promise<void>

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface RetryConfig {
  readonly maxAttempts: number
  readonly backoffMs: number
}

export interface RequestExecution {
  readonly url: string
  readonly retryCfg: RetryConfig
  readonly method: HttpMethod
  readonly body: BodyInit | null
  readonly headers: Record<string, string>
  readonly signal?: AbortSignal
  readonly tokens: Tokens
  readonly refreshTokenIfNeeded: RefreshFn
  readonly delay: DelayFn
}
