/*
 * File: UsersByStatusChart.tsx
 * Purpose: Pie chart component displaying users grouped by their status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CHART_COLORS, formatPieData } from './chartUtils';
import { useT } from '../../../shared/i18n/useT';

export function UsersByStatusChart({ data }: { data: Record<string, number> | undefined }) {
  const t = useT();
  if (!data) return null;
  const chartData = formatPieData(data);

  return (
    <div className="flex h-80 flex-col rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
        {t('ui.charts.usersByStatus')}
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length] as string} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
