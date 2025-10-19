/*
 * File: SubscriptionNameField.tsx
 * Purpose: Name input field for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  name: string
  setName: (v: string) => void
}

export default function SubscriptionNameField({ t, name, setName }: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">{t('ui.subscriptions.table.name')}</Text>
      <Input type="text" value={name} onChange={(e) => { setName(e.target.value) }} required data-testid="subscription-name-input" />
    </Stack>
  )
}
