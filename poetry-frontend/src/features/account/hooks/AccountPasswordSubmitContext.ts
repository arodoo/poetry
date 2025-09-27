/*
 * File: AccountPasswordSubmitContext.ts
 * Purpose: Define the context contract for account password submission logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { AccountPasswordChangeRequest } from '../model/AccountSchemas'
import type {
  AccountPasswordFieldErrors,
  AccountPasswordFormValues,
} from '../model/AccountPasswordTypes'
import type { AccountPasswordMessages } from './useAccountPasswordMessages'

export interface AccountPasswordSubmitContext {
  readonly values: AccountPasswordFormValues
  readonly messages: AccountPasswordMessages
  readonly mutateAsync: (body: AccountPasswordChangeRequest) => Promise<void>
  readonly clearStatus: () => void
  readonly setErrors: (errors: AccountPasswordFieldErrors) => void
  readonly setSuccess: (message: string) => void
  readonly setError: (message: string) => void
  readonly resetValues: () => void
  readonly pushToast: (message: string) => void
}
