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
import { toTemplateString } from '../../../shared/utils/templateSafe'
import { formatDate } from '../../../shared/utils/dateUtils'

export function buildSubscriptionsListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<SubscriptionSummary>[] {
  return [
    {
      key: 'createdAt',
      header: t('ui.subscriptions.columns.createdAt'),
      width: 'md',
      accessor: (row: SubscriptionSummary): string => formatDate(row.createdAt),
      sortValue: (row: SubscriptionSummary): string => row.createdAt ?? '',
    },
    {
      key: 'name',
      header: t('ui.subscriptions.columns.name'),
      width: 'lg',
      accessor: (row: SubscriptionSummary): string => row.name ?? '-',
      sortValue: (row: SubscriptionSummary): string => row.name ?? '',
    },
    {
      key: 'price',
      header: t('ui.subscriptions.columns.membership'),
      width: 'md',
      accessor: (row: SubscriptionSummary): string =>
        toTemplateString(row.currency ?? 'USD') +
        ' ' +
        (row.price?.toFixed(2) ?? '0.00'),
      sortValue: (row: SubscriptionSummary): number => row.price ?? 0,
    },
    {
      key: 'duration',
      header: t('ui.subscriptions.columns.duration'),
      width: 'sm',
      accessor: (row: SubscriptionSummary): string =>
        toTemplateString(row.durationDays ?? 0) +
        ' ' +
        t('ui.subscriptions.table.days'),
      sortValue: (row: SubscriptionSummary): number => row.durationDays ?? 0,
    },
    {
      key: 'status',
      header: t('ui.subscriptions.columns.status'),
      width: 'sm',
      accessor: (item: SubscriptionSummary): ReactElement => {
        const status = (item.status ?? 'inactive').toLowerCase()
        return (
          <Badge tone={status === 'active' ? 'success' : 'neutral'} size="sm">
            {t('ui.subscriptions.status.' + status)}
          </Badge>
        )
      },
      sortValue: (row: SubscriptionSummary): string => row.status ?? '',
      filterOptions: [
        { value: 'active', label: t('ui.subscriptions.status.active') },
        { value: 'inactive', label: t('ui.subscriptions.status.inactive') },
      ],
    },
    {
      key: 'actions',
      header: t('ui.subscriptions.columns.actions'),
      width: 'sm',
      accessor: (row: SubscriptionSummary): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/subscriptions/${toTemplateString(row.id)}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-subscription-${toTemplateString(row.id)}`}
          >
            {t('ui.subscriptions.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
