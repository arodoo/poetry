/*
 * File: ThemeUsageChart.tsx
 * Purpose: Bar chart showing the distribution of theme usage among users.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS, formatBarData } from './chartUtils';
import { useT } from '../../../shared/i18n/useT';

export function ThemeUsageChart({ data }: { data: Record<string, number> | undefined }) {
  const t = useT();
  if (!data) return null;
  const chartData = formatBarData(data, 'theme', 'users');

  return (
    <div className="flex h-80 flex-col rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
        {t('ui.charts.themeUsage')}
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-divider)" />
            <XAxis dataKey="theme" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'var(--color-divider)', opacity: 0.4 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="users" fill={CHART_COLORS[9]} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
