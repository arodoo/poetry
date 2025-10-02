/*
 * File: DetailView.tsx
 * Purpose: Generic detail view component for displaying entity information
 * in a structured, modern layout. All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'
import { Stack } from '../Stack/Stack'
import { Card } from '../Card/Card'
import { Heading } from '../Heading/Heading'
import clsx from 'clsx'

export interface DetailViewSection {
  readonly title: string
  readonly items: readonly DetailViewItem[]
}

export interface DetailViewItem {
  readonly label: string
  readonly value: ReactNode
  readonly fullWidth?: boolean
}

export interface DetailViewProps {
  readonly sections: readonly DetailViewSection[]
  readonly actions?: ReactNode
}

export function DetailView(props: DetailViewProps): ReactElement {
  return (
    <Stack gap="md">
      {props.sections.map(
        (section: DetailViewSection, idx: number): ReactElement => (
          <Card key={idx} padding="lg" shadow={true}>
            <Stack gap="md">
              <div className="flex items-center justify-between">
                <Heading level={3} size="md" className="font-semibold">
                  {section.title}
                </Heading>
                {idx === 0 && props.actions ? props.actions : null}
              </div>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {section.items.map(
                  (item: DetailViewItem, itemIdx: number): ReactElement => (
                    <div
                      key={itemIdx}
                      className={clsx(
                        item.fullWidth ? 'sm:col-span-2' : 'sm:col-span-1'
                      )}
                    >
                      <dt
                        className="text-sm font-medium text-neutral-500
                        dark:text-neutral-400"
                      >
                        {item.label}
                      </dt>
                      <dd
                        className="mt-1 text-sm text-neutral-900
                        dark:text-neutral-100"
                      >
                        {item.value}
                      </dd>
                    </div>
                  )
                )}
              </dl>
            </Stack>
          </Card>
        )
      )}
    </Stack>
  )
}
