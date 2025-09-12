/*
 File: Modal.test.tsx
 Purpose: Ensure modal renders, focuses, and closes via ESC and backdrop.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Modal } from '../../../ui'

describe('Modal', () => {
  it('renders content when open and focuses first focusable', async () => {
    const { unmount } = render(
      <Modal open onClose={() => {}} labelledBy="m-title">
        <h2 id="m-title">Title</h2>
        <button data-testid="first-btn">First</button>
      </Modal>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    const firstBtn = screen.getByTestId('first-btn')
    await waitFor(() => {
      expect(document.activeElement).toBe(firstBtn)
    })
    unmount()
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('closes on ESC', () => {
    let open = true
    const close = () => {
      open = false
    }
    const { unmount } = render(
      <Modal open={open} onClose={close}>
        <button>Inside</button>
      </Modal>
    )
    fireEvent.keyDown(window, { key: 'Escape' })
    unmount()
    expect(open).toBe(false)
  })

  it('closes on backdrop click when enabled', () => {
    let open = true
    const close = () => {
      open = false
    }
    const { unmount } = render(
      <Modal open={open} onClose={close}>
        <button>Inside</button>
      </Modal>
    )
    const backdrop = screen.getByTestId('modal-backdrop')
    fireEvent.click(backdrop)
    unmount()
    expect(open).toBe(false)
  })
})
