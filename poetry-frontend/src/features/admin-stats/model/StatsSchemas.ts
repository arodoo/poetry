/**
 * File: StatsSchemas.ts
 * Purpose: Zod schemas for membership statistics API responses.
 * Validates data from GET /api/v1/statistics/memberships endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */

import { z } from 'zod';

export const MembershipStatsSchema = z.object({
    active: z.number().int().nonnegative(),
    expiringSoon: z.number().int().nonnegative(),
    expired: z.number().int().nonnegative(),
    total: z.number().int().nonnegative(),
});

export type MembershipStats = z.infer<typeof MembershipStatsSchema>;
