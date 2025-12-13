/*
 * File: HardwareDebugPage.tsx
 * Purpose: Dev/Admin page for direct R503 sensor debugging.
 * Shows used slots from sensor, sync check vs database, and control.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Stack } from '../../../ui/Stack/Stack'
import { useT } from '../../../shared/i18n/useT'
import { useHardwarePageState } from '../hooks/useHardwarePageState'
import { ClearTemplatesModal } from '../components/ClearTemplatesModal'
import { HardwareStats } from '../components/HardwareStats'
import { SyncIssues } from '../components/SyncIssues'
import { HardwareControls } from '../components/HardwareControls'
import { AvailableSlotsCard } from '../components/AvailableSlotsCard'

export function HardwareDebugPage(): ReactElement {
  const t = useT()
  const state = useHardwarePageState()

  return (
    <div className="hardware-debug-page max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <Heading level={1} className="mb-2">{t('ui.devtools.hardware.title')}</Heading>
        <Text size="md" className="text-[var(--color-text-muted)]">
          {t('ui.devtools.hardware.subtitle')}
        </Text>
      </div>
      <Stack gap="lg">
        <HardwareControls
          loading={state.sensor.loading}
          onScan={state.fetchUsedSlots}
          onScanAvailable={state.fetchAvailableSlots}
          onClear={state.openConfirm}
        />
        {state.sensor.error && (
          <Text size="sm" className="text-[var(--color-error)]">{state.sensor.error}</Text>
        )}
        <HardwareStats
          sensorCount={state.sensor.count}
          sensorSlots={state.sensor.slots}
          dbSlots={state.dbSlots}
          loading={state.sensor.loading}
          onDeleteSlot={state.deleteSlot}
        />
        <AvailableSlotsCard slots={state.sensor.availableSlots} capacity={state.sensor.capacity} />
        <SyncIssues orphanedInSensor={state.orphanedInSensor} missingInSensor={state.missingInSensor} />
      </Stack>
      <ClearTemplatesModal
        open={state.isConfirmOpen}
        onClose={state.closeConfirm}
        onConfirm={() => void state.handleClear()}
      />
    </div>
  )
}

export default HardwareDebugPage
