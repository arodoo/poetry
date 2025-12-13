/*
 * File: AvailableSlotsCard.tsx
 * Purpose: Card displaying available slots in sensor with scroll
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Card } from '../../../ui/Card/Card'
import { Badge } from '../../../ui/Badge/Badge'

interface AvailableSlotsCardProps {
  slots: number[]
  capacity: number
}

export function AvailableSlotsCard({ slots, capacity }: AvailableSlotsCardProps): ReactElement {
  const safeSlots = slots ?? []
  const safeCapacity = capacity ?? 0

  if (safeSlots.length === 0 && safeCapacity === 0) return <></>

  const usedCount = safeCapacity - safeSlots.length

  return (
    <Card>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Text size="lg" weight="bold">Available Slots</Text>
            <Text size="sm" className="text-[var(--color-text-muted)]">
              {safeSlots.length} / {safeCapacity} slots available ({usedCount} used)
            </Text>
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto border border-[var(--color-border)] rounded-lg p-3 bg-[var(--color-bg-subtle)]">
          <div className="flex flex-wrap gap-1">
            {safeSlots.map((slot) => (
              <Badge key={slot} tone="success" size="sm">
                {slot}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
