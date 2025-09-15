/*
 * File: ForgotPage.tsx
 * Purpose: Public forgot-password page component.
 * All Rights Reserved. Arodi Emmanuel
 */

import React, { useState } from 'react'
import { useForgotPassword } from '../hooks/useForgot'
import { ForgotFormSchema } from '../model/PublicForgotSchemas'
import type { ForgotForm } from '../model/PublicForgotSchemas'
import { z } from 'zod'
import { useT } from '../../../shared/i18n/useT'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'
import { useNavigate } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'

export default function ForgotPage(): React.ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const [form, setForm] = useState<{ email: string }>({ email: '' })
  const mutation: ReturnType<typeof useForgotPassword> = useForgotPassword()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale } = useLocale() as { locale: string }

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    const parsed: z.SafeParseReturnType<ForgotForm, unknown> =
      ForgotFormSchema.safeParse(form)
    if (!parsed.success) return
    await mutation.mutateAsync(parsed.data)
    void navigate(`/${locale}/login?forgot=success`, {
      replace: true,
    })
  }

  return (
    <main>
      <h1>{t('ui.common.loading')}</h1>
      <form onSubmit={(e: React.FormEvent): void => void onSubmit(e)}>
        <Input
          name="email"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setForm({ email: e.target.value })
          }}
        />
        <Button type="submit">{t('ui.common.save')}</Button>
      </form>
    </main>
  )
}
