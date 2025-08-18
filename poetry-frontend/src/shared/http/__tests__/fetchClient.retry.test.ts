/*
 File: fetchClient.retry.test.ts
 Purpose: Tests retry logic for transient 5xx responses.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, afterEach } from 'vitest'
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

describe('fetchClient retry', () => {
  const realFetch = g.fetch
  const fetchJson = createFetchClient(env)

  afterEach(() => {
    g.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('retries on 500 then succeeds', async () => {
    g.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response('err', { status: 500 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 })
      ) as unknown as typeof fetch

    const p = fetchJson<{ ok: boolean }>('/hello', { headers: {} })
    await expect(p).resolves.toEqual({ ok: true })
  })
})
