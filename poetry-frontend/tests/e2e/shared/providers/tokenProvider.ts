/*
 * File: tokenProvider.ts
 * Purpose: Central reusable token acquisition & refresh cache for e2e tests (shared folder).
 * All Rights Reserved. Arodi Emmanuel
 */
import { login, refresh } from './tokenService'
import { TOKEN_STORAGE_KEY } from '../../../../src/shared/security/tokenStorage'

export interface CachedTokens {
  accessToken: string
  refreshToken: string
  username: string
  expiresAt: number
}

let cache: CachedTokens | null = null
let inflight: Promise<CachedTokens> | null = null

export async function getAuthTokens(): Promise<CachedTokens> {
  if (cache && Date.now() < cache.expiresAt) return cache
  if (inflight) return inflight
  inflight = (async function getTokens(): Promise<CachedTokens> {
    try {
      const now: number = Date.now()
      const current: CachedTokens | null = cache
      if (current == null) {
        cache = await login()
      } else if (now >= current.expiresAt) {
        cache = await refresh(current)
      }
      if (cache == null) throw new Error('Failed to obtain tokens')
      return cache
    } finally {
      inflight = null
    }
  })()
  return inflight
}

export async function injectTokens(
  page: import('@playwright/test').Page
): Promise<void> {
  const t: CachedTokens = await getAuthTokens()
  await page.addInitScript(
    ([k, v]: [string, string]): void => {
      localStorage.setItem(k, v)
    },
    [
      TOKEN_STORAGE_KEY,
      JSON.stringify({
        accessToken: t.accessToken,
        refreshToken: t.refreshToken,
      }),
    ] as [string, string]
  )
  // Signal app it's running in e2e test mode so loadFontOffline can operate in test-mode
  await page.addInitScript(() => {
    ;(window as any).__E2E__ = true
  })
}

export async function waitForFontLoaded(
  page: import('@playwright/test').Page,
  fontKey: string,
  timeout = 15000
): Promise<void> {
  // Wait for the documentElement to receive the test-only class 'font-loaded-<key>'
  // This mirrors the production loader which adds that class on font load.
  await page.waitForFunction(
    ([k]) => document.documentElement.classList.contains('font-loaded-' + k),
    [fontKey],
    { timeout }
  )
}

export async function waitForTokensRefetch(
  page: import('@playwright/test').Page,
  timeout = 15000
): Promise<void> {
  // Wait for the frontend to refetch the tokens bundle from the backend.
  // Prefer observing the network response, but fallback to a DOM attribute
  // set by the app in E2E mode in case network monitoring is unreliable.
  try {
    await page.waitForResponse(
      (response: import('@playwright/test').Response) =>
        response.url().includes('/api/v1/tokens') && response.status() === 200,
      { timeout: Math.max(2000, timeout) }
    )
    return
  } catch (_) {
    // fallback: wait for a DOM attribute toggled by the application after refetch
  }

  await page.waitForFunction(
    () => document.documentElement.hasAttribute('data-tokens-refetched'),
    { timeout }
  )
}

export async function waitForCssChange(
  page: import('@playwright/test').Page,
  selector: string,
  property: string,
  beforeValue: string,
  timeout = 15000
): Promise<void> {
  // property can be a normal computed style (e.g. 'fontFamily') or a CSS var marker 'cssVar:--color-background'
  if (property.startsWith('cssVar:')) {
    const varName = String(property.slice('cssVar:'.length))
    const before = String(beforeValue)
    await page.waitForFunction(
      (arg: { v: string; beforeVal: string }) =>
        getComputedStyle(document.body).getPropertyValue(arg.v).trim() !== arg.beforeVal,
      { v: varName, beforeVal: before },
      { timeout }
    )
    return
  }

  const selStr = String(selector)
  const propStr = String(property)
  const beforeStr = String(beforeValue)
  // Fast-path: for document-level font and font-size changes prefer checking
  // direct CSS variable values on :root which TokensProvider sets
  if (selStr === 'document' || selStr === 'documentElement') {
    const varForProp: Record<string, string> = {
      fontFamily: '--font-family-base',
      fontSize: '--font-size-base',
    }
    const cssVar = varForProp[propStr]
    if (cssVar) {
      await page.waitForFunction(
        (arg: { v: string; beforeVal: string }) =>
          document.documentElement.style.getPropertyValue(arg.v).trim() !== arg.beforeVal,
        { v: cssVar, beforeVal: beforeStr },
        { timeout }
      )
      return
    }
  }

  await page.waitForFunction(
    (arg: { sel: string; prop: string; beforeVal: string }) => {
      const sel = arg.sel
      const prop = arg.prop
      const beforeVal = arg.beforeVal
      const el = sel === 'document' || sel === 'documentElement' ? document.documentElement : document.querySelector(sel)
      if (!el) return false
      const styles = getComputedStyle(el as Element)
      // prefer direct property access, fallback to getPropertyValue
      // @ts-ignore runtime access
      const val = (styles as any)[prop] ?? styles.getPropertyValue(prop)
      return String(val).trim() !== beforeVal
    },
    { sel: selStr, prop: propStr, beforeVal: beforeStr },
    { timeout }
  )
}

export function clearTokenCache(): void {
  cache = null
}
