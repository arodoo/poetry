/*
 * File: PublicForgotPasswordPage.test.ts
 * Purpose: Validate forgot-password page submits and renders success.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import PublicForgotPasswordPage from '../../../../features/public-forgot-password/pages/PublicForgotPasswordPage'

const mutateAsync = vi.fn()
const useMutationMock = vi.hoisted(() => vi.fn())

vi.mock(
  '../../../../features/public-forgot-password/hooks/usePublicForgotPasswordQueries',
  () => ({
    usePublicForgotPasswordMutation: useMutationMock,
  })
)
vi.mock('../../../../shared/i18n/useT', () => ({
  useT: () => (key: string) => key,
}))
vi.mock('../../../../shared/i18n/hooks/useLocale', () => ({
  useLocale: () => ({ locale: 'en' }),
}))

describe('PublicForgotPasswordPage', () => {
  it('shows success after submit', async () => {
    mutateAsync.mockResolvedValueOnce({
      messageKey: 'ui.publicForgotPassword.success',
    })
    useMutationMock.mockReturnValue({ isPending: false, mutateAsync })
    render(
      createElement(MemoryRouter, {}, createElement(PublicForgotPasswordPage))
    )
    fireEvent.change(screen.getByTestId('forgot-email-input'), {
      target: { value: 'person@example.com' },
    })
    fireEvent.submit(screen.getByRole('button'))
    expect(await screen.findByTestId('forgot-success')).toBeInTheDocument()
  })
})
