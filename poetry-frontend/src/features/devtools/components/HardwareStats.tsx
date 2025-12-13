/*
 * File: HardwareStats.tsx
 * Purpose: Display hardware and database fingerprint statistics.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Text } from '../../../ui/Text/Text'
import { Card } from '../../../ui/Card/Card'
import { useT } from '../../../shared/i18n/useT'

interface HardwareStatsProps {
  sensorCount: number
  sensorSlots: number[]
  dbSlots: number[]
}

export function HardwareStats({
  sensorCount,
  sensorSlots,
  dbSlots,
}: HardwareStatsProps): ReactElement {
  const t = useT()

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card>
        <div className="p-4">
          <Text size="sm" weight="bold" className="mb-2">
            Hardware (R503)
          </Text>
          <Text size="sm">
            {t('ui.devtools.hardware.usedCount')}: {sensorCount}
          </Text>
          <pre className="text-xs mt-2 max-h-32 overflow-auto">
            {JSON.stringify(sensorSlots, null, 2)}
          </pre>
        </div>
      </Card>
      <Card>
        <div className="p-4">
          <Text size="sm" weight="bold" className="mb-2">
            Database
          </Text>
          <Text size="sm">Count: {dbSlots.length}</Text>
          <pre className="text-xs mt-2 max-h-32 overflow-auto">
            {JSON.stringify(dbSlots, null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  )
}
