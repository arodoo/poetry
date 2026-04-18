/*
 * File: chartDetailsTableHelpers.ts
 * Purpose: Pure helpers for useChartDetailsTable: key formatting and
 * localized header resolvers. Extracted to keep the hook file under the
 * repository line limits while preserving full i18n compliance.
 * All Rights Reserved. Arodi Emmanuel
 */

type Translate = (key: string) => string

export function formatDetailKey(
  key: string,
  chartId: string | undefined,
  t: Translate
): string {
  if (chartId === 'activeHours') {
    const hour = parseInt(key, 10)
    if (isNaN(hour)) return key
    const ampm = hour >= 12 ? t('ui.charts.time.pm') : t('ui.charts.time.am')
    const h12 = hour % 12 === 0 ? 12 : hour % 12
    return `${String(h12)}:00 ${ampm}`
  }
  if (chartId === 'birthdaysThisMonth')
    return t('ui.charts.details.birthdays')
  if (chartId === 'eventsByType') return t(`ui.charts.events.${key}`)
  return key
}

export function getDetailsHeaderKey(
  chartId: string | undefined,
  t: Translate
): string {
  if (chartId === 'activeHours') return t('ui.charts.details.time')
  if (chartId === 'populatedRegions') return t('ui.charts.details.region')
  if (chartId === 'birthdaysThisMonth') return t('ui.charts.details.month')
  return t('ui.charts.details.key')
}

export function getDetailsHeaderValue(
  chartId: string | undefined,
  t: Translate
): string {
  if (chartId === 'activeHours') return t('ui.charts.details.checkIns')
  if (chartId === 'populatedRegions') return t('ui.charts.details.users')
  if (chartId === 'birthdaysThisMonth') return t('ui.charts.details.total')
  return t('ui.charts.details.value')
}
