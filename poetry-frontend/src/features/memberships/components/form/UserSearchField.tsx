/*
 * File: UserSearchField.tsx
 * Purpose: Searchable user field for membership forms.
 * Features: Debounced search, results dropdown, selection handling.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useState, useRef } from 'react'
import { Input } from '../../../../ui/Input/Input'
import { useT } from '../../../../shared/i18n/useT'
import { useUsersPageQuery } from '../../../users/hooks/useUsersQueries'
import { useDebouncedCallback } from '../../../../shared/hooks/useDebouncedCallback'
import { useDocumentClick } from '../../../../shared/hooks/useDocumentClick'
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
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const usersQuery = useUsersPageQuery(0, 10, searchTerm)
  const users = usersQuery.data?.content ?? []

  const debouncedSearch = useDebouncedCallback((val: string) => {
    setSearchTerm(val)
    setIsOpen(true)
  }, 300)

  useDocumentClick(isOpen, [containerRef], () => { setIsOpen(false); })

  const handleSelect = (user: UserResponse): void => {
    onSelect(user)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="relative" ref={containerRef}>
      <label
        className="block text-sm font-medium mb-1"
        data-testid="selected-user-label"
      >
        {selectedUser
          ? `${selectedUser.firstName} ${selectedUser.lastName} (@${selectedUser.username})`
          : t('ui.memberships.form.user.label')}
      </label>
      <Input
        data-testid="user-search-input"
        placeholder={t('ui.memberships.form.user.search')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          { debouncedSearch(e.target.value); }
        }
        onFocus={() => {
          if (searchTerm) setIsOpen(true)
        }}
        autoComplete="off"
      />
      {isOpen && (
        <div
          className="absolute z-10 w-full mt-1 bg-surface border rounded shadow-lg max-h-60 overflow-auto"
          data-testid="user-search-results"
        >
          {usersQuery.isLoading && (
            <div
              className="p-2 text-sm text-textMuted"
              data-testid="user-search-loading"
            >
              {t('ui.memberships.form.user.searching')}
            </div>
          )}
          {!usersQuery.isLoading && users.length === 0 && (
            <div
              className="p-2 text-sm text-textMuted"
              data-testid="user-search-empty"
            >
              {t('ui.memberships.form.user.notFound')}
            </div>
          )}
          {users.map((u: UserResponse) => (
            <button
              key={u.id}
              type="button"
              data-testid={`user-search-result-${u.id}`}
              className="w-full text-left p-2 hover:bg-surfaceHover text-sm"
              onClick={() => { handleSelect(u); }}
            >
              <div className="font-medium">
                {u.firstName} {u.lastName}
              </div>
              <div className="text-xs text-textMuted">
                @{u.username} - {u.email}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
