/*
 * File: useChartDetailsTable.ts
 * Purpose: Extracts the DataTable configuration for ChartDetailsPage to keep the main component under 80 lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo } from 'react'
import type { DashboardMetrics } from '../model/ChartsSchemas'

export function useChartDetailsTable(
  data: DashboardMetrics | undefined,
  chartId: string | undefined,
  t: (key: string) => string
) {
  const tableData = useMemo(() => {
    if (!data || !chartId) return []
    const chartData = data[chartId as keyof DashboardMetrics]
    if (!chartData) return []
    return Object.entries(chartData as Record<string, unknown>).map(
      ([key, value]) => ({ key, value: Number(value) })
    )
  }, [data, chartId])

  const columns = useMemo(() => {
    const formatKey = (key: string, chartIdLocal?: string): string => {
      if (chartIdLocal === 'activeHours') {
        const hour = parseInt(key, 10)
        if (isNaN(hour)) return key
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const h12 = hour % 12 === 0 ? 12 : hour % 12
        return `${String(h12)}:00 ${ampm}`
      }
      if (chartIdLocal === 'birthdaysThisMonth')
        return t('ui.charts.details.birthdays')
      if (chartIdLocal === 'eventsByType') return t(`ui.charts.events.${key}`)
      return key
    }

    const getHeaderKey = (chartIdLocal?: string): string => {
      switch (chartIdLocal) {
        case 'activeHours':
          return t('ui.charts.details.time')
        case 'populatedRegions':
          return t('ui.charts.details.region')
        case 'birthdaysThisMonth':
          return t('ui.charts.details.month')
        default:
          return t('ui.charts.details.key')
      }
    }

    const getHeaderValue = (chartIdLocal?: string): string => {
      switch (chartIdLocal) {
        case 'activeHours':
          return t('ui.charts.details.checkIns')
        case 'populatedRegions':
          return t('ui.charts.details.users')
        case 'birthdaysThisMonth':
          return t('ui.charts.details.total')
        default:
          return t('ui.charts.details.value')
      }
    }

    return [
      {
        key: 'key',
        header: getHeaderKey(chartId),
        accessor: (row: { key: string; value: number }) =>
          formatKey(row.key, chartId),
      },
      {
        key: 'value',
        header: getHeaderValue(chartId),
        accessor: (row: { key: string; value: number }) => row.value,
      },
    ]
  }, [t, chartId])

  return { tableData, columns }
}
