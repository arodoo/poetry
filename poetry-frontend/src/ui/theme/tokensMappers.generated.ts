/*
 File: tokensMappers.generated.ts
 Purpose: Helper functions for mapping token values to CSS vars.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type KeyedValues,
  type TokenTheme,
  type TokenFontSizes,
} from '../../features/tokens/model/TokensSchemas'
import type { CssVars } from './tokens.generated'
import { VAR } from './tokens.generated'

export function mapColors(css: CssVars, theme: TokenTheme): void {
  Object.entries(theme.colors).forEach(([k, v]: [string, string]): void => {
    css[VAR.color(k)] = v
  })
}

export function mapSpacings(css: CssVars, spacings: KeyedValues): void {
  Object.entries(spacings.values).forEach(([k, v]: [string, string]): void => {
    css[VAR.spacing(k)] = v
  })
}

export function mapRadius(css: CssVars, radius: KeyedValues): void {
  Object.entries(radius.values).forEach(([k, v]: [string, string]): void => {
    css[VAR.radius(k)] = v
  })
}

export function mapShadows(css: CssVars, shadows: KeyedValues): void {
  Object.entries(shadows.values).forEach(([k, v]: [string, string]): void => {
    css[VAR.shadow(k)] = v
  })
}

export function mapFontSizes(css: CssVars, fontSizes: TokenFontSizes): void {
  Object.entries(fontSizes.sizes).forEach(([k, v]: [string, string]): void => {
    css[VAR.fontSize(k)] = v
  })
}

export function findTheme(
  arr: readonly TokenTheme[],
  key: string
): TokenTheme | undefined {
  return arr.find((t: TokenTheme): boolean => t.key === key)
}

export function findKV(
  arr: readonly KeyedValues[],
  key: string
): KeyedValues | undefined {
  return arr.find((v: KeyedValues): boolean => v.key === key)
}

export function findFontSizes(
  arr: readonly TokenFontSizes[],
  key: string
): TokenFontSizes | undefined {
  return arr.find((f: TokenFontSizes): boolean => f.key === key)
}
