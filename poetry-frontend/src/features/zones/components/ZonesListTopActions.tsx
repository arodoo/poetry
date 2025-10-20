/*
 * File: ZonesListTopActions.tsx
 * Purpose: Top actions for zones list (create new). Extracted to reduce file
 * length and follow single-responsibility.
 * All Rights Reserved. Arodi Emmanuel
 */
import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

export interface ZonesListTopActionsProps {
  locale: string
  t: (k: string) => string
}

export function ZonesListTopActions(
  props: ZonesListTopActionsProps
): ReactElement {
  return (
    <div className="flex justify-end">
      <Link to={`/${props.locale}/zones/new`} className="btn btn-primary">
        <PlusIcon className="h-5 w-5" aria-hidden="true" />
        {props.t('list.actions.create')}
      </Link>
    </div>
  )
}
