/*
 File: Modal.tsx
 Purpose: Accessible modal dialog using Portal + Backdrop with focus
 handling. It manages escape-to-close and initial focus to respect a11y
 guidance. The panel exposes size presets and can be controlled via props.
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
import { ModalPanel } from './ModalPanel'
import { useModalEsc } from './useModalEsc'
import { useModalInitialFocus } from './useModalInitialFocus'

export interface ModalProps {
  open: boolean
  onClose: () => void
  children?: ReactNode
  labelledBy?: string
  describedBy?: string
  size?: 'sm' | 'md' | 'lg'
  initialFocusRef?: React.RefObject<HTMLElement>
  closeOnBackdrop?: boolean
}

export function Modal({
  open,
  onClose,
  children,
  labelledBy,
  describedBy,
  size = 'md',
  initialFocusRef,
  closeOnBackdrop = true,
}: ModalProps): ReactElement | null {
  const containerRef: RefObject<HTMLDivElement | null> = useRef(null)
  useModalEsc(open, onClose)
  useModalInitialFocus(open, containerRef, initialFocusRef)
  if (!open) return null
  const handleBackdropClick: () => void = (): void => {
    if (closeOnBackdrop) onClose()
  }
  const containerCls: string =
    'fixed inset-0 z-50 flex items-start justify-center ' +
    'overflow-y-auto p-4'
  return (
    <Portal>
      <Backdrop data-testid="modal-backdrop" onClick={handleBackdropClick} />
      <div className={containerCls}>
        <ModalPanel
          refProp={containerRef}
          {...(labelledBy ? { labelledBy } : {})}
          {...(describedBy ? { describedBy } : {})}
          size={size}
        >
          {children}
        </ModalPanel>
      </div>
    </Portal>
  )
}
