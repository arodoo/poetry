/*
 * File: SubscriptionDescriptionField.tsx
 * Purpose: Description textarea for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { TextArea } from '../../../ui/TextArea/TextArea'
import { Text } from '../../../ui/Text/Text'

interface Props {
  description: string
  setDescription: (v: string) => void
}

export default function SubscriptionDescriptionField({ description, setDescription }: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">Description</Text>
      <TextArea value={description} onChange={(e) => { setDescription(e.target.value) }} rows={3} data-testid="subscription-description-input" />
    </Stack>
  )
}
