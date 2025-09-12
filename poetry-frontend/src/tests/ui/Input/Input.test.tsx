/*
 File: Input.test.tsx
 Purpose: Smoke test for Input invalid state.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Input } from '../../../ui/Input/Input'

describe('Input', () => {
  it('sets aria-invalid when invalid', () => {
    const { getByRole } = render(<Input invalid />)
    const el = getByRole('textbox')
    expect(el.getAttribute('aria-invalid')).toBe('true')
  })
})
