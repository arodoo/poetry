/*
 * File: AccountPasswordFields.tsx
 * Purpose: Render the password form fields based on configuration.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { AccountConfirmPasswordField } from './AccountConfirmPasswordField'
import { AccountCurrentPasswordField } from './AccountCurrentPasswordField'
import { AccountNewPasswordField } from './AccountNewPasswordField'
import type { useT } from '../../../shared/i18n/useT'
import {
  type AccountPasswordChangeHandler,
  type AccountPasswordFieldErrors,
  type AccountPasswordFormValues,
} from '../model/AccountPasswordTypes'

type TranslateFn = ReturnType<typeof useT>

export interface AccountPasswordFieldsProps {
  readonly values: AccountPasswordFormValues
  readonly onChange: AccountPasswordChangeHandler
  readonly t: TranslateFn
  readonly policyText: string
  readonly fieldErrors: AccountPasswordFieldErrors
  readonly toggleShow: string
  readonly toggleHide: string
}

export function AccountPasswordFields(
  props: AccountPasswordFieldsProps
): ReactElement {
  const {
    values,
    onChange,
    t,
    policyText,
    fieldErrors,
    toggleShow,
    toggleHide,
  } = props
  const sharedProps: {
    onChange: AccountPasswordChangeHandler
    errors: AccountPasswordFieldErrors
    toggleShow: string
    toggleHide: string
    t: TranslateFn
  } = {
    onChange,
    errors: fieldErrors,
    toggleShow,
    toggleHide,
    t,
  }
  return (
    <Stack gap="md">
      <AccountCurrentPasswordField
        {...sharedProps}
        value={values.currentPassword}
      />
      <AccountNewPasswordField
        {...sharedProps}
        value={values.newPassword}
        policyText={policyText}
      />
      <AccountConfirmPasswordField
        {...sharedProps}
        value={values.confirmPassword}
      />
    </Stack>
  )
}
