/*
 * File: adminInsightFactory.ts
 * Purpose: Creates localized admin insight view models.
 * It centralizes the i18n key convention for cards.
 * All Rights Reserved. Arodi Emmanuel
 */
import type {
  AdminInsight,
  Translate,
} from './adminInsightTypes'

export function createInsight(
  key: string,
  t: Translate,
  value: string,
  vars: Record<string, unknown>
): AdminInsight {
  return {
    key,
    value,
    label: t(`ui.charts.admin.${key}`),
    hint: t(`ui.charts.admin.${key}Hint`, vars),
  }
}