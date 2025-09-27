/*
 * File: performRequest.ts
 * Purpose: Execute HTTP requests using retry, refresh, and parsing helpers
 * composed from dedicated modules to respect repository constraints.
 * All Rights Reserved. Arodi Emmanuel
 */
import { HttpError } from './httpErrors'
import { parseJsonResponse } from './responseParser'
import { tryRefreshAuthorization } from './tokenRefresh'
import { shouldRetryRequest } from './retryPolicy'
import { type RequestExecution } from './requestTypes'

function resolveBody(method: string, body: BodyInit | null): BodyInit | null {
  const isGet: boolean = method === 'GET'
  return isGet ? null : body
}

function normalizeError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

export async function performRequest<T>(
  execution: RequestExecution
): Promise<T> {
  let lastError: Error | null = null
  const headers: Record<string, string> = { ...execution.headers }
  for (
    let attempt: number = 1;
    attempt <= execution.retryCfg.maxAttempts;
    attempt++
  ) {
    const controller: AbortController = new AbortController()
    const activeSignal: AbortSignal = execution.signal ?? controller.signal
    try {
      const response: Response = await fetch(execution.url, {
        method: execution.method,
        headers,
        body: resolveBody(execution.method, execution.body),
        signal: activeSignal,
      })
      if (!response.ok) {
        const refreshed: boolean = await tryRefreshAuthorization(
          response,
          attempt,
          execution.tokens,
          execution.refreshTokenIfNeeded,
          headers
        )
        if (refreshed) {
          continue
        }
        const bodyText: string = await response.text()
        throw new HttpError(response.status, bodyText)
      }
      return await parseJsonResponse<T>(response)
    } catch (error: unknown) {
      lastError = normalizeError(error)
      const shouldRetry: boolean = shouldRetryRequest(
        attempt,
        lastError,
        execution.retryCfg
      )
      if (!shouldRetry) {
        break
      }
      await execution.delay(execution.retryCfg.backoffMs)
    }
  }
  throw lastError ?? new Error('Unknown HTTP error')
}
