/*
 * File: UsersListTopActions.tsx
 * Purpose: Top actions area for UsersListPage (New user button).
 * Extracted to reduce page file length and comply with lint rules.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Button } from '../../../ui/Button/Button'

export interface UsersListTopActionsProps {
  locale: string
  t: (k: string) => string
}

export function UsersListTopActions(
  props: UsersListTopActionsProps
): ReactElement {
  return (
    <Button to={`/${props.locale}/users/new`} size="md" width="fixed-large">
      {props.t('ui.users.actions.new')}
    </Button>
  )
}
