/*
 * File: UserDeletePage.tsx
 * Purpose: Admin user delete confirmation page with navigation.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { UsersPageLayout } from '../components/UsersPageLayout'
import { UsersFormShell } from '../components/UsersFormShell'
import { useDeleteUserMutation } from '../hooks/useUsersMutations'
import { useUserDetailWithETag } from '../hooks/useUserDetailWithETag'

export default function UserDeletePage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const userId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useDeleteUserMutation> =
    useDeleteUserMutation()
  const { data: userDetail } = useUserDetailWithETag(userId)
  const isSubmitting: boolean = mutation.isPending

  function handleConfirmDelete(): void {
    const etag: string | null | undefined = userDetail?.etag
    mutation.mutate(
      {
        id: userId,
        input: {},
        ...(etag ? { etag } : {}),
      },
      {
        onSuccess: (): void => {
          toast.push(t('ui.users.delete.success'))
          // intentionally fire-and-forget navigation after success
          void navigate(`/${locale}/users`)
        },
        onError: (): void => {
          toast.push(t('ui.users.delete.error'))
        },
      }
    )
  }

  function handleCancel(): void {
    void navigate(`/${locale}/users/${userId}`)
  }

  return (
    <UsersPageLayout
      titleKey="ui.users.delete.title"
      subtitleKey="ui.users.delete.subtitle"
    >
      <UsersFormShell
        title={t('ui.users.delete.form.title')}
        description={t('ui.users.delete.form.subtitle')}
      >
        <Stack gap="md">
          <Text size="sm" className="text-error-600">
            {t('ui.users.delete.form.warning')}
          </Text>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
              data-testid="cancel-delete-user-button"
            >
              {t('ui.users.actions.cancel')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              data-testid="confirm-delete-user-button"
            >
              {t('ui.users.actions.confirmDelete')}
            </Button>
          </div>
        </Stack>
      </UsersFormShell>
    </UsersPageLayout>
  )
}
