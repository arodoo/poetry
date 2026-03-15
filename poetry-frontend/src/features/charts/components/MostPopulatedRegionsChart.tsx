/*
 * File: MostPopulatedRegionsChart.tsx
 * Purpose: Horizontal bar chart for populated regions (zones).
 * Bars work better than pie slices for varied zone names.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useT } from '../../../shared/i18n/useT'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatBarData, CHART_COLORS } from './chartUtils'
import { Button } from '../../../ui'
import { useNavigate, useParams } from 'react-router-dom'

interface MostPopulatedRegionsChartProps {
  data: Record<string, number>
}

export function MostPopulatedRegionsChart({
  data,
}: MostPopulatedRegionsChartProps): ReactElement {
  const t = useT()
  const { locale } = useParams()
  const navigate = useNavigate()

  const chartData = formatBarData(data, 'region', 'count')

  return (
    <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-full">
      <h3 className="text-lg font-medium text-foreground mb-4">
        {t('ui.charts.populatedRegions')}
      </h3>
      <div className="h-64 w-full flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 20, right: 20 }}
          >
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="region"
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-divider)',
                color: 'var(--color-foreground)',
              }}
            />
            <Bar
              dataKey="count"
              fill={CHART_COLORS[0]}
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            void navigate(
              `/${locale ?? 'en'}/charts/details/populatedRegions`
            )
          }}
        >
          {t('ui.charts.viewMore')}
        </Button>
      </div>
    </div>
  )
}
