/*
 File: tokens.generated.part2.ts
 Purpose: Part 2 of token bundle → CSS var mapping (mapping function).
 All Rights Reserved. Arodi Emmanuel
*/
import type {
  TokenBundle,
  KeyedValues,
  TokenTheme,
  TokenFontSizes,
} from '../../features/tokens/model/TokensSchemas'
import type { CssVars } from './tokens.generated.part1'
import { VAR } from './tokens.generated.part1'
import {
  mapColors,
  mapSpacings,
  mapRadius,
  mapShadows,
  mapFontSizes,
  mapFontWeights,
  findTheme,
  findKV,
  findFontSizes,
} from './tokensMappers.generated'

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
  // TODO: Font family mapping disabled - backend sends fonts (with metadata)
  // not fontFamilies (with CSS family strings). Need to generate family string
  // from font key or add family field to backend TokenFont model.
  // const fontFamily: TokenFontFamily | undefined = findFontFamily(
  //   bundle.fontFamilies,
  //   cur.font
  // )
  if (theme) mapColors(css, theme)
  if (spacings) mapSpacings(css, spacings)
  if (radius) mapRadius(css, radius)
  if (shadows) mapShadows(css, shadows)
  if (fontSizes) mapFontSizes(css, fontSizes)
  // if (fontFamily) mapFontFamily(css, fontFamily)
  if (Array.isArray(bundle.fontWeights)) {
    mapFontWeights(css, bundle.fontWeights as readonly string[])
  }
  const primary: string | undefined = theme?.colors['primary']
  if (primary !== undefined) css[VAR.focus('ring-color')] = primary
  css[VAR.focus('ring-width')] = '2px'
  return css
}
