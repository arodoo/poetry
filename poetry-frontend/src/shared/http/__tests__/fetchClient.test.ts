/*
 File: fetchClient.test.ts
 Purpose: Tests for fetchClient env-driven timeout and retry behavior.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest'
import { createFetchClient } from '../fetchClient'
import { parseEnv, type Env } from '../../config/env'

const baseEnv: Env = parseEnv({
  VITE_API_BASE_URL: 'http://example.com',
  VITE_LOG_LEVEL: 'error',
  VITE_FEATURE_AUTH: 'true',
  VITE_HTTP_TIMEOUT_MS: '50',
  VITE_HTTP_RETRY_MAX_ATTEMPTS: '2',
  VITE_HTTP_RETRY_BACKOFF_MS: '10',
})

const g = globalThis as unknown as {
  fetch: typeof fetch
}

let unhandledHandler: ((reason: unknown) => void) | undefined

describe('fetchClient', () => {
  const realFetch = g.fetch
  const fetchJson = createFetchClient(baseEnv)

  beforeAll(() => {
    unhandledHandler = () => {}
    process.on('unhandledRejection', unhandledHandler!)
  })

  afterAll(() => {
    if (unhandledHandler) process.off('unhandledRejection', unhandledHandler)
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    g.fetch = realFetch
    vi.restoreAllMocks()
  })

  it('returns JSON on 200 OK', async () => {
    g.fetch = vi.fn().mockResolvedValueOnce(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    ) as unknown as typeof fetch

    const p = fetchJson<{ ok: boolean }>('/hello', { headers: {} })
    await expect(p).resolves.toEqual({ ok: true })
  })

  it('retries on 500 then succeeds', async () => {
    g.fetch = vi
      .fn()
      .mockResolvedValueOnce(new Response('err', { status: 500 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 })
      ) as unknown as typeof fetch

    const promise = fetchJson<{ ok: boolean }>('/hello', { headers: {} })

    await vi.runAllTimersAsync()
    await expect(promise).resolves.toEqual({ ok: true })
  })

  it('times out and retries, then fails at max attempts', async () => {
    g.fetch = vi.fn().mockImplementation((_input: RequestInfo, init?: RequestInit) => {
      const p = new Promise((_resolve, reject) => {
        const signal = init?.signal as AbortSignal | undefined
        if (signal) {
          signal.addEventListener('abort', () => {
            reject(new DOMException('Aborted', 'AbortError'))
          })
        }
        // Never resolve; only abort will reject.
      })
      // Avoid transient unhandled rejection warnings in Node when the abort happens
      p.catch(() => {})
      return p as unknown as Response
    }) as unknown as typeof fetch

    const promise = fetchJson('/slow', { headers: {} })

    await vi.runAllTimersAsync()
    await expect(promise).rejects.toThrow()
  })
})
