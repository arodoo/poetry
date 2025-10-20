/*
 * File: SubscriptionPriceField.tsx
 * Purpose: Price input for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { Text } from '../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  price: number
  setPrice: (v: number) => void
}

export default function SubscriptionPriceField({
  t,
  price,
  setPrice,
}: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {t('ui.subscriptions.table.price')}
      </Text>
      <Input
        type="number"
        value={price}
        onChange={(e) => {
          setPrice(Number(e.target.value))
        }}
        min="0"
        step="0.01"
        required
        data-testid="subscription-price-input"
      />
    </Stack>
  )
}
