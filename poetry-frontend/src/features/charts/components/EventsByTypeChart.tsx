/*
 * File: EventsByTypeChart.tsx
 * Purpose: Bar chart showing audit events grouped by type.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CHART_COLORS, formatBarData } from './chartUtils';
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../ui';

export function EventsByTypeChart({ data }: { data: Record<string, number> | undefined }): ReactElement | null {
  const t = useT();
  const { locale } = useParams();
  const navigate = useNavigate();
  if (!data) return null;
  const chartData = formatBarData(data, 'type', 'count');

  return (
    <div className="flex h-full flex-col rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
        {t('ui.charts.eventsByType')}
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--color-divider)" />
            <XAxis type="number" tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="type" type="category" width={80} tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: 'var(--color-divider)', opacity: 0.2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="count" fill={CHART_COLORS[6]} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/eventsByType`); }}>
          {t('ui.charts.viewMore')}
        </Button>
      </div>
    </div>
  );
}
