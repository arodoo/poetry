/*
 * File: AccountNewPasswordField.tsx
 * Purpose: Provide the new password input with helper text and bindings.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { AccountPasswordField } from './AccountPasswordField'
import type { useT } from '../../../shared/i18n/useT'
import {
  type AccountPasswordChangeHandler,
  type AccountPasswordFieldErrors,
} from '../model/AccountPasswordTypes'

type TranslateFn = ReturnType<typeof useT>

export interface AccountNewPasswordFieldProps {
  readonly value: string
  readonly onChange: AccountPasswordChangeHandler
  readonly errors: AccountPasswordFieldErrors
  readonly toggleShow: string
  readonly toggleHide: string
  readonly policyText: string
  readonly t: TranslateFn
}

export function AccountNewPasswordField(
  props: AccountNewPasswordFieldProps
): ReactElement {
  return (
    <AccountPasswordField
      fieldId="newPassword"
      label={props.t('ui.account.security.password.new.label')}
      value={props.value}
      onChange={(value: string): void => {
        props.onChange('newPassword', value)
      }}
      toggleShow={props.toggleShow}
      toggleHide={props.toggleHide}
      autoComplete="new-password"
      required
      helperText={props.policyText}
      error={props.errors.newPassword ?? null}
    />
  )
}
