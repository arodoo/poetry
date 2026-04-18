/*
 * File: ChartTooltip.tsx
 * Purpose: Theme-aware recharts tooltip rendering label and payload using
 * design tokens. Replaces inline contentStyle prop across charts to keep
 * tooltips legible on every theme.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface TooltipItem {
  name?: string
  value?: number | string
  color?: string
}

interface ChartTooltipProps {
  active?: boolean
  payload?: TooltipItem[]
  label?: string | number
}

export function ChartTooltip(props: ChartTooltipProps): ReactElement | null {
  const { active, payload, label } = props
  const items: TooltipItem[] = Array.isArray(payload) ? payload : []
  if (!active || items.length === 0) return null
  return (
    <div className="rounded-md border border-border bg-surface px-3 py-2 shadow-md">
      {label != null ? (
        <p className="mb-1 text-xs font-semibold text-text">{String(label)}</p>
      ) : null}
      {items.map((entry, index) => (
        <p
          key={`${entry.name ?? ''}-${String(index)}`}
          className="text-xs text-text"
          style={{ color: entry.color }}
        >
          {entry.name != null ? `${entry.name}: ` : ''}
          <span className="font-medium">{String(entry.value ?? '')}</span>
        </p>
      ))}
    </div>
  )
}
