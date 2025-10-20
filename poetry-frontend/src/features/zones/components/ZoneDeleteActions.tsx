/*
 File: ZoneDeleteActions.tsx
 Purpose: Presentational action group for zone deletion confirmation. It
 provides Cancel and Confirm buttons and accepts callbacks and a submitting
 state flag. Extracted from the page to reduce file length and make the
 actions easier to test and reuse. All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'
import { Stack } from '../../../ui/Stack/Stack'
import type { useT } from '../../../shared/i18n/useT'

export interface ZoneDeleteActionsProps {
  isSubmitting: boolean
  onCancel: () => void
  onConfirm: () => void
  t: ReturnType<typeof useT>
}

export function ZoneDeleteActions(props: ZoneDeleteActionsProps): ReactElement {
  return (
    <Stack gap="md">
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={props.onCancel}
          data-testid="cancel-delete-zone-button"
        >
          {props.t('ui.zones.actions.cancel')}
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={props.onConfirm}
          disabled={props.isSubmitting}
          data-testid="confirm-delete-zone-button"
        >
          {props.t('ui.zones.actions.confirmDelete')}
        </Button>
      </div>
    </Stack>
  )
}
