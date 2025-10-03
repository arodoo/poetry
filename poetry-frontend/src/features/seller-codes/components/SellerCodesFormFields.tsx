/*
 * File: SellerCodesFormFields.tsx
 * Purpose: Render input fields used by seller codes create and edit forms.
 * This component centralizes labels, inputs and change handlers to keep
 * form pages concise and consistent across the seller-codes feature.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement, type ChangeEvent } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Input } from '../../../ui/Input/Input'
import { SellerCodesFormStatus } from './SellerCodesFormStatus'
import { Text } from '../../../ui/Text/Text'
import type { useT } from '../../../shared/i18n/useT'

export interface SellerCodesFormFieldsProps {
  readonly code: string
  readonly orgId: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly onCodeChange: (value: string) => void
  readonly onOrgIdChange: (value: string) => void
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
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.sellerCodes.form.organization.label')}
        </Text>
        <Input
          value={props.orgId}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onOrgIdChange(e.target.value)
          }}
          placeholder={props.t('ui.sellerCodes.form.organization.placeholder')}
          data-testid="seller-code-org-input"
        />
      </Stack>

      <SellerCodesFormStatus
        status={props.status}
        onStatusChange={props.onStatusChange}
        t={props.t}
      />
    </>
  )
}
