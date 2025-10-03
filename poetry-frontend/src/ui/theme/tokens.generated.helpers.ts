/* File: tokens.generated.helpers.ts
 Purpose: Small helper used by tokens.generated.part2.ts to apply mapped
 token groups (colors, spacing, radius, shadows, fonts) into the CSS vars
 object. Keeps the mapping logic in one place so generated parts stay small.
 All Rights Reserved. Arodi Emmanuel
 */
import type { CssVars } from './tokens.generated.part1'
import type {
  KeyedValues,
  TokenTheme,
  TokenFontSizes,
  TokenBundle,
} from '../../features/tokens/model/TokensSchemas'
import { VAR } from './tokens.generated.part1'
import {
  mapColors,
  mapSpacings,
  mapRadius,
  mapShadows,
  mapFontSizes,
  mapFontWeights,
} from './tokensMappers.generated'

export function applyTokenMappings(
  css: CssVars,
  bundle: TokenBundle,
  theme: TokenTheme | undefined,
  spacings: KeyedValues | undefined,
  radius: KeyedValues | undefined,
  shadows: KeyedValues | undefined,
  fontSizes: TokenFontSizes | undefined
): void {
  if (theme) mapColors(css, theme)
  if (spacings) mapSpacings(css, spacings)
  if (radius) mapRadius(css, radius)
  if (shadows) mapShadows(css, shadows)
  if (fontSizes) mapFontSizes(css, fontSizes)
  if (Array.isArray(bundle.fontWeights))
    mapFontWeights(css, bundle.fontWeights as readonly string[])
  const primary: string | undefined = theme?.colors['primary']
  if (primary !== undefined) css[VAR.focus('ring-color')] = primary
  css[VAR.focus('ring-width')] = '2px'
}
