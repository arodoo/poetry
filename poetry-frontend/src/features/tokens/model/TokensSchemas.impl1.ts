/*
 File: TokensSchemas.impl1.ts
 Purpose: Implementation part 1 for token schema types.
 This file holds the theme/font/keyed-values definitions.
 All Rights Reserved. Arodi Emmanuel
*/
import { z } from 'zod'

export interface TokenTheme {
  readonly key: string
  readonly label: string
  readonly colors: Record<string, string>
}
export const TokenThemeSchema: z.ZodType<TokenTheme> = z
  .object({ key: z.string(), label: z.string(), colors: z.record(z.string()) })
  .readonly()

export interface TokenFont {
  readonly key: string
  readonly label: string
  readonly weights: readonly (number | string)[]
  readonly hash?: string | undefined
  readonly woff2Url?: string | undefined
}
export const TokenFontSchema: z.ZodType<TokenFont> = z
  .object({
    key: z.string(),
    label: z.string(),
    weights: z.array(z.union([z.number(), z.string()])),
    hash: z.string().optional(),
    woff2Url: z.string().url().optional(),
  })
  .readonly()

export interface TokenFontFamily {
  readonly key: string
  readonly label: string
  readonly family: string
}
export const TokenFontFamilySchema: z.ZodType<TokenFontFamily> = z
  .object({ key: z.string(), label: z.string(), family: z.string() })
  .readonly()

export interface KeyedValues {
  readonly key: string
  readonly label: string
  readonly values: Record<string, string>
}
export const KeyedValuesSchema: z.ZodType<KeyedValues> = z
  .object({ key: z.string(), label: z.string(), values: z.record(z.string()) })
  .readonly()

export interface TokenFontSizes {
  readonly key: string
  readonly label: string
  readonly sizes: Record<string, string>
}
export const TokenFontSizesSchema: z.ZodType<TokenFontSizes> = z
  .object({ key: z.string(), label: z.string(), sizes: z.record(z.string()) })
  .readonly()
