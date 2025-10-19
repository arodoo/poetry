/*
 * File: SubscriptionDurationField.tsx
 * Purpose: Duration input for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  durationDays: number
  setDurationDays: (v: number) => void
}

export default function SubscriptionDurationField({ t, durationDays, setDurationDays }: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">{t('ui.subscriptions.table.duration')}</Text>
      <Input type="number" value={durationDays} onChange={(e) => { setDurationDays(Number(e.target.value)) }} min="1" required data-testid="subscription-duration-input" />
    </Stack>
  )
}
