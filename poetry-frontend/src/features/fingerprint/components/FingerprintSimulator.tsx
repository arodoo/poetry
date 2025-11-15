/*
 * File: FingerprintSimulator.tsx
 * Purpose: Orchestrates fingerprint testing interface.
 * Manages access log state and coordinates sub-components.
 * Enables full development workflow without physical R503 hardware.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { SimEnrollCard } from './sim/SimEnrollCard'
import { SimVerifyCard } from './sim/SimVerifyCard'
import { SimDatabaseCard } from './sim/SimDatabaseCard'
import { SimAccessLogCard } from './sim/SimAccessLogCard'
import { useFingerprintsListQuery } from '../hooks/useFingerprintQueries'

export function FingerprintSimulator(): ReactElement {
  const [accessLog, setAccessLog] = useState<string[]>([])
  const { data: fingerprints, refetch } = useFingerprintsListQuery()

  const addLog = (message: string): void => {
    setAccessLog((prev) => [message, ...prev])
  }

  const clearLog = (): void => {
    setAccessLog([])
  }

  const handleRefetch = (): void => {
    void refetch()
  }

  return (
    <div className="space-y-6">
      <SimEnrollCard onLog={addLog} onRefetch={handleRefetch} />
      <SimVerifyCard onLog={addLog} />
      <SimDatabaseCard fingerprints={fingerprints ?? []} onLog={addLog} />
      <SimAccessLogCard logs={accessLog} onClear={clearLog} />
    </div>
  )
}
