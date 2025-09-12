/*
 File: tokensMappers.find.generated.ts
 Purpose: Finder helpers for token arrays by key.
 All Rights Reserved. Arodi Emmanuel
*/
import type {
  KeyedValues,
  TokenTheme,
  TokenFontSizes,
  TokenFontFamily,
} from '../../features/tokens/model/TokensSchemas'

export function findTheme(
  arr: readonly TokenTheme[] | undefined,
  key: string
): TokenTheme | undefined {
  if (!arr) return undefined
  return arr.find((t: TokenTheme): boolean => t.key === key)
}

export function findKV(
  arr: readonly KeyedValues[] | undefined,
  key: string
): KeyedValues | undefined {
  if (!arr) return undefined
  return arr.find((v: KeyedValues): boolean => v.key === key)
}

export function findFontSizes(
  arr: readonly TokenFontSizes[] | undefined,
  key: string
): TokenFontSizes | undefined {
  if (!arr) return undefined
  return arr.find((f: TokenFontSizes): boolean => f.key === key)
}

export function findFontFamily(
  arr: readonly TokenFontFamily[] | undefined,
  key: string
): TokenFontFamily | undefined {
  if (!arr) return undefined
  return arr.find((f: TokenFontFamily): boolean => f.key === key)
}
