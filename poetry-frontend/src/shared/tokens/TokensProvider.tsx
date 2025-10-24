/*
 File: TokensProvider.tsx
 Purpose: Provide a React context that fetches and applies design system
 tokens (colors, spacing and typography) as CSS variables on the document
 root. It surfaces fatal errors visibly in development to avoid silent
 failures and triggers offline font loading for available font bundles.
 All Rights Reserved. Arodi Emmanuel
*/

import type { PropsWithChildren, ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import { useTokensQuery } from '../../features/tokens/hooks/useTokensQueries'
import { mapBundleToCssVars } from '../../ui/theme/tokens'
import useApplyCssVars from './hooks/useApplyCssVars'
import useLoadFontsFromBundle from './hooks/useLoadFontsFromBundle'
import useTokensErrorLogger from './useTokensErrorLogger'
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

  function isTokenData(
    v: unknown
  ): v is { bundle: { current?: Record<string, unknown> }; etag?: unknown } {
    return !!v && typeof v === 'object' && 'bundle' in v
  }

  // Centralized error logging (moved to helper to reduce file length)
  useTokensErrorLogger(error)

  const cssVars = useMemo<Record<string, string>>(() => {
    if (!data) return {}
    try {
      // narrow data shape to avoid unsafe-any warnings
      if (!isTokenData(data)) return {}
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

  // E2E test instrumentation: emit a compact fingerprint for traces
  if (typeof window !== 'undefined' && window.__E2E__ === true) {
    try {
      if (isTokenData(data)) {
        console.log('[E2E] TokensProvider applied bundle', {
          theme: data.bundle.current.theme,
          font: data.bundle.current.font,
          etag: data.etag ?? null,
        })
      } else {
        console.log('[E2E] TokensProvider applied bundle', { etag: null })
      }
    } catch {
      /* best-effort */
    }
  }

  useApplyCssVars(cssVars)
  useLoadFontsFromBundle(
    isTokenData(data)
      ? (data.bundle as unknown as import('../fonts/loadFontTypes').TokenBundle)
      : undefined
  )

  const value: TokensContextValue = useMemo(
    () => ({
      isLoading,
      error: error instanceof Error ? error : null,
    }),
    [isLoading, error]
  )

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
