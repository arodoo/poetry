/*
 * File: chartUtils.ts
 * Purpose: Shared helpers and color constants for Recharts components.
 * All Rights Reserved. Arodi Emmanuel
 */

export const CHART_COLORS = [
  '#3b82f6', // blue-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#ef4444', // red-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#6366f1', // indigo-500
  '#14b8a6', // teal-500
  '#f97316', // orange-500
  '#06b6d4', // cyan-500
]

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
