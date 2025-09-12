/*
 File: TabButton.tsx
 Purpose: Individual Tab button element with ARIA attributes.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'
import { tabClass } from './tabsHelpers'

export interface TabButtonProps {
  id: string
  panelId: string
  selected: boolean
  disabled?: boolean
  index: number
  onSelect: (i: number) => void
  children: ReactNode
}

export function TabButton({
  id,
  panelId,
  selected,
  disabled,
  index,
  onSelect,
  children,
}: TabButtonProps): ReactElement {
  return (
    <button
      key={index}
      id={id}
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      type="button"
      onClick={(): void => {
        onSelect(index)
      }}
      className={tabClass(selected, disabled)}
    >
      {children}
    </button>
  )
}
