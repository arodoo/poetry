/*
 * File: StatusSelect.tsx
 * Purpose: Searchable status select for membership forms.
 * Provides ACTIVE/INACTIVE filtering via SearchableSelect.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'

interface Props {
  value: 'ACTIVE' | 'INACTIVE'
  onChange: (s: 'ACTIVE' | 'INACTIVE') => void
  t: (key: string) => string
}

export default function StatusSelect({
  value,
  onChange,
  t,
}: Props): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: 'ACTIVE', label: t('ui.memberships.status.active') },
      { value: 'INACTIVE', label: t('ui.memberships.status.inactive') },
    ],
    [t]
  )

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t('ui.memberships.form.status.label')}
      </label>
      <SearchableSelect
        options={options}
        value={value}
        onChange={(v: string): void => {
          onChange(v as 'ACTIVE' | 'INACTIVE')
        }}
        searchable={false}
        data-testid="membership-status-select"
      />
    </div>
  )
}
