/*
 * File: UsersCreatePage.tsx
 * Purpose: Admin create user page with functional form for user creation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { UsersForm, type UsersFormValues } from '../components/UsersForm'
import { useCreateUserMutation } from '../hooks/useUsersMutations'
import type { CreateUserInput } from '../model/UsersSchemas'

export default function UsersCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const localeResult: ReturnType<typeof useLocale> = useLocale()
  const locale: string = localeResult.locale
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateUserMutation> =
    useCreateUserMutation()
  const isSubmitting: boolean = mutation.isPending

  function handleSubmit(values: UsersFormValues): void {
    const input: CreateUserInput = {
      username: values.username,
      email: values.email,
      locale: values.locale,
      roles: values.roles as string[],
      password: values.password ?? '',
    }
    mutation.mutate(input, {
      onSuccess: (): void => {
        toast.push(t('ui.users.toast.create.success'))
        void navigate(`/${locale}/users`)
      },
      onError: (): void => {
        toast.push(t('ui.users.toast.create.error'))
      },
    })
  }

  return (
    <UsersPageLayout
      titleKey="ui.users.create.title"
      subtitleKey="ui.users.create.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.create.form.title')}
        description={t('ui.users.create.form.subtitle')}
      >
        <UsersForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          showPassword={true}
          t={t}
          submitLabel={t('ui.users.actions.submit')}
        />
      </UsersFormShell>
    </UsersPageLayout>
  )
}
