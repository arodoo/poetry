/*
 File: clientCore.ts
 Purpose: Core HTTP JSON execution with timeout and retry policies.
 Isolates control flow from the client factory to keep files short and
 responsibilities separated per SRP. All Rights Reserved. Arodi
 Emmanuel
*/
import { createTimeout, delay } from './timeout'
import { type HttpOptions } from './httpTypes'
import { type Env } from '../config/env'

export async function fetchJsonInternal<T>(
  cfg: Env,
  path: string,
  options: HttpOptions
): Promise<T> {
  const base: string = cfg.VITE_API_BASE_URL.replace(/\/$/, '')
  const p: string = path.startsWith('/') ? path : `/${path}`
  const url: string = `${base}${p}`
  const timeout: number = options.timeoutMs ?? cfg.VITE_HTTP_TIMEOUT_MS
  const retryCfg: Required<NonNullable<HttpOptions['retry']>> =
    options.retry ?? {
      maxAttempts: cfg.VITE_HTTP_RETRY_MAX_ATTEMPTS,
      backoffMs: cfg.VITE_HTTP_RETRY_BACKOFF_MS,
    }
  const body: BodyInit | null =
    options.body !== undefined
      ? (JSON.stringify(options.body) as BodyInit)
      : null

  let lastErr: Error | null = null
  for (let attempt: number = 1; attempt <= retryCfg.maxAttempts; attempt++) {
    const { signal, clear } = createTimeout(timeout, options.signal)
    try {
      const res: Response = await fetch(url, {
        method: options.method ?? 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers ?? {}),
        },
        body,
        signal,
      })
      if (!res.ok) {
        if (res.status >= 500 && res.status < 600) {
          throw new Error(`HTTP ${String(res.status)}`)
        }
        const text: string = await res.text()
        throw new Error(`HTTP ${String(res.status)}: ${text}`)
      }
      return (await res.json()) as T
    } catch (err: unknown) {
      lastErr = err instanceof Error ? err : new Error(String(err))
      if (attempt === retryCfg.maxAttempts) break
      await delay(retryCfg.backoffMs)
    } finally {
      clear()
    }
  }
  // i18n-ignore: internal fallback error, not user-facing
  throw lastErr ?? new Error('Unknown HTTP error')
}
