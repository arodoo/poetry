/*
 * File: ChartsPage.tsx
 * Purpose: Main container page rendering the dashboard charts grid.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useT } from '../../../shared/i18n/useT'
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery'
import { ChartsGrid } from '../components/grid/ChartsGrid'
import type { ReactElement } from 'react'

export function ChartsPage(): ReactElement {
  const t = useT()
  const { data, isLoading, isError } = useChartsMetricsQuery()

  if (isLoading) {
    return (
      <div className="p-8 text-center text-text">
        {t('ui.common.loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-error">{t('ui.common.error')}</div>
    )
  }

  return (
    <main className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl font-bold text-text">
        {t('ui.route.charts.title')}
      </h1>
      <ChartsGrid data={data} />
    </main>
  )
}
