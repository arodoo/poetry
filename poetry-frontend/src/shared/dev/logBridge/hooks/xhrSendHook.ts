/*
 File: xhrSendHook.ts
 Purpose: Hook XHR send to capture errors and non-OK HTTP.
 All Rights Reserved. Arodi Emmanuel
*/
import { post } from '../post'

export function hookXHRSend(): void {
  const w: { __xhrSendHook?: boolean } = window as unknown as {
    __xhrSendHook?: boolean
  }
  if (w.__xhrSendHook) return
  w.__xhrSendHook = true
  try {
    const send: typeof XMLHttpRequest.prototype.send =
      XMLHttpRequest.prototype.send.bind(XMLHttpRequest.prototype)
    XMLHttpRequest.prototype.send = function (
      this: XMLHttpRequest & { __m?: string; __u?: string },
      body?: Document | XMLHttpRequestBodyInit | null
    ): void {
      const on: () => void = (): void => {
        try {
          post({
            type: 'xhr-error',
            url: (this.__u ?? '(unknown)').slice(),
            method: (this.__m ?? '(unknown)').slice(),
            ts: Date.now(),
          })
        } catch {
          /* noop */
        }
      }
      const onLoad: () => void = (): void => {
        try {
          const s: number = this.status
          if (s >= 400) {
            post({
              type: 'xhr-http',
              url: (this.__u ?? '(unknown)').slice(),
              method: (this.__m ?? '(unknown)').slice(),
              status: s,
              ts: Date.now(),
            })
          }
        } catch {
          /* noop */
        }
      }
      try {
        this.addEventListener('error', on)
        this.addEventListener('timeout', on)
        this.addEventListener('abort', on)
        this.addEventListener('load', onLoad)
      } catch {
        /* noop */
      }
      send.apply(this, [body])
    }
  } catch {
    /* noop */
  }
}
