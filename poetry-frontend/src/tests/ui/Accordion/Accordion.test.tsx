/*
 File: Accordion.test.tsx
 Purpose: Tests for expand/collapse and a11y attrs.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, afterEach } from 'vitest'
import { render, fireEvent, cleanup, within } from '@testing-library/react'
import { Accordion } from '../../../ui/Accordion/Accordion'

afterEach(() => cleanup())
const setup = (multiple = false) =>
  render(
    <Accordion
      multiple={multiple}
      items={[
        { id: 'a', header: 'Section A', content: 'Content A' },
        { id: 'b', header: 'Section B', content: 'Content B' },
      ]}
    />
  )

describe('Accordion', () => {
  it('renders sections', () => {
    const { container } = setup()
    const scope = within(container)
    expect(
      scope.getByRole('button', { name: /section a/i })
    ).toBeInTheDocument()
  })
  it('expands and collapses single mode', () => {
    const { container } = setup()
    const scope = within(container)
    const btnA = scope.getAllByRole('button', { name: /section a/i })[0]!
    fireEvent.click(btnA)
    expect(btnA).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(btnA)
    expect(btnA).toHaveAttribute('aria-expanded', 'false')
  })
  it('allows multiple when enabled', () => {
    const { container } = setup(true)
    const scope = within(container)
    const btnA = scope.getAllByRole('button', { name: /section a/i })[0]!
    const btnB = scope.getAllByRole('button', { name: /section b/i })[0]!
    fireEvent.click(btnA)
    fireEvent.click(btnB)
    expect(btnA).toHaveAttribute('aria-expanded', 'true')
    expect(btnB).toHaveAttribute('aria-expanded', 'true')
  })
})
