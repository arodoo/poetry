/*
 * File: SubscriptionsByDurationChart.tsx
 * Purpose: Vertical bar chart displaying number of subscriptions per
 * duration bucket using the shared ChartCard, themed axes, grid and
 * a palette-driven warning-colored fill.
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

export function SubscriptionsByDurationChart({
  data,
}: {
  data: Record<string, number> | undefined
}): ReactElement | null {
  const t = useT()
  if (!data) return null
  const chartData = formatBarData(data, 'duration', 'count')
  return (
    <ChartCard
      title={t('ui.charts.subscriptionsByDuration')}
      detailsId="subscriptionsByDuration"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} />
          <XAxis dataKey="duration" {...AXIS_BASE} />
          <YAxis {...AXIS_BASE} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="count"
            fill={pickColor(2)}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
