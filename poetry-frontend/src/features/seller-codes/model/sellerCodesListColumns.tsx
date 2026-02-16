/*
 * File: sellerCodesListColumns.tsx
 * Purpose: DataTable column definitions for SellerCodesListPage.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { SellerCodeSummary } from '../model/SellerCodesSchemas'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export function buildSellerCodesListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<SellerCodeSummary>[] {
  return [
    {
      key: 'createdAt',
      header: t('ui.sellerCodes.columns.createdAt'),
      width: 'md',
      accessor: (row: SellerCodeSummary): string =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString(locale)
          : '-',
      sortValue: (row: SellerCodeSummary): string => row.createdAt ?? '',
    },
    {
      key: 'code',
      header: t('ui.sellerCodes.columns.id'),
      width: 'xs',
      accessor: (row: SellerCodeSummary): string =>
        row.code ?? '',
      sortValue: (row: SellerCodeSummary): string =>
        row.code ?? '',
    },
    {
      key: 'status',
      header: t('ui.sellerCodes.columns.status'),
      width: 'sm',
      accessor: (row: SellerCodeSummary): ReactElement => (
        <Badge
          tone={
            row.status === 'active'
              ? 'success'
              : row.status === 'inactive'
                ? 'neutral'
                : 'danger'
          }
          size="sm"
        >
          {t('ui.sellerCodes.status.' + (row.status ?? 'inactive'))}
        </Badge>
      ),
      sortValue: (row: SellerCodeSummary): string => row.status ?? '',
      filterOptions: [
        { value: 'active', label: t('ui.sellerCodes.status.active') },
        { value: 'inactive', label: t('ui.sellerCodes.status.inactive') },
      ],
    },
    {
      key: 'organizationId',
      header: t('ui.sellerCodes.columns.assignedTo'),
      width: 'lg',
      accessor: (row: SellerCodeSummary): string => row.organizationId ?? '-',
      sortValue: (row: SellerCodeSummary): string => row.organizationId ?? '',
    },
    {
      key: 'actions',
      header: t('ui.sellerCodes.table.actions'),
      width: 'sm',
      accessor: (row: SellerCodeSummary): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/seller-codes/${toTemplateString(row.id)}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-seller-code-${toTemplateString(row.id)}`}
          >
            {t('ui.sellerCodes.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
