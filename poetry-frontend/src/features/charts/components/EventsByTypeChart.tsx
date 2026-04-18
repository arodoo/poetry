/*
 * File: EventsByTypeChart.tsx
 * Purpose: Horizontal bar chart for audit events grouped by type,
 * rendered inside the shared ChartCard with themed axes, grid and a
 * palette-driven informational fill.
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

export function EventsByTypeChart({
  data,
}: {
  data: Record<string, number> | undefined
}): ReactElement | null {
  const t = useT()
  if (!data) return null
  const translated = Object.fromEntries(
    Object.entries(data).map(([k, v]) => [t(`ui.charts.events.${k}`), v])
  )
  const chartData = formatBarData(translated, 'type', 'count')
  return (
    <ChartCard
      title={t('ui.charts.eventsByType')}
      detailsId="eventsByType"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 4, right: 12, left: 8, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} vertical horizontal={false} />
          <XAxis type="number" {...AXIS_BASE} allowDecimals={false} />
          <YAxis
            dataKey="type"
            type="category"
            width={110}
            {...AXIS_BASE}
          />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="count"
            fill={pickColor(3)}
            radius={[0, 4, 4, 0]}
            maxBarSize={22}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
