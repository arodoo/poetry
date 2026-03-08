/*
 * File: SubscriptionCurrencyField.tsx
 * Purpose: Searchable currency select for subscription forms.
 * Offers USD/EUR/GBP/MXN through a filterable dropdown.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../../ui/Text/Text'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'

interface Props {
  t: (k: string) => string
  currency: string
  setCurrency: (v: string) => void
}

const CURRENCY_OPTIONS: SelectOption[] = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
  { value: 'MXN', label: 'MXN' },
]

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
      <SearchableSelect
        options={CURRENCY_OPTIONS}
        value={currency}
        onChange={setCurrency}
        data-testid="subscription-currency-select"
      />
    </Stack>
  )
}
