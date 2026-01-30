/*
 * File: AvailableSlotsCard.tsx
 * Purpose: Card displaying available slots in sensor with scrollable list.
 * Shows used vs available count and renders badge for each slot.
 * Used in devtools hardware diagnostics page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { Badge } from '../../../../ui/Badge/Badge'
import { useT } from '../../../../shared/i18n/useT'

interface AvailableSlotsCardProps {
  slots: number[]
  capacity: number
}

export function AvailableSlotsCard({
  slots,
  capacity,
}: AvailableSlotsCardProps): ReactElement {
  const t = useT()

  if (slots.length === 0 && capacity === 0) return <></>

  const usedCount = capacity - slots.length

  return (
    <Card>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <Text size="lg" weight="bold">
              {t('ui.devtools.hardware.availableSlots')}
            </Text>
            <Text size="sm" className="text-[var(--color-text-muted)]">
              {slots.length} / {capacity}{' '}
              {t('ui.devtools.hardware.slotsAvailable')} ({usedCount}{' '}
              {t('ui.devtools.hardware.used')})
            </Text>
          </div>
        </div>
        <div className="max-h-48 overflow-y-auto border border-[var(--color-border)] rounded-lg p-3 bg-[var(--color-bg-subtle)]">
          <div className="flex flex-wrap gap-1">
            {slots.map((slot) => (
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
