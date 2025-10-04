/*
 * File: useAuthMutations.test.tsx
 * Purpose: Smoke tests for login/logout mutations and storage.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, beforeAll, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as generatedSdk from '../../../../api/generated'
import { useLogin } from '../../../../features/auth/hooks/useLogin'
import { useLogout } from '../../../../features/auth/hooks/useLogout'

describe('auth mutations', () => {
  beforeAll(() => {
    // Mock generated SDK login/logout to return TokenResponse shapes
    vi.spyOn(generatedSdk, 'login').mockResolvedValue({
      data: {
        accessToken: 'a',
        refreshToken: 'r',
        username: 'john',
        expiresIn: 3600,
      },
      request: new Request('http://localhost/api/v1/auth/login'),
      response: new Response(),
    })
    vi.spyOn(generatedSdk, 'logout').mockResolvedValue({
      data: undefined,
      request: new Request('http://localhost/api/v1/auth/logout'),
      response: new Response(),
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
