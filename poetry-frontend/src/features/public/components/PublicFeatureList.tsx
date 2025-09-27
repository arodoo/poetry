/*
 * File: PublicFeatureList.tsx
 * Purpose: Render public landing feature highlights.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'

export interface PublicFeatureListItem {
  readonly title: string
  readonly description: string
}

export interface PublicFeatureListProps {
  readonly heading: string
  readonly features: readonly PublicFeatureListItem[]
}

export function PublicFeatureList(props: PublicFeatureListProps): ReactElement {
  return (
    <section className="mx-auto max-w-3xl p-6" data-testid="public-features">
      <Heading level={2} size="md">
        {props.heading}
      </Heading>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {props.features.map(
          (item: PublicFeatureListItem): ReactElement => (
            <li key={item.title}>
              <Card padding="md" radius="md">
                <Stack gap="xs">
                  <Heading level={3} size="sm" weight="medium">
                    {item.title}
                  </Heading>
                  <Text size="sm">{item.description}</Text>
                </Stack>
              </Card>
            </li>
          )
        )}
      </ul>
    </section>
  )
}
