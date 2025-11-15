/*
 * File: SimEnrollCard.tsx
 * Purpose: Manual enrollment interface for simulator.
 * Allows direct enrollment with slot ID input.
 * Logs enrollment attempts and triggers database refresh.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'
// prettier-ignore
import {
  useEnrollFingerprintMutation,
} from '../../hooks/useFingerprintMutations'
import type { EnrollRequest } from '../../model/FingerprintSchemas'
import { SimEnrollForm } from './SimEnrollForm'

interface SimEnrollCardProps {
  onLog: (message: string) => void
  onRefetch: () => void
}

export function SimEnrollCard({
  onLog,
  onRefetch,
}: SimEnrollCardProps): ReactElement {
  const t = useT()
  const [slotId, setSlotId] = useState<string>('')
  const enrollMutation = useEnrollFingerprintMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const slotNumber = parseInt(slotId, 10)
    if (isNaN(slotNumber) || slotNumber < 0 || slotNumber > 1500) {
      return
    }
    const request: EnrollRequest = { r503SlotId: slotNumber }
    enrollMutation.mutate(request, {
      onSuccess: () => {
        const time = new Date().toLocaleTimeString()
        onLog(`[${time}] ✓ Enrolled slot ${String(slotNumber)}`)
        setSlotId('')
        onRefetch()
      },
      onError: () => {
        const time = new Date().toLocaleTimeString()
        onLog(`[${time}] ✗ Failed slot ${String(slotNumber)}`)
      },
    })
  }

  return (
    <Card>
      <div className="p-6">
        <Text size="lg" weight="bold" className="mb-4">
          {t('ui.fingerprints.simulator.enroll.title')}
        </Text>
        <SimEnrollForm
          slotId={slotId}
          onSlotIdChange={setSlotId}
          onSubmit={handleSubmit}
        />
      </div>
    </Card>
  )
}
