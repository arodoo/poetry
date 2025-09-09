/*
 File: useTokensQueries.test.tsx
 Purpose: Test the useTokensQuery hook resolves data and exposes the
 expected query key. The test mounts the hook inside a QueryClient
 provider and asserts the hook transitions to success and returns the
 bundle with the expected current theme, validating integration with
 React Query and the feature API.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import {
  useTokensQuery,
  tokensQueryKeys,
} from '../../../features/tokens/hooks/useTokensQueries'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import * as api from '../../../features/tokens/api/tokensApi'
import type { ReactNode } from 'react'

describe('useTokensQuery', () => {
  it('resolves data and key', async () => {
    vi.spyOn(api, 'getTokens').mockResolvedValue({
      bundle: {
        themes: [{ key: 'amber', label: 'Amber', colors: { primary: '#fff' } }],
        fonts: [],
        fontWeights: [],
        fontSizes: [],
        spacings: [],
        radius: [],
        shadows: [],
        current: {
          theme: 'amber',
          font: 'inter',
          fontSize: 'default',
          spacing: 'default',
          radius: 'default',
          shadow: 'default',
        },
      },
      etag: 'W/"1"',
    })
    const qc: QueryClient = new QueryClient()
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
    )
    const { result } = renderHook(() => useTokensQuery(), { wrapper })
    expect(tokensQueryKeys.all).toEqual(['tokens'])
    await waitFor(() => result.current.isSuccess)
    // extra microtask tick (sometimes needed in jsdom + react-query v5)
    await new Promise((r) => setTimeout(r, 0))
    expect(result.current.data?.bundle.current.theme).toBe('amber')
  })
})
