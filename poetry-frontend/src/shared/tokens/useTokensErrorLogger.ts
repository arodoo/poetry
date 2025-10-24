/*
 * File: useTokensErrorLogger.ts
 * Purpose: Small hook to centralize token-loading error logging and make the
 * `TokensProvider` file shorter to satisfy file-length checks. Keeps behavior
 * identical (dev-only verbose output).
 * All Rights Reserved. Arodi Emmanuel
 */
import { useEffect } from 'react'

export default function useTokensErrorLogger(error: unknown): void {
  useEffect(() => {
    if (!error) return
    try {
      console.error(
        '[TokensProvider] CRITICAL ERROR: Failed to load design tokens',
        error
      )
      if (import.meta.env.DEV) {
        console.error(
          '%c🚨 TOKENS PROVIDER FAILURE 🚨',
          'color: white; background: red; font-size: 16px; padding: 8px;',
          '\nThe application cannot render properly without design tokens.\n' +
            'Check the error above for details.'
        )
      }
    } catch {
      // Best-effort logging only
    }
  }, [error])
}
