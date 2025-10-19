/*
 * File: useLoadFontsFromBundle.ts
 * Purpose: Trigger offline font loading from a TokenBundle object.
 * Keeps TokensProvider concise.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect } from 'react'
import { loadFontOffline } from '../../fonts/loadFontOffline'
import type { TokenBundle } from '../../fonts/loadFontTypes'

export default function useLoadFontsFromBundle(bundle?: TokenBundle | null): void {
  useEffect((): void => {
    if (!bundle) return
    loadFontOffline(bundle)
  }, [bundle])
}
