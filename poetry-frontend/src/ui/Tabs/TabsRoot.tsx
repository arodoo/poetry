/*
 File: TabsRoot.tsx
 Purpose: Accessible Tabs (items + panels) with keyboard navigation.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, useId, useState } from 'react'
import { tabClass } from './tabsHelpers'
import { useTabsKeyHandler } from './useTabsKeyHandler'
import { makeGetPanelId, makeGetTabId } from './useTabsIds'
import { TabsPanelsView } from './TabsPanelsView'

export interface TabItem {
  label: ReactNode
  panel: ReactNode
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  defaultIndex?: number
  onChange?: (index: number) => void
  idBase?: string
  className?: string
}

export function Tabs({
  items,
  defaultIndex = 0,
  onChange,
  idBase = 'tabs',
  className,
}: TabsProps): ReactElement {
  const [activeIndex, setActiveIndex] = useState<number>(defaultIndex)
  const baseId: string = useId() || idBase
  const getTabId: (i: number) => string = makeGetTabId(baseId)
  const getPanelId: (i: number) => string = makeGetPanelId(baseId)
  const select: (i: number) => void = (i: number): void => {
    if (items[i]?.disabled) return
    setActiveIndex(i)
    if (onChange) onChange(i)
  }
  const onKey: (e: React.KeyboardEvent<HTMLDivElement>) => void =
    useTabsKeyHandler(items.length, activeIndex, select, getTabId)

  return (
    <div data-tabs-root className={className}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={onKey}
        className="flex gap-2 border-b pb-1"
      >
        {items.map((it: TabItem, i: number): ReactElement => {
          const isSelected: boolean = i === activeIndex
          return (
            <button
              key={i}
              id={getTabId(i)}
              role="tab"
              aria-selected={isSelected ? 'true' : 'false'}
              aria-controls={getPanelId(i)}
              tabIndex={i === activeIndex ? 0 : -1}
              disabled={it.disabled}
              type="button"
              onClick={(): void => {
                select(i)
              }}
              className={tabClass(i === activeIndex, it.disabled)}
            >
              {it.label}
            </button>
          )
        })}
      </div>
      <TabsPanelsView baseId={baseId} items={items} activeIndex={activeIndex} />
    </div>
  )
}
