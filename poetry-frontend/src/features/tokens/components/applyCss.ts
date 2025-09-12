/*
 File: applyCss.ts
 Purpose: Centralized CSS variable application logic used by TokenSwitcherPanel.
 All Rights Reserved. Arodi Emmanuel
*/
import { mapBundleToCssVars } from '../../../ui/theme/tokens'
import type { TokenBundle } from '../../tokens/model/TokensSchemas'

export function applyCss(bundle: TokenBundle): void {
  const vars: Record<string, string> = mapBundleToCssVars(bundle)
  const root: HTMLElement = document.documentElement
  Object.entries(vars).forEach(([k, v]: [string, string]): void => {
    root.style.setProperty(k, v)
  })
}
