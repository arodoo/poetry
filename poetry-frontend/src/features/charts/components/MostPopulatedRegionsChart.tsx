/*
 * File: MostPopulatedRegionsChart.tsx
 * Purpose: Horizontal bar chart for populated regions, rendered inside
 * the shared ChartCard with themed axes and palette-driven fill.
 * Bars stay legible across every theme via runtime CSS variables.
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

export function MostPopulatedRegionsChart({
  data,
}: {
  data: Record<string, number>
}): ReactElement {
  const t = useT()
  const chartData = formatBarData(data, 'region', 'count')
  return (
    <ChartCard
      title={t('ui.charts.populatedRegions')}
      detailsId="populatedRegions"
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
            type="category"
            dataKey="region"
            width={100}
            {...AXIS_BASE}
          />
          <Tooltip content={<ChartTooltip />} cursor={TOOLTIP_CURSOR} />
          <Bar
            dataKey="count"
            fill={pickColor(0)}
            radius={[0, 4, 4, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
