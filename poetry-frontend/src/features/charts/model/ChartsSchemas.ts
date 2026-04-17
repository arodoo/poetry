/*
 * File: ChartsSchemas.ts
 * Purpose: Zod schemas and derived types for the dashboard charts metrics.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const StringToNumberMapSchema = z.record(z.string(), z.number())

export const DashboardMetricsSchema = z.object({
  usersByStatus: StringToNumberMapSchema,
  enrollmentsOverTime: StringToNumberMapSchema,
  membershipsByStatus: StringToNumberMapSchema,
  eventsByType: StringToNumberMapSchema,
  subscriptionsByDuration: StringToNumberMapSchema,

  sellerCodesByStatus: StringToNumberMapSchema,
  scheduledEventsByStatus: StringToNumberMapSchema.optional().catch(() => ({})),
  birthdaysThisMonth: StringToNumberMapSchema,
  activeHours: StringToNumberMapSchema,
  populatedRegions: StringToNumberMapSchema,
  accessLogTrend: StringToNumberMapSchema.optional().catch(() => ({})),
  activeDaysOfWeek: StringToNumberMapSchema.optional().catch(() => ({})),
  recentAccessLogs: z
    .array(z.any())
    .optional()
    .catch(() => []),
})

export type DashboardMetrics = z.infer<typeof DashboardMetricsSchema>
