/*
 * File: MembershipsByStatusChart.tsx
 * Purpose: Pie chart representing memberships grouped by status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CHART_COLORS, formatPieData } from './chartUtils';
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../../ui';

export function MembershipsByStatusChart({ data }: { data: Record<string, number> | undefined }): ReactElement | null {
  const t = useT();
  const { locale } = useParams();
  const navigate = useNavigate();
  if (!data) return null;
  const chartData = formatPieData(data).map((entry, index) => ({ ...entry, fill: CHART_COLORS[(index + 2) % CHART_COLORS.length] ?? '#8884d8' }));

  return (
    <div className="flex h-[350px] flex-col rounded-xl border border-[var(--color-divider)] bg-[var(--color-surface)] p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
        {t('ui.charts.membershipsByStatus')}
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/membershipsByStatus`); }}>
          {t('ui.charts.viewMore')}
        </Button>
      </div>
    </div>
  );
}
