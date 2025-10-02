/*
 * File: UserEditPage.tsx
 * Purpose: Admin user edit page with ETag conditional updates.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import type { UsersFormValues } from '../components/UsersForm'
import { useUpdateUserMutation } from '../hooks/useUsersMutations'
import { useUserDetailWithETag } from '../hooks/useUserDetailWithETag'
import type { UserDetail } from '../model/UsersSchemas'
import { UserEditPageLoading } from './UserEditPageHelpers'
import { UserEditForm } from './UserEditForm'

export default function UserEditPage(): ReactElement {
  const userId: string = useParams()['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: { locale: string } = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const { push }: { push: (msg: string) => void } = useToast()
  const detailQuery: ReturnType<typeof useUserDetailWithETag> =
    useUserDetailWithETag(userId)
  const mutation: ReturnType<typeof useUpdateUserMutation> =
    useUpdateUserMutation()
  const user: UserDetail | undefined = detailQuery.data?.user

  function handleSubmit(values: UsersFormValues): void {
    if (!values.version || !user || !detailQuery.data?.etag) return
    mutation.mutate(
      {
        id: userId,
        input: {
          firstName: user.firstName ?? '',
          lastName: user.lastName ?? '',
          email: values.email,
          username: values.username,
          locale: values.locale,
          roles: values.roles as string[],
          active: user.status === 'active',
          version: values.version,
        },
        etag: detailQuery.data.etag,
      },
      {
        onSuccess: (): void => {
          push(t('ui.users.toast.update.success'))
          void navigate(`/${locale}/users/${userId}`)
        },
        onError: (): void => {
          push(t('ui.users.toast.update.error'))
        },
      }
    )
  }

  if (detailQuery.isLoading)
    return <UserEditPageLoading message={t('ui.users.status.loading')} />
  if (detailQuery.isError || !user)
    return <UserEditPageLoading message={t('ui.users.status.error')} />

  return (
    <UserEditForm
      userId={userId}
      user={user}
      onSubmit={handleSubmit}
      isSubmitting={mutation.isPending}
      t={t}
    />
  )
}
