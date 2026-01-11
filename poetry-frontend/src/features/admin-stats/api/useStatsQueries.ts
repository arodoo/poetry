/**
 * File: useStatsQueries.ts
 * Purpose: React Query hooks for fetching membership statistics.
 * Uses SDK client to call statistics endpoints with caching.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useQuery } from '@tanstack/react-query';
import { MembershipStatsSchema, type MembershipStats } from '../model/StatsSchemas';

const STATS_BASE_URL = '/api/v1/statistics';

async function fetchMembershipStats(expiringDays = 7): Promise<MembershipStats> {
    const response = await fetch(`${STATS_BASE_URL}/memberships?expiringDays=${expiringDays}`, {
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    const data = await response.json();
    return MembershipStatsSchema.parse(data);
}

export function useMembershipStatsQuery(expiringDays = 7) {
    return useQuery({
        queryKey: ['membership-stats', expiringDays],
        queryFn: () => fetchMembershipStats(expiringDays),
        staleTime: 60_000,
    });
}
