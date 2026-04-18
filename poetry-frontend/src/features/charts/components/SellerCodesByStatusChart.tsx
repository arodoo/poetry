/*
 * File: SellerCodesByStatusChart.tsx
 * Purpose: Donut chart showing seller codes grouped by status, rendered
 * within the shared ChartCard with themed tooltip and palette rotation.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useT } from '../../../shared/i18n/useT'
import { formatPieData } from './chartUtils'
import { pickColor, CHART_TOKENS } from './shared/chartTheme'
import { ChartCard } from './shared/ChartCard'
import { ChartTooltip } from './shared/ChartTooltip'

export function SellerCodesByStatusChart({
  data,
}: {
  data: Record<string, number> | undefined
}): ReactElement | null {
  const t = useT()
  if (!data) return null
  const chartData = formatPieData(data).map((entry, index) => ({
    ...entry,
    fill: pickColor(index, 7),
  }))
  return (
    <ChartCard
      title={t('ui.charts.sellerCodesByStatus')}
      detailsId="sellerCodesByStatus"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            stroke={CHART_TOKENS.surface}
            strokeWidth={2}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={28}
            wrapperStyle={{ fontSize: 12, color: CHART_TOKENS.text }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
