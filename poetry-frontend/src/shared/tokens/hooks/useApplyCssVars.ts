/*
 * File: useApplyCssVars.ts
 * Purpose: Small hook to apply a record of CSS variables to document root.
 * Keeps TokensProvider focused and under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect } from 'react'

export default function useApplyCssVars(cssVars: Record<string, string>): void {
  useEffect((): void => {
    const root: HTMLElement = document.documentElement
    Object.entries(cssVars).forEach(([k, v]: [string, string]): void => {
      root.style.setProperty(k, v)
    })
  }, [cssVars])
}
