/*
 * File: ActiveDaysChart.tsx
 * Purpose: Bar chart comparing physical check-ins across weekdays,
 * mapping ISO day indices to localized weekday names. Rendered with
 * themed axes, grid and tooltip inside the shared ChartCard.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react'
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
import { CHART_TOKENS } from './shared/chartTheme'
import { AXIS_BASE, GRID_BASE, TOOLTIP_CURSOR } from './shared/chartAxisProps'
import { ChartCard } from './shared/ChartCard'
import { ChartTooltip } from './shared/ChartTooltip'

export function ActiveDaysChart({
  data,
}: {
  data: Record<string, number>
}): ReactElement {
  const t = useT()
  const chartData = useMemo(() => {
    const result: { name: string; value: number }[] = []
    for (let i = 1; i <= 7; i++) {
      const date = new Date(2024, 0, i)
      const name = new Intl.DateTimeFormat(undefined, {
        weekday: 'short',
      }).format(date)
      result.push({ name, value: data[i.toString()] ?? 0 })
    }
    return result
  }, [data])
  return (
    <ChartCard title={t('ui.charts.section.busiestDays')}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
        >
          <CartesianGrid {...GRID_BASE} />
          <XAxis dataKey="name" {...AXIS_BASE} />
          <YAxis {...AXIS_BASE} allowDecimals={false} />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="value"
            fill={CHART_TOKENS.primary}
            radius={[4, 4, 0, 0]}
            maxBarSize={44}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
