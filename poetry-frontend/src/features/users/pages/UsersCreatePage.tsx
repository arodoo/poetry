/*
 * File: UsersCreatePage.tsx
 * Purpose: Admin create user page with modern FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type FormEvent, type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { useUsersFormState } from '../components/useUsersFormState'
import type { UsersFormState } from '../components/useUsersFormState'
import { buildFormData } from '../components/usersFormHelpers'
import { useCreateUserMutation } from '../hooks/useUsersMutations'
import type { CreateUserInput } from '../model/UsersSchemas'
import type { UsersFormValues } from '../components/UsersForm'
import { buildCreateFormSections } from './userFormSections'
export default function UsersCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateUserMutation> =
    useCreateUserMutation()
  const isSubmitting: boolean = mutation.isPending
  const formState: UsersFormState = useUsersFormState()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    const values: UsersFormValues = buildFormData(
      formState.username,
      formState.email,
      formState.locale,
      formState.rolesString,
      formState.password,
      true,
      undefined
    )
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

  function handleCancel(): void {
    void navigate(`/${locale}/users`)
  }

  return (
    <PageLayout
      title={t('ui.users.create.title')}
      subtitle={t('ui.users.create.subtitle')}
    >
      <FormLayout
        sections={buildCreateFormSections(formState, t)}
        onSubmit={handleSubmit}
        submitLabel={t('ui.users.actions.submit')}
        cancelLabel={t('ui.users.actions.cancel')}
        onCancel={handleCancel}
        isSubmitting={isSubmitting}
      />
    </PageLayout>
  )
}
