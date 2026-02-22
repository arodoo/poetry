/*
 * File: SimEnrollCard.tsx
 * Purpose: Manual enrollment interface for simulator.
 * Allows direct enrollment with FMD string input.
 * All Rights Reserved Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'
import { useEnrollFingerprintMutation } from '../../hooks/useFingerprintMutations'
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
  const [fmd, setFmd] = useState<string>('')
  const enrollMutation = useEnrollFingerprintMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (fmd.length < 5) {
      return
    }
    const request: EnrollRequest = { fmd }
    enrollMutation.mutate(request, {
      onSuccess: () => {
        const time = new Date().toLocaleTimeString()
        onLog(`[${time}] ✓ Enrolled FMD data`)
        setFmd('')
        onRefetch()
      },
      onError: () => {
        const time = new Date().toLocaleTimeString()
        onLog(`[${time}] ✗ Failed to enroll FMD`)
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
          slotId={fmd}
          onSlotIdChange={setFmd}
          onSubmit={handleSubmit}
        />
      </div>
    </Card>
  )
}
