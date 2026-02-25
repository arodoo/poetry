/*
 * File: AccessLogTrendChart.tsx
 * Purpose: A line chart displaying the exact trend of physical access check-ins over the last 7 days. It parses the weekly check-in volume into a temporal graphical series. This provides administrators with active venue utilization tracking capabilities.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react';
import {
    Line,
    LineChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface AccessLogTrendChartProps {
    data: Record<string, number>;
}

export function AccessLogTrendChart({ data }: AccessLogTrendChartProps): ReactElement {
    const chartData = useMemo(() => {
        return Object.entries(data).map(([dateStr, count]) => {
            // dateStr is 'YYYY-MM-DD'
            const d = new Date(dateStr);
            const shortDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(d);
            return { name: shortDate, value: count, raw: dateStr };
        }).sort((a, b) => a.raw.localeCompare(b.raw));
    }, [data]);

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-[400px]">
            <h3 className="text-lg font-medium text-foreground mb-4">
                7-Day Trend
            </h3>
            <div className="h-full w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
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
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="var(--color-success)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--color-success)', r: 4 }}
                            activeDot={{ r: 6 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
