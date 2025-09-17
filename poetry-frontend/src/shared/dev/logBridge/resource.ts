/*
 File: resource.ts
 Purpose: Capture script/link/img load errors to dev log.
 All Rights Reserved. Arodi Emmanuel
*/
import { post } from './post'

export function hookResourceErrors(): void {
  const w: { __resHook?: boolean } = window as unknown as {
    __resHook?: boolean
  }
  if (w.__resHook) return
  w.__resHook = true

  function getUrl(t: EventTarget | null): string {
    try {
      const el: Partial<
        HTMLImageElement & HTMLScriptElement & HTMLLinkElement
      > = t as Partial<HTMLImageElement & HTMLScriptElement & HTMLLinkElement>
      return el.src ?? el.href ?? '(unknown)'
    } catch {
      return '(unknown)'
    }
  }

  window.addEventListener(
    'error',
    (e: Event): void => {
      const t: {
        tagName?: string
        src?: string
        href?: string
      } = e.target as unknown as {
        tagName?: string
        src?: string
        href?: string
      }
      const tag: string = t.tagName ? t.tagName.toUpperCase() : ''
      if (tag === 'IMG' || tag === 'SCRIPT' || tag === 'LINK') {
        post({
          type: 'resource-error',
          tag,
          url: getUrl(e.target),
          ts: Date.now(),
        })
      }
    },
    true
  )
}
