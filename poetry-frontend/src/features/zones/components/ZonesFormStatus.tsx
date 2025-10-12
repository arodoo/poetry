/*
 * File: ZonesFormStatus.tsx
 * Purpose: Status select component for zone forms (create/edit).
 * Renders dropdown for active/inactive status selection.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface ZonesFormStatusProps {
  readonly status: 'active' | 'inactive'
  readonly onStatusChange: (v: 'active' | 'inactive') => void
  readonly t: ReturnType<typeof useT>
}

export function ZonesFormStatus(props: ZonesFormStatusProps): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.zones.form.status.label')}
      </Text>
      <Select
        value={props.status}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          const raw: string = e.target.value
          const v: 'active' | 'inactive' = raw as 'active' | 'inactive'
          props.onStatusChange(v)
        }}
        required
        data-testid="zone-status-select"
      >
        <option value="active">{props.t('ui.zones.status.active')}</option>
        <option value="inactive">{props.t('ui.zones.status.inactive')}</option>
      </Select>
    </Stack>
  )
}
