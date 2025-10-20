/*
 * File: SubscriptionCurrencyField.tsx
 * Purpose: Currency select for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'

interface Props {
  currency: string
  setCurrency: (v: string) => void
}

export default function SubscriptionCurrencyField({
  currency,
  setCurrency,
}: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        Currency
      </Text>
      <Select
        value={currency}
        onChange={(e) => {
          setCurrency(e.target.value)
        }}
        data-testid="subscription-currency-select"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </Select>
    </Stack>
  )
}
