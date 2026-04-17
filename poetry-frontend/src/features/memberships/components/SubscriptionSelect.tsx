/*
 * File: SubscriptionSelect.tsx
 * Purpose: Searchable subscription select for membership forms.
 * Converts subscription list to filterable dropdown options.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
import type { SubscriptionResponse } from '../../../api/generated'

interface Props {
  subscriptions: readonly SubscriptionResponse[]
  value: number
  onChange: (id: number) => void
  t: (key: string) => string
}

export default function SubscriptionSelect({
  subscriptions,
  value,
  onChange,
  t,
}: Props): ReactElement {
  const options: SelectOption[] = useMemo(
    () =>
      subscriptions.map(
        (s: SubscriptionResponse): SelectOption => ({
          value: String(s.id),
          label: s.name ?? '',
        })
      ),
    [subscriptions]
  )

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t('ui.memberships.form.subscription.label')}
      </label>
      <SearchableSelect
        options={options}
        value={String(value)}
        onChange={(v: string): void => {
          onChange(Number(v))
        }}
        placeholder={t('ui.memberships.form.subscription.placeholder')}
        data-testid="subscription-select"
      />
    </div>
  )
}
