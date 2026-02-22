/*
 * File: subscriptionsFilterDefs.ts
 * Purpose: Filter definitions for subscriptions DataTable.
 * Provides status filter for the filter bar dropdown,
 * matching active/inactive subscription plan states.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FilterDef } from '../../../ui/DataTable/FilterTypes'

export function buildSubscriptionFilters(
  t: (key: string) => string
): readonly FilterDef[] {
  return [
    {
      key: 'status',
      label: t('ui.table.filter.status'),
      options: [
        {
          value: 'active',
          label: t('ui.subscriptions.status.active'),
        },
        {
          value: 'inactive',
          label: t('ui.subscriptions.status.inactive'),
        },
      ],
    },
  ]
}
