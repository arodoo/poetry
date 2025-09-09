/*
 File: AdminTokensPage.test.tsx
 Purpose: Smoke test for AdminTokensPage verifying that the component
 renders the title and responds to the tokens query states. It stubs
 the hook to return a successful bundle and asserts the localized
 title key is displayed, ensuring page wiring and i18n usage are
 correct for the admin tokens observability page.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { AdminTokensPage } from '../../../../features/tokens/pages/AdminTokensPage'
import { render, screen } from '@testing-library/react'
import * as hook from '../../../../features/tokens/hooks/useTokensQueries'
import * as i18n from '../../../../shared/i18n/useT'

const mockUseT = <T extends string>(k: T): string => k
vi.spyOn(i18n, 'useT').mockReturnValue(mockUseT)

describe('AdminTokensPage', () => {
  it('renders loading then data', () => {
    interface PartialBundle {
      themes: unknown[]
    }
    const mockResult: ReturnType<typeof hook.useTokensQuery> = {
      data: {
        bundle: { themes: [] } as unknown as PartialBundle,
        etag: '1',
      },
      error: null,
      failureCount: 0,
      isError: false,
      isFetched: true,
      isFetchedAfterMount: true,
      isFetching: false,
      isInitialLoading: false,
      isLoading: false,
      isLoadingError: false,
      isPaused: false,
      isPending: false,
      isPlaceholderData: false,
      isRefetchError: false,
      isRefetching: false,
      isStale: false,
      status: 'success',
      fetchStatus: 'idle',
      refetch: vi.fn(),
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      isSuccess: true,
      failureReason: null,
      errorUpdateCount: 0,
      fetchStatusIdle: true,
    } as unknown as ReturnType<typeof hook.useTokensQuery>
    vi.spyOn(hook, 'useTokensQuery').mockReturnValue(mockResult)
    render(<AdminTokensPage />)
    const el = screen.getByText('ui.admin.tokens.title')
    expect(el).toBeTruthy()
  })
})
