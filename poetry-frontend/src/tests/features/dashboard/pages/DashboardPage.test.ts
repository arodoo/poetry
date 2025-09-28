/*
 * File: DashboardPage.test.ts
 * Purpose: Verify dashboard page surfaces overview metrics when available.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { I18nCtx } from '../../../../shared/i18n/context'

const sampleOverview = {
  totalPoems: 21,
  publishedPoems: 12,
  draftPoems: 9,
  activeMembers: 6,
  highlightKey: 'ui.dashboard.overview.highlight.default',
  lastUpdatedLabel: 'Today',
}

const mocks = vi.hoisted(() => ({
  useDashboardOverviewQuery: vi.fn(),
}))

vi.mock('../../../../features/dashboard/hooks/useDashboardQueries', () => ({
  useDashboardOverviewQuery: mocks.useDashboardOverviewQuery,
}))

describe('DashboardPage', () => {
  it('renders metrics and highlight text', async () => {
    mocks.useDashboardOverviewQuery.mockReturnValue({
      data: sampleOverview,
      isLoading: false,
      isError: false,
    })
    const { default: DashboardPage } = await import(
      '../../../../features/dashboard/pages/DashboardPage'
    )
    render(
      createElement(
        I18nCtx.Provider,
        {
          value: {
            locale: 'en',
            messages: {},
            t: (key: string): string => key,
            setLocale: (): void => {},
          },
        },
        createElement(DashboardPage)
      )
    )
    expect(screen.getByTestId('dashboard-total-poems').textContent).toBe('21')
    expect(screen.getByTestId('dashboard-highlight').textContent).toBe(
      'ui.dashboard.overview.highlight.default'
    )
  })
})
