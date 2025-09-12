/*
 File: TabPanel.tsx
 Purpose: Single tab panel linked to its tab via aria-labelledby.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import { useTabsContext } from './TabsContext'
import clsx from 'clsx'

export interface TabPanelProps {
  children?: ReactNode
  index?: number
  className?: string
  lazy?: boolean
}

export function TabPanel({
  children,
  index,
  className,
  lazy = false,
}: TabPanelProps): ReactElement | null {
  const { activeIndex, registerPanel, getPanelId, getTabId } = useTabsContext()
  const reactId: string = useId()
  const internalIndexRef: React.RefObject<number | null> = useRef<
    number | null
  >(null)
  useEffect((): void => {
    const assigned: number = registerPanel(reactId)
    ;(internalIndexRef as unknown as { current: number }).current = assigned
  }, [reactId, registerPanel])
  const i: number =
    index ?? (internalIndexRef as unknown as { current: number }).current
  const hidden: boolean = i !== activeIndex
  if (lazy && hidden) return null
  return (
    <div
      role="tabpanel"
      id={getPanelId(i)}
      aria-labelledby={getTabId(i)}
      hidden={hidden}
      className={clsx('pt-3 text-sm', className)}
    >
      {children}
    </div>
  )
}
