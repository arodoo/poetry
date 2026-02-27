/*
 * File: MostActiveHoursChart.tsx
 * Purpose: Advanced AreaChart for active access hours, surfacing Peak Hour and Busiest Day KPIs. It visually aggregates standard activity time series data into layered gradient curves. This offers at-a-glance insight into the most optimal operational hours for the venue.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import { Button } from '../../../ui';
import { useNavigate, useParams } from 'react-router-dom';
import { computeActiveHoursData, computeActiveHoursKpis } from './mostActiveHoursUtils';
import { MostActiveHoursAreaChart } from './MostActiveHoursAreaChart';

interface MostActiveHoursChartProps {
    data: Record<string, number>;
    daysData?: Record<string, number>;
}

export function MostActiveHoursChart({
    data,
    daysData = {},
}: MostActiveHoursChartProps): ReactElement {
    const t = useT();
    const { locale } = useParams();
    const navigate = useNavigate();

    const chartData = useMemo(() => computeActiveHoursData(data), [data]);
    const { peakHourInfo, busiestDayInfo } = useMemo(
        () => computeActiveHoursKpis(chartData, daysData, locale),
        [chartData, daysData, locale]
    );

    return (
        <div className="bg-surface rounded-lg shadow-sm p-4 border border-divider flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-foreground">
                    {t('ui.charts.activeHours')}
                </h3>
            </div>
            
            {/* KPI Toolbar */}
            <div className="flex gap-4 mb-4">
                <div className="bg-surface-hover px-3 py-2 rounded border border-divider flex-1">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Peak Hour</p>
                    <p className="text-sm font-medium text-primary mt-1 truncate">{peakHourInfo}</p>
                </div>
                <div className="bg-surface-hover px-3 py-2 rounded border border-divider flex-1">
                    <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Busiest Day</p>
                    <p className="text-sm font-medium text-primary mt-1 truncate">{busiestDayInfo}</p>
                </div>
            </div>

            <div className="h-48 w-full flex-grow">
                <MostActiveHoursAreaChart chartData={chartData} />
            </div>
            <div className="mt-4 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => { void navigate(`/${locale ?? 'en'}/charts/details/activeHours`); }}>
                    {t('ui.charts.viewMore')}
                </Button>
            </div>
        </div>
    );
}
