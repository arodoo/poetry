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

const colorMap: Record<string, string> = {
  green: 'text-green-600',
  yellow: 'text-yellow-600',
  red: 'text-red-600',
  gray: 'text-gray-600',
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
