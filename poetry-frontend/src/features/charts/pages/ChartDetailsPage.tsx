/*
 * File: ChartDetailsPage.tsx
 * Purpose: A page where users can view detailed information and tabular data for a specific chart.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react';
import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useT } from '../../../shared/i18n/useT';
import { useChartsMetricsQuery } from '../hooks/useChartsMetricsQuery';
import { Button, PageLayout, DataTable } from '../../../ui';
import { ChartRenderer } from '../components/ChartRenderer';

export function ChartDetailsPage(): ReactElement {
    const { chartId, locale } = useParams<{ chartId: string; locale: string }>();
    const t = useT();
    const navigate = useNavigate();
    const { data, isLoading, isError } = useChartsMetricsQuery();

    const chartTitle = chartId ? t(`ui.charts.${chartId}`) : t('ui.route.charts.details');

    const tableData = useMemo(() => {
        if (!data || !chartId) return [];
        const chartData = (data as any)[chartId];
        if (!chartData) return [];
        return Object.entries(chartData).map(([key, value]) => ({ key, value }));
    }, [data, chartId]);

    const columns = useMemo(() => {
        const formatKey = (key: string, chartIdLocal?: string) => {
            if (chartIdLocal === 'activeHours') {
                const hour = parseInt(key, 10);
                if (isNaN(hour)) return key;
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const h12 = hour % 12 === 0 ? 12 : hour % 12;
                return `${h12}:00 ${ampm}`;
            }
            if (chartIdLocal === 'birthdaysThisMonth') return t(`ui.charts.details.birthdays`);
            return key;
        };

        const getHeaderKey = (chartIdLocal?: string): string => {
            switch(chartIdLocal) {
                case 'activeHours': return t('ui.charts.details.time');
                case 'populatedRegions': return t('ui.charts.details.region');
                case 'birthdaysThisMonth': return t('ui.charts.details.month');
                default: return t('ui.charts.details.key');
            }
        };

        const getHeaderValue = (chartIdLocal?: string): string => {
            switch(chartIdLocal) {
                case 'activeHours': return t('ui.charts.details.checkIns');
                case 'populatedRegions': return t('ui.charts.details.users');
                case 'birthdaysThisMonth': return t('ui.charts.details.total');
                default: return t('ui.charts.details.value');
            }
        };

        return [
            { key: 'key', header: getHeaderKey(chartId), accessor: (row: any) => formatKey(row.key, chartId) },
            { key: 'value', header: getHeaderValue(chartId), accessor: (row: any) => row.value },
        ];
    }, [t, chartId]);

    return (
        <PageLayout title={chartTitle}>
            <div className="flex flex-col gap-8">
                <div className="flex justify-between items-center mb-4">
                    <Button variant="secondary" onClick={() => { void navigate(`/${locale ?? 'en'}/charts`); }}>
                        {t('ui.common.back')}
                    </Button>
                </div>
                
                {isLoading ? (
                    <div className="p-8 text-center text-[var(--color-text)]">{t('ui.common.loading')}</div>
                ) : isError ? (
                    <div className="p-8 text-center text-red-500">{t('ui.common.error')}</div>
                ) : (
                    <>
                        <div className="w-full max-w-4xl mx-auto h-[400px]">
                            <ChartRenderer chartId={chartId} data={data} />
                        </div>

                        <div className="mt-8 bg-surface rounded-xl border border-divider shadow-sm overflow-hidden">
                            <div className="p-5 border-b border-divider bg-surface-hover">
                                <h3 className="text-lg font-medium text-text">
                                    {t('ui.charts.details.rawData')}
                                </h3>
                            </div>
                            <div className="p-0">
                                <DataTable
                                    columns={columns}
                                    data={tableData}
                                    keyExtractor={(item: any) => item.key}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </PageLayout>
    );
}
