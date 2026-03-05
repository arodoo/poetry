/*
 * File: SubscriptionDescriptionField.tsx
 * Purpose: Description textarea for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { TextArea } from '../../../../ui/TextArea/TextArea'
import { Text } from '../../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  description: string
  setDescription: (v: string) => void
}

export default function SubscriptionDescriptionField({
  t,
  description,
  setDescription,
}: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {t('ui.subscriptions.table.description')}
      </Text>
      <TextArea
        value={description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          setDescription(e.target.value)
        }}
        rows={3}
        data-testid="subscription-description-input"
      />
    </Stack>
  )
}
