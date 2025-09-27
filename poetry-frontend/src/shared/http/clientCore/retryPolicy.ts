/*
 * File: retryPolicy.ts
 * Purpose: Encapsulate retry rules for the HTTP client so the performer
 * stays concise and easier to reason about.
 * All Rights Reserved. Arodi Emmanuel
 */
import { HttpError } from './httpErrors'
import { type RetryConfig } from './requestTypes'

function isRetryableStatus(status: number): boolean {
  const isRateLimited: boolean = status === 429
  const isServerError: boolean = status >= 500 && status < 600
  return isRateLimited || isServerError
}

export function shouldRetryRequest(
  attempt: number,
  error: Error,
  retryCfg: RetryConfig
): boolean {
  const reachedLimit: boolean = attempt >= retryCfg.maxAttempts
  if (reachedLimit) {
    return false
  }
  if (error instanceof HttpError) {
    return isRetryableStatus(error.status)
  }
  return true
}
