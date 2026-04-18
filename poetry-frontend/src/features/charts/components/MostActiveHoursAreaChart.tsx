/*
 * File: MostActiveHoursAreaChart.tsx
 * Purpose: Inner recharts AreaChart for the active-hours panel.
 * Draws a gradient-filled primary area with a themed tooltip and axes.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_TOKENS } from './shared/chartTheme'
import { AXIS_BASE, GRID_BASE } from './shared/chartAxisProps'
import { ChartTooltip } from './shared/ChartTooltip'
import type { HourPoint } from './mostActiveHoursUtils'

export function MostActiveHoursAreaChart({
  chartData,
}: {
  chartData: HourPoint[]
}): ReactElement {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{ top: 5, right: 4, left: -18, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor={CHART_TOKENS.primary}
              stopOpacity={0.45}
            />
            <stop
              offset="95%"
              stopColor={CHART_TOKENS.primary}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <CartesianGrid {...GRID_BASE} />
        <XAxis
          dataKey="name"
          {...AXIS_BASE}
          tickMargin={8}
          minTickGap={15}
        />
        <YAxis allowDecimals={false} {...AXIS_BASE} />
        <Tooltip content={<ChartTooltip />} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={CHART_TOKENS.primary}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorActive)"
          activeDot={{
            r: 5,
            fill: CHART_TOKENS.primary,
            stroke: CHART_TOKENS.surface,
            strokeWidth: 2,
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
