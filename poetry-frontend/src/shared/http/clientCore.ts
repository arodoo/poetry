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
import {
  type RequestExecution,
  type RetryConfig,
  type HttpMethod,
  type Tokens,
} from './clientCore/requestTypes'

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
  const retryCfg: RetryConfig = options.retry ?? {
    maxAttempts: cfg.VITE_HTTP_RETRY_MAX_ATTEMPTS,
    backoffMs: cfg.VITE_HTTP_RETRY_BACKOFF_MS,
  }
  const body: BodyInit | null =
    options.body !== undefined
      ? (JSON.stringify(options.body) as BodyInit)
      : null

  const tokens: Tokens = tokenStorage.load()
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (tokens?.accessToken && !options.headers?.['Authorization']) {
    defaultHeaders['Authorization'] = `Bearer ${tokens.accessToken}`
  }

  const headers: Record<string, string> = {
    ...defaultHeaders,
    ...(options.headers ?? {}),
  }

  const method: HttpMethod = options.method ?? 'GET'
  const { performRequest } = await import('./clientCore/performRequest')
  const baseExecution: Omit<RequestExecution, 'signal'> = {
    url,
    retryCfg,
    method,
    body,
    headers,
    tokens,
    refreshTokenIfNeeded,
    delay,
  }
  const execution: RequestExecution =
    options.signal !== undefined
      ? { ...baseExecution, signal: options.signal }
      : baseExecution
  return performRequest<T>(execution)
}
