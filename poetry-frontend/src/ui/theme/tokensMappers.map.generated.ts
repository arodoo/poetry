/*
 File: tokensMappers.map.generated.ts
 Purpose: Mapping helpers from token structures to CSS variable bag.
 All Rights Reserved. Arodi Emmanuel
*/
import type {
  KeyedValues,
  TokenTheme,
  TokenFontSizes,
  TokenFontFamily,
} from '../../features/tokens/model/TokensSchemas'
import type { CssVars } from './tokens.generated'
import { VAR } from './tokens.generated.part1'

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

export function mapFontFamily(css: CssVars, family: TokenFontFamily): void {
  css[VAR.fontFamily('base')] = family.family
}

export function mapFontWeights(css: CssVars, weights: readonly string[]): void {
  weights.forEach((w: string): void => {
    css[VAR.fontWeight(w)] = w
  })
}
