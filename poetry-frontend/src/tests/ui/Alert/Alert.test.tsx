/*
 File: Alert.test.tsx
 Purpose: Smoke tests for the Alert component verifying the default
 status and specific variant mappings. Tests render the component
 and assert the presence of expected CSS classes to ensure styling
 tokens are applied and variants map to distinct visual styles.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Alert } from '../../../ui/Alert/Alert'

describe('Alert', () => {
  it('renders info by default', () => {
    const { container } = render(<Alert>info</Alert>)
    const el = container.firstChild as HTMLElement | null
    expect(el?.className).toMatch(/bg-/)
  })
  it('renders error variant', () => {
    const { container } = render(<Alert status="error">err</Alert>)
    const el = container.firstChild as HTMLElement | null
    expect(el?.className).toMatch(/var\(--color-error\)/)
  })
})
