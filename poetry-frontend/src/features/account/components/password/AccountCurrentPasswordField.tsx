/*
 * File: AccountCurrentPasswordField.tsx
 * Purpose: Field wrapper for the current password entry.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { AccountPasswordField } from './AccountPasswordField'
import type { useT } from '../../../../shared/i18n/useT'
import {
  type AccountPasswordChangeHandler,
  type AccountPasswordFieldErrors,
} from '../../model/AccountPasswordTypes'

type TranslateFn = ReturnType<typeof useT>

export interface AccountCurrentPasswordFieldProps {
  readonly value: string
  readonly onChange: AccountPasswordChangeHandler
  readonly errors: AccountPasswordFieldErrors
  readonly toggleShow: string
  readonly toggleHide: string
  readonly t: TranslateFn
}

export function AccountCurrentPasswordField(
  props: AccountCurrentPasswordFieldProps
): ReactElement {
  return (
    <AccountPasswordField
      fieldId="currentPassword"
      label={props.t('ui.account.security.password.current.label')}
      value={props.value}
      onChange={(value: string): void => {
        props.onChange('currentPassword', value)
      }}
      toggleShow={props.toggleShow}
      toggleHide={props.toggleHide}
      required
      helperText={null}
      error={props.errors.currentPassword ?? null}
    />
  )
}
