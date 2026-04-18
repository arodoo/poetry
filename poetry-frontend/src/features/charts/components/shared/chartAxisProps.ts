/*
 * File: chartAxisProps.ts
 * Purpose: Reusable axis/grid style defaults for all recharts components.
 * Centralizes stroke colors, font sizes and tick formatting so every chart
 * shares the same crisp look across themes.
 * All Rights Reserved. Arodi Emmanuel
 */
import { CHART_TOKENS } from './chartTheme'

export const AXIS_TICK = {
  fill: CHART_TOKENS.textMuted,
  fontSize: 12,
} as const

export const AXIS_BASE = {
  stroke: CHART_TOKENS.textMuted,
  tick: AXIS_TICK,
  axisLine: false,
  tickLine: false,
} as const

export const GRID_BASE = {
  strokeDasharray: '3 3',
  stroke: CHART_TOKENS.border,
  vertical: false,
} as const

export const TOOLTIP_CURSOR = {
  fill: CHART_TOKENS.muted,
  opacity: 0.35,
} as const
