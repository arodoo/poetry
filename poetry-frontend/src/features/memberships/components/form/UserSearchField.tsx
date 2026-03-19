/*
 * File: UserSearchField.tsx
 * Purpose: Searchable user field for membership sell forms.
 * Uses SearchableSelect with API-driven options loaded via
 * debounced search query on the users endpoint.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState, useMemo, useEffect } from 'react'
import { SearchableSelect } from '../../../../ui/SearchableSelect/SearchableSelect'
import type { SelectOption } from '../../../../ui/SearchableSelect/SearchableSelect.types'
import { useT } from '../../../../shared/i18n/useT'
import { useUsersPageQuery } from '../../../users/hooks/useUsersQueries'
import { useDebouncedCallback } from '../../../../shared/hooks/useDebouncedCallback'
import type { UserResponse } from '../../../../api/generated'

interface Props {
  onSelect: (user: UserResponse) => void
  selectedUser?: UserResponse | undefined
}

export default function UserSearchField({
  onSelect,
  selectedUser,
}: Props): ReactElement {
  const t = useT()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debouncedSetSearch = useDebouncedCallback((value: string) => {
    setDebouncedSearch(value)
  }, 300)

  useEffect(() => {
    debouncedSetSearch(searchTerm)
  }, [searchTerm, debouncedSetSearch])

  const usersQuery = useUsersPageQuery(0, 10, debouncedSearch)
  const users = usersQuery.data?.content ?? []

  const options: SelectOption[] = useMemo(
    () =>
      users.map(
        (u: UserResponse): SelectOption => ({
          value: String(u.id),
          label: `${u.firstName} ${u.lastName}`,
          sublabel: `@${u.username} - ${u.email}`,
        })
      ),
    [users]
  )

  const handleChange = (val: string): void => {
    const user = users.find((u) => String(u.id) === val)
    if (user) onSelect(user)
  }

  const handleInputChange = (value: string): void => {
    setSearchTerm(value)
  }

  return (
    <div>
      <label
        className="block text-sm font-medium mb-1"
        data-testid="selected-user-label"
      >
        {selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName} (@${selectedUser.username})`
          : t('ui.memberships.form.user.label')}
      </label>
      <SearchableSelect
        options={options}
        value={selectedUser ? String(selectedUser.id) : ''}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder={t('ui.memberships.form.user.search')}
        loading={usersQuery.isLoading}
        emptyText={t('ui.memberships.form.user.notFound')}
        data-testid="user-search-input"
      />
    </div>
  )
}
