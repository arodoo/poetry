/*
 File: tokens.generated.part1.ts
 Purpose: Part 1 of token bundle → CSS var mapping (var names + helpers).
 All Rights Reserved. Arodi Emmanuel
*/
import type { TokenBundle } from '../../features/tokens/model/TokensSchemas'

export type CssVars = Record<string, string>

export const VAR: Readonly<{
  color: (name: string) => string
  spacing: (name: string) => string
  radius: (name: string) => string
  shadow: (name: string) => string
  fontSize: (name: string) => string
  fontFamily: (name: string) => string
  fontWeight: (name: string) => string
  focus: (name: string) => string
}> = {
  color: (n: string): string => `--color-${n}`,
  spacing: (n: string): string => `--spacing-${n}`,
  radius: (n: string): string => `--radius-${n}`,
  shadow: (n: string): string => `--shadow-${n}`,
  fontSize: (n: string): string => `--font-size-${n}`,
  fontFamily: (n: string): string => `--font-family-${n}`,
  fontWeight: (n: string): string => `--font-weight-${n}`,
  focus: (n: string): string => `--focus-${n}`,
} as const

export interface BundleResolution {
  readonly bundle: TokenBundle
}

export const tokensVarNames: typeof VAR = VAR
