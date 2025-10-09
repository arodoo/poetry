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

export function buildSellerCodesListColumns(
  locale: string,
  t: (key: string) => string
): readonly DataTableColumn<SellerCodeSummary>[] {
  return [
    {
      key: 'code',
      header: t('ui.sellerCodes.table.code'),
      accessor: (row: SellerCodeSummary): string => row.code ?? '',
    },
    {
      key: 'status',
      header: t('ui.sellerCodes.table.status'),
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
          {t(`ui.sellerCodes.status.${row.status}`)}
        </Badge>
      ),
    },
    {
      key: 'organizationId',
      header: t('ui.sellerCodes.table.organization'),
      accessor: (row: SellerCodeSummary): string => row.organizationId ?? '-',
    },
    {
      key: 'actions',
      header: t('ui.sellerCodes.table.actions'),
      accessor: (row: SellerCodeSummary): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/seller-codes/${row.id}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-seller-code-${row.id}`}
          >
            {t('ui.sellerCodes.actions.view')}
          </Button>
          <Button
            to={`/${locale}/seller-codes/edit/${row.id}`}
            size="sm"
            width="fixed-small"
            variant="secondary"
            textTone="primary"
            data-testid={`edit-seller-code-${row.id}`}
          >
            {t('ui.sellerCodes.actions.edit')}
          </Button>
          <Button
            to={`/${locale}/seller-codes/${row.id}/delete`}
            size="sm"
            width="fixed-small"
            variant="danger"
            data-testid={`delete-seller-code-${row.id}`}
          >
            {t('ui.sellerCodes.actions.delete')}
          </Button>
        </Inline>
      ),
    },
  ]
}
