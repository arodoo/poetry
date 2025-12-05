/*
 File: fetchHook.ts
 Purpose: Hook fetch to capture errors and non-OK HTTP to dev log.
 All Rights Reserved. Arodi Emmanuel
*/
import { post } from './post'

export function hookFetch(): void {
  interface FetchHookWindow {
    __fetchHook?: boolean
  }
  const w: FetchHookWindow = window as unknown as FetchHookWindow
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
          if (r.ok) return r
          // Treat some expected non-OK statuses as non-errors in dev.
          // - 304 Not Modified is a normal cache response and should not
          //   be logged as an error.
          // - Specific 404 for locale loading can be expected in some dev
          //   flows and is downgraded to 'warn'.
          const isLocale404: boolean =
            r.status === 404 && url.includes('/api/v1/me/locale')
          const isNotModified: boolean = r.status === 304

          post({
            type: 'fetch-http',
            url,
            method,
            status: r.status,
            statusText: r.statusText,
            // map expected statuses to lower-severity levels
            level: isNotModified ? 'info' : isLocale404 ? 'warn' : 'error',
            ts: Date.now(),
          })
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
