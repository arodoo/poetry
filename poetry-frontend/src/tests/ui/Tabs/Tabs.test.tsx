/*
 File: Tabs.test.tsx
 Purpose: Tabs accessibility and interaction tests.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, afterEach } from 'vitest'
import { render, fireEvent, cleanup, within } from '@testing-library/react'
import { Tabs } from '../../../ui/Tabs/TabsRoot'

afterEach(() => cleanup())
const setup = () =>
  render(
    <Tabs
      items={[
        { label: 'One', panel: 'Panel One' },
        { label: 'Two', panel: 'Panel Two' },
        { label: 'Three', panel: 'Panel Three' },
      ]}
    />
  )

describe('Tabs', () => {
  it('renders tabs and first panel visible', () => {
    const { container } = setup()
    const scope = within(container)
    expect(scope.getAllByRole('tab', { name: 'One' })[0]).toBeInTheDocument()
    expect(scope.getByText('Panel One')).toBeVisible()
  })
  it('changes panel on click', () => {
    const { container } = setup()
    const scope = within(container)
    const two = scope.getAllByRole('tab', { name: 'Two' })[0]!
    fireEvent.click(two)
    expect(two).toHaveAttribute('aria-selected', 'true')
  })
  it('navigates with arrow keys', () => {
    const { container } = setup()
    const scope = within(container)
    const first = scope.getAllByRole('tab', { name: 'One' })[0]!
    const list = scope.getAllByRole('tablist')[0]!
    first.focus()
    fireEvent.keyDown(list, { key: 'ArrowRight' })
    expect(scope.getAllByRole('tab', { name: 'Two' })[0]).toHaveAttribute(
      'aria-selected',
      'true'
    )
  })
})
