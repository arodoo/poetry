/*
 File: Backdrop.test.tsx
 Purpose: Smoke test ensuring backdrop renders with correct classes.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Backdrop } from '../../../ui'

describe('Backdrop', () => {
  it('applies opacity variant', () => {
    render(<Backdrop opacity="dark" data-testid="b" />)
    const el = screen.getByTestId('b')
    expect(el.className).toContain('bg-black/60')
  })
})
