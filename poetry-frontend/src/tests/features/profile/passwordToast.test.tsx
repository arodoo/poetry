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
    vi.useFakeTimers()
    try {
      const pushToast = vi.fn()
      renderProfilePasswordSection(pushToast)
      enterMismatchedPasswords()
      submitPasswordChange()
      expect(pushToast).toHaveBeenCalled()
      expect(updatePassword).not.toHaveBeenCalled()
      // flush any pending timers (toasts, query gc, etc.) before test ends
      vi.runAllTimers()
    } finally {
      vi.useRealTimers()
    }
  })
})
