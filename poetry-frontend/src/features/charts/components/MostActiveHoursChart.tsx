/*
 * File: MostActiveHoursChart.tsx
 * Purpose: Presentational chart for most active hours based on events.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react';
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

    const chartData = useMemo(() => {
        if (!data) return [];
        const tzOffsetHours = Math.floor(new Date().getTimezoneOffset() / 60);
        const hoursMap = new Map<number, number>();
        
        for (let i = 0; i < 24; i++) hoursMap.set(i, 0);

        Object.entries(data).forEach(([hourStr, count]) => {
            const utcHour = parseInt(hourStr, 10);
            if (!isNaN(utcHour)) {
                let localHour = (utcHour - tzOffsetHours) % 24;
                if (localHour < 0) localHour += 24;
                hoursMap.set(localHour, (hoursMap.get(localHour) ?? 0) + count);
            }
        });

        const result = [];
        for (let i = 0; i < 24; i++) {
            const ampm = i >= 12 ? 'PM' : 'AM';
            const h12 = i % 12 === 0 ? 12 : i % 12;
            result.push({ name: `${h12}:00 ${ampm}`, value: hoursMap.get(i) ?? 0 });
        }
        return result;
    }, [data]);

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
