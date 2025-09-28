/*
 * File: PublicHeroSection.tsx
 * Purpose: Present hero content for the public landing page.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'

export interface PublicHeroSectionProps {
  readonly heroTitle: string
  readonly heroBody: string
  readonly loginLabel: string
  readonly registerLabel: string
  readonly loginHref: string
  readonly registerHref: string
}

export function PublicHeroSection(props: PublicHeroSectionProps): ReactElement {
  return (
    <Stack
      as="section"
      gap="md"
      className="mx-auto max-w-3xl p-6"
      data-testid="public-hero"
    >
      <Heading level={1} size="lg" weight="bold">
        {props.heroTitle}
      </Heading>
      <Text size="md">{props.heroBody}</Text>
      <div className="flex gap-3">
        <Button to={props.loginHref} variant="primary">
          {props.loginLabel}
        </Button>
        <Button to={props.registerHref} variant="secondary">
          {props.registerLabel}
        </Button>
      </div>
    </Stack>
  )
}
