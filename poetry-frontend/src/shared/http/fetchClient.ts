/*
 File: fetchClient.ts
 Purpose: Typed, configurable fetch wrapper with timeout and retry
 using env-driven settings. Exposes a single fetchJson helper.
 All Rights Reserved. Arodi Emmanuel
*/
import { getEnv, type Env } from '../config/env'

export type HttpOptions = Readonly<{
  signal?: AbortSignal
  headers?: Record<string, string>
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: unknown
  timeoutMs?: number
  retry?: Readonly<{ maxAttempts: number; backoffMs: number }>
}>

const sleep = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms))

const timeoutSignal = (
  ms: number,
  external?: AbortSignal
): { signal: AbortSignal; clear: () => void } => {
  const c = new AbortController()
  const id = setTimeout(() => c.abort(), ms)
  const clear = (): void => clearTimeout(id)
  if (external) {
    if (external.aborted) c.abort()
    else external.addEventListener('abort', () => c.abort(), { once: true })
  }
  return { signal: c.signal, clear }
}

export function createFetchClient(cfg: Env) {
  return async function fetchJson<T>(
    path: string,
    options: HttpOptions = {}
  ): Promise<T> {
    const base = cfg.VITE_API_BASE_URL.replace(/\/$/, '')
    const url = `${base}${path}`

    const timeout = options.timeoutMs ?? cfg.VITE_HTTP_TIMEOUT_MS
    const retryCfg = options.retry ?? {
      maxAttempts: cfg.VITE_HTTP_RETRY_MAX_ATTEMPTS,
      backoffMs: cfg.VITE_HTTP_RETRY_BACKOFF_MS,
    }

    let lastErr: Error | null = null
    for (let attempt = 1; attempt <= retryCfg.maxAttempts; attempt++) {
      const { signal, clear } = timeoutSignal(timeout, options.signal)
      try {
        const res = await fetch(url, {
          method: options.method ?? 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers ?? {}),
          },
          body:
            options.body !== undefined
              ? (JSON.stringify(options.body) as BodyInit)
              : null,
          signal,
        })

        if (!res.ok) {
          // retry on 5xx, otherwise throw
          if (res.status >= 500 && res.status < 600) {
            throw new Error(`HTTP ${res.status}`)
          }
          const text = await res.text()
          throw new Error(`HTTP ${res.status}: ${text}`)
        }
        return (await res.json()) as T
      } catch (err: unknown) {
        lastErr = err instanceof Error ? err : new Error(String(err))
        if (attempt === retryCfg.maxAttempts) break
        await sleep(retryCfg.backoffMs)
      } finally {
        clear()
      }
    }
    // lastErr is non-null here
    throw lastErr!
  }
}

export async function fetchJson<T>(
  path: string,
  options: HttpOptions = {}
): Promise<T> {
  const client = createFetchClient(getEnv())
  return client<T>(path, options)
}
