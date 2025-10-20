/*
 * File: UserSelect.tsx
 * Purpose: Extracted user select field from MembershipFormFields to reduce file size.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Select } from '../../../ui/Select/Select'
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
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {t('ui.memberships.form.user.label')}
      </label>
      <Select
        value={value}
        onChange={(e) => {
          onChange(Number(e.target.value))
        }}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.username}
          </option>
        ))}
      </Select>
    </div>
  )
}
