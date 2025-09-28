/*
 * File: PublicForgotPasswordForm.tsx
 * Purpose: Present forgot-password form with accessible controls.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { FormEvent, ReactElement, ChangeEvent } from 'react'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'

export interface PublicForgotPasswordFormProps {
  readonly emailValue: string
  readonly onEmailChange: (value: string) => void
  readonly onSubmit: (event: FormEvent<HTMLFormElement>) => void
  readonly isSubmitting: boolean
  readonly title: string
  readonly description: string
  readonly emailLabel: string
  readonly submitLabel: string
  readonly pendingLabel: string
  readonly successMessage?: string | undefined
  readonly errorMessage?: string | undefined
}

export function PublicForgotPasswordForm(
  props: PublicForgotPasswordFormProps
): ReactElement {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    props.onEmailChange(event.target.value)
  }

  return (
    <Card padding="lg" radius="lg" className="mx-auto max-w-lg">
      <Stack gap="md">
        <Stack gap="xs">
          <Heading level={1} size="lg" weight="bold">
            {props.title}
          </Heading>
          <Text size="sm">{props.description}</Text>
        </Stack>
        <form onSubmit={props.onSubmit} className="space-y-4">
          <label className="flex flex-col gap-1" htmlFor="forgot-email">
            <span className="text-sm font-medium">{props.emailLabel}</span>
            <Input
              id="forgot-email"
              type="email"
              autoComplete="email"
              value={props.emailValue}
              onChange={handleChange}
              data-testid="forgot-email-input"
            />
          </label>
          <Button
            type="submit"
            disabled={props.isSubmitting}
            className="w-full"
          >
            {props.isSubmitting ? props.pendingLabel : props.submitLabel}
          </Button>
        </form>
        {props.successMessage ? (
          <Text size="sm" data-testid="forgot-success">
            {props.successMessage}
          </Text>
        ) : null}
        {props.errorMessage ? (
          <Text
            size="sm"
            className="text-[color:var(--color-danger,#b91c1c)]"
            data-testid="forgot-error"
          >
            {props.errorMessage}
          </Text>
        ) : null}
      </Stack>
    </Card>
  )
}
