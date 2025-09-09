/*
 File: tokens.generated.ts
 Purpose: Full implementation for mapping token bundles to CSS vars.
 Separated to reduce size of the public `tokens.ts` stub so it
 remains within CI limits for file length and line width.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type TokenBundle,
  type KeyedValues,
  type TokenTheme,
  type TokenFontSizes,
} from '../../features/tokens/model/TokensSchemas'
import {
  mapColors,
  mapSpacings,
  mapRadius,
  mapShadows,
  mapFontSizes,
  findTheme,
  findKV,
  findFontSizes,
} from './tokensMappers.generated'

export type CssVars = Record<string, string>

export const VAR: Readonly<{
  color: (name: string) => string
  spacing: (name: string) => string
  radius: (name: string) => string
  shadow: (name: string) => string
  fontSize: (name: string) => string
}> = {
  color: (name: string): string => `--color-${name}`,
  spacing: (name: string): string => `--spacing-${name}`,
  radius: (name: string): string => `--radius-${name}`,
  shadow: (name: string): string => `--shadow-${name}`,
  fontSize: (name: string): string => `--font-size-${name}`,
} as const

export function mapBundleToCssVars(bundle: TokenBundle): CssVars {
  const css: CssVars = {}
  const cur: TokenBundle['current'] = bundle.current

  const theme: TokenTheme | undefined = findTheme(bundle.themes, cur.theme)
  const spacings: KeyedValues | undefined = findKV(bundle.spacings, cur.spacing)
  const radius: KeyedValues | undefined = findKV(bundle.radius, cur.radius)
  const shadows: KeyedValues | undefined = findKV(bundle.shadows, cur.shadow)
  const fontSizes: TokenFontSizes | undefined = findFontSizes(
    bundle.fontSizes,
    cur.fontSize
  )

  if (theme !== undefined) {
    mapColors(css, theme)
  }
  if (spacings !== undefined) {
    mapSpacings(css, spacings)
  }
  if (radius !== undefined) {
    mapRadius(css, radius)
  }
  if (shadows !== undefined) {
    mapShadows(css, shadows)
  }
  if (fontSizes !== undefined) {
    mapFontSizes(css, fontSizes)
  }
  return css
}

export const tokensVarNames: typeof VAR = VAR
