/*
 * File: SecurityPage.test.tsx
 * Purpose: Ensure security page renders locale summary and translation keys.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createSecurityHookResult } from './securityPageTestHelpers'

describe('SecurityPage', () => {
  it('renders locale value and heading', { timeout: 10000 }, async () => {
    vi.resetModules()
    vi.doMock(
      '../../../../features/account/hooks/useAccountSecurityPage',
      () => ({
        useAccountSecurityPage: vi.fn(() => createSecurityHookResult()),
      })
    )
    vi.doMock(
      '../../../../features/account/components/AccountPasswordForm',
      () => ({
        AccountPasswordForm: () =>
          createElement('div', {
            'data-testid': 'password-form',
          }),
      })
    )
    const { default: SecurityPage } = await import(
      '../../../../features/account/pages/SecurityPage'
    )
    render(createElement(SecurityPage))
    expect(
      screen.getByRole('heading', {
        name: 'ui.account.security.page.title',
        level: 1,
      })
    ).toBeInTheDocument()
    expect(screen.getByTestId('account-locale-value').textContent).toBe(
      'Locale:en-US'
    )
    vi.doUnmock('../../../../features/account/hooks/useAccountSecurityPage')
    vi.doUnmock('../../../../features/account/components/AccountPasswordForm')
    vi.resetModules()
  })
})
