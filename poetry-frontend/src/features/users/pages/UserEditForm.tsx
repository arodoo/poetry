/*
 * File: UserEditForm.tsx
 * Purpose: Form component for UserEditPage to reduce main file size.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { UsersForm, type UsersFormValues } from '../components/UsersForm'
import type { useT } from '../../../shared/i18n/useT'
import type { UserDetail } from '../model/UsersSchemas'

export interface UserEditFormProps {
  readonly user: UserDetail
  readonly onSubmit: (values: UsersFormValues) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
}

export function UserEditForm(props: UserEditFormProps): ReactElement {
  return (
    <UsersPageLayout
      titleKey="ui.users.edit.title"
      subtitleKey="ui.users.edit.subtitle"
    >
      <UsersFormShell
        title={props.t('ui.users.edit.form.title')}
        description={props.t('ui.users.edit.form.subtitle')}
      >
        <UsersForm
          initialValues={{
            username: props.user.username,
            email: props.user.email,
            locale: props.user.locale,
            roles: props.user.roles,
            version: props.user.version,
          }}
          onSubmit={props.onSubmit}
          isSubmitting={props.isSubmitting}
          showPassword={false}
          t={props.t}
          submitLabel={props.t('ui.users.actions.save')}
        />
      </UsersFormShell>
    </UsersPageLayout>
  )
}
