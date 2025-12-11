/*
 * File: subscriptionDetailHelpers.tsx
 * Purpose: Helper functions for SubscriptionDetailPage to reduce file length.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { SubscriptionResponse } from '../../../api/generated'
import type {
  DetailViewSection,
  DetailViewItem,
} from '../../../ui/DetailView/DetailView'
import { Badge } from '../../../ui/Badge/Badge'
import { formatCurrency, formatDuration } from '../utils/formatters'

export function buildSubscriptionDetailSections(
  subscription: SubscriptionResponse,
  t: (key: string) => string
): readonly DetailViewSection[] {
  return [
    {
      title: t('ui.subscriptions.detail.section.plan'),
      items: [
        {
          label: t('ui.subscriptions.table.name'),
          value: subscription.name ?? '',
        },
        {
          label: t('ui.subscriptions.detail.description'),
          value: subscription.description ?? t('ui.subscriptions.detail.noDescription'),
          fullWidth: true,
        },
      ] as readonly DetailViewItem[],
    },
    {
      title: t('ui.subscriptions.detail.section.pricing'),
      items: [
        {
          label: t('ui.subscriptions.table.price'),
          value: formatCurrency(
            subscription.price ?? 0,
            subscription.currency ?? 'USD'
          ),
        },
        {
          label: t('ui.subscriptions.table.duration'),
          value: formatDuration(subscription.durationDays ?? 30, t),
        },
        {
          label: t('ui.subscriptions.table.status'),
          value: (
            <Badge
              tone={subscription.status === 'active' ? 'success' : 'neutral'}
              data-testid="subscription-status-display"
            >
              {subscription.status === 'active'
                ? t('ui.subscriptions.status.active')
                : t('ui.subscriptions.status.inactive')}
            </Badge>
          ),
        },
      ] as readonly DetailViewItem[],
    },
  ]
}
