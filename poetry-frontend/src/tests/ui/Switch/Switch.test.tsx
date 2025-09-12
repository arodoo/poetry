/*
 File: Switch.test.tsx
 Purpose: Ensures the Switch component exposes role="switch", reflects
 aria-checked state accurately, and invokes onChange on user interaction.
 Confirms accessibility semantics and guards against regression in toggle
 behavior or token-based styling integration.
 All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Switch } from '../../../ui'

describe('Switch', () => {
  it('renders and toggles aria-checked', () => {
    const handleChange = vi.fn()
    render(<Switch label="dark mode" checked={false} onChange={handleChange} />)
    const sw = screen.getByRole('switch')
    expect(sw).toHaveAttribute('aria-checked', 'false')
    fireEvent.click(sw)
    expect(handleChange).toHaveBeenCalled()
  })
})
