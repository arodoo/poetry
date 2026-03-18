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
import { useUserDemographicsForm } from '../../../userdemographics/hooks/useUserDemographicsForm'
import { useUserAddressForm } from '../../../useraddress/hooks/useUserAddressForm'

export interface UserEditFormProps {
  readonly userId: string
  readonly user: UserDetail
  readonly onSubmit: (values: UsersFormValues) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
  readonly children?: React.ReactNode
}

export function UserEditForm(props: UserEditFormProps): ReactElement {
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { locale }: { locale: string } = useLocale()
  const formState: ReturnType<typeof useUsersFormState> = useUsersFormState({
    firstName: props.user.firstName ?? '',
    lastName: props.user.lastName ?? '',
    username: props.user.username ?? '',
    email: props.user.email ?? '',
    locale: props.user.locale ?? 'en',
    roles: props.user.roles ?? [],
    status:
      (props.user as unknown as { status?: 'active' | 'inactive' }).status ??
      'active',
  })
  const numericUserId = Number(props.userId)
  const demographicsState = useUserDemographicsForm(numericUserId)
  const addressState = useUserAddressForm(numericUserId)

  const baseSubmit = createSubmitHandler(formState, props.onSubmit)
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      await Promise.all([
        demographicsState.saveForUser(numericUserId),
        addressState.saveForUser(numericUserId),
      ])
    } catch (err) {
      console.error('Failed to save demographics or address', err)
    }
    baseSubmit(e)
  }
  const handleCancel: () => void = createCancelHandler(
    navigate,
    locale,
    props.userId
  )

  if (!demographicsState.isLoaded || !addressState.isLoaded) {
    return (
      <PageLayout
        title={props.t('ui.users.edit.title')}
        subtitle={props.t('ui.users.edit.subtitle')}
      >
        <div className="flex justify-center p-8">
          <span className="text-sm text-textMuted">
            {props.t('ui.users.status.loading')}
          </span>
        </div>
      </PageLayout>
    )
  }

  const sections = buildEditFormSections(
    formState,
    false,
    props.t,
    demographicsState,
    addressState,
    props.userId,
    locale
  )
  const breadcrumbs: ReturnType<typeof buildUserEditBreadcrumbs> =
    buildUserEditBreadcrumbs(props.userId, locale, props.t)

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
      >
        {props.children}
      </FormLayout>
    </PageLayout>
  )
}
