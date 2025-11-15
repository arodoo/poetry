/*
 * File: SimulateAccessButton.tsx
 * Purpose: Verification UI with slot ID input and result display.
 * Simulates fingerprint scan and shows access granted or denied.
 * Displays matched user ID when verification succeeds.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'
import { useVerifyFingerprintMutation } from '../hooks/useFingerprintMutations'
import { useT } from '../../../shared/i18n/useT'
import type { VerifyRequest } from '../model/FingerprintSchemas'
import { VerifyResult } from './VerifyResult'

export function SimulateAccessButton(): ReactElement {
  const t = useT()
  const [slotId, setSlotId] = useState<string>('')
  const verifyMutation = useVerifyFingerprintMutation()

  const handleVerify = (): void => {
    const slotNumber = parseInt(slotId, 10)
    if (isNaN(slotNumber) || slotNumber < 0 || slotNumber > 1500) {
      return
    }
    const request: VerifyRequest = { r503SlotId: slotNumber }
    verifyMutation.mutate(request)
  }

  const result = verifyMutation.data

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="verifySlotId" className="block text-sm">
          {t('ui.fingerprints.verify.slotIdLabel')}
        </label>
        <div className="flex gap-2">
          <Input
            id="verifySlotId"
            type="number"
            min="0"
            max="1500"
            value={slotId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSlotId(e.target.value)
            }}
            placeholder={t('ui.fingerprints.verify.slotIdPlaceholder')}
            disabled={verifyMutation.isPending}
          />
          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isPending || !slotId}
            size="md"
          >
            {verifyMutation.isPending
              ? t('ui.fingerprints.verify.verifying')
              : t('ui.fingerprints.verify.button')}
          </Button>
        </div>
      </div>

      {verifyMutation.isError && (
        <Text size="sm" className="text-[var(--color-error)]">
          {t('ui.fingerprints.errors.verifyFailed')}
        </Text>
      )}

      {result && <VerifyResult result={result} />}
    </div>
  )
}
