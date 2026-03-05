/*
 * File: SubscriptionCurrencyField.tsx
 * Purpose: Currency select for subscription form.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ChangeEvent } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { Select } from '../../../../ui/Select/Select'
import { Text } from '../../../../ui/Text/Text'

interface Props {
  t: (k: string) => string
  currency: string
  setCurrency: (v: string) => void
}

export default function SubscriptionCurrencyField({
  t,
  currency,
  setCurrency,
}: Props): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {t('ui.subscriptions.table.currency')}
      </Text>
      <Select
        value={currency}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          setCurrency(e.target.value)
        }}
        data-testid="subscription-currency-select"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="MXN">MXN</option>
      </Select>
    </Stack>
  )
}
