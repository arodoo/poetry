/*
 * File: SubscriptionDetailPage.tsx
 * Purpose: Displays subscription plan details with edit and delete actions.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { buildSubscriptionDetailBreadcrumbs } from './subscriptionBreadcrumbHelpers'

export default function SubscriptionDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const query: ReturnType<typeof useSubscriptionDetailQuery> =
    useSubscriptionDetailQuery(id ?? '')
  const isLoading: boolean = query.isLoading
  const isError: boolean = query.isError
  const subscription = query.data
  const breadcrumbs = buildSubscriptionDetailBreadcrumbs(locale, t, id ?? '')
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button to={`/${locale}/subscriptions/${id}/edit`} size="md">
        {t('ui.subscriptions.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/subscriptions/${id}/delete`}
        size="md"
        tone="danger"
      >
        {t('ui.subscriptions.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={subscription?.name ?? t('ui.subscriptions.detail.title')}
      subtitle={t('ui.subscriptions.detail.subtitle')}
      actions={actions}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      {isLoading ? (
        <div>{t('ui.subscriptions.status.loading')}</div>
      ) : isError || !subscription ? (
        <div>{t('ui.subscriptions.status.error')}</div>
      ) : (
        <div className="space-y-4">
          <div>
            <strong>{t('ui.subscriptions.detail.name')}: </strong>
            {subscription.name}
          </div>
        </div>
      )}
    </PageLayout>
  )
}
