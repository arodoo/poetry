/*
 * File: useAccountSecurityPage.ts
 * Purpose: Composable hook encapsulating logic for the account security
 * screen. Manages locale loading, password form state, validation, and
 * feedback messages while keeping the page component declarative.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback, type FormEvent } from 'react'
import type { AccountPasswordMessages } from './useAccountPasswordMessages'
import { useT } from '../../../shared/i18n/useT'
import { useToast } from '../../../shared/toast/toastContext'
import { useAccountLocaleQuery } from './useAccountQueries'
import { useAccountPasswordMutation } from './useAccountMutations'
import { useAccountPasswordFormState } from './useAccountPasswordFormState'
import { useAccountPasswordMessages } from './useAccountPasswordMessages'
import { processAccountPasswordSubmit } from './processAccountPasswordSubmit'

export function useAccountSecurityPage(): {
  t: ReturnType<typeof useT>
  localeQuery: ReturnType<typeof useAccountLocaleQuery>
  values: ReturnType<typeof useAccountPasswordFormState>['values']
  fieldErrors: ReturnType<typeof useAccountPasswordFormState>['fieldErrors']
  onFieldChange: ReturnType<typeof useAccountPasswordFormState>['changeField']
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  isSubmitting: boolean
  status: ReturnType<typeof useAccountPasswordFormState>['status']
  policyText: string
} {
  const t: ReturnType<typeof useT> = useT()
  const toast: ReturnType<typeof useToast> = useToast()
  const localeQuery: ReturnType<typeof useAccountLocaleQuery> =
    useAccountLocaleQuery()
  const mutation: ReturnType<typeof useAccountPasswordMutation> =
    useAccountPasswordMutation()
  const form: ReturnType<typeof useAccountPasswordFormState> =
    useAccountPasswordFormState()
  const messages: AccountPasswordMessages = useAccountPasswordMessages(t)
  const mutateAsync: typeof mutation.mutateAsync = mutation.mutateAsync
  const pushToast: typeof toast.push = toast.push

  const onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> =
    useCallback(
      async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        await processAccountPasswordSubmit({
          values: form.values,
          messages,
          mutateAsync,
          clearStatus: form.clearStatus,
          setErrors: form.setErrors,
          setSuccess: form.setSuccess,
          setError: form.setError,
          resetValues: form.resetValues,
          pushToast,
        })
      },
      [form, messages, mutateAsync, pushToast]
    )

  return {
    t,
    localeQuery,
    values: form.values,
    fieldErrors: form.fieldErrors,
    onFieldChange: form.changeField,
    onSubmit,
    isSubmitting: mutation.isPending,
    status: form.status,
    policyText: messages.policy,
  }
}
