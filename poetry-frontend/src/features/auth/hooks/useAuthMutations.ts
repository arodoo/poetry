/*
 * File: useAuthMutations.ts
 * Purpose: React Query mutations for login, refresh, and logout.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { QueryClient, UseMutationResult } from '@tanstack/react-query'
import { getMe, postLogin, postLogout, postRefresh } from '../api/authApi'
import type { AuthTokens } from '../model/AuthTokensSchemas'

const STORAGE_KEY: string = 'poetry.auth.tokens'

function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
}

export function useLogin(): UseMutationResult<
  AuthTokens,
  Error,
  { username: string; password: string }
> {
  const qc: QueryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string
      password: string
    }): Promise<AuthTokens> => postLogin(username, password),
    onSuccess: async (tokens: AuthTokens): Promise<void> => {
      saveTokens(tokens)
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}

export function useRefresh(): UseMutationResult<AuthTokens, Error, string> {
  const qc: QueryClient = useQueryClient()
  return useMutation({
    mutationFn: (refreshToken: string): Promise<AuthTokens> =>
      postRefresh(refreshToken),
    onSuccess: async (tokens: AuthTokens): Promise<void> => {
      saveTokens(tokens)
      await qc.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })
}

export function useLogout(): UseMutationResult<undefined> {
  const qc: QueryClient = useQueryClient()
  return useMutation({
    mutationFn: async (): Promise<undefined> => {
      const raw: string | null = localStorage.getItem(STORAGE_KEY)
      const refreshToken: string | undefined = raw
        ? (JSON.parse(raw) as { refreshToken?: string }).refreshToken
        : undefined
      if (refreshToken) await postLogout(refreshToken)
      return undefined
    },
    onSettled: async (): Promise<void> => {
      localStorage.removeItem(STORAGE_KEY)
      await qc.resetQueries({ queryKey: ['auth'] })
    },
  })
}

export function useMe(): {
  key: readonly ['auth', 'me']
  query: () => Promise<unknown>
} {
  // Minimal wrapper to ensure a stable query key
  return {
    key: ['auth', 'me'] as const,
    query: getMe,
  }
}
