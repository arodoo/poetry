/*
 * File: AccountConfirmPasswordField.tsx
 * Purpose: Render the confirm password input with bindings.
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

export interface AccountConfirmPasswordFieldProps {
  readonly value: string
  readonly onChange: AccountPasswordChangeHandler
  readonly errors: AccountPasswordFieldErrors
  readonly toggleShow: string
  readonly toggleHide: string
  readonly t: TranslateFn
}

export function AccountConfirmPasswordField(
  props: AccountConfirmPasswordFieldProps
): ReactElement {
  return (
    <AccountPasswordField
      fieldId="confirmPassword"
      label={props.t('ui.account.security.password.confirm.label')}
      value={props.value}
      onChange={(value: string): void => {
        props.onChange('confirmPassword', value)
      }}
      toggleShow={props.toggleShow}
      toggleHide={props.toggleHide}
      autoComplete="new-password"
      required
      helperText={null}
      error={props.errors.confirmPassword ?? null}
    />
  )
}
