/*
 File: Tab.tsx
 Purpose: Single tab trigger button referencing its panel by id.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
} from 'react'
import clsx from 'clsx'
import { useTabsContext } from './TabsContext'

export interface TabProps {
  children?: ReactNode
  index?: number
  className?: string
  disabled?: boolean
}

export function Tab({
  children,
  index,
  className,
  disabled = false,
}: TabProps): ReactElement {
  const { activeIndex, setActiveIndex, registerTab, getTabId, getPanelId } =
    useTabsContext()
  const reactId: string = useId()
  const internalIndexRef: React.RefObject<number | null> = useRef<
    number | null
  >(null)
  useEffect((): void => {
    const assigned: number = registerTab(reactId)
    ;(internalIndexRef as unknown as { current: number }).current = assigned
  }, [reactId, registerTab])
  const i: number =
    index ??
    (internalIndexRef as unknown as { current: number | undefined }).current ??
    0
  const selected: boolean = i === activeIndex
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  return (
    <button
      role="tab"
      id={getTabId(i)}
      aria-selected={selected ? 'true' : 'false'}
      aria-controls={getPanelId(i)}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      type="button"
      onClick={(): void => {
        setActiveIndex(i)
      }}
      className={clsx(
        'text-xs px-3 py-1 rounded-md transition-colors',
        selected
          ? 'bg-[var(--color-surface,#f5f5f5)] font-medium'
          : 'hover:bg-[var(--color-surface,#f0f0f0)]',
        ring,
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  )
}
