/*
 * File: MembershipEditForm.tsx
 * Purpose: Membership edit form with all editable fields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Stack } from '../../../ui/Stack/Stack'
import { Button } from '../../../ui/Button/Button'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import type { MembershipResponse } from '../../../api/generated'
import type { MembershipFormValues } from '../components/MembershipFormValues'
import { MembershipFormFields } from '../components/MembershipFormFields'
import { useMembershipFormData } from '../hooks/useMembershipFormData'
import { useMembershipFormState } from '../hooks/useMembershipFormState'

interface Props {
  readonly membership: MembershipResponse
  readonly onSubmit: (values: MembershipFormValues) => void
  readonly isSubmitting: boolean
  readonly t: (key: string) => string
}

export function MembershipEditForm({
  membership,
  onSubmit,
  isSubmitting,
  t,
}: Props): ReactElement {
  const { locale } = useLocale()
  const navigate = useNavigate()
  const formData = useMembershipFormData()
  const formState = useMembershipFormState(membership)

  if (formData.isLoading)
    return (
      <PageLayout title={t('ui.memberships.actions.edit')} subtitle="">
        <p>{t('ui.memberships.status.loading')}</p>
      </PageLayout>
    )

  return (
    <PageLayout title={t('ui.memberships.actions.edit')} subtitle="">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formState.values)
        }}
      >
        <Stack gap="md">
          <MembershipFormFields
            values={formState.values}
            users={formData.users}
            subscriptions={formData.subscriptions}
            onUserChange={formState.setUserId}
            onSubscriptionChange={formState.setSubscriptionId}
            onSellerCodeChange={formState.setSellerCode}
            onStatusChange={formState.setStatus}
            t={t}
          />
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                // intentionally fire-and-forget navigation from a button handler
                void navigate(`/${locale}/memberships/${membership.id}`)
              }
            >
              {t('ui.memberships.actions.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={isSubmitting}
            >
              {t('ui.memberships.actions.save')}
            </Button>
          </div>
        </Stack>
      </form>
    </PageLayout>
  )
}
