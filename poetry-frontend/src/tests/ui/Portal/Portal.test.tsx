/*
 File: Portal.test.tsx
 Purpose: Ensure Portal renders children into body.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Portal } from '../../../ui'

describe('Portal', () => {
  it('renders into body', async () => {
    render(
      <Portal>
        <span data-testid="p-x">Hello</span>
      </Portal>
    )
    expect(await screen.findByTestId('p-x')).toBeInTheDocument()
    // Ensure not inside a react root wrapper
    const el = screen.getByTestId('p-x')
    expect(document.body.contains(el)).toBe(true)
  })
})
