/*
 * File: UserDeleteActions.tsx
 * Purpose: Encapsulates the cancel and confirm buttons used on the user
 * deletion confirmation page. Extracting these controls keeps the page
 * implementation concise and makes the actions reusable in tests and other
 * small UIs. The component is purely presentational; it accepts callbacks and
 * a submission state flag. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import type { useT } from '../../../shared/i18n/useT'

export interface UserDeleteActionsProps {
  isSubmitting: boolean
  onCancel: () => void
  onConfirm: () => void
  t: ReturnType<typeof useT>
}

export function UserDeleteActions(props: UserDeleteActionsProps): ReactElement {
  return (
    <Stack gap="md">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={props.onCancel}
          data-testid="cancel-delete-user-button"
        >
          {props.t('ui.users.actions.cancel')}
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={props.onConfirm}
          disabled={props.isSubmitting}
          data-testid="confirm-delete-user-button"
        >
          {props.t('ui.users.actions.confirmDelete')}
        </Button>
      </div>
    </Stack>
  )
}
