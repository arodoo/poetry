/*
 * File: UserListActions.tsx
 * Purpose: Small actions cell for users table (view/edit). Extracted to
 * reduce column file length and follow single-responsibility.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Inline } from '../../../ui/Inline/Inline'
import { Button } from '../../../ui/Button/Button'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export interface UserListActionsProps {
  locale: string
  id?: string | number | null | undefined
  t: (k: string) => string
}

export function UserListActions(props: UserListActionsProps): ReactElement {
  const idStr = toTemplateString(props.id)
  return (
    <Inline gap="xs">
      <Button
        to={`/${props.locale}/users/${idStr}`}
        size="sm"
        width="fixed-small"
        data-testid={`view-user-${idStr}`}
      >
        {props.t('ui.users.actions.view')}
      </Button>
    </Inline>
  )
}
