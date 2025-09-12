/*
 File: Drawer.tsx
 Purpose: Side panel overlay (left or right) built atop Portal + Backdrop.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  type ReactElement,
  type ReactNode,
  useRef,
  type RefObject,
} from 'react'
import { Portal } from '../Portal/Portal'
import { Backdrop } from '../Backdrop/Backdrop'
import { DrawerPanel } from './DrawerPanel'
import { useModalEsc } from '../Modal/useModalEsc'
import { useModalInitialFocus } from '../Modal/useModalInitialFocus'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  side?: 'left' | 'right'
  children?: ReactNode
  width?: 'sm' | 'md' | 'lg'
  labelledBy?: string
  closeOnBackdrop?: boolean
  initialFocusRef?: React.RefObject<HTMLElement>
}

export function Drawer({
  open,
  onClose,
  side = 'right',
  children,
  width = 'md',
  labelledBy,
  closeOnBackdrop = true,
  initialFocusRef,
}: DrawerProps): ReactElement | null {
  const ref: RefObject<HTMLDivElement | null> = useRef(null)
  useModalEsc(open, onClose)
  useModalInitialFocus(open, ref, initialFocusRef)
  if (!open) return null
  const handleBackdropClick: () => void = (): void => {
    if (closeOnBackdrop) onClose()
  }
  return (
    <Portal>
      <Backdrop onClick={handleBackdropClick} />
      <div className="fixed inset-0 z-50 flex" aria-labelledby={labelledBy}>
        <DrawerPanel
          refProp={ref}
          {...(labelledBy ? { labelledBy } : {})}
          width={width}
          side={side}
        >
          {children}
        </DrawerPanel>
      </div>
    </Portal>
  )
}
