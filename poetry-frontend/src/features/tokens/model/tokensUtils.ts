/*
 File: tokensUtils.ts
 Purpose: Small utilities for tokens pages to keep page files short.
 All Rights Reserved. Arodi Emmanuel
*/
import type { TokenBundleCurrent } from '../model/TokensSchemas.impl2'

type MaybeBundle = { bundle?: { current?: TokenBundleCurrent } } | undefined

export function getSafeInitial(data?: unknown): TokenBundleCurrent {
  const cast = data as MaybeBundle
  const current = cast?.bundle?.current
  if (current) return current

  return {
    theme: 'light',
    font: 'system',
    fontSize: 'medium',
    spacing: 'medium',
    radius: 'medium',
    shadow: 'none',
  }
}
