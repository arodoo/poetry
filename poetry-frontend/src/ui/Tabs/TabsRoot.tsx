/*
 File: TabsRoot.tsx
 Purpose: Accessible Tabs root, manages state and keyboard navigation.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, type KeyboardEvent } from 'react'
import { useState } from 'react'
import { useTabsKeyHandler } from './useTabsKeyHandler'
import { makeGetPanelId, makeGetTabId } from './useTabsIds'
import { TabsPanelsView } from './TabsPanelsView'
import { TabsHeader } from './TabsHeader'

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
  const baseId: string = idBase
  const getTabId: (i: number) => string = makeGetTabId(baseId)
  const getPanelId: (i: number) => string = makeGetPanelId(baseId)
  const select: (i: number) => void = (i: number): void => {
    if (items[i]?.disabled) return
    setActiveIndex(i)
    if (onChange) onChange(i)
  }
  const onKey: (e: KeyboardEvent<HTMLDivElement>) => void = useTabsKeyHandler(
    items.length,
    activeIndex,
    select,
    getTabId
  )

  return (
    <div data-tabs-root className={className}>
      <TabsHeader
        items={items}
        activeIndex={activeIndex}
        onSelect={select}
        onKeyDown={onKey}
        getTabId={getTabId}
        getPanelId={getPanelId}
      />
      <TabsPanelsView baseId={baseId} items={items} activeIndex={activeIndex} />
    </div>
  )
}
