/*
 * File: AccessLogsRawDataView.tsx
 * Purpose: Extracts the DataTable raw access logs out of the details view to keep file sizes within 80 lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useMemo, type ReactElement } from 'react';
import { useT } from '../../../shared/i18n/useT';
import { DataTable } from '../../../ui';
import type { DashboardMetrics } from '../model/ChartsSchemas';

type LogRow = NonNullable<DashboardMetrics['recentAccessLogs']>[number];

export function AccessLogsRawDataView({ logs }: { logs: LogRow[] }): ReactElement {
    const t = useT();

    const columns = useMemo(() => {
        return [
            { key: 'id', header: 'ID', accessor: (row: LogRow) => row.id },
            { key: 'userName', header: t('ui.common.name'), accessor: (row: LogRow) => row.userName },
            { key: 'email', header: t('ui.common.email'), accessor: (row: LogRow) => row.email },
            { key: 'timestamp', header: t('ui.charts.details.time'), accessor: (row: LogRow) => new Date(row.timestamp).toLocaleString() },
        ];
    }, [t]);

    return (
        <div className="bg-surface rounded-xl border border-divider shadow-sm overflow-hidden mt-4">
            <div className="p-5 border-b border-divider bg-surface-hover">
                <h3 className="text-lg font-medium text-text">
                    {t('ui.charts.details.rawData')} (Top 50)
                </h3>
            </div>
            <div className="p-0">
                <DataTable
                    columns={columns}
                    data={logs}
                    keyExtractor={(item: LogRow) => item.id.toString()}
                />
            </div>
        </div>
    );
}
