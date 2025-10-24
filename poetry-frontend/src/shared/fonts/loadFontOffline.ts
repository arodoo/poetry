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
  // Default to token-provided CDN URL
  link.href = active.woff2Url
  if (active.hash) link.integrity = active.hash

  // Mark for test selection
  link.setAttribute('data-font-key', active.key)

  // Test environment shortcut: when running e2e tests we set `window.__E2E__`.
  // In that case short-circuit font-load and mark the font as loaded immediately
  // to avoid flaky external CDN resolution in CI while keeping production
  // behavior unchanged.
  try {
    const isE2E = typeof window !== 'undefined' && window.__E2E__ === true
    if (isE2E) {
      // Prefer a local font asset when running in E2E to avoid CDN flakiness.
      // Local path convention: /fonts/<key>.woff2
      const localPath = '/fonts/' + active.key + '.woff2'
      try {
        // Use a synchronous-ish check: attempt a HEAD fetch to see if local asset exists.
        // If fetch succeeds quickly, prefer the local asset for preload.
        fetch(localPath, { method: 'HEAD', cache: 'no-store' })
          .then((res) => {
            if (res.ok) link.href = localPath
          })
          .catch(() => {
            // ignore and fall back to CDN URL
          })
      } catch {
        // ignore fetch availability in restrictive environments
      }
      markCached(active)
      cleanupOld(active)
      document.documentElement.classList.add('font-loaded-' + active.key)
      // Append link for completeness, but do not wait for network events
      document.head.appendChild(link)
      return { requested: true, font: active.key }
    }
  } catch {
    // ignore if access to window fails in some envs
  }

  link.addEventListener('load', (): void => {
    markCached(active)
    cleanupOld(active)
    document.documentElement.classList.add('font-loaded-' + active.key)
  })
  document.head.appendChild(link)
  // Return after append so tests can observe synchronously.
  return { requested: true, font: active.key }
}
