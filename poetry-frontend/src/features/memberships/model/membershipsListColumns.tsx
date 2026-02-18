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
      key: 'userName',
      header: t('ui.memberships.columns.user'),
      width: 'md',
      accessor: (row: MembershipResponse): string => row.userName ?? '-',
      sortValue: (row: MembershipResponse): string => row.userName ?? '',
    },
    {
      key: 'subscriptionName',
      header: t('ui.memberships.columns.subscription'),
      width: 'md',
      accessor: (row: MembershipResponse): string => row.subscriptionName ?? '-',
      sortValue: (row: MembershipResponse): string => row.subscriptionName ?? '',
    },
    {
      key: 'sellerName',
      header: t('ui.memberships.columns.seller'),
      width: 'md',
      accessor: (row: MembershipResponse): string => row.sellerName ?? '-',
      sortValue: (row: MembershipResponse): string => row.sellerName ?? '',
    },
    {
      key: 'status',
      header: t('ui.memberships.columns.status'),
      width: 'sm',
      accessor: (m: MembershipResponse): ReactElement => (
        <Badge
          tone={m.status?.toLowerCase() === 'active' ? 'success' : 'neutral'}
          size="sm"
        >
          {t('ui.memberships.status.' + (m.status?.toLowerCase() ?? 'inactive'))}
        </Badge>
      ),
      sortValue: (row: MembershipResponse): string => row.status ?? '',
      filterOptions: [
        { value: 'ACTIVE', label: t('ui.memberships.status.active') },
        { value: 'INACTIVE', label: t('ui.memberships.status.inactive') },
      ],
    },
    {
      key: 'createdAt',
      header: t('ui.memberships.columns.createdAt'),
      width: 'md',
      accessor: (m: MembershipResponse): string =>
        m.createdAt ? new Date(m.createdAt).toLocaleDateString(locale) : '-',
      sortValue: (row: MembershipResponse): string => row.createdAt ?? '',
    },
    {
      key: 'actions',
      header: t('ui.memberships.columns.actions'),
      width: 'sm',
      accessor: (m: MembershipResponse): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/memberships/${toTemplateString(m.id)}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-membership-${toTemplateString(m.id)}`}
          >
            {t('ui.memberships.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
