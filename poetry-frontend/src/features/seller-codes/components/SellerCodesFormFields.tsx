/*
 * File: SellerCodesFormFields.tsx
 * Purpose: Input fields used by seller codes create and edit forms.
 * Centralizes labels, inputs, and change handlers for the seller-codes
 * feature. The organization field has been removed per product decision
 * (duplicate company IDs caused collisions; the field was redundant).
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { SellerCodesFormStatus } from './SellerCodesFormStatus'
import { UserSelect } from './UserSelect'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface SellerCodesFormFieldsProps {
  readonly code: string
  readonly userId: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly onCodeChange: (value: string) => void
  readonly onUserIdChange: (value: string) => void
  readonly onStatusChange: (value: 'active' | 'inactive' | 'expired') => void
  readonly t: ReturnType<typeof useT>
}

export function SellerCodesFormFields(
  props: SellerCodesFormFieldsProps
): ReactElement {
  return (
    <>
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.sellerCodes.form.code.label')}
        </Text>
        <Input
          value={props.code}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onCodeChange(e.target.value)
          }}
          placeholder={props.t('ui.sellerCodes.form.code.placeholder')}
          required
          data-testid="seller-code-input"
        />
      </Stack>
      <UserSelect
        value={props.userId}
        onChange={props.onUserIdChange}
        t={props.t}
        required
      />
      <SellerCodesFormStatus
        status={props.status}
        onStatusChange={props.onStatusChange}
        t={props.t}
      />
    </>
  )
}
