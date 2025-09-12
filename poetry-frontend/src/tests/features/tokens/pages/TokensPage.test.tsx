/*
 * File: TokensPage.test.tsx
 * Purpose: Basic tests for tokens admin page: loading, error, empty, success
 * states using mocked hook and i18n. All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as i18n from '../../../../shared/i18n/useT'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'
import { AdminTokensPage } from '../../../../features/tokens/pages'

const mockUseT = <T extends string>(k: T): string => k
vi.spyOn(i18n, 'useT').mockReturnValue(mockUseT)

describe('Tokens pages', () => {
  it('renders loading', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    render(<AdminTokensPage />)
    expect(screen.getByText('ui.admin.tokens.loading')).toBeTruthy()
  })

  it('renders error', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: new Error('x'),
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    render(<AdminTokensPage />)
    expect(screen.getByText('ui.admin.tokens.error')).toBeTruthy()
  })

  it('renders empty', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    render(<AdminTokensPage />)
    expect(screen.getByText('ui.admin.tokens.empty')).toBeTruthy()
  })

  it('renders success and shows title', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: { bundle: { themes: [] }, etag: 'abc' },
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    render(<AdminTokensPage />)
    expect(screen.getByText('ui.admin.tokens.title')).toBeTruthy()
  })
})
