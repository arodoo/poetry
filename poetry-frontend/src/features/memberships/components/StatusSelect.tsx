/*
 * File: StatusSelect.tsx
 * Purpose: Extracted status select field from MembershipFormFields.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Select } from '../../../ui/Select/Select'

interface Props {
  value: 'active' | 'inactive'
  onChange: (s: 'active' | 'inactive') => void
  t: (key: string) => string
}

export default function StatusSelect({ value, onChange, t }: Props): ReactElement {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{t('ui.memberships.form.status.label')}</label>
  <Select value={value} onChange={(e) => { onChange(e.target.value as 'active' | 'inactive') }}>
        <option value="active">{t('ui.memberships.status.active')}</option>
        <option value="inactive">{t('ui.memberships.status.inactive')}</option>
      </Select>
    </div>
  )
}
