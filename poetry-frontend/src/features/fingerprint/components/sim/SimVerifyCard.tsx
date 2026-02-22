/*
 * File: SimVerifyCard.tsx
 * Purpose: Access verification simulator.
 * Updated for HID model (FMD based).
 * All Rights Reserved Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Input } from '../../../../ui/Input/Input'
import { Text } from '../../../../ui/Text/Text'
import { Card } from '../../../../ui/Card/Card'
import { useT } from '../../../../shared/i18n/useT'
import { useVerifyFingerprintMutation } from '../../hooks/useFingerprintMutations'
import type { VerifyRequest } from '../../model/FingerprintSchemas'

interface SimVerifyCardProps {
  onLog: (message: string) => void
}

export function SimVerifyCard({ onLog }: SimVerifyCardProps): ReactElement {
  const t = useT()
  const [verifyFmd, setVerifyFmd] = useState<string>('')
  const verifyMutation = useVerifyFingerprintMutation()

  const handleVerify = (): void => {
    if (verifyFmd.length < 5) {
      return
    }
    const request: VerifyRequest = { fmd: verifyFmd }
    verifyMutation.mutate(request, {
      onSuccess: (response) => {
        const time = new Date().toLocaleTimeString()
        if (response.matched) {
          const userId = String(response.userId ?? 'N/A')
          const msg = `[${time}] ✓ GRANTED → User ${userId}`
          onLog(msg)
        } else {
          onLog(`[${time}] ✗ DENIED`)
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
            type="text"
            value={verifyFmd}
            onChange={(e) => {
              setVerifyFmd(e.target.value)
            }}
            placeholder="Enter FMD data to verify"
          />
          <Button onClick={handleVerify} disabled={!verifyFmd}>
            {t('ui.fingerprints.simulator.verify.button')}
          </Button>
        </div>
      </div>
    </Card>
  )
}
