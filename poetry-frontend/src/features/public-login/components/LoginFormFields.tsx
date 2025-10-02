/*
 * File: LoginFormFields.tsx
 * Purpose: Encapsulate the fields and submit button used by the login form.
 * Extracted from LoginFormView to reduce file length without changing logic.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { Button } from '../../../ui/Button/Button'
import { LoginField } from './LoginField'
import { ErrorBanner } from './ErrorBanner'

export interface LoginFormFieldsProps {
  t: ReturnType<typeof import('../../../shared/i18n/useT').useT>
  form: { username: string; password: string }
  setForm: React.Dispatch<
    React.SetStateAction<{ username: string; password: string }>
  >
  onSubmit: (e: React.FormEvent) => void
  isLoading?: boolean
  error?: string | null
  fieldErrors?: { username?: string; password?: string }
}

export function LoginFormFields({
  t,
  form,
  setForm,
  onSubmit,
  isLoading = false,
  error = null,
  fieldErrors = {},
}: LoginFormFieldsProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <LoginField
        name="username"
        label={t('ui.public.home.cta.login')}
        value={form.username}
        onChange={(v: string): void => {
          setForm({ ...form, username: v })
        }}
        error={fieldErrors.username}
      />
      <LoginField
        name="password"
        label="Password"
        type="password"
        value={form.password}
        onChange={(v: string): void => {
          setForm({ ...form, password: v })
        }}
        error={fieldErrors.password}
      />

      {error && <ErrorBanner message={error} />}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('ui.common.loading') : t('ui.common.save')}
      </Button>
    </form>
  )
}
