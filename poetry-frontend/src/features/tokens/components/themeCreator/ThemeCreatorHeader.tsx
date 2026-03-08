/*
 * File: ThemeCreatorHeader.tsx
 * Purpose: Name input and base-theme selector for the Theme Creator
 * form. Extracted to keep ThemeCreatorFormView under line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import { type ReactElement } from 'react'
import type { TokenTheme } from '../../model/TokensSchemas'

interface Props {
  readonly name: string
  readonly themes: readonly TokenTheme[]
  readonly onNameChange: (v: string) => void
  readonly onBaseChange: (key: string) => void
  readonly t: (k: string) => string
}

export function ThemeCreatorHeader(p: Props): ReactElement {
  return (
    <div className="flex flex-wrap gap-md">
      <input
        data-testid="theme-creator-name"
        type="text"
        value={p.name}
        onChange={(e): void => p.onNameChange(e.target.value)}
        placeholder={p.t('ui.tokens.creator.namePlaceholder')}
        className="px-sm py-xs border border-border rounded-md
                   bg-surface text-text text-sm flex-1 min-w-[200px]"
      />
      <select
        data-testid="theme-creator-base"
        onChange={(e): void => p.onBaseChange(e.target.value)}
        className="px-sm py-xs border border-border rounded-md
                   bg-surface text-text text-sm"
      >
        <option value="">{p.t('ui.tokens.creator.baseLabel')}</option>
        {p.themes.map(
          (th: TokenTheme): ReactElement => (
            <option key={th.key} value={th.key}>
              {th.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}
