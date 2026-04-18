/*
 * File: MostActiveHoursChart.tsx
 * Purpose: Composite panel combining the active-hours AreaChart and the
 * Peak Hour / Busiest Day KPI tiles inside the shared ChartCard shell.
 * Keeps every label within the i18n catalog.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useT } from '../../../shared/i18n/useT'
import {
  computeActiveHoursData,
  computeActiveHoursKpis,
} from './mostActiveHoursUtils'
import { MostActiveHoursAreaChart } from './MostActiveHoursAreaChart'
import { ActiveHoursKpis } from './ActiveHoursKpis'
import { ChartCard } from './shared/ChartCard'

export function MostActiveHoursChart({
  data,
  daysData = {},
}: {
  data: Record<string, number>
  daysData?: Record<string, number>
}): ReactElement {
  const t = useT()
  const { locale } = useParams()
  const chartData = useMemo(
    () =>
      computeActiveHoursData(
        data,
        t('ui.charts.time.am'),
        t('ui.charts.time.pm')
      ),
    [data, t]
  )
  const kpis = useMemo(
    () => computeActiveHoursKpis(chartData, daysData, locale),
    [chartData, daysData, locale]
  )
  return (
    <ChartCard
      title={t('ui.charts.activeHours')}
      detailsId="activeHours"
    >
      <ActiveHoursKpis
        peakHourInfo={kpis.peakHourInfo}
        busiestDayInfo={kpis.busiestDayInfo}
      />
      <div className="min-h-[160px] flex-1">
        <MostActiveHoursAreaChart chartData={chartData} />
      </div>
    </ChartCard>
  )
}
