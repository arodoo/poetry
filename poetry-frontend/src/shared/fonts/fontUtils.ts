/*
 File: fontUtils.ts
 Purpose: Utilities to find the active font from a token bundle and manage
 a tiny localStorage cache marker for preload idempotency. This reduces
 network churn while remaining testable. It also centralizes storage
 side effects to keep UI logic pure and predictable.
 All Rights Reserved. Arodi Emmanuel
*/
import type { TokenFont, TokenBundle } from './loadFontTypes'
import { i18nLogger } from '../i18n/utils/logger'

export const FONT_CACHE_KEY_PREFIX = 'font-cache-v1-'

export function findActiveFont(bundle: TokenBundle): TokenFont | undefined {
  return bundle.fonts.find(
    (f: TokenFont): boolean => f.key === bundle.current.font
  )
}

export function cacheKey(font: TokenFont): string {
  const hashPart: string = font.hash ? '-' + font.hash : ''
  return FONT_CACHE_KEY_PREFIX + font.key + hashPart
}

export function hasCached(font: TokenFont): boolean {
  if (typeof localStorage === 'undefined') return false
  const key: string = cacheKey(font)
  return localStorage.getItem(key) === '1'
}

export function markCached(font: TokenFont): void {
  if (typeof localStorage === 'undefined') return
  try {
    const key: string = cacheKey(font)
    localStorage.setItem(key, '1')
  } catch (error) {
    i18nLogger.logWarning('fonts: markCached storage failed', error)
  }
}

export function cleanupOld(font: TokenFont): void {
  if (typeof localStorage === 'undefined') return
  try {
    const keys: string[] = Object.keys(localStorage)
    for (const k of keys) {
      if (k.startsWith(FONT_CACHE_KEY_PREFIX) && !k.includes(font.key)) {
        localStorage.removeItem(k)
      }
    }
  } catch (error) {
    i18nLogger.logWarning('fonts: cleanupOld storage failed', error)
  }
}
