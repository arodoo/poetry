/*
 * File: chartsApi.ts
 * Purpose: API wrapper for dashboard metrics, fetching and validating data using Zod.
 * All Rights Reserved. Arodi Emmanuel
 */
import { getMetrics } from '../../../api/generated';
import { type DashboardMetrics, DashboardMetricsSchema } from '../model/ChartsSchemas';

export async function fetchDashboardMetrics(): Promise<DashboardMetrics> {
    const result = await getMetrics();

    if (result.error) {
        throw new Error('Failed to fetch dashboard metrics');
    }

    const parsed = DashboardMetricsSchema.safeParse(result.data);

    if (!parsed.success) {
        throw new Error('Validation failed for dashboard metrics');
    }

    return parsed.data;
}
