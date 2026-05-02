/*
 * File: AdminInsightCard.tsx
 * Purpose: Renders one compact admin user insight metric.
 * It is visual-only and receives already localized text.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { AdminInsight } from './adminInsightTypes'

const CARD_CLASS = [
  'rounded-xl border border-border',
  'bg-surface p-5 shadow-sm',
].join(' ')

export function AdminInsightCard({
  insight,
}: {
  readonly insight: AdminInsight
}): ReactElement {
  return (
    <article className={CARD_CLASS}>
      <p className="text-sm font-medium text-textMuted">
        {insight.label}
      </p>
      <p className="mt-3 text-3xl font-bold text-text">
        {insight.value}
      </p>
      <p className="mt-2 text-sm text-textMuted">
        {insight.hint}
      </p>
    </article>
  )
}