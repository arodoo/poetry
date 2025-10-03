/*
 * File: SellerCodesFormStatus.tsx
 * Purpose: Small subcomponent that renders the status select used by seller
 * codes create/edit forms. Extracted to keep the main form fields file
 * short and within repository line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Select } from '../../../ui/Select/Select'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface SellerCodesFormStatusProps {
  readonly status: 'active' | 'inactive' | 'expired'
  readonly onStatusChange: (v: 'active' | 'inactive' | 'expired') => void
  readonly t: ReturnType<typeof useT>
}

export function SellerCodesFormStatus(
  props: SellerCodesFormStatusProps
): ReactElement {
  return (
    <Stack gap="xs">
      <Text size="sm" className="font-medium">
        {props.t('ui.sellerCodes.form.status.label')}
      </Text>
      <Select
        value={props.status}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => {
          const raw: string = e.target.value
          const v: 'active' | 'inactive' | 'expired' = raw as
            | 'active'
            | 'inactive'
            | 'expired'
          props.onStatusChange(v)
        }}
        required
        data-testid="seller-code-status-select"
      >
        <option value="active">
          {props.t('ui.sellerCodes.status.active')}
        </option>
        <option value="inactive">
          {props.t('ui.sellerCodes.status.inactive')}
        </option>
        <option value="expired">
          {props.t('ui.sellerCodes.status.expired')}
        </option>
      </Select>
    </Stack>
  )
}
