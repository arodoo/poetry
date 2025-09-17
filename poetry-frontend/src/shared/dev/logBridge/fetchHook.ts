/*
 File: fetchHook.ts
 Purpose: Hook fetch to capture errors and non-OK HTTP to dev log.
 All Rights Reserved. Arodi Emmanuel
*/
import { post } from './post'

export function hookFetch(): void {
  const w: { __fetchHook?: boolean } = window as unknown as {
    __fetchHook?: boolean
  }
  if (w.__fetchHook) return
  w.__fetchHook = true

  try {
    const f: typeof window.fetch = window.fetch.bind(window)
    window.fetch = function (
      i: RequestInfo | URL,
      init?: RequestInit
    ): Promise<Response> {
      const url: string =
        typeof i === 'string' ? i : i instanceof Request ? i.url : String(i)
      const method: string =
        init?.method ?? (i instanceof Request ? i.method : 'GET')
      return f(i, init)
        .then((r: Response): Response => {
          if (!r.ok) {
            post({
              type: 'fetch-http',
              url,
              method,
              status: r.status,
              statusText: r.statusText,
              ts: Date.now(),
            })
          }
          return r
        })
        .catch((e: unknown): never => {
          const msg: string = e instanceof Error ? e.message : String(e)
          post({
            type: 'fetch-error',
            url,
            method,
            message: msg,
            ts: Date.now(),
          })
          throw e
        })
    }
  } catch {
    /* noop */
  }
}
