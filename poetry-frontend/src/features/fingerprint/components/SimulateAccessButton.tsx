/*
 * File: SimulateAccessButton.tsx
 * Purpose: Verification UI with FMD input and result display.
 * Updated for HID model.
 * All Rights Reserved Arodi Emmanuel
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
  const [fmd, setFmd] = useState<string>('')
  const verifyMutation = useVerifyFingerprintMutation()

  const handleVerify = (): void => {
    if (fmd.length < 5) return
    const request: VerifyRequest = { fmd }
    verifyMutation.mutate(request)
  }

  const result = verifyMutation.data

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="verifyFmd" className="block text-sm mb-1">
          Simulate FMD Capture
        </label>
        <div className="flex gap-2">
          <Input
            id="verifyFmd"
            type="text"
            value={fmd}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setFmd(e.target.value)
            }}
            placeholder="Enter FMD data"
            disabled={verifyMutation.isPending}
          />
          <Button
            onClick={handleVerify}
            disabled={verifyMutation.isPending || !fmd}
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
