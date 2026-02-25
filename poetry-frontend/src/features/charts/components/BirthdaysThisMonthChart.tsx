/*
 * File: BirthdaysThisMonthChart.tsx
 * Purpose: Presentational chart for birthdays this month.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { formatBarData } from './chartUtils';
import { Button } from '../../../ui';
import { useNavigate, useParams } from 'react-router-dom';

interface BirthdaysThisMonthChartProps {
    data: Record<string, number>;
}

export function BirthdaysThisMonthChart({
    data,
}: BirthdaysThisMonthChartProps): ReactElement {
    const t = useT();
    const { locale } = useParams();
  const navigate = useNavigate();
    const chartData = formatBarData(data);

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-full">
            <h3 className="text-lg font-medium text-foreground mb-4">
                {t('ui.charts.birthdaysThisMonth')}
            </h3>
            <div className="h-64 w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
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
                        <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/birthdaysThisMonth`); }}>
                    {t('ui.charts.viewMore')}
                </Button>
            </div>
        </div>
    );
}
