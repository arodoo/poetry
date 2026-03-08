/*
 * File: SubscriptionStatusField.tsx
 * Purpose: Searchable status select for subscription forms.
 * Provides active/inactive filtering via SearchableSelect.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { Stack } from '../../../../ui/Stack/Stack'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../../ui/Text/Text'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'

interface Props {
  t: (k: string) => string
  status: 'active' | 'inactive'
  setStatus: (v: 'active' | 'inactive') => void
}

export default function SubscriptionStatusField({
  t,
  status,
  setStatus,
}: Props): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: t('ui.subscriptions.status.active') },
      { value: 'inactive', label: t('ui.subscriptions.status.inactive') },
    ],
    [t]
  )

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {t('ui.subscriptions.table.status')}
      </Text>
      <SearchableSelect
        options={options}
        value={status}
        onChange={(v: string): void => {
          setStatus(v as 'active' | 'inactive')
        }}
        searchable={false}
        data-testid="subscription-status-select"
      />
    </Stack>
  )
}
