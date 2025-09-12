/*
 File: Radio.test.tsx
 Purpose: Validates the Radio component renders unchecked initially and
 triggers onChange when selected, confirming accessibility role integrity
 (role="radio") and event propagation contract for grouped inputs.
 All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Radio } from '../../../ui'

describe('Radio', () => {
  it('renders and triggers change when selected', () => {
    const handleChange = vi.fn()
    render(
      <Radio
        name="group"
        value="a"
        aria-label="option a"
        onChange={handleChange}
      />
    )
    const radio = screen.getByRole('radio')
    expect(radio).not.toBeChecked()
    fireEvent.click(radio)
    expect(handleChange).toHaveBeenCalled()
  })
})
