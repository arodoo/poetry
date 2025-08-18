/*
 File: fetchClient.timeout.test.ts
 Purpose: Tests timeout + retry behavior for slow responses.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { createFetchClient } from '../fetchClient'
import { parseEnv, type Env } from '../../config/env'

const env: Env = parseEnv({
  VITE_API_BASE_URL: 'http://example.com',
  VITE_LOG_LEVEL: 'error',
  VITE_FEATURE_AUTH: 'true',
  VITE_HTTP_TIMEOUT_MS: '50',
  VITE_HTTP_RETRY_MAX_ATTEMPTS: '2',
  VITE_HTTP_RETRY_BACKOFF_MS: '10',
})

const g = globalThis as unknown as { fetch: typeof fetch }
const onRej = (e: PromiseRejectionEvent): void => e.preventDefault()

describe('fetchClient timeout', () => {
  const realFetch = g.fetch
  const fetchJson = createFetchClient(env)

  beforeEach(() => {
    addEventListener('unhandledrejection', onRej)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    removeEventListener('unhandledrejection', onRej)
    g.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('times out and fails at max attempts', async () => {
    g.fetch = vi
      .fn()
      .mockImplementation((_input: RequestInfo, init?: RequestInit) => {
        const p = new Promise((_resolve, reject) => {
          const signal = init?.signal as AbortSignal | undefined
          if (signal)
            signal.addEventListener('abort', () => {
              reject(new DOMException('Aborted', 'AbortError'))
            })
        })
        p.catch(() => {})
        return p as unknown as Response
      }) as unknown as typeof fetch

    const promise = fetchJson('/slow', { headers: {} })
    await vi.runAllTimersAsync()
    await expect(promise).rejects.toThrow()
  })
})
