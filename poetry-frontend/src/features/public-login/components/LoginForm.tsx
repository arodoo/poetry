/*
 * File: LoginForm.tsx
 * Purpose: Presentational login form used by `LoginPage`. Extracted to keep
 * the page file short and focused. All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'

type Tfn = ReturnType<typeof import('../../../shared/i18n/useT').useT>

export interface LoginFormProps {
  t: Tfn
  form: { username: string; password: string }
  setForm: (f: { username: string; password: string }) => void
  onSubmit: (e: React.FormEvent) => void
}
export default function LoginForm({
  t,
  form,
  setForm,
  onSubmit,
}: LoginFormProps): React.ReactElement {
  return (
    <form onSubmit={onSubmit}>
      <label>
        {t('ui.public.home.cta.login')}
        <Input
          name="username"
          value={form.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ ...form, username: e.target.value })
          }}
        />
      </label>
      <label>
        {t('ui.common.save')}
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ ...form, password: e.target.value })
          }}
        />
      </label>
      <Button type="submit">{t('ui.common.save')}</Button>
    </form>
  )
}
