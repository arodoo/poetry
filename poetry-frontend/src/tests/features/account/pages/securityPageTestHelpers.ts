/*
 * File: securityPageTestHelpers.ts
 * Purpose: Provide reusable hook stubs for the account security page tests.
 * All Rights Reserved. Arodi Emmanuel
 */
import { vi } from 'vitest'

export interface SecurityHookResult {
  t: (key: string, vars?: Record<string, unknown>) => string
  localeQuery: { data: { locale: string }; isLoading: boolean }
  values: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  fieldErrors: Record<string, string>
  onFieldChange: ReturnType<typeof vi.fn>
  onSubmit: ReturnType<typeof vi.fn>
  isSubmitting: boolean
  status: { error: null | string; success: null | string }
  policyText: string
}

export function createSecurityHookResult(): SecurityHookResult {
  const fieldErrors: Record<string, string> = {}

  const result: SecurityHookResult = {
    t: (key: string, vars?: Record<string, unknown>): string => {
      const localeString: string =
        typeof vars?.['locale'] === 'string'
          ? ((vars as Record<string, string>)['locale'] ?? '')
          : ''
      return key === 'ui.account.security.locale.value'
        ? `Locale:${localeString}`
        : key
    },
    localeQuery: { data: { locale: 'en-US' }, isLoading: false },
    values: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    fieldErrors,
    onFieldChange: vi.fn(),
    onSubmit: vi.fn(),
    isSubmitting: false,
    status: { error: null, success: null },
    policyText: 'policy text',
  }

  return result
}
