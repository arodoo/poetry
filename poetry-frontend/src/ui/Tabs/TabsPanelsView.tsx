/*
 File: TabsPanelsView.tsx
 Purpose: Render tab panels list given items and active index.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import { panelProps } from './tabsHelpers'
import type { TabItem } from './TabsRoot'

interface Props {
  baseId: string
  items: TabItem[]
  activeIndex: number
}

export function TabsPanelsView({
  baseId,
  items,
  activeIndex,
}: Props): ReactElement {
  return (
    <div>
      {items.map(
        (it: TabItem, i: number): ReactElement => (
          <div
            key={i}
            {...panelProps(baseId, i)}
            role="tabpanel"
            hidden={i !== activeIndex}
            className="pt-3 text-sm"
          >
            {i === activeIndex && it.panel}
          </div>
        )
      )}
    </div>
  )
}
