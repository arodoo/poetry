/*
 * File: membershipsListColumns.tsx
 * Purpose: DataTable column definitions for MembershipsListPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import { toTemplateString } from '../../../shared/utils/templateSafe'
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
      sortValue: (row: MembershipResponse): number => row.id ?? 0,
    },
    {
      key: 'userId',
      header: t('ui.memberships.table.userId'),
      accessor: (row: MembershipResponse): string => String(row.userId ?? ''),
      sortValue: (row: MembershipResponse): number => row.userId ?? 0,
    },
    {
      key: 'subscriptionId',
      header: t('ui.memberships.table.subscriptionId'),
      accessor: (row: MembershipResponse): string =>
        String(row.subscriptionId ?? ''),
      sortValue: (row: MembershipResponse): number => row.subscriptionId ?? 0,
    },
    {
      key: 'sellerCode',
      header: t('ui.memberships.table.sellerCode'),
      accessor: (row: MembershipResponse): string => row.sellerCode ?? '',
      sortValue: (row: MembershipResponse): string => row.sellerCode ?? '',
    },
    {
      key: 'status',
      header: t('ui.memberships.table.status'),
      accessor: (row: MembershipResponse): ReactElement => (
        <Badge tone={row.status === 'active' ? 'success' : 'neutral'} size="sm">
          {t('ui.memberships.status.' + (row.status ?? 'inactive'))}
        </Badge>
      ),
      sortValue: (row: MembershipResponse): string => row.status ?? '',
      filterOptions: [
        { value: 'active', label: t('ui.memberships.status.active') },
        { value: 'inactive', label: t('ui.memberships.status.inactive') },
      ],
    },
    {
      key: 'actions',
      header: t('ui.memberships.table.actions'),
      accessor: (row: MembershipResponse): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/memberships/${toTemplateString(row.id)}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-membership-${toTemplateString(row.id)}`}
          >
            {t('ui.memberships.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
