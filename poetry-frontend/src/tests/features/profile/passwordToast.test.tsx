/*
 * File: passwordToast.test.tsx
 * Purpose: Validate password mismatch shows toast and aborts API call.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import {
  enterMismatchedPasswords,
  renderProfilePasswordSection,
  submitPasswordChange,
  updatePassword,
} from './passwordToast.scenario'

describe('Profile password toasts', () => {
  it('mismatch triggers toast and prevents API call', () => {
    const pushToast = vi.fn()
    renderProfilePasswordSection(pushToast)
    enterMismatchedPasswords()
    submitPasswordChange()
    expect(pushToast).toHaveBeenCalled()
    expect(updatePassword).not.toHaveBeenCalled()
  })
})
