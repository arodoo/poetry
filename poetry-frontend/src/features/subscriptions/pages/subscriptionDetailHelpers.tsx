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

export function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toFixed(2)}`
}

export function formatDuration(
  days: number,
  t: (key: string) => string
): string {
  if (days === 1) {
    return `${days} day`
  }
  if (days === 7) {
    return '1 week'
  }
  if (days === 30) {
    return '1 month'
  }
  if (days === 90) {
    return '3 months'
  }
  if (days === 365) {
    return '1 year'
  }
  return `${days} ${t('ui.subscriptions.table.days')}`
}

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
          label: 'Description',
          value: subscription.description || 'No description provided',
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
