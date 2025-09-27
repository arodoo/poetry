/*
 * File: AccountPage.test.ts
 * Purpose: Ensure AccountPage wires security data into child components.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'
import type { AccountLocaleCardProps } from '../../../../features/account/components/AccountLocaleCard'
import type { AccountPasswordFormProps } from '../../../../features/account/components/AccountPasswordForm'
import { createSecurityHookResult } from './securityPageTestHelpers'

describe('AccountPage', () => {
  it('wires security state into child components', async () => {
    const capturedLocaleProps: AccountLocaleCardProps[] = []
    const capturedFormProps: AccountPasswordFormProps[] = []
    vi.resetModules()
    vi.doMock(
      '../../../../features/account/hooks/useAccountSecurityPage',
      () => ({
        useAccountSecurityPage: vi.fn(() => createSecurityHookResult()),
      })
    )
    vi.doMock(
      '../../../../features/account/components/AccountLocaleCard',
      () => ({
        AccountLocaleCard: (props: AccountLocaleCardProps) => {
          capturedLocaleProps.push(props)
          return null
        },
      })
    )
    vi.doMock(
      '../../../../features/account/components/AccountPasswordForm',
      () => ({
        AccountPasswordForm: (props: AccountPasswordFormProps) => {
          capturedFormProps.push(props)
          return null
        },
      })
    )
    const { default: AccountPage } = await import(
      '../../../../features/account/pages/AccountPage'
    )
    render(createElement(AccountPage))
    expect(capturedLocaleProps[0]?.locale).toBe('en-US')
    expect(capturedLocaleProps[0]?.isLoading).toBe(false)
    expect(capturedFormProps[0]?.policyText).toBe('policy text')
    vi.doUnmock('../../../../features/account/hooks/useAccountSecurityPage')
    vi.doUnmock('../../../../features/account/components/AccountLocaleCard')
    vi.doUnmock('../../../../features/account/components/AccountPasswordForm')
    vi.resetModules()
  })
})
