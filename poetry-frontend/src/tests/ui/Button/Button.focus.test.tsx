/*
 File: Button.focus.test.tsx
 Purpose: Ensure Button includes focus ring token classes.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Button } from '../../../ui/Button/Button'

describe('Button focus ring', () => {
  it('has focus ring classes', () => {
    const { getByRole } = render(<Button>Ok</Button>)
    const btn = getByRole('button')
    expect(btn.className).toContain('focus:ring-[var(--focus-ring-color)]')
  })
})
