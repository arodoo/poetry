/*
 * File: ChartDetailsPage.tsx
 * Purpose: Drill-through page for a single chart. Renders loading/error
 * states inside PageLayout, and the chart plus its raw-data table using
 * only themed tokens so every theme ships consistent contrast.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery'
import { Button, PageLayout } from '../../../ui'
import { ChartRenderer } from '../components/ChartRenderer'
import { ActiveHoursDetailsView } from '../components/ActiveHoursDetailsView'
import { ChartRawDataCard } from '../components/ChartRawDataCard'
import { useChartDetailsTable } from '../hooks/useChartDetailsTable'

export function ChartDetailsPage(): ReactElement {
  const { chartId, locale } = useParams<{ chartId: string; locale: string }>()
  const t = useT()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useChartsMetricsQuery()
  const title = chartId ? t(`ui.charts.${chartId}`) : t('ui.route.charts.details')
  const table = useChartDetailsTable(
    data,
    chartId,
    t as (key: string) => string
  )
  return (
    <PageLayout title={title}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            onClick={(): void => {
              void navigate(`/${locale ?? 'en'}/charts`)
            }}
          >
            {t('ui.common.back')}
          </Button>
        </div>
        {isLoading ? (
          <div className="p-8 text-center text-text">
            {t('ui.common.loading')}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-error">
            {t('ui.common.error')}
          </div>
        ) : chartId === 'activeHours' && data ? (
          <ActiveHoursDetailsView data={data} />
        ) : data ? (
          <>
            <div className="mx-auto h-[420px] w-full max-w-4xl">
              <ChartRenderer chartId={chartId} data={data} />
            </div>
            <ChartRawDataCard columns={table.columns} data={table.tableData} />
          </>
        ) : null}
      </div>
    </PageLayout>
  )
}
