/*
 File: TokensProvider.tsx
 Purpose: React context provider for design system tokens (colors,
 spacing, and typography). Applies CSS variables returned by the
 tokens feature and exposes a minimal context for consumers. Kept
 concise to satisfy CI file size and line limits.
 All Rights Reserved. Arodi Emmanuel
*/

import type { PropsWithChildren, ReactNode } from 'react'
import { createContext, useEffect, useMemo } from 'react'
import { useTokensQuery } from '../../features/tokens/hooks/useTokensQueries'
import { mapBundleToCssVars } from '../../ui/theme/tokens'

interface TokensContextValue {
  readonly isLoading: boolean
  readonly error: Error | null
}

const TokensContext: React.Context<TokensContextValue | null> =
  createContext<TokensContextValue | null>(null)

export type TokensProviderProps = PropsWithChildren

export function TokensProvider({ children }: TokensProviderProps): ReactNode {
  const { data, isLoading, error } = useTokensQuery()

  const cssVars: Record<string, string> = useMemo((): Record<
    string,
    string
  > => {
    return data ? mapBundleToCssVars(data.bundle) : {}
  }, [data])

  useEffect((): void => {
    const root: HTMLElement = document.documentElement
    Object.entries(cssVars).forEach(([k, v]: [string, string]): void => {
      root.style.setProperty(k, v)
    })
  }, [cssVars])

  const value: TokensContextValue = useMemo((): TokensContextValue => {
    const safeError: Error | null = error instanceof Error ? error : null
    return { isLoading, error: safeError }
  }, [isLoading, error])

  const provider: ReactNode = (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  )
  return provider
}

export { TokensContext }
export default TokensProvider
