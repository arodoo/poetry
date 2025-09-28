/*
 * File: PasswordInput.test.tsx
 * Purpose: Ensure toggle changes input type and aria-label.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, it, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import PasswordInput from '../../../ui/PasswordInput/PasswordInput'

describe('PasswordInput', () => {
  it('toggles visibility', () => {
    const { getByLabelText, getByDisplayValue } = render(
      <PasswordInput
        value="abc"
        onChange={() => {}}
        showLabel="Show"
        hideLabel="Hide"
      />
    )
    const btn: HTMLElement = getByLabelText('Show')
    fireEvent.click(btn)
    getByLabelText('Hide')
    // after toggle input type should be text
    const input: HTMLInputElement = getByDisplayValue('abc') as HTMLInputElement
    expect(input.type).toBe('text')
  })
})
