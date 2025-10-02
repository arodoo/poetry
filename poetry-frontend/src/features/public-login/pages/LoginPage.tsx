/*
 * File: LoginPage.tsx
 * Purpose: Orchestrate public login with new hooks and components.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { Text } from '../../../ui/Text/Text'
import { PublicLoginForm } from '../components/PublicLoginForm'
import { useLoginPage } from '../hooks/useLoginPage'

export default function LoginPage(): ReactElement {
  const { t, form, setForm, onSubmit, isLoading, error, fieldErrors } =
    useLoginPage()
  const { locale } = useLocale() as { locale: string }
  const forgotPasswordPath: string = `/${locale}/forgot-password`

  function setUsername(value: string): void {
    setForm((prev: typeof form): typeof form => ({ ...prev, username: value }))
  }

  function setPassword(value: string): void {
    setForm((prev: typeof form): typeof form => ({ ...prev, password: value }))
  }

  return (
    <div className="space-y-6 p-6">
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
      <Text size="sm">
        <Link to={forgotPasswordPath}>{t('ui.publicLogin.forgotLink')}</Link>
      </Text>
    </div>
  )
}
