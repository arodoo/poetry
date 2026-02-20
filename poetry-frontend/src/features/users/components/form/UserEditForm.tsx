/*
 * File: UserEditForm.tsx
 * Purpose: Form component for UserEditPage with modern FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../../ui/Breadcrumb/Breadcrumb'
import { useLocale } from '../../../../shared/i18n/hooks/useLocale'
import type { useT } from '../../../../shared/i18n/useT'
import type { UserDetail } from '../../model/UsersSchemas'
import type { UsersFormValues } from './UsersForm'
import { useUsersFormState } from './useUsersFormState'
import { buildEditFormSections } from '../../model/userFormSections'
import { buildUserEditBreadcrumbs } from '../../model/userBreadcrumbHelpers'
import {
  createSubmitHandler,
  createCancelHandler,
} from '../../hooks/handlers/userEditHandlers'

export interface UserEditFormProps {
  readonly userId: string
  readonly user: UserDetail
  readonly onSubmit: (values: UsersFormValues) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
}

type UserWithExtra = UserDetail & {
  status?: 'active' | 'inactive'
  birthDate?: string
  gender?: string
  phone?: string
  addressLine1?: string
  addressLine2?: string
  addressCity?: string
  addressState?: string
  addressZip?: string
  addressCountry?: string
}

export function UserEditForm(props: UserEditFormProps): ReactElement {
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale }: { locale: string } = useLocale()
  const u = props.user as unknown as UserWithExtra
  const formState: ReturnType<typeof useUsersFormState> = useUsersFormState({
    firstName: u.firstName ?? '',
    lastName: u.lastName ?? '',
    username: u.username ?? '',
    email: u.email ?? '',
    locale: u.locale ?? 'en',
    roles: u.roles ?? [],
    status: u.status ?? 'active',
    birthDate: u.birthDate ?? '',
    gender: u.gender ?? '',
    phone: u.phone ?? '',
    addressLine1: u.addressLine1 ?? '',
    addressLine2: u.addressLine2 ?? '',
    addressCity: u.addressCity ?? '',
    addressState: u.addressState ?? '',
    addressZip: u.addressZip ?? '',
    addressCountry: u.addressCountry ?? '',
  })
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
    createSubmitHandler(formState, props.onSubmit)
  const handleCancel: () => void = createCancelHandler(
    navigate, locale, props.userId
  )
  const sections = buildEditFormSections(formState, false, props.t)
  const breadcrumbs = buildUserEditBreadcrumbs(props.userId, locale, props.t)
  return (
    <PageLayout
      title={props.t('ui.users.edit.title')}
      subtitle={props.t('ui.users.edit.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
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
