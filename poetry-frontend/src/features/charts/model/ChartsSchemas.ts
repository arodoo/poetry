/*
 * File: ChartsSchemas.ts
 * Purpose: Zod schemas and derived types for the dashboard charts metrics.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod';

export const StringToNumberMapSchema = z.record(z.string(), z.number());

export const DashboardMetricsSchema = z.object({
    usersByStatus: StringToNumberMapSchema,
    enrollmentsOverTime: StringToNumberMapSchema,
    membershipsByStatus: StringToNumberMapSchema,
    tokenStatus: StringToNumberMapSchema,
    eventsByType: StringToNumberMapSchema,
    subscriptionsByDuration: StringToNumberMapSchema,
    scheduledEventsByStatus: StringToNumberMapSchema,
    sellerCodesByStatus: StringToNumberMapSchema,
    zonesConfiguration: StringToNumberMapSchema,
    themeUsage: StringToNumberMapSchema,
});

export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>;
