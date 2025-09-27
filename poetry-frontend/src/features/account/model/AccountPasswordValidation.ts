/*
 * File: AccountPasswordValidation.ts
 * Purpose: Validate account password form values and produce trimmed data.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from '../../../shared/security/passwordPolicy'
import {
  type AccountPasswordFieldErrors,
  type AccountPasswordFormValues,
} from './AccountPasswordTypes'

export interface AccountPasswordValidationInput {
  readonly values: AccountPasswordFormValues
  readonly requiredMessage: string
  readonly mismatchMessage: string
  readonly policyMessage: string
}

export interface AccountPasswordValidationResult {
  readonly trimmed: AccountPasswordFormValues
  readonly errors: AccountPasswordFieldErrors
}

export function validateAccountPasswordForm(
  input: AccountPasswordValidationInput
): AccountPasswordValidationResult {
  const trimmed: AccountPasswordFormValues = {
    currentPassword: input.values.currentPassword.trim(),
    newPassword: input.values.newPassword.trim(),
    confirmPassword: input.values.confirmPassword.trim(),
  }
  const errors: AccountPasswordFieldErrors = {}
  if (trimmed.currentPassword.length === 0) {
    errors.currentPassword = input.requiredMessage
  }
  if (trimmed.newPassword.length === 0) {
    errors.newPassword = input.requiredMessage
  } else if (
    trimmed.newPassword.length < MIN_PASSWORD_LENGTH ||
    trimmed.newPassword.length > MAX_PASSWORD_LENGTH
  ) {
    errors.newPassword = input.policyMessage
  }
  if (trimmed.confirmPassword.length === 0) {
    errors.confirmPassword = input.requiredMessage
  } else if (trimmed.newPassword !== trimmed.confirmPassword) {
    errors.confirmPassword = input.mismatchMessage
  }
  return { trimmed, errors }
}
