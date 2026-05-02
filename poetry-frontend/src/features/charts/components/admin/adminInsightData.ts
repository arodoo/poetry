/*
 * File: adminInsightData.ts
 * Purpose: Builds admin-facing user insight cards.
 * It derives actionable metrics from the dashboard payload.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  DashboardMetrics,
} from '../../model/ChartsSchemas'
import { createInsight } from './adminInsightFactory'
import type {
  AdminInsight,
  Translate,
} from './adminInsightTypes'
import {
  latestEntry,
  percent,
  readMetric,
  sumValues,
} from './metricMath'

const ACTIVE_STATUS = 'ACTIVE'

export function buildAdminInsights(
  data: DashboardMetrics | undefined,
  t: Translate
): AdminInsight[] {
  const users = data?.usersByStatus ?? {}
  const birthdays = data?.birthdaysThisMonth ?? {}
  const enrollments = data?.enrollmentsOverTime ?? {}
  const activeUsers = readMetric(users, ACTIVE_STATUS)
  const totalUsers = sumValues(users)
  const inactiveUsers = Math.max(
    totalUsers - activeUsers,
    0
  )
  const latest = latestEntry(enrollments)
  const period = latest.label === ''
    ? t('ui.charts.admin.noPeriod')
    : latest.label
  const birthdayTotal = sumValues(birthdays)
  const rate = percent(activeUsers, totalUsers)
  const inactiveText = String(inactiveUsers)
  const birthdayText = String(birthdayTotal)
  return [
    createInsight('active', t, String(activeUsers), {
      rate,
    }),
    createInsight('attention', t, inactiveText, {
      total: totalUsers,
    }),
    createInsight('growth', t, String(latest.value), {
      period,
    }),
    createInsight('birthdays', t, birthdayText, {}),
  ]
}
