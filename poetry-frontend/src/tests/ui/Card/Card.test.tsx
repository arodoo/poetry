/*
 File: Card.test.tsx
 Purpose: Smoke tests for Card component ensuring structure and variants.
 All Rights Reserved. Arodi Emmanuel
*/
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Card, CardHeader, CardBody, CardFooter } from '../../../ui'

describe('Card', () => {
  it('renders header body footer', () => {
    render(
      <Card padding="sm" shadow radius="sm">
        <CardHeader>Head</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Foot</CardFooter>
      </Card>
    )
    expect(screen.getByText('Head')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Foot')).toBeInTheDocument()
  })

  it('fires onClick when interactive', () => {
    const fn = vi.fn()
    render(
      <Card interactive onClick={fn}>
        Clickable
      </Card>
    )
    fireEvent.click(screen.getByText('Clickable'))
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
