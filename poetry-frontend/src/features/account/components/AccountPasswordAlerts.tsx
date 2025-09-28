/*
 * File: AccountPasswordAlerts.tsx
 * Purpose: Render success and error alerts for the account password form.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import { Alert } from '../../../ui/Alert/Alert'

export interface AccountPasswordAlertsProps {
  readonly error: string | null
  readonly success: string | null
}

export function AccountPasswordAlerts(
  props: AccountPasswordAlertsProps
): ReactElement {
  if (props.error) {
    return (
      <Alert status="error" role="alert">
        {props.error}
      </Alert>
    )
  }
  if (props.success) {
    return (
      <Alert status="success" role="status">
        {props.success}
      </Alert>
    )
  }
  return <></>
}
