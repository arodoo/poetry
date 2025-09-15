/*
 * File: LoginPage.tsx
 * Purpose: Public login page component.
 * All Rights Reserved. Arodi Emmanuel
 */

import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { LoginFormSchema } from '../model/PublicLoginSchemas'
import type { LoginForm } from '../model/PublicLoginSchemas'
import { z } from 'zod'
import { useT } from '../../../shared/i18n/useT'
type Tfn = ReturnType<typeof import('../../../shared/i18n/useT').useT>
import LoginFormView from '../components/LoginFormView'
import { useNavigate } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useLocation } from 'react-router-dom'
import { useToast } from '../../../shared/toast/toastContext'
import { handleAuthRedirects } from '../utils/handleAuthRedirects'

export default function LoginPage(): React.ReactElement {
  const t: Tfn = useT()
  const [form, setForm] = useState<{
    username: string
    password: string
  }>({
    username: '',
    password: '',
  })
  const mutation: ReturnType<typeof useLogin> = useLogin()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale } = useLocale() as { locale: string }
  const location: ReturnType<typeof useLocation> = useLocation()
  const qs: URLSearchParams = new URLSearchParams(location.search)
  const toast: { push: (m: string) => void } = useToast()

  // Extracted redirect handling to a small helper to keep this file brief
  handleAuthRedirects(qs, toast.push, navigate, location.pathname)

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    const parsed: z.SafeParseReturnType<LoginForm, unknown> =
      LoginFormSchema.safeParse(form)
    if (!parsed.success) return
    await mutation.mutateAsync(parsed.data)
    void navigate(`/${locale}/dashboard`, { replace: true })
  }

  return (
    <main>
      <h1>{t('ui.public.home.intro')}</h1>
      <LoginFormView
        t={t}
        form={form}
        setForm={setForm}
        onSubmit={(e: React.FormEvent): void => void onSubmit(e)}
      />
    </main>
  )
}
