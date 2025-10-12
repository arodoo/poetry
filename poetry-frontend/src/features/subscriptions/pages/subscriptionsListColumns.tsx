/*
 * File: subscriptionsListColumns.tsx
 * Purpose: DataTable column definitions for SubscriptionsListPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { SubscriptionSummary } from '../model/SubscriptionsSchemas'

export function buildSubscriptionsListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<SubscriptionSummary>[] {
  return [
    {
      key: 'name',
      header: t('ui.subscriptions.table.name'),
      accessor: (row: SubscriptionSummary): string => row.name ?? '',
    },
    {
      key: 'price',
      header: t('ui.subscriptions.table.price'),
      accessor: (row: SubscriptionSummary): string =>
        `${row.currency ?? 'USD'} ${row.price?.toFixed(2) ?? '0.00'}`,
    },
    {
      key: 'duration',
      header: t('ui.subscriptions.table.duration'),
      accessor: (row: SubscriptionSummary): string =>
        `${row.durationDays ?? 0} ${t('ui.subscriptions.table.days')}`,
    },
    {
      key: 'status',
      header: t('ui.subscriptions.table.status'),
      accessor: (row: SubscriptionSummary): ReactElement => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'} size="sm">
          {t(`ui.subscriptions.status.${row.status}`)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: t('ui.subscriptions.table.actions'),
      accessor: (row: SubscriptionSummary): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/subscriptions/${row.id}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-subscription-${row.id}`}
          >
            {t('ui.subscriptions.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
