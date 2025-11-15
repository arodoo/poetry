/*
 * File: SimEnrollForm.tsx
 * Purpose: Form input for simulator enrollment.
 * Slot ID number input with submit button.
 * All Rights Reserved. Arodi Emmanuel
 */

import type { ReactElement } from 'react'
import { Button } from '../../../../ui/Button/Button'
import { Input } from '../../../../ui/Input/Input'
import { useT } from '../../../../shared/i18n/useT'

interface Props {
  slotId: string
  onSlotIdChange: (value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function SimEnrollForm(props: Props): ReactElement {
  const t = useT()
  const { slotId, onSlotIdChange, onSubmit } = props

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        type="number"
        min="0"
        max="1500"
        value={slotId}
        onChange={(e) => {
          onSlotIdChange(e.target.value)
        }}
        placeholder={t('ui.fingerprints.form.slotIdPlaceholder')}
      />
      <Button type="submit" disabled={!slotId} size="md">
        {t('ui.fingerprints.simulator.enroll.button')}
      </Button>
    </form>
  )
}
