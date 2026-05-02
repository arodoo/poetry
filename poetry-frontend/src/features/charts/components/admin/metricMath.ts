/*
 * File: metricMath.ts
 * Purpose: Small math helpers for admin chart summaries.
 * They keep React components focused on rendering only.
 * All Rights Reserved. Arodi Emmanuel
 */

export interface MetricEntry {
  readonly label: string
  readonly value: number
}

export function sumValues(
  data: Record<string, number>
): number {
  return Object.values(data).reduce(
    (total, value) => total + value,
    0
  )
}

export function readMetric(
  data: Record<string, number>,
  key: string
): number {
  const match = Object.entries(data).find(
    ([status]) => status.toUpperCase() === key
  )
  return match?.[1] ?? 0
}

export function latestEntry(
  data: Record<string, number>
): MetricEntry {
  const entries = Object.entries(data).sort(
    ([left], [right]) =>
      left.localeCompare(right)
  )
  const latest = entries.at(-1)
  return latest
    ? { label: latest[0], value: latest[1] }
    : { label: '', value: 0 }
}

export function percent(
  part: number,
  total: number
): string {
  if (total <= 0) return '0%'
  const value = Math.round((part / total) * 100)
  return `${String(value)}%`
}