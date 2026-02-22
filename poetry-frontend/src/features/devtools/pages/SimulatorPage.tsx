/*
 * File: SimulatorPage.tsx
 * Purpose: Standalone simulation page for E2E testing.
 * Allows UI-based enrollment simulation without poetry-hardware service.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { useState } from 'react'
import { useT } from '../../../shared/i18n/useT'
import { Text } from '../../../ui/Text/Text'
import { SimEnrollCard } from '../../fingerprint/components/sim/SimEnrollCard'
import { SimAccessLogCard } from '../../fingerprint/components/sim/SimAccessLogCard'

export function SimulatorPage(): ReactElement {
  const t = useT()
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string): void => {
    setLogs((prev) => [msg, ...prev].slice(0, 50))
  }

  return (
    <div className="simulator-page max-w-4xl mx-auto p-6 space-y-6">
      <header>
        <Text size="lg" weight="bold" className="text-xl">
          {t('ui.fingerprints.simulator.title')}
        </Text>
        <Text className="text-[var(--color-textMuted)]">
          {t('ui.fingerprints.simulator.subtitle')}
        </Text>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SimEnrollCard onLog={addLog} onRefetch={() => {}} />
        <SimAccessLogCard logs={logs} onClear={() => { setLogs([]); }} />
      </div>
    </div>
  )
}

export default SimulatorPage
