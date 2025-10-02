/*
 * File: FormLayout.tsx
 * Purpose: Generic form layout with sections and spacing.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../Stack/Stack'
import { Card } from '../Card/Card'
import { Button } from '../Button/Button'
import { Inline } from '../Inline/Inline'
import type { FormLayoutProps, FormLayoutSection } from './FormLayoutTypes'
import { FormHeader, SectionHeader } from './FormLayoutComponents'

export type { FormLayoutProps, FormLayoutSection }

export function FormLayout(props: FormLayoutProps): ReactElement {
  return (
    <form onSubmit={props.onSubmit} noValidate>
      <Stack gap="lg">
        <FormHeader title={props.title} description={props.description} />
        {props.sections.map(
          (section: FormLayoutSection, idx: number): ReactElement => (
            <Card key={idx} padding="lg" shadow={true}>
              <Stack gap="md">
                <SectionHeader
                  title={section.title}
                  description={section.description}
                />
                <div className="space-y-4">{section.fields}</div>
              </Stack>
            </Card>
          )
        )}
        <div
          className={[
            'flex',
            'justify-end',
            'border-t',
            'border-[var(--color-border)]',
            'pt-4',
          ].join(' ')}
        >
          <Inline gap="sm">
            {props.onCancel ? (
              <Button
                type="button"
                variant="secondary"
                onClick={props.onCancel}
                disabled={props.isSubmitting}
              >
                {props.cancelLabel ?? 'Cancel'}
              </Button>
            ) : null}
            <Button type="submit" disabled={props.isSubmitting}>
              {props.submitLabel}
            </Button>
          </Inline>
        </div>
      </Stack>
    </form>
  )
}
