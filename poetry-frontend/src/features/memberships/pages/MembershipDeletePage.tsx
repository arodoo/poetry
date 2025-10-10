/*
 * File: MembershipDeletePage.tsx
 * Purpose: Admin membership delete confirmation page.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { useToast } from '../../../shared/toast/toastContext'
import { useDeleteMembershipMutation } from '../hooks/useMembershipsMutations'

export default function MembershipDeletePage(): ReactElement {
  const params: Readonly<Record<string, string | undefined>> = useParams()
  const membershipId: string = params['id'] ?? ''
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const navigate: ReturnType<typeof useNavigate> = useNavigate()
  const toast: ReturnType<typeof useToast> = useToast()
  const mutation: ReturnType<typeof useDeleteMembershipMutation> =
    useDeleteMembershipMutation()
  const isSubmitting: boolean = mutation.isPending

  function handleConfirmDelete(): void {
    mutation.mutate(
      { id: membershipId },
      {
        onSuccess: (): void => {
          toast.push(t('ui.memberships.toast.deleted'))
          navigate(`/${locale}/memberships`)
        },
        onError: (): void => {
          toast.push(t('ui.memberships.status.error'))
        },
      }
    )
  }

  function handleCancel(): void {
    void navigate(`/${locale}/memberships/${membershipId}`)
  }

  return (
    <PageLayout
      title={t('ui.memberships.delete.title')}
      subtitle={t('ui.memberships.delete.subtitle')}
    >
      <div className="max-w-2xl">
        <Stack gap="md">
          <Text size="sm" className="text-error-600">
            {t('ui.memberships.delete.warning')}
          </Text>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCancel}
              data-testid="cancel-delete-membership-button"
            >
              {t('ui.memberships.actions.cancel')}
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={isSubmitting}
              data-testid="confirm-delete-membership-button"
            >
              {t('ui.memberships.actions.confirmDelete')}
            </Button>
          </div>
        </Stack>
      </div>
    </PageLayout>
  )
}
