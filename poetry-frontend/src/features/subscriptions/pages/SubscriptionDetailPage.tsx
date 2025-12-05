/*
 * File: SubscriptionDetailPage.tsx
 * Purpose: Displays subscription plan details with modern DetailView layout.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useLocale } from '../../../shared/i18n/hooks/useLocale'
import { Text } from '../../../ui/Text/Text'
import { PageLayout } from '../../../ui/PageLayout/PageLayout'
import { Breadcrumb } from '../../../ui/Breadcrumb/Breadcrumb'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import { DetailView } from '../../../ui/DetailView/DetailView'
import type { DetailViewSection } from '../../../ui/DetailView/DetailView'
import { useSubscriptionDetailQuery } from '../hooks/useSubscriptionsQueries'
import { buildSubscriptionDetailBreadcrumbs } from '../model/subscriptionBreadcrumbHelpers'
import { buildSubscriptionDetailSections } from '../model/subscriptionDetailHelpers'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export default function SubscriptionDetailPage(): ReactElement {
  const { id } = useParams<{ id: string }>()
  const t: ReturnType<typeof useT> = useT()
  const { locale }: ReturnType<typeof useLocale> = useLocale()
  const query: ReturnType<typeof useSubscriptionDetailQuery> =
    useSubscriptionDetailQuery(id ?? '')
  const { data, isLoading, isError } = query
  const subscription = data
  const sections: readonly DetailViewSection[] = subscription
    ? buildSubscriptionDetailSections(subscription, t)
    : []
  const breadcrumbs = buildSubscriptionDetailBreadcrumbs(locale, t)
  const actions: ReactElement = (
    <Inline gap="sm">
      <Button
        to={`/${locale}/subscriptions/${toTemplateString(id)}/edit`}
        size="sm"
        width="fixed-small"
        data-testid="edit-subscription-button"
      >
        {t('ui.subscriptions.actions.edit')}
      </Button>
      <Button
        to={`/${locale}/subscriptions/${toTemplateString(id)}/delete`}
        size="sm"
        width="fixed-small"
        variant="danger"
        data-testid="delete-subscription-button"
      >
        {t('ui.subscriptions.actions.delete')}
      </Button>
    </Inline>
  )
  return (
    <PageLayout
      title={subscription?.name ?? t('ui.subscriptions.detail.title')}
      subtitle={t('ui.subscriptions.detail.subtitle')}
    >
      <div className="mb-4">
        <Breadcrumb items={breadcrumbs} />
      </div>
      <div data-testid="subscription-detail-content">
        {isLoading ? (
          <Text size="sm">{t('ui.subscriptions.status.loading')}</Text>
        ) : isError || !subscription ? (
          <Text size="sm">{t('ui.subscriptions.status.error')}</Text>
        ) : (
          <DetailView sections={sections} actions={actions} />
        )}
      </div>
    </PageLayout>
  )
}
