/*
 * File: ChartDetailsPage.tsx
 * Purpose: A page where users can view detailed information and tabular data for a specific chart. It consumes the dashboard metrics payload and selectively mounts specialized sub-dashboards based on the visual routing parameter. This allows rich drill-through investigations without bloating the main overview page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery'
import { Button, PageLayout, DataTable } from '../../../ui'
import { ChartRenderer } from '../components/ChartRenderer'
import { ActiveHoursDetailsView } from '../components/ActiveHoursDetailsView'
import { useChartDetailsTable } from '../hooks/useChartDetailsTable'

export function ChartDetailsPage(): ReactElement {
  const { chartId, locale } = useParams<{ chartId: string; locale: string }>()
  const t = useT()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useChartsMetricsQuery()

  const chartTitle = chartId
    ? t(`ui.charts.${chartId}`)
    : t('ui.route.charts.details')
  const { tableData, columns } = useChartDetailsTable(
    data,
    chartId,
    t as (key: string) => string
  )

  return (
    <PageLayout title={chartTitle}>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="secondary"
            onClick={() => {
              void navigate(`/${locale ?? 'en'}/charts`)
            }}
          >
            {t('ui.common.back')}
          </Button>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-[var(--color-text)]">
            {t('ui.common.loading')}
          </div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">
            {t('ui.common.error')}
          </div>
        ) : (
          <>
            {chartId === 'activeHours' && data ? (
              <ActiveHoursDetailsView data={data} />
            ) : data ? (
              <>
                <div className="w-full max-w-4xl mx-auto h-[400px]">
                  <ChartRenderer chartId={chartId} data={data} />
                </div>

                <div className="mt-8 bg-surface rounded-xl border border-divider shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-divider bg-surface-hover">
                    <h3 className="text-lg font-medium text-text">
                      {t('ui.charts.details.rawData')}
                    </h3>
                  </div>
                  <div className="p-0">
                    <DataTable
                      columns={columns}
                      data={tableData}
                      keyExtractor={(item: { key: string; value: number }) =>
                        item.key
                      }
                    />
                  </div>
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
    </PageLayout>
  )
}
