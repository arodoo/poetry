/*
 * File: membershipsListColumns.tsx
 * Purpose: DataTable column definitions for MembershipsListPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { MembershipResponse } from '../../../api/generated'

export function buildMembershipsListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<MembershipResponse>[] {
  return [
    {
      key: 'id',
      header: t('ui.memberships.table.id'),
      accessor: (row: MembershipResponse): string => String(row.id ?? ''),
    },
    {
      key: 'userId',
      header: t('ui.memberships.table.userId'),
      accessor: (row: MembershipResponse): string => String(row.userId ?? ''),
    },
    {
      key: 'subscriptionId',
      header: t('ui.memberships.table.subscriptionId'),
      accessor: (row: MembershipResponse): string =>
        String(row.subscriptionId ?? ''),
    },
    {
      key: 'sellerCode',
      header: t('ui.memberships.table.sellerCode'),
      accessor: (row: MembershipResponse): string => row.sellerCode ?? '',
    },
    {
      key: 'status',
      header: t('ui.memberships.table.status'),
      accessor: (row: MembershipResponse): ReactElement => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'} size="sm">
          {t(`ui.memberships.status.${row.status}`)}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: t('ui.memberships.table.actions'),
      accessor: (row: MembershipResponse): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/memberships/${row.id}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-membership-${row.id}`}
          >
            {t('ui.memberships.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
