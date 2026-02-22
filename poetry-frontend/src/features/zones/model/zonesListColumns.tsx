/*
 * File: zonesListColumns.tsx
 * Purpose: Column definitions for the zones DataTable, with accessors for rendering zone name, description, manager, and action buttons. Provides type-safe, locale-aware table structure for consistent UI. Designed for extensibility and integration with admin features.
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
import { formatDate } from '../../../shared/utils/dateUtils'

export function buildZonesListColumns(
  locale: string,
  t: (key: I18nKey) => string
): readonly DataTableColumn<ZoneResponse>[] {
  return [
    {
      key: 'createdAt',
      header: t('ui.zones.columns.createdAt'),
      width: 'md',
      accessor: (item: ZoneResponse): string => formatDate(item.createdAt),
      sortValue: (item: ZoneResponse): string => item.createdAt ?? '',
    },
    {
      key: 'name',
      header: t('ui.zones.columns.id'),
      width: 'xs',
      accessor: (item: ZoneResponse) => String(item.id ?? '-'),
      sortValue: (item: ZoneResponse): string => item.name ?? '',
    },
    {
      key: 'description',
      header: t('ui.zones.columns.description'),
      width: 'xl',
      accessor: (item: ZoneResponse) => item.description ?? '-',
      sortValue: (item: ZoneResponse): string => item.description ?? '',
    },
    {
      key: 'status',
      header: t('ui.zones.columns.status'),
      width: 'sm',
      accessor: (item: ZoneResponse): ReactElement => {
        const status = (item.status ?? 'unknown').toLowerCase()
        const statusKey =
          status === 'active'
            ? 'ui.zones.status.active'
            : status === 'inactive'
              ? 'ui.zones.status.inactive'
              : 'ui.zones.status.unknown'
        return (
          <Badge tone={status === 'active' ? 'success' : 'neutral'} size="sm">
            {t(statusKey as any)}
          </Badge>
        )
      },
      sortValue: (row: ZoneResponse): string => row.status ?? '',
      filterOptions: [
        { value: 'active', label: t('ui.zones.status.active') },
        { value: 'inactive', label: t('ui.zones.status.inactive') },
      ],
    },
    {
      key: 'managerId',
      header: t('ui.zones.columns.manager'),
      width: 'md',
      accessor: (row: ZoneResponse): string =>
        toTemplateString(row.managerId ?? '-'),
      sortValue: (row: ZoneResponse): string =>
        toTemplateString(row.managerId ?? ''),
    },
    {
      key: 'actions',
      header: t('ui.zones.columns.actions'),
      width: 'sm',
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
