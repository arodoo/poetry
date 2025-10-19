/*
 * File: formatters.ts
 * Purpose: Currency and duration formatting helpers for subscriptions.
 * All Rights Reserved. Arodi Emmanuel
 */
import { toTemplateString } from '../../../shared/utils/templateSafe'

export function formatCurrency(amount: number, currency: string): string {
  const formatted = Number.isFinite(amount) ? amount.toFixed(2) : '0.00'
  return toTemplateString(currency) + ' ' + formatted
}

export function formatDuration(days: number, t: (k: string) => string): string {
  if (days === 1) return toTemplateString(days) + ' day'
  if (days === 7) return '1 week'
  if (days === 30) return '1 month'
  if (days === 90) return '3 months'
  if (days === 365) return '1 year'
  return toTemplateString(days) + ' ' + t('ui.subscriptions.table.days')
}
