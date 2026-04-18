/*
 * File: AccessLogsRawDataView.tsx
 * Purpose: DataTable showing raw recent access-log entries using themed
 * tokens for the surrounding card. Column headers are sourced from the
 * i18n catalog so the table is fully localized.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { DataTable } from '../../../ui'

interface LogRow {
  id: number | string
  userName: string
  email: string
  timestamp: string
}

export function AccessLogsRawDataView({
  logs,
}: {
  logs: unknown[]
}): ReactElement {
  const t = useT()
  const rows = logs as LogRow[]
  const title = t('ui.charts.details.rawDataTop').replace('{count}', '50')
  const columns = useMemo(
    () => [
      {
        key: 'id',
        header: t('ui.charts.details.id'),
        accessor: (row: LogRow): string => String(row.id),
      },
      {
        key: 'userName',
        header: t('ui.common.name'),
        accessor: (row: LogRow): string => row.userName,
      },
      {
        key: 'email',
        header: t('ui.common.email'),
        accessor: (row: LogRow): string => row.email,
      },
      {
        key: 'timestamp',
        header: t('ui.charts.details.time'),
        accessor: (row: LogRow): string =>
          new Date(row.timestamp).toLocaleString(),
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
        keyExtractor={(item: LogRow): string => String(item.id)}
      />
    </div>
  )
}
