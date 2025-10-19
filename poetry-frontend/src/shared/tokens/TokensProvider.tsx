/*
 File: TokensProvider.tsx
 Purpose: Provide a React context that fetches and applies design system
 tokens (colors, spacing and typography) as CSS variables on the document
 root. It surfaces fatal errors visibly in development to avoid silent
 failures and triggers offline font loading for available font bundles.
 All Rights Reserved. Arodi Emmanuel
*/

import type { PropsWithChildren, ReactNode } from 'react'
import { createContext, useEffect, useMemo } from 'react'
import { useTokensQuery } from '../../features/tokens/hooks/useTokensQueries'
import { mapBundleToCssVars } from '../../ui/theme/tokens'
import useApplyCssVars from './hooks/useApplyCssVars'
import useLoadFontsFromBundle from './hooks/useLoadFontsFromBundle'
import type { TokenBundle } from '../fonts/loadFontTypes'
import TokensErrorView from './TokensErrorView'

interface TokensContextValue {
  readonly isLoading: boolean
  readonly error: Error | null
}

const TokensContext: React.Context<TokensContextValue | null> =
  createContext<TokensContextValue | null>(null)

export type TokensProviderProps = PropsWithChildren

export function TokensProvider({ children }: TokensProviderProps): ReactNode {
  const { data, isLoading, error } = useTokensQuery()

  // ERROR VISIBILITY: Log errors and show dev warnings
  useEffect((): void => {
    if (error) {
      console.error(
        '[TokensProvider] CRITICAL ERROR: Failed to load design tokens',
        error
      )
      if (import.meta.env.DEV) {
        console.error(
          '%c🚨 TOKENS PROVIDER FAILURE 🚨',
          'color: white; background: red; font-size: 16px; padding: 8px;',
          '\nThe application cannot render properly without design tokens.\n' +
            'Check the error above for details.\n' +
            'Common causes:\n' +
            '- Backend /api/v1/tokens endpoint not accessible\n' +
            '- Data model mismatch (Zod validation failure)\n' +
            '- Network error or CORS issue'
        )
      }
    }
  }, [error])

  const cssVars: Record<string, string> = useMemo((): Record<
    string,
    string
  > => {
    if (!data) return {}
    try {
      return mapBundleToCssVars(data.bundle)
    } catch (err) {
      console.error('[TokensProvider] Error mapping bundle to CSS vars:', err)
      if (import.meta.env.DEV) {
        console.error(
          '%c⚠️ CSS VARIABLE MAPPING FAILED',
          'color: black; background: yellow; font-size: 14px; padding: 4px;',
          err
        )
      }
      return {}
    }
  }, [data])

  useApplyCssVars(cssVars)
  useLoadFontsFromBundle(data ? (data.bundle as TokenBundle) : undefined)

  const value: TokensContextValue = useMemo((): TokensContextValue => {
    const safeError: Error | null = error instanceof Error ? error : null
    return { isLoading, error: safeError }
  }, [isLoading, error])

  if (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : String(error)
    return <TokensErrorView errorMessage={errorMessage} />
  }

  const provider: ReactNode = (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  )
  return provider
}

export { TokensContext }
export default TokensProvider
