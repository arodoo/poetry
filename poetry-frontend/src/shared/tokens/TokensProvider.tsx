/*
 File: TokensProvider.tsx
 Purpose: Provide a React context that fetches and applies design system
 tokens (colors, spacing and typography) as CSS variables on the document
 root. It surfaces fatal errors visibly in development to avoid silent
 failures and triggers offline font loading for available font bundles.
 All Rights Reserved. Arodi Emmanuel
*/
/* eslint-disable max-lines */
import type { PropsWithChildren, ReactNode } from 'react'
import { createContext, useEffect, useMemo } from 'react'
import { useTokensQuery } from '../../features/tokens/hooks/useTokensQueries'
import { mapBundleToCssVars } from '../../ui/theme/tokens'
import { loadFontOffline } from '../fonts/loadFontOffline'
import type { TokenBundle } from '../fonts/loadFontTypes'

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

  useEffect((): void => {
    const root: HTMLElement = document.documentElement
    Object.entries(cssVars).forEach(([k, v]: [string, string]): void => {
      root.style.setProperty(k, v)
    })
  }, [cssVars])

  // Trigger offline font load when bundle present.
  useEffect((): void => {
    if (!data) return
    const bundle: TokenBundle = data.bundle as TokenBundle
    loadFontOffline(bundle)
  }, [data])

  const value: TokensContextValue = useMemo((): TokensContextValue => {
    const safeError: Error | null = error instanceof Error ? error : null
    return { isLoading, error: safeError }
  }, [isLoading, error])

  // CRITICAL ERROR: Show visible error UI instead of silent failure
  if (error) {
    const errorMessage: string =
      error instanceof Error ? error.message : String(error)
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'var(--color-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          zIndex: 9999,
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            backgroundColor: 'var(--color-onSurface, white)',
            border: '3px solid var(--color-error)',
            borderRadius: '8px',
            padding: '24px',
            boxShadow: 'var(--shadow)',
          }}
        >
          <h1
            style={{
              color: 'var(--color-error)',
              marginTop: 0,
              fontSize: '24px',
            }}
          >
            🚨 Design Tokens Failed to Load
          </h1>
          <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            The application cannot render properly without design system tokens.
            This is a critical error that must be fixed.
          </p>
          <div
            style={{
              backgroundColor: 'var(--color-background)',
              border: '1px solid var(--color-error)',
              borderRadius: '4px',
              padding: '12px',
              marginTop: '16px',
              fontFamily: 'monospace',
              fontSize: '14px',
              overflowX: 'auto',
            }}
          >
            <strong>Error:</strong> {errorMessage}
          </div>
          <details style={{ marginTop: '16px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
              Common Solutions
            </summary>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>Check that backend is running on port 8080</li>
              <li>
                Verify <code>/api/v1/tokens</code> endpoint is accessible
              </li>
              <li>Check browser console for Zod validation errors</li>
              <li>Ensure backend data model matches frontend schema</li>
              <li>Check network tab for failed requests</li>
            </ul>
          </details>
          <button
            onClick={(): void => {
              window.location.reload()
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: 'var(--color-error)',
              color: 'var(--color-onPrimary, white)',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Reload Page
          </button>
        </div>
      </div>
    )
  }

  const provider: ReactNode = (
    <TokensContext.Provider value={value}>{children}</TokensContext.Provider>
  )
  return provider
}

export { TokensContext }
export default TokensProvider
