/*
 * File: SimVerifyCard.tsx
 * Purpose: Access verification simulator.
 * Simulates fingerprint scan and verification process.
 * Logs access granted or denied with user ID details.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'
// prettier-ignore
import {
  useVerifyFingerprintMutation,
} from '../../hooks/useFingerprintMutations'
import type { VerifyRequest } from '../../model/FingerprintSchemas'

interface SimVerifyCardProps {
  onLog: (message: string) => void
}

export function SimVerifyCard({ onLog }: SimVerifyCardProps): ReactElement {
  const t = useT()
  const [verifySlotId, setVerifySlotId] = useState<string>('')
  const verifyMutation = useVerifyFingerprintMutation()

  const handleVerify = (): void => {
    const slotNumber = parseInt(verifySlotId, 10)
    if (isNaN(slotNumber) || slotNumber < 0 || slotNumber > 1500) {
      return
    }
    const request: VerifyRequest = { r503SlotId: slotNumber }
    verifyMutation.mutate(request, {
      onSuccess: (response) => {
        const time = new Date().toLocaleTimeString()
        if (response.matched) {
          const userId = String(response.userId ?? 'N/A')
          const slot = String(slotNumber)
          const msg = `[${time}] ✓ GRANTED - Slot ${slot} → User ${userId}`
          onLog(msg)
        } else {
          onLog(`[${time}] ✗ DENIED - Slot ${String(slotNumber)}`)
        }
      },
    })
  }

  return (
    <Card>
      <div className="p-6">
        <Text size="lg" weight="bold" className="mb-4">
          {t('ui.fingerprints.simulator.verify.title')}
        </Text>
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            max="1500"
            value={verifySlotId}
            onChange={(e) => {
              setVerifySlotId(e.target.value)
            }}
            placeholder={t('ui.fingerprints.verify.slotIdPlaceholder')}
          />
          <Button onClick={handleVerify} disabled={!verifySlotId}>
            {t('ui.fingerprints.simulator.verify.button')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
