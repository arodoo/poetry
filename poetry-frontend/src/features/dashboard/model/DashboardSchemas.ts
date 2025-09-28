/*
 * File: DashboardSchemas.ts
 * Purpose: Domain schemas describing dashboard overview metrics aligned with
 * backend contracts.
 * All Rights Reserved. Arodi Emmanuel
 */
import { z } from 'zod'

const DashboardMetricSchema: z.ZodNumber = z.number().int().nonnegative()

export const DashboardOverviewSchema: z.ZodType<{
  totalPoems: number
  publishedPoems: number
  draftPoems: number
  activeMembers: number
  highlightKey: string
  lastUpdatedLabel: string
}> = z
  .object({
    totalPoems: DashboardMetricSchema,
    publishedPoems: DashboardMetricSchema,
    draftPoems: DashboardMetricSchema,
    activeMembers: DashboardMetricSchema,
    highlightKey: z.string().min(1),
    lastUpdatedLabel: z.string().min(1),
  })
  .refine(
    (value: {
      totalPoems: number
      publishedPoems: number
      draftPoems: number
    }): boolean => {
      const valid: boolean =
        value.publishedPoems + value.draftPoems <= value.totalPoems
      return valid
    },
    {
      message: 'dashboard.overview.metrics.invalidTotals',
      path: ['publishedPoems'],
    }
  )

export type DashboardOverview = z.infer<typeof DashboardOverviewSchema>
