/*
 * File: ChartsSchemas.ts
 * Purpose: Zod schemas for dashboard chart metrics.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

export const StringToNumberMapSchema = z.record(
  z.string(),
  z.number()
)

const AccessLogIdSchema = z.union([z.string(), z.number()])

const emptyMetricMap = (): Record<string, number> => ({})

export const AccessLogRecordSchema = z.object({
  id: AccessLogIdSchema,
  userName: z.string().catch(''),
  email: z.string().catch(''),
  timestamp: z.string().catch(''),
})

export const DashboardMetricsSchema = z.object({
  usersByStatus: StringToNumberMapSchema,
  enrollmentsOverTime: StringToNumberMapSchema,
  membershipsByStatus: StringToNumberMapSchema,
  eventsByType: StringToNumberMapSchema,
  subscriptionsByDuration: StringToNumberMapSchema,

  sellerCodesByStatus: StringToNumberMapSchema,
  birthdaysThisMonth: StringToNumberMapSchema,
  activeHours: StringToNumberMapSchema,
  populatedRegions: StringToNumberMapSchema,
  accessLogTrend: StringToNumberMapSchema
    .optional()
    .catch(emptyMetricMap),
  activeDaysOfWeek: StringToNumberMapSchema
    .optional()
    .catch(emptyMetricMap),
  recentAccessLogs: z
    .array(AccessLogRecordSchema)
    .optional()
    .catch(() => []),
})

export type AccessLogRecord = z.infer<
  typeof AccessLogRecordSchema
>
export type DashboardMetrics = z.infer<
  typeof DashboardMetricsSchema
>
