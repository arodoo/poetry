/*
 File: AccordionItemView.tsx
 Purpose: Render a single accordion item.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'
import clsx from 'clsx'

export interface AccordionItem {
  id: string
  header: ReactNode
  content: ReactNode
  disabled?: boolean
}

interface Props {
  it: AccordionItem
  open: boolean
  toggle: (id: string) => void
}

export function AccordionItemView({ it, open, toggle }: Props): ReactElement {
  const ring: string =
    'focus:outline-none focus:ring-[var(--focus-ring-color)] ' +
    'focus:ring-offset-1 focus:ring-[length:var(--focus-ring-width)]'
  return (
    <div key={it.id} className="border-b border-[var(--color-border,#e5e5e5)]">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${it.id}-panel`}
          id={`${it.id}-header`}
          disabled={it.disabled}
          onClick={(): void => {
            if (!it.disabled) toggle(it.id)
          }}
          className={clsx(
            'w-full text-left flex items-center justify-between gap-2',
            'py-2 text-sm',
            ring,
            it.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <span>{it.header}</span>
          <span className={open ? 'text-xs rotate-90' : 'text-xs'}>▶</span>
        </button>
      </h3>
      <div
        id={`${it.id}-panel`}
        role="region"
        aria-labelledby={`${it.id}-header`}
        hidden={!open}
        className="pb-3 text-sm"
      >
        {open && it.content}
      </div>
    </div>
  )
}
