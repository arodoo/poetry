/*
 * File: TokensPage.test.tsx
 * Purpose: Basic tests for tokens admin page: loading, error, empty, success
 * states using mocked hook and i18n. All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as i18n from '../../../../shared/i18n/useT'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'
import { AdminTokensPage } from '../../../../features/tokens/pages'

const mockUseT = <T extends string>(k: T): string => k
vi.spyOn(i18n, 'useT').mockReturnValue(mockUseT)

vi.mock('../../../../shared/toast/toastContext', () => ({
  useToast: () => ({ push: (_: string) => {} }),
}))

describe('Tokens pages', () => {
  it('renders loading', () => {
    cleanup()
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    const client = new QueryClient()
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <AdminTokensPage />
        </QueryClientProvider>
      </MemoryRouter>,
      { container }
    )
    expect(screen.getByText('ui.admin.tokens.loading')).toBeTruthy()
  })

  it('renders error', () => {
    cleanup()
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: new Error('x'),
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    const client = new QueryClient()
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <AdminTokensPage />
        </QueryClientProvider>
      </MemoryRouter>,
      { container }
    )
    expect(screen.getByText('ui.admin.tokens.error')).toBeTruthy()
  })

  it('renders empty', () => {
    cleanup()
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    const client = new QueryClient()
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <AdminTokensPage />
        </QueryClientProvider>
      </MemoryRouter>,
      { container }
    )
    expect(screen.getByText('ui.admin.tokens.empty')).toBeTruthy()
  })

  it('renders success and shows title', () => {
    cleanup()
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        bundle: {
          themes: [{ key: 'default' }],
          fonts: [{ key: 'inter' }],
          fontSizes: [{ key: 'default' }],
          spacings: [{ key: 'default' }],
          radius: [{ key: 'default' }],
          shadows: [{ key: 'default' }],
          current: {
            theme: 'default',
            font: 'inter',
            fontSize: 'default',
            spacing: 'default',
            radius: 'default',
            shadow: 'default',
          },
        },
        etag: 'abc',
      },
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    const client = new QueryClient()
    const container = document.createElement('div')
    document.body.appendChild(container)
    render(
      <MemoryRouter>
        <QueryClientProvider client={client}>
          <AdminTokensPage />
        </QueryClientProvider>
      </MemoryRouter>,
      { container }
    )
    expect(screen.getByText('ui.admin.tokens.title')).toBeTruthy()
  })
})
