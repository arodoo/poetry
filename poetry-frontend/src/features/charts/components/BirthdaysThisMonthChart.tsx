/*
 * File: BirthdaysThisMonthChart.tsx
 * Purpose: Vertical bar chart for birthdays this month, using shared
 * ChartCard shell, themed axes/grid and a themed tooltip. Renders the
 * primary accent bar on top of the neutral background grid.
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
import { CHART_TOKENS } from './shared/chartTheme'
import { AXIS_BASE, GRID_BASE, TOOLTIP_CURSOR } from './shared/chartAxisProps'
import { ChartCard } from './shared/ChartCard'
import { ChartTooltip } from './shared/ChartTooltip'

export function BirthdaysThisMonthChart({
  data,
}: {
  data: Record<string, number>
}): ReactElement {
  const t = useT()
  const chartData = formatBarData(data)
  return (
    <ChartCard
      title={t('ui.charts.birthdaysThisMonth')}
      detailsId="birthdaysThisMonth"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} />
          <XAxis dataKey="name" {...AXIS_BASE} />
          <YAxis allowDecimals={false} {...AXIS_BASE} />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="value"
            fill={CHART_TOKENS.primary}
            radius={[4, 4, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
