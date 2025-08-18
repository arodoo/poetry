/*
 File: httpTypes.ts
 Purpose: Shared HTTP client types for request options and retry config.
 Centralizes type contracts consumed by fetch client and tests to keep
 files small and cohesive per the 60-line rule. All Rights Reserved.
 Arodi Emmanuel
*/

export interface RetryConfig {
  readonly maxAttempts: number
  readonly backoffMs: number
}

export interface HttpOptions {
  readonly signal?: AbortSignal
  readonly headers?: Record<string, string>
  readonly method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  readonly body?: unknown
  readonly timeoutMs?: number
  readonly retry?: RetryConfig
}
