/*
 * File: SelectedLabel.tsx
 * Purpose: Small presentational component that shows the currently
 * selected value label below the search input in SearchableSelect
 * when the dropdown is closed. Extracted to reduce main file lines.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'

interface SelectedLabelProps {
  readonly testId?: string
  readonly text: string
}

export function SelectedLabel(props: SelectedLabelProps): ReactElement {
  return (
    <div
      className="mt-1 text-xs text-textMuted truncate"
      data-testid={props.testId ? `${props.testId}-selected` : undefined}
    >
      {props.text}
    </div>
  )
}
