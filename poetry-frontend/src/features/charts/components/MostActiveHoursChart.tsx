/*
 * File: MostActiveHoursChart.tsx
 * Purpose: Presentational chart for most active hours based on events.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import {
    Line,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { formatBarData } from './chartUtils';
import { Button } from '../../../ui';
import { useNavigate, useParams } from 'react-router-dom';

interface MostActiveHoursChartProps {
    data: Record<string, number>;
}

export function MostActiveHoursChart({
    data,
}: MostActiveHoursChartProps): ReactElement {
    const t = useT();
    const { locale } = useParams();
  const navigate = useNavigate();
    const chartData = formatBarData(data);

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-[350px]">
            <h3 className="text-lg font-medium text-foreground mb-4">
                {t('ui.charts.activeHours')}
            </h3>
            <div className="h-64 w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-divider)" />
                        <XAxis dataKey="name" stroke="var(--color-text-muted)" />
                        <YAxis stroke="var(--color-text-muted)" allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-divider)',
                                color: 'var(--color-foreground)',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="var(--color-secondary)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-secondary)', r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/activeHours`); }}>
                    {t('ui.charts.viewMore')}
                </Button>
            </div>
        </div>
    );
}
