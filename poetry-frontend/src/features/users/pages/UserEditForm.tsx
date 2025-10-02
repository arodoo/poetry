/*
 * File: UserEditForm.tsx
 * Purpose: Form component for UserEditPage with modern FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type FormEvent, type ReactElement } from 'react'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { useNavigate } from 'react-router-dom'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import type { useT } from '../../../shared/i18n/useT'
import type { UserDetail } from '../model/UsersSchemas'
import {
  useUsersFormState,
  type UsersFormState,
} from '../components/useUsersFormState'
import { buildFormData } from '../components/usersFormHelpers'
import type { UsersFormValues } from '../components/UsersForm'
import { buildEditFormSections } from './userFormSections'

export interface UserEditFormProps {
  readonly userId: string
  readonly user: UserDetail
  readonly onSubmit: (values: UsersFormValues) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
}

export function UserEditForm(props: UserEditFormProps): ReactElement {
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale }: { locale: string } = useLocale()
  const formState: UsersFormState = useUsersFormState({
    username: props.user.username,
    email: props.user.email,
    locale: props.user.locale,
    roles: props.user.roles,
    version: props.user.version,
  })

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    props.onSubmit(
      buildFormData(
        formState.username,
        formState.email,
        formState.locale,
        formState.rolesString,
        formState.password,
        false,
        props.user.version
      )
    )
  }

  function handleCancel(): void {
    void navigate(`/${locale}/users/${props.userId}`)
  }

  const sections: ReturnType<typeof buildEditFormSections> =
    buildEditFormSections(formState, false, props.t)

  return (
    <PageLayout
      title={props.t('ui.users.edit.title')}
      subtitle={props.t('ui.users.edit.subtitle')}
    >
      <FormLayout
        sections={sections}
        onSubmit={handleSubmit}
        submitLabel={props.t('ui.users.actions.save')}
        cancelLabel={props.t('ui.users.actions.cancel')}
        onCancel={handleCancel}
        isSubmitting={props.isSubmitting}
      />
    </PageLayout>
  )
}
