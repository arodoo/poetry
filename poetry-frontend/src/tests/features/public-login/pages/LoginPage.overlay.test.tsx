/*
 * File: LoginPage.overlay.test.tsx
 * Purpose: Validate new login page submits credentials.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import LoginPage from '../../../../features/public-login/pages/LoginPage'

const mutateAsync = vi.fn()
const useMutationMock = vi.hoisted(() => vi.fn())

vi.mock(
  '../../../../features/public-login/hooks/usePublicLoginQueries',
  () => ({
    usePublicLoginMutation: useMutationMock,
  })
)
vi.mock('../../../../shared/i18n/useT', () => ({
  useT: () => (key: string) => key,
}))
vi.mock('../../../../shared/i18n/hooks/useLocale', () => ({
  useLocale: () => ({ locale: 'en' }),
}))

describe('LoginPage', () => {
  it('submits credentials', async () => {
    mutateAsync.mockResolvedValueOnce({ accessToken: 'a', refreshToken: 'b' })
    useMutationMock.mockReturnValue({ isPending: false, mutateAsync })
    render(createElement(MemoryRouter, {}, createElement(LoginPage)))
    fireEvent.change(screen.getByTestId('login-username-input'), {
      target: { value: 'aurora' },
    })
    fireEvent.change(screen.getByTestId('login-password-input'), {
      target: { value: 'secret' },
    })
    fireEvent.click(screen.getByRole('button'))
    expect(mutateAsync).toHaveBeenCalledWith({
      username: 'aurora',
      password: 'secret',
    })
  })
})
