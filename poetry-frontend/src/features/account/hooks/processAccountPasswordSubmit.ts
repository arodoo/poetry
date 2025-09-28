/*
 * File: processAccountPasswordSubmit.ts
 * Purpose: Handle password form submission workflow with validation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { validateAccountPasswordForm } from '../model/AccountPasswordValidation'
import type { AccountPasswordFieldErrors } from '../model/AccountPasswordTypes'
import type { AccountPasswordValidationResult } from '../model/AccountPasswordValidation'
import type { AccountPasswordSubmitContext } from './AccountPasswordSubmitContext'

export async function processAccountPasswordSubmit(
  context: AccountPasswordSubmitContext
): Promise<void> {
  context.clearStatus()
  context.setErrors({})
  const validationResult: AccountPasswordValidationResult =
    validateAccountPasswordForm({
      values: context.values,
      requiredMessage: context.messages.required,
      mismatchMessage: context.messages.mismatch,
      policyMessage: context.messages.policy,
    })
  if (Object.keys(validationResult.errors).length > 0) {
    const validationErrors: AccountPasswordFieldErrors = validationResult.errors
    context.setErrors(validationErrors)
    const firstValidationError: string =
      Object.values(validationErrors)[0] ?? context.messages.genericError
    context.pushToast(firstValidationError)
    return
  }
  try {
    await context.mutateAsync({
      currentPassword: validationResult.trimmed.currentPassword,
      newPassword: validationResult.trimmed.newPassword,
    })
    context.setSuccess(context.messages.success)
    context.pushToast(context.messages.success)
    context.resetValues()
  } catch (error: unknown) {
    const toastMessage: string =
      error instanceof Error && /401|403/.test(error.message)
        ? context.messages.invalid
        : context.messages.genericError
    context.setError(toastMessage)
    context.pushToast(toastMessage)
  }
}
