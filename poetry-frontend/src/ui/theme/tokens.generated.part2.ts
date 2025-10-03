/* File: tokens.generated.part2.ts
 Purpose: Map runtime token bundles to CSS custom properties used by UI.
 Converts token data (colors, spacing, radius, shadows, fonts) into CSS
 variables consumed by components. All Rights Reserved. Arodi Emmanuel
 */
import type {
  TokenBundle,
  KeyedValues,
  TokenTheme,
  TokenFontSizes,
  TokenFontFamily,
  TokenFont,
} from '../../features/tokens/model/TokensSchemas'
import type { CssVars } from './tokens.generated.part1'
import { VAR } from './tokens.generated.part1'
import {
  findTheme,
  findKV,
  findFontSizes,
  findFontFamily,
} from './tokensMappers.generated'
import { applyTokenMappings } from './tokens.generated.helpers'

export function mapBundleToCssVars(bundle: TokenBundle): CssVars {
  const css: CssVars = {},
    cur: TokenBundle['current'] = bundle.current,
    theme: TokenTheme | undefined = findTheme(bundle.themes, cur.theme),
    spacings: KeyedValues | undefined = findKV(bundle.spacings, cur.spacing),
    radius: KeyedValues | undefined = findKV(bundle.radius, cur.radius),
    shadows: KeyedValues | undefined = findKV(bundle.shadows, cur.shadow),
    fontSizes: TokenFontSizes | undefined = findFontSizes(
      bundle.fontSizes,
      cur.fontSize
    )
  let resolvedFontFamily: string | undefined
  const maybeFamilies: unknown = (bundle as unknown as Record<string, unknown>)[
    'fontFamilies'
  ]
  if (Array.isArray(maybeFamilies)) {
    const castFamilies: readonly TokenFontFamily[] =
      maybeFamilies as readonly TokenFontFamily[]
    const ff: TokenFontFamily | undefined = findFontFamily(
      castFamilies,
      cur.font
    )
    if (ff) resolvedFontFamily = ff.family
  }
  if (!resolvedFontFamily) {
    const maybeFonts: unknown = (bundle as unknown as Record<string, unknown>)[
      'fonts'
    ]
    if (
      Array.isArray(maybeFonts) &&
      maybeFonts.length > 0 &&
      typeof (maybeFonts[0] as { key?: unknown }).key === 'string'
    ) {
      const fontsArr: readonly TokenFont[] = maybeFonts as readonly TokenFont[]
      const f: TokenFont | undefined = fontsArr.find(
        (x: TokenFont): boolean => x.key === cur.font
      )
      if (f?.label) resolvedFontFamily = `${f.label}, sans-serif`
    }
  }

  applyTokenMappings(css, bundle, theme, spacings, radius, shadows, fontSizes)
  if (resolvedFontFamily) css[VAR.fontFamily('base')] = resolvedFontFamily
  return css
}
