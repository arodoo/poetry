/*
 * File: AccountPage.test.tsx
 * Purpose: Verify AccountPage wires SecurityPage rendering as expected.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render } from '@testing-library/react'

const mocks = vi.hoisted(() => ({
  SecurityPage: vi.fn(() => null),
}))

vi.mock('../../../../features/account/pages/SecurityPage', () => ({
  __esModule: true,
  default: mocks.SecurityPage,
}))

describe('AccountPage.wiring', () => {
  it('renders SecurityPage once', async () => {
    const { default: AccountPage } = await import(
      '../../../../features/account/pages/AccountPage'
    )
    render(createElement(AccountPage))
    expect(mocks.SecurityPage).toHaveBeenCalledTimes(1)
  })
})
