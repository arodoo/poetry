/*
 * File: TokensPageStates.test.tsx
 * Purpose: Tests for loading, error, and empty states of tokens page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'
import { renderTokensPage } from './tokensTestUtils'

describe('Tokens page states', () => {
  it('renders loading', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    renderTokensPage()
    expect(screen.getByText('ui.admin.tokens.loading')).toBeTruthy()
  })

  it('renders error', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: new Error('x'),
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    renderTokensPage()
    expect(screen.getByText('ui.admin.tokens.error')).toBeTruthy()
  })

  it('renders empty', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: undefined,
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    renderTokensPage()
    expect(screen.getByText('ui.admin.tokens.empty')).toBeTruthy()
  })
})
