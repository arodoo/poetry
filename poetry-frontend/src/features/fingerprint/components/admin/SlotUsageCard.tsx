/*
 * File: SlotUsageCard.tsx
 * Purpose: Displays R503 slot usage with progress bar visualization.
 * Shows used/total slots and percentage using UI design system.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Card } from '../../../../ui/Card/Card'
import { Text } from '../../../../ui/Text/Text'
import { useSlotUsageQuery } from '../../hooks/useFingerprintAdminQueries'

export function SlotUsageCard(): ReactElement {
  const { data, isLoading, error } = useSlotUsageQuery()

  if (isLoading) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-textMuted)]">Loading...</Text>
      </Card>
    )
  }

  if (error || !data) {
    return (
      <Card padding="md">
        <Text className="text-[var(--color-danger)]">Failed to load</Text>
      </Card>
    )
  }

  return (
    <Card padding="lg">
      <Text className="text-[var(--color-textMuted)] text-sm mb-3">
        R503 Slot Usage
      </Text>
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-[var(--color-primary)]">
          {data.usedSlots}
        </span>
        <span className="text-[var(--color-textMuted)]">/</span>
        <span className="text-lg text-[var(--color-textMuted)]">
          {data.totalSlots}
        </span>
      </div>
      <div className="h-2 bg-[var(--color-border)] rounded overflow-hidden mb-2">
        <div
          className="h-full bg-[var(--color-primary)] rounded transition-all"
          style={{ width: `${String(data.percentage)}%` }}
        />
      </div>
      <Text className="text-xs text-[var(--color-textMuted)]">
        {data.percentage}% used
      </Text>
    </Card>
  )
}
