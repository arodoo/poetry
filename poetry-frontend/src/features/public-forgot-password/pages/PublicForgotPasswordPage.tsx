/*
 * File: PublicForgotPasswordPage.tsx
 * Purpose: Orchestrate public forgot-password flow with form and hooks.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type FormEvent, type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { Text } from '../../../ui/Text/Text'
import { Link } from 'react-router-dom'
import { PublicForgotPasswordForm } from '../components/PublicForgotPasswordForm'
import { usePublicForgotPasswordMutation } from '../hooks/usePublicForgotPasswordQueries'

export default function PublicForgotPasswordPage(): ReactElement {
  const t: (key: I18nKey) => string = useT()
  const { locale } = useLocale() as { locale: string }
  const [emailValue, setEmailValue] = useState<string>('')
  const [successKey, setSuccessKey] = useState<I18nKey | null>(null)
  const [errorKey, setErrorKey] = useState<I18nKey | null>(null)
  const mutation: {
    readonly mutateAsync: (payload: {
      email: string
    }) => Promise<{ messageKey: string }>
    readonly isPending: boolean
  } = usePublicForgotPasswordMutation()

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault()
    setErrorKey(null)
    try {
      const result: { messageKey: string } = await mutation.mutateAsync({
        email: emailValue,
      })
      setSuccessKey(result.messageKey)
    } catch (unknownError) {
      console.error('forgot-password-error', unknownError)
      setErrorKey('ui.publicForgotPassword.error' as I18nKey)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <PublicForgotPasswordForm
        emailValue={emailValue}
        onEmailChange={(value: string): void => {
          setEmailValue(value)
          setSuccessKey(null)
        }}
        onSubmit={(event: FormEvent<HTMLFormElement>): void =>
          void handleSubmit(event)
        }
        isSubmitting={mutation.isPending}
        title={t('ui.publicForgotPassword.title')}
        description={t('ui.publicForgotPassword.description')}
        emailLabel={t('ui.publicForgotPassword.email.label')}
        submitLabel={t('ui.publicForgotPassword.submit.label')}
        pendingLabel={t('ui.publicForgotPassword.submit.pending')}
        successMessage={successKey ? t(successKey) : undefined}
        errorMessage={errorKey ? t(errorKey) : undefined}
      />
      <Text size="sm">
        <Link to={`/${locale}/login`}>
          {t('ui.publicForgotPassword.backToLogin')}
        </Link>
      </Text>
    </div>
  )
}
