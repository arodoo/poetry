/*
 * File: FormSectionsRenderer.tsx
 * Purpose: Renders form sections with title, description and fields.
 * Extracted from UsersCreatePage for modularity and line limits.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'

export interface FormSection {
  title: string
  description?: string
  fields: ReactNode
}

interface Props {
  sections: FormSection[]
}

export function UserFormSectionsRenderer({ sections }: Props): ReactElement {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <div>
            <h3 className="text-lg font-medium">{section.title}</h3>
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
