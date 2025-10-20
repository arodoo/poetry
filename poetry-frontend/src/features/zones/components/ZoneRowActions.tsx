/*
 * File: ZoneRowActions.tsx
 * Purpose: Per-row action buttons for zones (edit/delete). Extracted to keep
 * the list shell concise. All Rights Reserved. Arodi Emmanuel
 */
import { Link } from 'react-router-dom'
import type { ReactElement } from 'react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { toTemplateString } from '../../../shared/utils/templateSafe'

export interface ZoneRowActionsProps {
  locale: string
  id?: number | string | null | undefined
  onDelete: (id: number) => void
}

export function ZoneRowActions(props: ZoneRowActionsProps): ReactElement {
  const idStr = toTemplateString(props.id)
  return (
    <>
      <Link
        to={`/${props.locale}/zones/edit/${idStr}`}
        className="text-action-primary hover:text-action-hover"
      >
        <PencilIcon className="h-5 w-5" />
      </Link>
      <button
        onClick={(): void => {
          if (props.id) {
            props.onDelete(Number(props.id))
          }
        }}
        className="ml-4 text-feedback-error"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </>
  )
}
