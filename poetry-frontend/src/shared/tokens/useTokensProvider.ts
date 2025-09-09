/*
 File: useTokensProvider.ts
 Purpose: Convenience hook to consume the TokensProvider context. It
 throws a clear error when used outside the provider, ensuring callers
 receive a helpful runtime message during development and tests.
 This keeps component code concise and centralizes the null-check logic.
 All Rights Reserved. Arodi Emmanuel
*/
import { useContext } from 'react'
import { TokensContext } from './TokensProvider'
import type {} from './TokensProvider'

export function useTokensProvider(): {
  readonly isLoading: boolean
  readonly error: Error | null
} {
  const ctx: {
    readonly isLoading: boolean
    readonly error: Error | null
  } | null = useContext(TokensContext)
  if (ctx === null) {
    throw new Error('useTokensProvider must be used within TokensProvider')
  }
  return ctx
}
