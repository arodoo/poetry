/*
 * File: MenuItem.test.tsx
 * Purpose: Verify MenuItem variants (link/button, disabled, danger).
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { MenuItem } from '../../../../src/ui/MenuItem/MenuItem'

function wrap(ui: React.ReactElement): React.ReactElement {
  return <MemoryRouter>{ui}</MemoryRouter>
}

describe('MenuItem', () => {
  it('renders link with pointer class', () => {
    const { getByText } = render(wrap(<MenuItem to="/x">LinkItem</MenuItem>))
    expect(getByText('LinkItem').className).toMatch(/cursor-pointer/)
  })
  it('renders disabled button without pointer', () => {
    const { getByText } = render(
      wrap(<MenuItem disabled>DisabledItem</MenuItem>)
    )
    const el = getByText('DisabledItem')
    expect(el.className).not.toMatch(/cursor-pointer/)
    expect(el.className).toMatch(/cursor-not-allowed/)
  })
  it('applies danger class', () => {
    const { getByText } = render(wrap(<MenuItem danger>DangerItem</MenuItem>))
    expect(getByText('DangerItem').className).toMatch(/text-red-600/)
  })
  it('blocks click when disabled', () => {
    let clicked = false
    const { getByText } = render(
      wrap(
        <MenuItem
          disabled
          onClick={() => {
            clicked = true
          }}
        >
          NoClick
        </MenuItem>
      )
    )
    fireEvent.click(getByText('NoClick'))
    expect(clicked).toBeFalsy()
  })
})
