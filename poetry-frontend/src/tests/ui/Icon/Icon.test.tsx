/*
 File: Icon.test.tsx
 Purpose: Smoke test for Icon component ensuring size + tone classes set.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Icon } from '../../../ui/Icon/Icon'

describe('Icon', () => {
  it('renders svg with size class', () => {
    const { container } = render(
      <Icon>
        <path d="M0 0h10v10H0z" />
      </Icon>
    )
    const svg = container.querySelector('svg') as SVGSVGElement
    expect(svg.className.baseVal).toContain('w-5')
  })
})
