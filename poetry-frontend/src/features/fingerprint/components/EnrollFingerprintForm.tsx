/*
 * File: EnrollFingerprintForm.tsx
 * Purpose: Form for enrolling new fingerprints with R503 slot ID input.
 * Validates slot ID range and handles enrollment submission.
 * Provides user feedback on enrollment success or failure.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { useState } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Input } from '../../../ui/Input/Input'
import { useEnrollFingerprintMutation } from '../hooks/useFingerprintMutations'
import { useT } from '../../../shared/i18n/useT'
import type { EnrollRequest } from '../model/FingerprintSchemas'
import { EnrollFormStatus } from './EnrollFormStatus'

export function EnrollFingerprintForm(): ReactElement {
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
        setSlotId('')
        return
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="slotId" className="block text-sm font-medium">
          {t('ui.fingerprints.form.slotId')}
        </label>
        <Input
          id="slotId"
          type="number"
          min="0"
          max="1500"
          value={slotId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSlotId(e.target.value)
          }}
          placeholder={t('ui.fingerprints.form.slotIdPlaceholder')}
          disabled={enrollMutation.isPending}
        />
      </div>

      <EnrollFormStatus
        isError={enrollMutation.isError}
        isSuccess={enrollMutation.isSuccess}
      />

      <Button
        type="submit"
        disabled={enrollMutation.isPending || !slotId}
        size="md"
      >
        {enrollMutation.isPending
          ? t('ui.fingerprints.form.enrolling')
          : t('ui.fingerprints.form.enroll')}
      </Button>
    </form>
  )
}
