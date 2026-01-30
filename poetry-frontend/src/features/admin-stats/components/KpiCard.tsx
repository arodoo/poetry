/**
 * File: KpiCard.tsx
 * Purpose: Single KPI metric card using internal UI components.
 * Displays value with label and color indicator for dashboard.
 * All Rights Reserved. Arodi Emmanuel
 */

import { type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'

interface KpiCardProps {
  label: string
  value: number
  color?: 'green' | 'yellow' | 'red' | 'gray'
  testId?: string
}

const colorMap: Record<'green' | 'yellow' | 'red' | 'gray', string> = {
  green: 'text-[var(--color-success)]',
  yellow: 'text-[var(--color-warning)]',
  red: 'text-[var(--color-error)]',
  gray: 'text-[var(--color-textMuted)]',
}

export function KpiCard({
  label,
  value,
  color = 'gray',
  testId,
}: KpiCardProps): ReactElement {
  return (
    <Card padding="md" radius="md" shadow className="min-w-[120px]">
      <div data-testid={testId}>
        <p className={`text-2xl font-bold ${colorMap[color]}`}>{value}</p>
        <p className="text-sm text-[var(--color-textMuted)]">{label}</p>
      </div>
    </Card>
  )
}
