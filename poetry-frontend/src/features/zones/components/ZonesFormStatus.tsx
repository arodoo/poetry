/*
 * File: ZonesFormStatus.tsx
 * Purpose: Searchable status select for zone forms (create/edit).
 * Renders filterable dropdown for active/inactive status.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../ui/Text/Text'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
import type { useT } from '../../../shared/i18n/useT'

export interface ZonesFormStatusProps {
  readonly status: 'active' | 'inactive'
  readonly onStatusChange: (v: 'active' | 'inactive') => void
  readonly t: ReturnType<typeof useT>
}

export function ZonesFormStatus(props: ZonesFormStatusProps): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: props.t('ui.zones.status.active') },
      { value: 'inactive', label: props.t('ui.zones.status.inactive') },
    ],
    [props.t]
  )

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.zones.form.status.label')}
      </Text>
      <SearchableSelect
        options={options}
        value={props.status}
        onChange={(v: string): void => {
          props.onStatusChange(v as 'active' | 'inactive')
        }}
        required
        data-testid="zone-status-select"
      />
    </Stack>
  )
}
