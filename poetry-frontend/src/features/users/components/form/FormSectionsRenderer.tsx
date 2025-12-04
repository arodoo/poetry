/*
 * File: FormSectionsRenderer.tsx
 * Purpose: Renders form sections with title, description and fields.
 * Extracted from UsersCreatePage for modularity and line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { FormLayoutSection } from '../../../../ui/FormLayout/FormLayout'

interface Props {
  readonly sections: readonly FormLayoutSection[]
}

export function UserFormSectionsRenderer({ sections }: Props): ReactElement {
  return (
    <div className="space-y-6">
      {sections.map((section, idx) => (
        <div key={section.title ?? idx} className="space-y-2">
          <div>
            {section.title && (
              <h3 className="text-lg font-medium">{section.title}</h3>
            )}
            {section.description && (
              <p className="text-sm text-[var(--color-textMuted)]">
                {section.description}
              </p>
            )}
          </div>
          <div>{section.fields}</div>
        </div>
      ))}
    </div>
  )
}
