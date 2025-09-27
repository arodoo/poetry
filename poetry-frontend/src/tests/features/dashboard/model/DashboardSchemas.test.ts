/*
 * File: DashboardSchemas.test.ts
 * Purpose: Validate dashboard overview schema invariants and parsing.
 * All Rights Reserved. Arodi Emmanuel
 */
import { describe, expect, it } from 'vitest'
import { DashboardOverviewSchema } from '../../../../features/dashboard'

const validPayload = {
  totalPoems: 12,
  publishedPoems: 7,
  draftPoems: 5,
  activeMembers: 3,
  highlightKey: 'ui.dashboard.overview.highlight.default',
  lastUpdatedLabel: '2025-09-27 10:00',
}

describe('DashboardSchemas', () => {
  it('accepts a consistent overview payload', () => {
    expect(DashboardOverviewSchema.safeParse(validPayload).success).toBe(true)
  })

  it('rejects when published and draft exceed total count', () => {
    const result = DashboardOverviewSchema.safeParse({
      ...validPayload,
      totalPoems: 8,
    })
    expect(result.success).toBe(false)
  })
})
