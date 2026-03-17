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
    <>
      <div className="lg:hidden mb-4">
        <select
          value={activeIndex}
          onChange={(e): void => onSelect(Number(e.target.value))}
          className="w-full p-3 text-base border-2 rounded-md bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-border)] font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
        >
          {items.map(
            (it: TabItem, i: number): ReactElement => (
              <option key={i} value={i} disabled={it.disabled}>
                {typeof it.label === 'string' ? it.label : `Tab ${i + 1}`}
              </option>
            )
          )}
        </select>
      </div>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="hidden lg:flex gap-2 border-b pb-1"
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
    </>
  )
}
