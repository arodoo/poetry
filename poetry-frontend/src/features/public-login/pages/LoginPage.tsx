/*
 * File: LoginPage.tsx
 * Purpose: Orchestrate public login with new hooks and components.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type FormEvent, type ReactElement } from 'react'
import { useNavigate, Link, type NavigateFunction } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { Text } from '../../../ui/Text/Text'
import { PublicLoginForm } from '../components/PublicLoginForm'
import { usePublicLoginMutation } from '../hooks/usePublicLoginQueries'

export default function LoginPage(): ReactElement {
  const t: (key: I18nKey) => string = useT()
  const { locale } = useLocale() as { locale: string }
  const navigate: NavigateFunction = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorKey, setErrorKey] = useState<I18nKey | null>(null)
  const mutation: ReturnType<typeof usePublicLoginMutation> =
    usePublicLoginMutation()
  const dashboardPath: string = `/${locale}/dashboard`
  const forgotPasswordPath: string = `/${locale}/forgot-password`

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    setErrorKey(null)
    try {
      await mutation.mutateAsync({ username, password })
      void navigate(dashboardPath, { replace: true })
    } catch (unknownError) {
      console.error('public-login-error', unknownError)
      setErrorKey('ui.publicLogin.error' as I18nKey)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PublicLoginForm
        username={username}
        password={password}
        onUsernameChange={(value: string): void => {
          setUsername(value)
        }}
        onPasswordChange={(value: string): void => {
          setPassword(value)
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>): void =>
          void handleSubmit(event)
        }
        isSubmitting={mutation.isPending}
        title={t('ui.publicLogin.title')}
        description={t('ui.publicLogin.description')}
        usernameLabel={t('ui.publicLogin.username.label')}
        passwordLabel={t('ui.publicLogin.password.label')}
        submitLabel={t('ui.publicLogin.submit.label')}
        pendingLabel={t('ui.publicLogin.submit.pending')}
        errorMessage={errorKey ? t(errorKey) : undefined}
      />
      <Text size="sm">
        <Link to={forgotPasswordPath}>{t('ui.publicLogin.forgotLink')}</Link>
      </Text>
    </div>
  )
}
