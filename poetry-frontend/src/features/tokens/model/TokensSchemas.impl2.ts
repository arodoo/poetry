/*
 File: TokensSchemas.impl2.ts
 Purpose: Implementation part 2 for token bundle composition and
 the TokenBundleSchema combining previously defined pieces.
 All Rights Reserved. Arodi Emmanuel
*/
import { z } from 'zod'
import type {
  TokenTheme,
  TokenFont,
  KeyedValues,
  TokenFontSizes,
} from './TokensSchemas.impl1'
import {
  TokenThemeSchema,
  TokenFontSchema,
  KeyedValuesSchema,
  TokenFontSizesSchema,
} from './TokensSchemas.impl1'

export interface TokenBundleCurrent {
  readonly theme: string
  readonly font: string
  readonly fontSize: string
  readonly spacing: string
  readonly radius: string
  readonly shadow: string
}

export interface TokenBundle {
  readonly themes: readonly TokenTheme[]
  readonly fonts: readonly TokenFont[]
  readonly fontWeights: readonly string[]
  readonly fontSizes: readonly TokenFontSizes[]
  readonly spacings: readonly KeyedValues[]
  readonly radius: readonly KeyedValues[]
  readonly shadows: readonly KeyedValues[]
  readonly current: TokenBundleCurrent
}

export const TokenBundleSchema: z.ZodType<TokenBundle> = z
  .object({
    themes: z.array(TokenThemeSchema),
    fonts: z.array(TokenFontSchema),
    fontWeights: z.array(z.string()),
    fontSizes: z.array(TokenFontSizesSchema),
    spacings: z.array(KeyedValuesSchema),
    radius: z.array(KeyedValuesSchema),
    shadows: z.array(KeyedValuesSchema),
    current: z.object({
      theme: z.string(),
      font: z.string(),
      fontSize: z.string(),
      spacing: z.string(),
      radius: z.string(),
      shadow: z.string(),
    }),
  })
  .readonly()
