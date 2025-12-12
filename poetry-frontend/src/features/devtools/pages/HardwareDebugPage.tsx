/*
 * File: HardwareDebugPage.tsx
 * Purpose: Dev/Admin page for direct R503 sensor debugging.
 * Shows used slots from sensor, sync check vs database, and control.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { Card } from '../../../ui/Card/Card'
import { useT } from '../../../shared/i18n/useT'
import { useFingerprintsListQuery } from '../../fingerprint/hooks/useFingerprintQueries'

interface SensorState {
  count: number
  slots: number[]
  loading: boolean
  error: string | null
}

const HARDWARE_URL = 'http://localhost:3000'

export function HardwareDebugPage(): ReactElement {
  const t = useT()
  const { data: dbFingerprints } = useFingerprintsListQuery()
  const [sensor, setSensor] = useState<SensorState>({
    count: 0, slots: [], loading: false, error: null
  })

  const dbSlots = (dbFingerprints ?? [])
    .map(fp => fp.r503SlotId)
    .filter((s): s is number => s !== undefined && s !== null)

  const fetchUsedSlots = async (): Promise<void> => {
    setSensor(s => ({ ...s, loading: true, error: null }))
    try {
      const res = await fetch(`${HARDWARE_URL}/fingerprint/used-slots`)
      const data = await res.json()
      setSensor({ count: data.count, slots: data.slots, loading: false, error: null })
    } catch (e) {
      setSensor(s => ({ ...s, loading: false, error: String(e) }))
    }
  }

  const clearSensor = async (): Promise<void> => {
    setSensor(s => ({ ...s, loading: true, error: null }))
    try {
      await fetch(`${HARDWARE_URL}/fingerprint/clear-all`, { method: 'POST' })
      await fetchUsedSlots()
    } catch (e) {
      setSensor(s => ({ ...s, loading: false, error: String(e) }))
    }
  }

  const orphanedInSensor = sensor.slots.filter(s => !dbSlots.includes(s))
  const missingInSensor = dbSlots.filter(s => !sensor.slots.includes(s))

  return (
    <div className="hardware-debug-page max-w-4xl mx-auto p-6">
      <Heading level={1}>{t('ui.devtools.hardware.title')}</Heading>
      <Text size="sm" className="mb-6">{t('ui.devtools.hardware.subtitle')}</Text>

      <Stack gap="md">
        <div className="flex gap-2">
          <Button onClick={fetchUsedSlots} disabled={sensor.loading}>
            {t('ui.devtools.hardware.scanSlots')}
          </Button>
          <Button onClick={clearSensor} variant="danger" disabled={sensor.loading}>
            {t('ui.devtools.hardware.clearAll')}
          </Button>
        </div>

        {sensor.error && <Text size="sm" className="text-red-500">{sensor.error}</Text>}

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <div className="p-4">
              <Text size="sm" weight="bold" className="mb-2">Hardware (R503)</Text>
              <Text size="sm">{t('ui.devtools.hardware.usedCount')}: {sensor.count}</Text>
              <pre className="text-xs mt-2 max-h-32 overflow-auto">
                {JSON.stringify(sensor.slots, null, 2)}
              </pre>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <Text size="sm" weight="bold" className="mb-2">Database</Text>
              <Text size="sm">Count: {dbSlots.length}</Text>
              <pre className="text-xs mt-2 max-h-32 overflow-auto">
                {JSON.stringify(dbSlots, null, 2)}
              </pre>
            </div>
          </Card>
        </div>

        {(orphanedInSensor.length > 0 || missingInSensor.length > 0) && (
          <Card>
            <div className="p-4">
              <Text size="sm" weight="bold" className="mb-2 text-amber-500">Sync Issues</Text>
              {orphanedInSensor.length > 0 && (
                <Text size="sm">Orphaned in sensor: {orphanedInSensor.join(', ')}</Text>
              )}
              {missingInSensor.length > 0 && (
                <Text size="sm">Missing in sensor: {missingInSensor.join(', ')}</Text>
              )}
            </div>
          </Card>
        )}
      </Stack>
    </div>
  )
}

export default HardwareDebugPage
