/*
 * File: ActiveDaysChart.tsx
 * Purpose: A Bar chart comparing physical check-ins across the 7 days of the week. It maps raw database day indices to localized weekday names for the UI. It helps visualize which days of the week are historically the busiest for staffing configurations.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

interface ActiveDaysChartProps {
    data: Record<string, number>;
}

export function ActiveDaysChart({ data }: ActiveDaysChartProps): ReactElement {
    const chartData = useMemo(() => {
        const result = [];
        // 1 = Monday, 7 = Sunday
        for (let i = 1; i <= 7; i++) {
            const date = new Date(2024, 0, i); // 2024-01-01 was Monday
            const name = new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(date);
            const val = data[i.toString()] ?? 0;
            result.push({ name, value: val });
        }
        return result;
    }, [data]);

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-[400px]">
            <h3 className="text-lg font-medium text-foreground mb-4">
                Busiest Days
            </h3>
            <div className="h-full w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-divider)" vertical={false} />
                        <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={11} tickMargin={8} />
                        <YAxis stroke="var(--color-text-muted)" fontSize={11} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-divider)',
                                color: 'var(--color-foreground)',
                                borderRadius: '8px',
                            }}
                            cursor={{ fill: 'var(--color-surface-hover)' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="var(--color-primary)" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
