/*
 * File: SubscriptionEditPage.tsx
 * Purpose: Edit subscription plan details page with optimistic locking.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
// ...existing code...
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import SubscriptionEditBreadcrumbs from '../components/SubscriptionEditBreadcrumbs'
// UI components moved to SubscriptionForm
import SubscriptionEditForm from '../components/SubscriptionEditForm'

export default function SubscriptionEditPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  // Page is a thin wrapper; form handles locale/navigation/toast internally
  // Form state and submit logic moved into SubscriptionEditForm

  return (
    <PageLayout
      title={t('ui.subscriptions.edit.title')}
      subtitle={t('ui.subscriptions.edit.subtitle')}
    >
      <SubscriptionEditBreadcrumbs />
      <SubscriptionEditForm id={id} />
    </PageLayout>
  )
}
