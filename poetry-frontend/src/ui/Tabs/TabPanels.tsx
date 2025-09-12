/*
 File: TabPanels.tsx
 Purpose: Container for tab panels.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement, type ReactNode } from 'react'

export interface TabPanelsProps {
  children?: ReactNode
  className?: string
}

export function TabPanels({
  children,
  className,
}: TabPanelsProps): ReactElement {
  return <div className={className}>{children}</div>
}
