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

const resolveBody = (method: string, body: BodyInit | null): BodyInit | null =>
  method === 'GET' ? null : body
const normalizeError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error))

export async function performRequest<T>(
  execution: RequestExecution
): Promise<T> {
  let lastError: Error | null = null
  const headers: Record<string, string> = { ...execution.headers }
  for (let attempt = 1; attempt <= execution.retryCfg.maxAttempts; attempt++) {
    const controller = new AbortController()
    const activeSignal = execution.signal ?? controller.signal
    try {
      const response: Response = await fetch(execution.url, {
        method: execution.method,
        headers,
        body: resolveBody(execution.method, execution.body),
        signal: activeSignal,
      })
      // E2E tracing: emit a compact console log when interacting with tokens API
      try {
        if (
          window.__E2E__ === true &&
          execution.url.includes('/api/v1/tokens')
        ) {
          console.log('[E2E][HTTP] request', {
            method: execution.method,
            url: execution.url,
            attempt,
          })
        }
      } catch {
        // ignore
      }
      if (!response.ok) {
        try {
          if (
            window.__E2E__ === true &&
            execution.url.includes('/api/v1/tokens')
          ) {
            console.log('[E2E][HTTP] response-not-ok', {
              status: response.status,
              url: execution.url,
            })
          }
        } catch {
          // ignore
        }
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
  throw lastError ?? new Error('Unknown HTTP error') // i18n-ignore
}
