/*
 * File: SellerCodesFormStatus.tsx
 * Purpose: Searchable status select for seller codes create/edit forms.
 * Extracted to keep main form fields short and within line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, useMemo } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { SearchableSelect } from '../../../ui/SearchableSelect/SearchableSelect'
import { Text } from '../../../ui/Text/Text'
import type { SelectOption } from '../../../ui/SearchableSelect/SearchableSelect.types'
import type { useT } from '../../../shared/i18n/useT'

export interface SellerCodesFormStatusProps {
  readonly status: 'active' | 'inactive' | 'expired'
  readonly onStatusChange: (v: 'active' | 'inactive' | 'expired') => void
  readonly t: ReturnType<typeof useT>
}

export function SellerCodesFormStatus(
  props: SellerCodesFormStatusProps
): ReactElement {
  const options: SelectOption[] = useMemo(
    () => [
      { value: 'active', label: props.t('ui.sellerCodes.status.active') },
      { value: 'inactive', label: props.t('ui.sellerCodes.status.inactive') },
      { value: 'expired', label: props.t('ui.sellerCodes.status.expired') },
    ],
    [props.t]
  )

  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.sellerCodes.form.status.label')}
      </Text>
      <SearchableSelect
        options={options}
        value={props.status}
        onChange={(v: string): void => {
          props.onStatusChange(v as 'active' | 'inactive' | 'expired')
        }}
        required
        data-testid="seller-code-status-select"
      />
    </Stack>
  )
}
