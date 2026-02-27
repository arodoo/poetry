/*
 * File: MostPopulatedRegionsChart.tsx
 * Purpose: Presentational chart for populated regions (zones).
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import {
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';
import { formatPieData, CHART_COLORS } from './chartUtils';
import { Button } from '../../../ui';
import { useNavigate, useParams } from 'react-router-dom';

interface MostPopulatedRegionsChartProps {
    data: Record<string, number>;
}

export function MostPopulatedRegionsChart({
    data,
}: MostPopulatedRegionsChartProps): ReactElement {
    const t = useT();
    const { locale } = useParams();
    const navigate = useNavigate();

    const chartData = formatPieData(data).map((entry: { name: string; value: number }, index: number) => ({ 
        ...entry, 
        fill: CHART_COLORS[index % CHART_COLORS.length] ?? '#8884d8' 
    }));

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-full">
            <h3 className="text-lg font-medium text-foreground mb-4">
                {t('ui.charts.populatedRegions')}
            </h3>
            <div className="h-64 w-full flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                         />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-surface)',
                                borderColor: 'var(--color-divider)',
                                color: 'var(--color-foreground)',
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/populatedRegions`); }}>
                    {t('ui.charts.viewMore')}
                </Button>
            </div>
        </div>
    );
}
