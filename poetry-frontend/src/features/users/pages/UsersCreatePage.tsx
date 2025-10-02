/*
 * File: UsersCreatePage.tsx
 * Purpose: Admin create user page with modern FormLayout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { FormLayout } from '../../../ui/FormLayout/FormLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { useUsersFormState } from '../components/useUsersFormState'
import { useCreateUserMutation } from '../hooks/useUsersMutations'
import type { CreateUserInput } from '../model/UsersSchemas'
import { buildCreateFormSections } from './userFormSections'
import { buildUserCreateBreadcrumbs } from './userBreadcrumbHelpers'
import {
  createUserSubmitHandler,
  createUserCancelHandler,
} from './userCreateHandlers'
export default function UsersCreatePage(): ReactElement {
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useCreateUserMutation> =
    useCreateUserMutation()
  const isSubmitting: boolean = mutation.isPending
  const formState: ReturnType<typeof useUsersFormState> = useUsersFormState()
  const breadcrumbs: readonly { label: string; href?: string }[] =
    buildUserCreateBreadcrumbs(locale, t)
  const handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void =
    createUserSubmitHandler(formState, (input: CreateUserInput): void => {
      mutation.mutate(input, {
        onSuccess: (): void => {
          toast.push(t('ui.users.toast.create.success'))
          void navigate(`/${locale}/users`)
        },
        onError: (): void => {
          toast.push(t('ui.users.toast.create.error'))
        },
      })
    })
  const handleCancel: () => void = createUserCancelHandler(navigate, locale)

  return (
    <PageLayout
      title={t('ui.users.create.title')}
      subtitle={t('ui.users.create.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
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
