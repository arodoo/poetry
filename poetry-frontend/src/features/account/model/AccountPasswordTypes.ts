/*
 * File: AccountPasswordTypes.ts
 * Purpose: Shared type definitions for the account password form state and
 * status used across hooks, components, and tests.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface AccountPasswordFormValues {
  readonly currentPassword: string
  readonly newPassword: string
  readonly confirmPassword: string
}

export type AccountPasswordFieldName = keyof AccountPasswordFormValues

export type AccountPasswordFieldErrors = Partial<
  Record<AccountPasswordFieldName, string>
>

export interface AccountPasswordStatus {
  readonly error: string | null
  readonly success: string | null
}

export type AccountPasswordChangeHandler = (
  field: AccountPasswordFieldName,
  value: string
) => void

export interface AccountPasswordFormController {
  readonly values: AccountPasswordFormValues
  readonly fieldErrors: AccountPasswordFieldErrors
  readonly status: AccountPasswordStatus
  readonly setErrors: (errors: AccountPasswordFieldErrors) => void
  readonly changeField: AccountPasswordChangeHandler
  readonly resetValues: () => void
  readonly setSuccess: (message: string) => void
  readonly setError: (message: string) => void
  readonly clearStatus: () => void
}
