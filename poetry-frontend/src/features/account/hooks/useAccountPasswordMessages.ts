/*
 * File: useAccountPasswordMessages.ts
 * Purpose: Provide localized strings related to password updates.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo } from 'react'
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../shared/security/passwordPolicy'
import type { useT } from '../../../shared/i18n/useT'

export interface AccountPasswordMessages {
  readonly required: string
  readonly mismatch: string
  readonly success: string
  readonly invalid: string
  readonly genericError: string
  readonly policy: string
}

export function useAccountPasswordMessages(
  t: ReturnType<typeof useT>
): AccountPasswordMessages {
  return useMemo(
    (): AccountPasswordMessages => ({
      required: t('ui.account.security.password.messages.required'),
      mismatch: t('ui.account.security.password.messages.mismatch'),
      success: t('ui.account.security.password.messages.success'),
      invalid: t('ui.account.security.password.messages.invalidCurrent'),
      genericError: t('ui.account.security.password.messages.error'),
      policy: t('ui.account.security.password.policy', {
        min: MIN_PASSWORD_LENGTH,
        max: MAX_PASSWORD_LENGTH,
      }),
    }),
    [t]
  )
}
