/*
 File: Accordion.tsx
 Purpose: Accessible accordion supporting single or multiple expanded items.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode, useState } from 'react'
import { AccordionItemView } from './AccordionItemView'

export interface AccordionItem {
  id: string
  header: ReactNode
  content: ReactNode
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItem[]
  multiple?: boolean
  defaultExpanded?: string[]
  onChange?: (expandedIds: string[]) => void
  className?: string
}

export function Accordion({
  items,
  multiple = false,
  defaultExpanded = [],
  onChange,
  className,
}: AccordionProps): ReactElement {
  const [expanded, setExpanded] = useState<string[]>(defaultExpanded)
  const toggle: (id: string) => void = (id: string): void => {
    setExpanded((current: string[]): string[] => {
      const isOpen: boolean = current.includes(id)
      const next: string[] = isOpen
        ? current.filter((x: string): boolean => x !== id)
        : multiple
          ? [...current, id]
          : [id]
      if (onChange) onChange(next)
      return next
    })
  }

  function renderItem(it: AccordionItem): ReactElement {
    return (
      <AccordionItemView
        key={it.id}
        it={it}
        open={expanded.includes(it.id)}
        toggle={toggle}
      />
    )
  }

  return (
    <div className={className} data-accordion-root>
      {items.map(renderItem)}
    </div>
  )
}
