/*
 * File: AccountPasswordValidation.ts
 * Purpose: Validates account password form values.
 * It produces trimmed data for the mutation boundary.
 * It mirrors shared password policy feedback in the form.
 * All Rights Reserved. Arodi Emmanuel
 */
import {
  isPasswordPolicyValid,
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
  const passwordsMatch =
    trimmed.newPassword === trimmed.confirmPassword
  if (trimmed.currentPassword.length === 0) {
    errors.currentPassword = input.requiredMessage
  }
  if (trimmed.newPassword.length === 0) {
    errors.newPassword = input.requiredMessage
  } else if (
    !isPasswordPolicyValid(trimmed.newPassword)
  ) {
    errors.newPassword = input.policyMessage
  }
  if (trimmed.confirmPassword.length === 0) {
    errors.confirmPassword = input.requiredMessage
  } else if (!passwordsMatch) {
    errors.confirmPassword =
      input.mismatchMessage
  }
  return { trimmed, errors }
}
