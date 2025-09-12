/*
 File: TextArea.test.tsx
 Purpose: Smoke test for TextArea invalid state.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TextArea } from '../../../ui/TextArea/TextArea'

describe('TextArea', () => {
  it('sets aria-invalid when invalid', () => {
    const { getByRole } = render(<TextArea invalid />)
    const el = getByRole('textbox')
    expect(el.getAttribute('aria-invalid')).toBe('true')
  })
})
