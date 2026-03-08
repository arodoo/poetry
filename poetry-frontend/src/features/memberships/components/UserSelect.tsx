/*
 * File: UserSelect.tsx
 * Purpose: Searchable user select field for membership forms.
 * Converts user list to searchable options for quick filtering.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
import type { UserResponse } from '../../../api/generated'

interface Props {
  users: readonly UserResponse[]
  value: number
  onChange: (id: number) => void
  t: (key: string) => string
}

export default function UserSelect({
  users,
  value,
  onChange,
  t,
}: Props): ReactElement {
  const options: SelectOption[] = useMemo(
    () =>
      users.map((u: UserResponse): SelectOption => ({
        value: String(u.id),
        label: u.username ?? '',
        sublabel: u.email ?? '',
      })),
    [users]
  )

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t('ui.memberships.form.user.label')}
      </label>
      <SearchableSelect
        options={options}
        value={String(value)}
        onChange={(v: string): void => {
          onChange(Number(v))
        }}
        placeholder={t('ui.memberships.form.user.search')}
        data-testid="membership-user-select"
      />
    </div>
  )
}
