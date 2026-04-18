/*
 * File: ChartRawDataCard.tsx
 * Purpose: Themed card wrapping the detail page DataTable for a single
 * chart with a localized title and a theme-aware separator. Used by
 * ChartDetailsPage for the generic drill-through view.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { DataTable } from '../../../ui'

interface Column<T> {
  key: string
  header: string
  accessor: (row: T) => string | number
}

export function ChartRawDataCard<T extends { key: string }>({
  columns,
  data,
}: {
  columns: Column<T>[]
  data: T[]
}): ReactElement {
  const t = useT()
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="border-b border-border bg-background p-5">
        <h3 className="text-lg font-semibold text-text">
          {t('ui.charts.details.rawData')}
        </h3>
      </div>
      <DataTable
        columns={columns}
        data={data}
        keyExtractor={(item: T): string => item.key}
      />
    </div>
  )
}
