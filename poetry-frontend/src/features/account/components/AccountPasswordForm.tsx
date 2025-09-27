/*
 * File: AccountPasswordForm.tsx
 * Purpose: Compose the account password form using shared building blocks.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type FormEvent, type ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Button } from '../../../ui/Button/Button'
import { AccountPasswordAlerts } from './AccountPasswordAlerts'
import { AccountPasswordHeader } from './AccountPasswordHeader'
import { AccountPasswordFields } from './AccountPasswordFields'
import type { useT } from '../../../shared/i18n/useT'
import {
  type AccountPasswordChangeHandler,
  type AccountPasswordFieldErrors,
  type AccountPasswordFormValues,
  type AccountPasswordStatus,
} from '../model/AccountPasswordTypes'

export interface AccountPasswordFormProps {
  readonly values: AccountPasswordFormValues
  readonly onChange: AccountPasswordChangeHandler
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void
  readonly isSubmitting: boolean
  readonly t: ReturnType<typeof useT>
  readonly status: AccountPasswordStatus
  readonly fieldErrors: AccountPasswordFieldErrors
  readonly policyText: string
}

export function AccountPasswordForm(
  props: AccountPasswordFormProps
): ReactElement {
  return (
    <Card padding="lg" shadow radius="lg">
      <form onSubmit={props.onSubmit} noValidate>
        <Stack gap="md">
          <AccountPasswordHeader t={props.t} />
          <AccountPasswordFields
            values={props.values}
            onChange={props.onChange}
            t={props.t}
            policyText={props.policyText}
            fieldErrors={props.fieldErrors}
            toggleShow={props.t('ui.account.security.password.toggle.show')}
            toggleHide={props.t('ui.account.security.password.toggle.hide')}
          />
          <AccountPasswordAlerts
            error={props.status.error}
            success={props.status.success}
          />
          <Button
            type="submit"
            disabled={props.isSubmitting}
            className="ml-auto"
          >
            {props.isSubmitting
              ? props.t('ui.account.security.password.submit.loading')
              : props.t('ui.account.security.password.submit.label')}
          </Button>
        </Stack>
      </form>
    </Card>
  )
}
