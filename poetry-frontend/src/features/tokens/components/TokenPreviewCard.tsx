/*
 * File: TokenPreviewCard.tsx
 * Purpose: Read-only preview card showing how the current theme tokens
 * (colors, spacing, radius, shadow) affect real UI elements.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'

export function TokenPreviewCard(): ReactElement {
  return (
    <div className="mt-8 p-md bg-surface border border-border rounded-md shadow-md transition-all duration-300">
      <h3 className="font-semibold text-lg text-text mb-sm transition-colors duration-300">
        Token Preview
      </h3>
      <p className="text-textMuted text-base mb-md transition-colors duration-300">
        This card automatically reflects changes in the selected theme,
        spacing, radius, shadow, and font size. Adjust the settings
        above to see real-time updates here.
      </p>
      <div className="flex gap-md transition-all duration-300">
        <button className="bg-primary text-onPrimary px-md py-sm rounded-md shadow-sm transition-all duration-300 hover:opacity-90 active:scale-95">
          Primary Action
        </button>
        <button className="bg-surface text-text border border-border px-md py-sm rounded-md transition-all duration-300 hover:bg-muted active:scale-95">
          Secondary Action
        </button>
      </div>
    </div>
  )
}
