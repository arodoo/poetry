/*
 * File: useAccountPasswordFormState.ts
 * Purpose: Manage password form values, errors, and submission status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useCallback, useState } from 'react'
import type {
  AccountPasswordChangeHandler,
  AccountPasswordFieldName,
  AccountPasswordFieldErrors,
  AccountPasswordFormController,
  AccountPasswordFormValues,
  AccountPasswordStatus,
} from '../model/AccountPasswordTypes'
import { createAccountPasswordEmptyValues } from '../model/AccountPasswordDefaults'

export function useAccountPasswordFormState(): AccountPasswordFormController {
  const [values, setValues] = useState<AccountPasswordFormValues>(
    createAccountPasswordEmptyValues
  )
  const [fieldErrors, setFieldErrors] = useState<AccountPasswordFieldErrors>({})
  const [status, setStatus] = useState<AccountPasswordStatus>({
    error: null,
    success: null,
  })

  const changeField: AccountPasswordChangeHandler = useCallback(
    (field: AccountPasswordFieldName, value: string): void => {
      setValues(
        (prev: AccountPasswordFormValues): AccountPasswordFormValues => ({
          ...prev,
          [field]: value,
        })
      )
    },
    []
  )

  const resetValues: () => void = useCallback((): void => {
    setValues(createAccountPasswordEmptyValues())
  }, [])

  const clearStatus: () => void = useCallback((): void => {
    setStatus({ error: null, success: null })
  }, [])

  const setSuccess: (message: string) => void = useCallback(
    (message: string): void => {
      setStatus({ success: message, error: null })
    },
    []
  )

  const setError: (message: string) => void = useCallback(
    (message: string): void => {
      setStatus({ success: null, error: message })
    },
    []
  )

  return {
    values,
    fieldErrors,
    status,
    setErrors: setFieldErrors,
    changeField,
    resetValues,
    setSuccess,
    setError,
    clearStatus,
  }
}
