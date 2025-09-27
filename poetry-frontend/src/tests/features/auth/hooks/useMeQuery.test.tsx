/*
 * File: useMeQuery.test.tsx
 * Purpose: Test me hook with mocked HTTP client.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, beforeAll, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as Fetch from '../../../../shared/http/fetchClient'
import { useMeQuery } from '../../../../features/auth/hooks/useMe'

describe('useMeQuery', () => {
  beforeAll(() => {
    vi.spyOn(Fetch, 'fetchJson').mockImplementation(async (p: string) => {
      if (p.endsWith('/api/v1/auth/me'))
        return { id: 'u1', username: 'john', roles: ['admin'] }
      return {} as unknown as Record<string, unknown>
    })
  })

  beforeEach(() => {
    // ensure query enabled by simulating stored tokens
    localStorage.setItem(
      'poetry.auth.tokens',
      JSON.stringify({ accessToken: 'a', refreshToken: 'b' })
    )
  })

  it('returns user', async () => {
    const qc = new QueryClient()
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useMeQuery(), { wrapper })
    await waitFor(() => expect(result.current.isSuccess).toBe(true))
    expect(result.current.data?.username).toBe('john')
  })
})
