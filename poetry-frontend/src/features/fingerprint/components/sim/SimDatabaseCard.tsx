/*
 * File: SimDatabaseCard.tsx
 * Purpose: Enrolled fingerprints viewer with quick test.
 * Shows real-time list of all enrolled fingerprints.
 * Provides quick test button for rapid verification testing.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'
// prettier-ignore
import {
  useVerifyFingerprintMutation,
} from '../../hooks/useFingerprintMutations'
import type {
  FingerprintResponse,
  VerifyRequest,
} from '../../model/FingerprintSchemas'
import { DatabaseCardItem } from './DatabaseCardItem'

interface SimDatabaseCardProps {
  fingerprints: FingerprintResponse[]
  onLog: (message: string) => void
}

export function SimDatabaseCard({
  fingerprints,
  onLog,
}: SimDatabaseCardProps): ReactElement {
  const t = useT()
  const verifyMutation = useVerifyFingerprintMutation()

  const handleQuickTest = (testSlotId: number): void => {
    const request: VerifyRequest = { r503SlotId: testSlotId }
    verifyMutation.mutate(request, {
      onSuccess: (response) => {
        const time = new Date().toLocaleTimeString()
        const result = response.matched ? 'verified' : 'failed'
        onLog(`[${time}] ✓ QUICK TEST - Slot ${String(testSlotId)} ${result}`)
      },
    })
  }

  return (
    <Card>
      <div className="p-6">
        <Text size="lg" weight="bold" className="mb-4">
          {t('ui.fingerprints.simulator.database.title')}
        </Text>
        {fingerprints.length > 0 ? (
          <div className="space-y-2">
            {fingerprints.map((fp) => (
              <DatabaseCardItem
                key={fp.id}
                fingerprint={fp}
                onQuickTest={handleQuickTest}
              />
            ))}
          </div>
        ) : (
          <Text size="sm">{t('ui.fingerprints.list.empty')}</Text>
        )}
      </div>
    </Card>
  )
}
