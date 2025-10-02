/*
 * File: LoginPage.overlay.test.tsx
 * Purpose: Validate new login page submits credentials.
 * All Rights Reserved. Arodi Emmanuel
 */
import { createElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

const useLoginMock = vi.hoisted(() => vi.fn())

vi.mock('../../../../features/public-login/hooks/useLogin', () => ({
  useLogin: () => useLoginMock(),
}))
vi.mock('../../../../shared/i18n/useT', () => ({
  useT: () => (key: string) => key,
}))
vi.mock('../../../../shared/i18n/hooks/useLocale', () => ({
  useLocale: () => ({ locale: 'en' }),
}))
vi.mock('../../../../shared/toast/toastContext', () => ({
  useToast: () => ({}),
}))

import LoginPage from '../../../../features/public-login/pages/LoginPage'

describe('LoginPage', () => {
  it('submits credentials', () => {
    const mutate = vi.fn()
    useLoginMock.mockReturnValue({ mutate, isPending: false, status: 'idle' })
    render(createElement(MemoryRouter, {}, createElement(LoginPage)))
    fireEvent.change(screen.getByTestId('login-username-input'), {
      target: { value: 'aurora' },
    })
    fireEvent.change(screen.getByTestId('login-password-input'), {
      target: { value: 'secret' },
    })
    fireEvent.click(screen.getByRole('button'))
    expect(mutate).toHaveBeenCalledWith(
      { username: 'aurora', password: 'secret' },
      expect.objectContaining({
        onError: expect.any(Function),
        onSuccess: expect.any(Function),
      })
    )
  })
})
