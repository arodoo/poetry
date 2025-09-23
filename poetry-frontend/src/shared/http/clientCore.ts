/*
 File: clientCore.ts
 Purpose: Core HTTP JSON execution with timeout and retry policies.
 Isolates control flow from the client factory to keep files short and
 responsibilities separated per SRP. All Rights Reserved. Arodi
 Emmanuel
*/
import { delay } from './timeout'
import { type HttpOptions } from './httpTypes'
import { type Env } from '../config/env'
import { tokenStorage } from '../security/tokenStorage'
import { refreshTokenIfNeeded } from '../security/tokenRefreshService'

export async function fetchJsonInternal<T>(
  cfg: Env,
  path: string,
  options: HttpOptions
): Promise<T> {
  // Delegate the heavy lifting to a smaller module so this file remains
  // compact and within repository line/size limits.
  const base: string = cfg.VITE_API_BASE_URL.replace(/\/$/, '')
  const p: string = path.startsWith('/') ? path : `/${path}`
  const url: string = `${base}${p}`
  const retryCfg: { maxAttempts: number; backoffMs: number } =
    options.retry ?? {
      maxAttempts: cfg.VITE_HTTP_RETRY_MAX_ATTEMPTS,
      backoffMs: cfg.VITE_HTTP_RETRY_BACKOFF_MS,
    }
  const body: BodyInit | null =
    options.body !== undefined
      ? (JSON.stringify(options.body) as BodyInit)
      : null

  const tokens: { accessToken?: string; refreshToken?: string } | null =
    tokenStorage.load()
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (tokens?.accessToken && !options.headers?.['Authorization']) {
    defaultHeaders['Authorization'] = `Bearer ${tokens.accessToken}`
  }

  const method: 'GET' | 'POST' | 'PUT' | 'DELETE' = options.method ?? 'GET'
  const { performRequest } = await import('./clientCore/performRequest')
  return performRequest<T>(
    url,
    retryCfg,
    method,
    body,
    defaultHeaders,
    options.headers,
    options.signal,
    tokens,
    refreshTokenIfNeeded,
    delay
  )
}
