/*
 * File: AccountPasswordDefaults.ts
 * Purpose: Provide reusable initializers for account password form values.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type AccountPasswordFormValues } from './AccountPasswordTypes'

const emptyValues: AccountPasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export function createAccountPasswordEmptyValues(): AccountPasswordFormValues {
  return { ...emptyValues }
}
