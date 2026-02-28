/*
 * File: LoginPage.tsx
 * Purpose: Dance academy themed public login orchestrating the split
 * layout, dancer mascot, and login form components. Locale is read
 * from the URL for immediate i18n. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { PublicLoginForm } from '../components/PublicLoginForm'
import { DancerSvg } from '../components/DancerSvg'
import { LoginLayout } from '../components/LoginLayout'
import { useLoginPage } from '../hooks/useLoginPage'

export default function LoginPage(): ReactElement {
  const {
    t, form, setForm, onSubmit,
    isLoading, error, fieldErrors,
  } = useLoginPage()
  const { locale } = useLocale()
  const forgotPath = `/${locale}/forgot-password`

  function setUsername(v: string): void {
    setForm(p => ({ ...p, username: v }))
  }
  function setPassword(v: string): void {
    setForm(p => ({ ...p, password: v }))
  }

  const left = (
    <>
      <DancerSvg />
      <p className="text-3xl font-bold text-white text-center">
        {t('ui.publicLogin.brand.name')}
      </p>
      <p className="text-purple-200 text-center text-sm">
        {t('ui.publicLogin.brand.tagline')}
      </p>
    </>
  )

  const right = (
    <>
      <PublicLoginForm
        username={form.username}
        usernameError={fieldErrors.username}
        password={form.password}
        passwordError={fieldErrors.password}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onSubmit={onSubmit}
        isSubmitting={isLoading}
        title={t('ui.publicLogin.title')}
        description={t('ui.publicLogin.description')}
        usernameLabel={t('ui.publicLogin.username.label')}
        passwordLabel={t('ui.publicLogin.password.label')}
        submitLabel={t('ui.publicLogin.submit.label')}
        pendingLabel={t('ui.publicLogin.submit.pending')}
        errorMessage={error ?? undefined}
      />
      <p className="mt-4 text-purple-200 text-sm">
        <Link to={forgotPath}>
          {t('ui.publicLogin.forgotLink')}
        </Link>
      </p>
    </>
  )

  return <LoginLayout left={left} right={right} />
}
