/*
 * File: HardwareStats.tsx
 * Purpose: Display hardware and database fingerprint statistics.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Card } from '../../../ui/Card/Card'
import { useT } from '../../../shared/i18n/useT'
import { SlotsList } from './SlotsList'

interface HardwareStatsProps {
  sensorCount: number
  sensorSlots: number[]
  dbSlots: number[]
  loading?: boolean
  onDeleteSlot?: (slotId: number) => void
}

export function HardwareStats({
  sensorCount,
  sensorSlots,
  dbSlots,
  loading = false,
  onDeleteSlot,
}: HardwareStatsProps): ReactElement {
  const t = useT()

  if (loading) {
    return (
      <Card>
        <div className="p-6 text-center">
          <Text size="sm" className="text-[var(--color-text-muted)]">
            {t('ui.common.loading')}
          </Text>
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <div className="p-6 space-y-4">
          <div>
            <Text size="lg" weight="bold">
              Hardware (R503)
            </Text>
            <Text size="sm" className="text-[var(--color-text-muted)]">
              {t('ui.devtools.hardware.usedCount')}: {sensorCount}
            </Text>
          </div>
          <SlotsList
            slots={sensorSlots}
            label={t('ui.devtools.hardware.slots')}
            emptyMessage="No fingerprints in sensor"
            onDelete={onDeleteSlot}
          />
        </div>
      </Card>
      <Card>
        <div className="p-6 space-y-4">
          <div>
            <Text size="lg" weight="bold">
              Database
            </Text>
            <Text size="sm" className="text-[var(--color-text-muted)]">
              Count: {dbSlots.length}
            </Text>
          </div>
          <SlotsList
            slots={dbSlots}
            label="Database Records"
            emptyMessage="No fingerprints in database"
          />
        </div>
      </Card>
    </div>
  )
}
