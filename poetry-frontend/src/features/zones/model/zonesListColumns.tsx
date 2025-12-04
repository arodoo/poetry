/*
 * File: zonesListColumns.tsx
 * Purpose: Column definitions for zones DataTable.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Badge } from '../../../ui/Badge/Badge'
import { Inline } from '../../../ui/Inline/Inline'
import type { DataTableColumn } from '../../../ui/DataTable/DataTable'
import type { ZoneResponse } from '../model/ZonesSchemas'
import type { I18nKey } from '../../../shared/i18n/generated/keys'
import { toTemplateString } from '../../../shared/utils/templateSafe'

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
      key: 'status',
      header: t('ui.zones.table.status'),
      accessor: (row: ZoneResponse): ReactElement => {
        const statusKey =
          row.status === 'active'
            ? 'ui.zones.status.active'
            : row.status === 'inactive'
              ? 'ui.zones.status.inactive'
              : 'ui.zones.status.unknown'
        return (
          <Badge
            tone={row.status === 'active' ? 'success' : 'neutral'}
            size="sm"
          >
            {t(statusKey)}
          </Badge>
        )
      },
    },
    {
      key: 'managerId',
      header: t('ui.zones.table.manager'),
      accessor: (row: ZoneResponse): string =>
        toTemplateString(row.managerId ?? '-'),
    },
    {
      key: 'actions',
      header: t('ui.zones.table.actions'),
      accessor: (row: ZoneResponse): ReactElement => (
        <Inline gap="xs">
          <Button
            to={`/${locale}/zones/${toTemplateString(row.id)}`}
            size="sm"
            width="fixed-small"
            data-testid={`view-zone-${toTemplateString(row.id)}`}
          >
            {t('ui.zones.actions.view')}
          </Button>
        </Inline>
      ),
    },
  ]
}
