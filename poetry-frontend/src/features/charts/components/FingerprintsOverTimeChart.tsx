/*
 * File: FingerprintsOverTimeChart.tsx
 * Purpose: Vertical bar chart displaying fingerprint enrollments per
 * month, rendered inside the shared ChartCard with themed axes, grid,
 * tooltip and palette-driven primary fill.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useT } from '../../../shared/i18n/useT'
import { formatBarData } from './chartUtils'
import { pickColor } from './shared/chartTheme'
import { AXIS_BASE, GRID_BASE, TOOLTIP_CURSOR } from './shared/chartAxisProps'
import { ChartCard } from './shared/ChartCard'
import { ChartTooltip } from './shared/ChartTooltip'

export function FingerprintsOverTimeChart({
  data,
}: {
  data: Record<string, number> | undefined
}): ReactElement | null {
  const t = useT()
  if (!data) return null
  const chartData = formatBarData(data, 'month', 'enrollments')
  return (
    <ChartCard
      title={t('ui.charts.enrollmentsOverTime')}
      detailsId="enrollmentsOverTime"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} />
          <XAxis dataKey="month" {...AXIS_BASE} />
          <YAxis {...AXIS_BASE} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="enrollments"
            fill={pickColor(0)}
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
