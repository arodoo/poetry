/*
 * File: SlotUsageCard.tsx
 * Purpose: Displays R503 slot usage with progress bar visualization.
 * Shows used/total slots and percentage. Premium dark theme styling.
 * All Rights Reserved. Arodi Emmanuel
 */

import { useSlotUsageQuery } from '../hooks/useFingerprintAdminQueries'

export function SlotUsageCard() {
  const { data, isLoading, error } = useSlotUsageQuery()

  if (isLoading) {
    return <SlotUsageCardSkeleton />
  }

  if (error || !data) {
    return <div className="slot-usage-card error">Failed to load</div>
  }

  return (
    <div className="slot-usage-card">
      <h3 className="slot-usage-title">R503 Slot Usage</h3>
      <div className="slot-usage-stats">
        <span className="slot-count">{data.usedSlots}</span>
        <span className="slot-divider">/</span>
        <span className="slot-total">{data.totalSlots}</span>
      </div>
      <div className="slot-progress-container">
        <div
          className="slot-progress-bar"
          style={{ width: `${data.percentage}%` }}
        />
      </div>
      <span className="slot-percentage">{data.percentage}% used</span>
    </div>
  )
}

function SlotUsageCardSkeleton() {
  return (
    <div className="slot-usage-card skeleton">
      <div className="skeleton-line title" />
      <div className="skeleton-line stats" />
      <div className="skeleton-line bar" />
    </div>
  )
}
