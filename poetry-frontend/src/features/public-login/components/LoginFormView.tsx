/*
 * File: LoginFormView.tsx
 * Purpose: Presentational login form used by `LoginPage`. Extracted to keep
 * the page file short and focused. All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import type { useT as UseTType } from '../../../shared/i18n/useT'
type Tfn = ReturnType<typeof UseTType>
import { LoginFormFields } from './LoginFormFields'

export interface LoginFormViewProps {
  t: Tfn
  form: { username: string; password: string }
  setForm: React.Dispatch<
    React.SetStateAction<{
      username: string
      password: string
    }>
  >
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  error?: string | null
  fieldErrors?: { username?: string; password?: string }
}

export default function LoginFormView({
  t,
  form,
  setForm,
  onSubmit,
  isLoading = false,
  error = null,
  fieldErrors = {},
}: LoginFormViewProps): React.ReactElement {
  // Use the extracted LoginField component to reduce file size

  return (
    <LoginFormFields
      t={t}
      form={form}
      setForm={setForm}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      fieldErrors={fieldErrors}
    />
  )
}
