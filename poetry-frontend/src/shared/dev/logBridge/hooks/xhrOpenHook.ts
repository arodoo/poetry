/*
 File: xhrOpenHook.ts
 Purpose: Hook XHR open to capture method and url.
 All Rights Reserved. Arodi Emmanuel
*/
export function hookXHROpen(): void {
  const w: { __xhrOpenHook?: boolean } = window as unknown as {
    __xhrOpenHook?: boolean
  }
  if (w.__xhrOpenHook) return
  w.__xhrOpenHook = true
  try {
    const open: typeof XMLHttpRequest.prototype.open =
      XMLHttpRequest.prototype.open.bind(XMLHttpRequest.prototype)
    XMLHttpRequest.prototype.open = function (
      this: XMLHttpRequest & { __m?: string; __u?: string },
      m: string,
      u: string,
      a?: boolean,
      user?: string | null,
      pass?: string | null
    ): void {
      try {
        this.__m = m
        this.__u = u
      } catch {
        /* noop */
      }
      const async: boolean = typeof a === 'boolean' ? a : true
      open.apply(this, [m, u, async, user, pass])
    }
  } catch {
    /* noop */
  }
}
