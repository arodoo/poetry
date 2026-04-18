/*
 * File: chartTheme.ts
 * Purpose: Centralizes theme-aware token references and palette for Recharts.
 * Exposes semantic CSS variables and a curated chart palette so every chart
 * stays visually consistent across all themes without hardcoded colors.
 * All Rights Reserved. Arodi Emmanuel
 */

export const CHART_TOKENS = {
  surface: 'var(--color-surface)',
  border: 'var(--color-border)',
  text: 'var(--color-text)',
  textMuted: 'var(--color-textMuted)',
  muted: 'var(--color-muted)',
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  error: 'var(--color-error)',
  info: 'var(--color-info)',
  accent: 'var(--color-accent)',
} as const

export const CHART_PALETTE: readonly string[] = [
  CHART_TOKENS.primary,
  CHART_TOKENS.success,
  CHART_TOKENS.warning,
  CHART_TOKENS.info,
  CHART_TOKENS.error,
  CHART_TOKENS.accent,
  '#6366f1',
  '#14b8a6',
  '#ec4899',
  '#f97316',
]

export function pickColor(index: number, offset = 0): string {
  const palette = CHART_PALETTE
  const size = palette.length
  const pick = palette[(index + offset) % size]
  return pick ?? CHART_TOKENS.primary
}
