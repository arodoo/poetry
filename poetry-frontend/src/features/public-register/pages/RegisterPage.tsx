/*
 * File: RegisterPage.tsx
 * Purpose: Public registration page component.
 * All Rights Reserved. Arodi Emmanuel
 */

import React, { useState } from 'react'
import { useRegister } from '../hooks/useRegister'
import { RegisterFormSchema } from '../model/PublicRegisterSchemas'
import type { RegisterForm } from '../model/PublicRegisterSchemas'
import { z } from 'zod'
import { useT } from '../../../shared/i18n/useT'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'

export default function RegisterPage(): React.ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const [form, setForm] = useState<{
    username: string
    email: string
    password: string
  }>({ username: '', email: '', password: '' })
  const mutation: ReturnType<typeof useRegister> = useRegister()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale } = useLocale() as { locale: string }

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    const parsed: z.SafeParseReturnType<RegisterForm, unknown> =
      RegisterFormSchema.safeParse(form)
    if (!parsed.success) return
    await mutation.mutateAsync(parsed.data)
    void navigate(`/${locale}/login?registered=1`, {
      replace: true,
    })
  }

  return (
    <main>
      <h1>{t('ui.public.home.cta.register')}</h1>
      <form onSubmit={(e: React.FormEvent): void => void onSubmit(e)}>
        <Input
          name="username"
          value={form.username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ ...form, username: e.target.value })
          }}
        />
        <Input
          name="email"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ ...form, email: e.target.value })
          }}
        />
        <Input
          name="password"
          type="password"
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ ...form, password: e.target.value })
          }}
        />
        <Button type="submit">{t('ui.common.save')}</Button>
      </form>
    </main>
  )
}
