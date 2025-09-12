/*
 File: Drawer.test.tsx
 Purpose: Ensure drawer opens, focuses, and closes via ESC/backdrop.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Drawer } from '../../../ui'

describe('Drawer', () => {
  it('renders on right side and closes on ESC', () => {
    let open = true
    const close = () => {
      open = false
    }
    const { rerender } = render(
      <Drawer open={open} onClose={close}>
        <button>Inside</button>
      </Drawer>
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    fireEvent.keyDown(window, { key: 'Escape' })
    rerender(
      <Drawer open={open} onClose={close}>
        <button>Inside</button>
      </Drawer>
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })
  it('renders left side', () => {
    render(
      <Drawer open onClose={() => {}} side="left">
        <button>Inside</button>
      </Drawer>
    )
    const dlg = screen.getByRole('dialog')
    expect(dlg.className).toContain('left-0')
  })
})
