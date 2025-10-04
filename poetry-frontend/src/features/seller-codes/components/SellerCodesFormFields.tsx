/*
 * File: SellerCodesFormFields.tsx
 * Purpose:         <Input
          value={props.organizationId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            props.onOrganizationIdChange(e.target.value)
          }
          placeholder={props.t('ui.sellerCodes.form.organization.placeholder')}
          data-testid="seller-code-org-input"
        />nput fields used by seller codes create and edit forms.
 * This component centralizes labels, inputs and change handlers to keep
 * form pages concise and consistent across the seller-codes feature.
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
  readonly organizationId: string
  readonly userId: string
  readonly status: 'active' | 'inactive' | 'expired'
  readonly onCodeChange: (value: string) => void
  readonly onOrganizationIdChange: (value: string) => void
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
      <Stack gap="xs">
        <Text size="sm" className="font-medium">
          {props.t('ui.sellerCodes.form.organization.label')}
        </Text>
        <Input
          value={props.organizationId}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            props.onOrganizationIdChange(e.target.value)
          }}
          placeholder={props.t('ui.sellerCodes.form.organization.placeholder')}
          data-testid="seller-code-org-input"
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
