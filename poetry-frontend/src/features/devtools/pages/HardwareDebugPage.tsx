/*
 * File: HardwareDebugPage.tsx
 * Purpose: Dev/Admin page for R503 sensor debugging and access testing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { useState, type ReactElement } from 'react'
import { SimEnrollCard } from '../../fingerprint/components/sim/SimEnrollCard'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { useT } from '../../../shared/i18n/useT'
import { useHardwarePageState } from '../hooks/useHardwarePageState'
import { ClearTemplatesModal } from '../components/ClearTemplatesModal'
import { HardwareStats } from '../components/HardwareStats'
import { SyncIssues } from '../components/SyncIssues'
import { DiagnosticsCard } from '../components/hardware/DiagnosticsCard'
import { VerifyFingerprintCard } from '../components/VerifyFingerprintCard'
import { MaintenanceCard } from '../components/MaintenanceCard'

export function HardwareDebugPage(): ReactElement {
  const t = useT()
  const state = useHardwarePageState()
  const [logs, setLogs] = useState<string[]>([])

  const handleLog = (msg: string): void => {
    setLogs((prev) => [msg, ...prev])
  }

  return (
    <div className="hardware-debug-page max-w-6xl mx-auto p-6 space-y-6">
      <header>
        <Heading level={1} className="mb-1">
          {t('ui.devtools.hardware.title')}
        </Heading>
        <Text size="md" className="text-[var(--color-text-muted)]">
          {t('ui.devtools.hardware.subtitle')}
        </Text>
      </header>

      {state.sensor.error && (
        <Text size="sm" className="text-[var(--color-error)]">
          {state.sensor.error}
        </Text>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SimEnrollCard
          onLog={handleLog}
          onRefetch={() => void state.fetchUsedSlots()}
        />
        <DiagnosticsCard state={state} />
        <VerifyFingerprintCard />
      </div>

      {logs.length > 0 && (
        <div className="bg-[var(--color-surface)] p-4 rounded-md">
          <Text size="sm" weight="bold" className="mb-2">
            Logs
          </Text>
          <div className="max-h-40 overflow-y-auto font-mono text-xs">
            {logs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      )}

      <HardwareStats
        sensorCount={state.sensor.count}
        sensorSlots={state.sensor.slots}
        dbSlots={state.dbSlots}
        loading={state.sensor.loading}
        onDeleteSlot={(id) => void state.deleteSlot(id)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SyncIssues
          orphanedInSensor={state.orphanedInSensor}
          missingInSensor={state.missingInSensor}
        />
        <MaintenanceCard
          loading={state.sensor.loading}
          onClear={state.openConfirm}
        />
      </div>

      <ClearTemplatesModal
        open={state.isConfirmOpen}
        onClose={state.closeConfirm}
        onConfirm={() => void state.handleClear()}
      />
    </div>
  )
}

export default HardwareDebugPage
