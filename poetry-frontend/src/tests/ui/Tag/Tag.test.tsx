/*
 File: Tag.test.tsx
 Purpose: Smoke test for Tag component with removable button.
 All Rights Reserved. Arodi Emmanuel
*/
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Tag } from '../../../ui/Tag/Tag'

describe('Tag', () => {
  it('fires onRemove', () => {
    const fn = vi.fn()
    const { getByLabelText } = render(<Tag onRemove={fn}>A</Tag>)
    fireEvent.click(getByLabelText('remove'))
    expect(fn).toHaveBeenCalled()
  })
})
