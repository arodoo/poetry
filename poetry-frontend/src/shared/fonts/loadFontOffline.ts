/*
 File: loadFontOffline.ts
 Purpose: Load current font (woff2) defined in token bundle with offline-first
 strategy: preload <link>, integrity hash attribute (if provided) and
 persistent caching keyed by token font hash. Avoid blocking render; apply
 CSS class on documentElement when font requested.
 All Rights Reserved. Arodi Emmanuel
*/
import type { TokenBundle } from './loadFontTypes'
import { findActiveFont, hasCached, markCached, cleanupOld } from './fontUtils'

export interface LoadFontResult {
  readonly requested: boolean
  readonly font?: string | undefined
}

export function loadFontOffline(bundle: TokenBundle): LoadFontResult {
  const active: ReturnType<typeof findActiveFont> = findActiveFont(bundle)
  if (!active?.woff2Url) return { requested: false }
  if (hasCached(active)) return { requested: false, font: active.key }

  const link: HTMLLinkElement = document.createElement('link')
  link.rel = 'preload'
  link.as = 'font'
  link.type = 'font/woff2'
  link.crossOrigin = 'anonymous'
  link.href = active.woff2Url
  if (active.hash) link.integrity = active.hash

  // Mark for test selection
  link.setAttribute('data-font-key', active.key)
  link.addEventListener('load', (): void => {
    markCached(active)
    cleanupOld(active)
    document.documentElement.classList.add('font-loaded-' + active.key)
  })
  document.head.appendChild(link)
  // Return after append so tests can observe synchronously.
  return { requested: true, font: active.key }
}
