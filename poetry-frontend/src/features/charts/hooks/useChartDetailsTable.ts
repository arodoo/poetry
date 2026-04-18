/*
 * File: useChartDetailsTable.ts
 * Purpose: Builds the DataTable configuration for the chart details page
 * in a theme and i18n aware way. Delegates key formatting and header
 * resolution to pure helpers to keep this hook concise.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo } from 'react'
import type { DashboardMetrics } from '../model/ChartsSchemas'
import {
  formatDetailKey,
  getDetailsHeaderKey,
  getDetailsHeaderValue,
} from './chartDetailsTableHelpers'

interface DetailsRow {
  key: string
  value: number
}

interface DetailsColumn {
  key: string
  header: string
  accessor: (row: DetailsRow) => string | number
}

interface DetailsTable {
  tableData: DetailsRow[]
  columns: DetailsColumn[]
}

export function useChartDetailsTable(
  data: DashboardMetrics | undefined,
  chartId: string | undefined,
  t: (key: string) => string
): DetailsTable {
  const tableData = useMemo<DetailsRow[]>(() => {
    if (!data || !chartId) return []
    const chartData = data[chartId as keyof DashboardMetrics]
    if (!chartData) return []
    return Object.entries(chartData as Record<string, unknown>).map(
      ([key, value]) => ({ key, value: Number(value) })
    )
  }, [data, chartId])

  const columns = useMemo<DetailsColumn[]>(
    () => [
      {
        key: 'key',
        header: getDetailsHeaderKey(chartId, t),
        accessor: (row: DetailsRow): string =>
          formatDetailKey(row.key, chartId, t),
      },
      {
        key: 'value',
        header: getDetailsHeaderValue(chartId, t),
        accessor: (row: DetailsRow): number => row.value,
      },
    ],
    [t, chartId]
  )

  return { tableData, columns }
}
