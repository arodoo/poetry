/*
 * File: SlotsList.tsx
 * Purpose: Display fingerprint slots as visual badges.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Badge } from '../../../ui/Badge/Badge'
import { Text } from '../../../ui/Text/Text'

interface SlotsListProps {
  slots: number[]
  label: string
  emptyMessage?: string
}

export function SlotsList({
  slots,
  label,
  emptyMessage = 'No slots',
}: SlotsListProps): ReactElement {
  return (
    <div className="space-y-2">
      <Text size="sm" weight="bold" className="text-[var(--color-text-muted)]">
        {label}
      </Text>
      {slots.length === 0 ? (
        <Text size="sm" className="text-[var(--color-text-muted)] italic">
          {emptyMessage}
        </Text>
      ) : (
        <div className="flex flex-wrap gap-2">
          {slots.map((slot) => (
            <Badge key={slot} variant="primary" size="md">
              Slot {slot}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
