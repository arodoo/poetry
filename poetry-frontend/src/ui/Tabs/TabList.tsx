/*
 File: TabList.tsx
 Purpose: Container for tab buttons handling arrow key roving focus.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  type KeyboardEvent,
  useRef,
  Children,
  isValidElement,
} from 'react'
import clsx from 'clsx'
import { useTabsContext } from './TabsContext'
import { useTabListKeydown } from './hooks/useTabListKeydown'

export interface TabListProps {
  children?: ReactNode
  className?: string
}

export function TabList({ children, className }: TabListProps): ReactElement {
  const { activeIndex, setActiveIndex } = useTabsContext()
  const listRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null)
  const onKey: (e: KeyboardEvent<HTMLDivElement>) => void = useTabListKeydown(
    listRef,
    activeIndex,
    setActiveIndex
  )

  const finalChildren: ReactElement[] = Children.toArray(children).filter(
    (c: ReactNode): c is ReactElement => isValidElement(c)
  )
  if (finalChildren.length === 0)
    return (
      <div
        ref={listRef}
        onKeyDown={onKey}
        className={clsx('flex gap-2 border-b pb-1', className)}
      />
    )
  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      ref={listRef}
      onKeyDown={onKey}
      className={clsx('flex gap-2 border-b pb-1', className)}
    >
      <span role="tab" className="sr-only" tabIndex={-1} />
      {finalChildren}
    </div>
  )
}
