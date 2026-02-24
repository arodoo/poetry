/*
 * File: useChartsMetricsQuery.ts
 * Purpose: React Query hook to fetch and cache dashboard metrics for charts.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardMetrics } from '../api/chartsApi';

export const CHARTS_QUERY_KEY = ['charts', 'metrics'];

export function useChartsMetricsQuery() {
    return useQuery({
        queryKey: CHARTS_QUERY_KEY,
        queryFn: fetchDashboardMetrics,
        staleTime: 60 * 1000, // 1 minute stale time for metrics to reduce backend load
    });
}
