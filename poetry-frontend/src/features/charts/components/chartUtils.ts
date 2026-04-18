/*
 * File: chartUtils.ts
 * Purpose: Shared Recharts helpers. Color palette has moved to
 * shared/chartTheme.ts; this module keeps data-formatting helpers and
 * re-exports the palette so existing imports keep working during refactor.
 * All Rights Reserved. Arodi Emmanuel
 */
export { CHART_PALETTE as CHART_COLORS } from './shared/chartTheme'

export function formatPieData(
  data: Record<string, number>
): { name: string; value: number }[] {
  return Object.entries(data).map(([name, value]) => ({ name, value }))
}

export function formatBarData(
  data: Record<string, number>,
  keyName = 'name',
  valueName = 'value'
): Record<string, string | number>[] {
  return Object.entries(data).map(([name, value]) => ({
    [keyName]: name,
    [valueName]: value,
  }))
}
