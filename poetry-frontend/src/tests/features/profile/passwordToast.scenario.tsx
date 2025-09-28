/*
 * File: passwordToast.scenario.tsx
 * Purpose: Provide reusable actions for profile password toast tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { render, fireEvent, screen } from '@testing-library/react'
import ProfilePage from '../../../features/profile/pages/ProfilePage'
import {
  primeProfileHooks,
  profileSummaryFixture,
  withProfileProviders,
} from './testUtils'
import { getProfileMocks, updatePassword } from './passwordToast.mocks'

type PasswordLabelKey = 'current' | 'next' | 'confirm'

const passwordLabels: Record<PasswordLabelKey, string> = {
  current: 'ui.account.security.password.current.label',
  next: 'ui.account.security.password.new.label',
  confirm: 'ui.account.security.password.confirm.label',
} as const

function fillPasswordField(label: string, value: string): void {
  fireEvent.change(screen.getByLabelText(label, { exact: false }), {
    target: { value },
  })
}

export function renderProfilePasswordSection(
  pushToast: (message: string) => void
): void {
  primeProfileHooks(getProfileMocks(), profileSummaryFixture)
  render(withProfileProviders(<ProfilePage />, pushToast))
}

export function enterMismatchedPasswords(): void {
  fillPasswordField(passwordLabels.current, 'a')
  fillPasswordField(passwordLabels.next, 'abcdefg1')
  fillPasswordField(passwordLabels.confirm, 'different')
}

export function submitPasswordChange(): void {
  fireEvent.click(
    screen.getByRole('button', {
      name: 'ui.account.security.password.submit.label',
    })
  )
}

export { updatePassword }
