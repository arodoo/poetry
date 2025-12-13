/*
 * File: HardwareDebugPage.tsx
 * Purpose: Dev/Admin page for direct R503 sensor debugging.
 * Shows used slots from sensor, sync check vs database, and control.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { useFingerprintsListQuery } from '../../fingerprint/hooks/useFingerprintQueries'
import { useHardwareDebug } from '../hooks/useHardwareDebug'
import { ClearTemplatesModal } from '../components/ClearTemplatesModal'
import { HardwareStats } from '../components/HardwareStats'
import { SyncIssues } from '../components/SyncIssues'
import { HardwareControls } from '../components/HardwareControls'

export function HardwareDebugPage(): ReactElement {
  const t = useT()
  const { data: dbFingerprints } = useFingerprintsListQuery()
  const { sensor, fetchUsedSlots, clearAllTemplates } = useHardwareDebug()
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const dbSlots = (dbFingerprints ?? [])
    .map((fp) => fp.r503SlotId)
    .filter((s): s is number => s !== undefined && s !== null)

  const orphanedInSensor = sensor.slots.filter((s) => !dbSlots.includes(s))
  const missingInSensor = dbSlots.filter((s) => !sensor.slots.includes(s))

  const handleConfirmClear = async () => {
    setIsConfirmOpen(false)
    await clearAllTemplates()
  }

  return (
    <div className="hardware-debug-page max-w-4xl mx-auto p-6">
      <Heading level={1}>{t('ui.devtools.hardware.title')}</Heading>
      <Text size="sm" className="mb-6">
        {t('ui.devtools.hardware.subtitle')}
      </Text>

      <Stack gap="md">
        <HardwareControls
          loading={sensor.loading}
          onScan={fetchUsedSlots}
          onClear={() => { setIsConfirmOpen(true); }}
        />

        {sensor.error && (
          <Text size="sm" className="text-[var(--color-error)]">
            {sensor.error}
          </Text>
        )}

        <HardwareStats
          sensorCount={sensor.count}
          sensorSlots={sensor.slots}
          dbSlots={dbSlots}
        />

        <SyncIssues
          orphanedInSensor={orphanedInSensor}
          missingInSensor={missingInSensor}
        />
      </Stack>

      <ClearTemplatesModal
        open={isConfirmOpen}
        onClose={() => { setIsConfirmOpen(false); }}
        onConfirm={() => void handleConfirmClear()}
      />
    </div>
  )
}

export default HardwareDebugPage
