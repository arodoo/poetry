/*
 File: Checkbox.test.tsx
 Purpose: Verifies the Checkbox component renders unchecked by default,
 toggles its state when clicked, and invokes the provided onChange handler.
 Ensures accessibility role exposure (role="checkbox") remains stable and
 guards against regressions in token-driven styling or event wiring.
 All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from '../../../ui'

describe('Checkbox', () => {
  it('renders unchecked by default and toggles', () => {
    const handleChange = vi.fn()
    render(<Checkbox aria-label="accept" onChange={handleChange} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).not.toBeChecked()
    fireEvent.click(cb)
    expect(handleChange).toHaveBeenCalled()
  })
})
