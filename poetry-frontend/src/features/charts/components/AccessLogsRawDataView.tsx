/*
 * File: AccessLogsRawDataView.tsx
 * Purpose: DataTable showing raw recent access-log entries using themed
 * tokens for the surrounding card. Column headers are sourced from the
 * i18n catalog so the table is fully localized.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { formatDateTime } from '../../../shared/utils/dateUtils'
import { DataTable } from '../../../ui'
import type { AccessLogRecord } from '../model/ChartsSchemas'

export function AccessLogsRawDataView({
  logs,
}: {
  logs: AccessLogRecord[]
}): ReactElement {
  const t = useT()
  const rows = logs
  const title = t('ui.charts.details.rawDataTop')
    .replace('{count}', '50')
  const columns = useMemo(
    () => [
      {
        key: 'id',
        header: t('ui.charts.details.id'),
        accessor: (row: AccessLogRecord): string => String(row.id),
      },
      {
        key: 'userName',
        header: t('ui.common.name'),
        accessor: (row: AccessLogRecord): string => row.userName,
      },
      {
        key: 'email',
        header: t('ui.common.email'),
        accessor: (row: AccessLogRecord): string => row.email,
      },
      {
        key: 'timestamp',
        header: t('ui.charts.details.time'),
        accessor: (row: AccessLogRecord): string =>
          formatDateTime(row.timestamp),
      },
    ],
    [t]
  )
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-background p-5">
        <h3 className="text-lg font-semibold text-text">{title}</h3>
      </div>
      <DataTable
        columns={columns}
        data={rows}
        keyExtractor={(item: AccessLogRecord): string => String(item.id)}
      />
    </div>
  )
}
