/*
 * zonesListColumns.tsx
 * Column definitions for zones DataTable with accessors for
 * rendering zone name description manager and action buttons.
 * Provides type-safe locale-aware table structure.
 * © 2025 Poetry Platform. All rights reserved.
 */

import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { ZoneResponse } from '../model/ZonesSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'

export function buildZonesListColumns(
  locale: string,
  t: (key: I18nKey) => string
): readonly DataTableColumn<ZoneResponse>[] {
  return [
    {
      key: 'name',
      header: t('ui.zones.table.name'),
      accessor: (row: ZoneResponse): string => row.name ?? '',
    },
    {
      key: 'description',
      header: t('ui.zones.table.description'),
      accessor: (row: ZoneResponse): string => row.description ?? '-',
    },
    {
      key: 'managerId',
      header: t('ui.zones.table.manager'),
      accessor: (row: ZoneResponse): string =>
        String(row.managerId ?? '-'),
    },
    {
      key: 'actions',
      header: t('ui.zones.table.actions'),
      accessor: (row: ZoneResponse): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/zones/${row.id}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-zone-${row.id}`}
          >
            {t('ui.zones.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
