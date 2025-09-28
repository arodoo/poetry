/*
 * File: useAuthMutations.test.tsx
 * Purpose: Smoke tests for login/logout mutations and storage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Fetch from '../../../../shared/http/fetchClient'
import { useLogin } from '../../../../features/auth/hooks/useLogin'
import { useLogout } from '../../../../features/auth/hooks/useLogout'

describe('auth mutations', () => {
  beforeAll(() => {
    vi.spyOn(Fetch, 'fetchJson').mockImplementation(async (p: string) => {
      if (p.endsWith('/api/v1/auth/login'))
        return {
          accessToken: 'a',
          refreshToken: 'r',
          username: 'john',
          expiresIn: 3600,
        }
      if (p.endsWith('/api/v1/auth/logout')) return {}
      return {} as unknown as Record<string, unknown>
    })
  })

  it('login stores tokens', async () => {
    const qc = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useLogin(), { wrapper })
    await act(async () => {
      await result.current.mutateAsync({ username: 'u', password: 'p' })
    })
    const raw = localStorage.getItem('poetry.auth.tokens')
    expect(raw).toContain('"accessToken":"a"')
  })

  it('logout clears tokens', async () => {
    const qc = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    localStorage.setItem(
      'poetry.auth.tokens',
      '{"accessToken":"a","refreshToken":"r"}'
    )
    const { result } = renderHook(() => useLogout(), { wrapper })
    await act(async () => {
      await result.current.mutateAsync()
    })
    expect(localStorage.getItem('poetry.auth.tokens')).toBeNull()
  })
})
