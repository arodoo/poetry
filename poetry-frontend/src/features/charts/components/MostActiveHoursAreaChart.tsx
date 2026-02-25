/*
 * File: MostActiveHoursAreaChart.tsx
 * Purpose: Visual rendering component decoupled to maintain exact line limits under 80lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function MostActiveHoursAreaChart({ chartData }: { chartData: { name: string; value: number }[] }): ReactElement {
    const tooltipStyle = { backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-divider)', color: 'var(--color-foreground)', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' };
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-divider)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={11} tickMargin={8} minTickGap={15} />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={{ color: 'var(--color-primary)', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" activeDot={{ r: 6, fill: 'var(--color-primary)', stroke: 'var(--color-surface)', strokeWidth: 2 }} />
            </AreaChart>
        </ResponsiveContainer>
    );
}
