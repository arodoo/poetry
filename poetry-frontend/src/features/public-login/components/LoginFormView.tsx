/*
 * File: LoginFormView.tsx
 * Purpose: Presentational login form used by `LoginPage`. Extracted to keep
 * the page file short and focused. All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import { Button } from '../../../ui/Button/Button'
import type { useT as UseTType } from '../../../shared/i18n/useT'

type Tfn = ReturnType<typeof UseTType>
import { LoginField } from './LoginField'

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

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('ui.common.loading') : t('ui.common.save')}
      </Button>
    </form>
  )
}
