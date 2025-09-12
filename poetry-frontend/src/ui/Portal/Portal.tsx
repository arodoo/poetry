/*
 File: Portal.tsx
 Purpose: Lightweight portal abstraction with SSR/document guard.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

export interface PortalProps {
  children?: ReactNode
  containerId?: string
}

export function Portal({
  children,
  containerId,
}: PortalProps): ReactElement | null {
  const elRef: React.RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null)
  const [mounted, setMounted] = useState<boolean>(false)
  useEffect((): (() => void) | undefined => {
    if (typeof document === 'undefined') return undefined
    const existing: HTMLElement | null = containerId
      ? document.getElementById(containerId)
      : null
    const node: HTMLDivElement = existing
      ? (existing as HTMLDivElement)
      : document.createElement('div')
    if (!existing) {
      if (containerId) node.id = containerId
      document.body.appendChild(node)
    }
    elRef.current = node
    setMounted(true)
    return (): void => {
      if (!existing && node.parentNode) {
        node.parentNode.removeChild(node)
      }
    }
  }, [containerId])
  if (!mounted || !elRef.current) return null
  return createPortal(children, elRef.current)
}
