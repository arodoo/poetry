/*
 * File: AdminTokensContent.tsx
 * Purpose: Inner content of the tokens admin page, rendered once data
 * is loaded. Displays selection card, form, preview and theme creator.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import type { TokenBundle } from '../model/TokensSchemas'
import { TokensSelectionCard } from '../components/selection/TokensSelectionCard'
import { TokensSelectionForm } from '../components/selection/TokensSelectionForm'
import { TokenPreviewCard } from '../components/TokenPreviewCard'
import { ThemeCreator } from '../components/themeCreator/ThemeCreator'

interface Props {
  bundle: TokenBundle
  formState: Record<string, string>
  onFieldChange: (k: string, v: string) => void
  onSubmit: () => void
  onCancel: () => void
  isSubmitting: boolean
  t: (k: string) => string
}

export function AdminTokensContent(p: Props): ReactElement {
  return (
    <div className="mt-6 space-y-6">
      <TokensSelectionCard current={p.bundle.current} t={p.t} />
      <TokensSelectionForm
        bundle={p.bundle}
        formState={p.formState}
        onFieldChange={p.onFieldChange}
        onSubmit={p.onSubmit}
        onCancel={p.onCancel}
        isSubmitting={p.isSubmitting}
        t={p.t}
      />
      <TokenPreviewCard />
      <ThemeCreator themes={p.bundle.themes} t={p.t} />
    </div>
  )
}
