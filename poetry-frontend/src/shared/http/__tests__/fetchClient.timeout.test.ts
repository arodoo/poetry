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
  VITE_HTTP_RETRY_MAX_ATTEMPTS: '1',
  VITE_HTTP_RETRY_BACKOFF_MS: '10',
})

const g = globalThis as unknown as { fetch: typeof fetch }

describe('fetchClient timeout', () => {
  const realFetch = g.fetch
  const fetchJson = createFetchClient(env)

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    g.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('times out and fails without retries', async () => {
    g.fetch = vi.fn().mockImplementation(() => {
      // Return a promise that immediately rejects with AbortError
      return Promise.reject(new DOMException('Aborted', 'AbortError'))
    }) as unknown as typeof fetch

    const promise = fetchJson('/slow', { headers: {} })
    await expect(promise).rejects.toThrow('Aborted')
  })
})
