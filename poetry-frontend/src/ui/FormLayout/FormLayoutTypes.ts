/*
 * File: FormLayoutTypes.ts
 * Purpose: Type definitions for FormLayout component.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactNode, FormEvent } from 'react'

export interface FormLayoutSection {
  readonly title?: string | undefined
  readonly description?: string | undefined
  readonly fields: ReactNode
}

export interface FormLayoutProps {
  readonly title?: string | undefined
  readonly description?: string | undefined
  readonly sections: readonly FormLayoutSection[]
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void
  readonly submitLabel: string
  readonly cancelLabel?: string | undefined
  readonly onCancel?: (() => void) | undefined
  readonly isSubmitting?: boolean | undefined
}
