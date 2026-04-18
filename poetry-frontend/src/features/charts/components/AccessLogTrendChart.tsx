/*
 * File: AccessLogTrendChart.tsx
 * Purpose: Line chart rendering the check-ins trend for the last 7 days
 * inside the shared ChartCard with themed axes, grid and tooltip.
 * Uses the success token to denote positive engagement.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react'
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useT } from '../../../shared/i18n/useT'
import { CHART_TOKENS } from './shared/chartTheme'
import { AXIS_BASE, GRID_BASE } from './shared/chartAxisProps'
import { ChartCard } from './shared/ChartCard'
import { ChartTooltip } from './shared/ChartTooltip'

export function AccessLogTrendChart({
  data,
}: {
  data: Record<string, number>
}): ReactElement {
  const t = useT()
  const chartData = useMemo(() => {
    return Object.entries(data)
      .map(([dateStr, count]) => {
        const d = new Date(dateStr)
        const shortDate = new Intl.DateTimeFormat(undefined, {
          month: 'short',
          day: 'numeric',
        }).format(d)
        return { name: shortDate, value: count, raw: dateStr }
      })
      .sort((a, b) => a.raw.localeCompare(b.raw))
  }, [data])
  return (
    <ChartCard title={t('ui.charts.section.sevenDayTrend')}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} />
          <XAxis dataKey="name" {...AXIS_BASE} />
          <YAxis {...AXIS_BASE} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={CHART_TOKENS.success}
            strokeWidth={3}
            dot={{ fill: CHART_TOKENS.success, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
