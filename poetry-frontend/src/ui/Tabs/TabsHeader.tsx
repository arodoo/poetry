/*
 File: TabsHeader.tsx
 Purpose: Render the tablist and buttons for Tabs with a11y attributes.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type KeyboardEvent } from 'react'
import { tabClass } from './hooks/tabsHelpers'
import type { TabItem } from './TabsRoot'

export interface TabsHeaderProps {
  items: TabItem[]
  activeIndex: number
  onSelect: (index: number) => void
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void
  getTabId: (i: number) => string
  getPanelId: (i: number) => string
}

export function TabsHeader({
  items,
  activeIndex,
  onSelect,
  onKeyDown,
  getTabId,
  getPanelId,
}: TabsHeaderProps): ReactElement {
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={onKeyDown}
      className="flex gap-2 border-b pb-1"
    >
      {items.map((it: TabItem, i: number): ReactElement => {
        const isSelected: boolean = i === activeIndex
        return (
          <button
            key={i}
            id={getTabId(i)}
            role="tab"
            aria-selected={isSelected}
            aria-controls={getPanelId(i)}
            tabIndex={i === activeIndex ? 0 : -1}
            disabled={it.disabled}
            type="button"
            onClick={(): void => {
              onSelect(i)
            }}
            className={tabClass(isSelected, it.disabled)}
          >
            {it.label}
          </button>
        )
      })}
    </div>
  )
}
