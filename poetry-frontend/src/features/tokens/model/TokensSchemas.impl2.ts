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
    themes: z.array(TokenThemeSchema).min(1),
    fonts: z.array(TokenFontSchema).min(1),
    fontWeights: z.array(z.string()).min(1),
    fontSizes: z.array(TokenFontSizesSchema).min(1),
    spacings: z.array(KeyedValuesSchema).min(1),
    radius: z.array(KeyedValuesSchema).min(1),
    shadows: z.array(KeyedValuesSchema).min(1),
    current: z.object({
      theme: z.string().min(1),
      font: z.string().min(1),
      fontSize: z.string().min(1),
      spacing: z.string().min(1),
      radius: z.string().min(1),
      shadow: z.string().min(1),
    }),
  })
  .readonly()
