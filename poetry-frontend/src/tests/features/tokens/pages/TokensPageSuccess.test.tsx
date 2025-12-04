/*
 * File: TokensPageSuccess.test.tsx
 * Purpose: Tests for successful data load state of tokens page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'
import { renderTokensPage, mockBundle } from './tokensTestUtils'

describe('Tokens page success', () => {
  it('renders success and shows title', () => {
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        bundle: mockBundle,
        etag: 'abc',
      },
    } as unknown as ReturnType<typeof hook.useTokensQuery>)
    renderTokensPage()
    expect(screen.getByText('ui.admin.tokens.title')).toBeTruthy()
  })
})
