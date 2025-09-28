/*
 * File: PublicLoginForm.tsx
 * Purpose: Present login form for public users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ChangeEvent, ReactElement } from 'react'
import type { PublicLoginFormProps } from './PublicLoginForm.types'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Input } from '../../../ui/Input/Input'
import { Button } from '../../../ui/Button/Button'

// ...existing code imports and types are in PublicLoginForm.types.ts

export function PublicLoginForm(props: PublicLoginFormProps): ReactElement {
  function handleUsername(event: ChangeEvent<HTMLInputElement>): void {
    props.onUsernameChange(event.target.value)
  }

  function handlePassword(event: ChangeEvent<HTMLInputElement>): void {
    props.onPasswordChange(event.target.value)
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
          <label className="flex flex-col gap-1" htmlFor="login-username">
            <span className="text-sm font-medium">{props.usernameLabel}</span>
            <Input
              id="login-username"
              value={props.username}
              onChange={handleUsername}
              autoComplete="username"
              data-testid="login-username-input"
            />
          </label>
          <label className="flex flex-col gap-1" htmlFor="login-password">
            <span className="text-sm font-medium">{props.passwordLabel}</span>
            <Input
              id="login-password"
              type="password"
              value={props.password}
              onChange={handlePassword}
              autoComplete="current-password"
              data-testid="login-password-input"
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
        {props.errorMessage ? (
          <Text
            size="sm"
            className="text-[color:var(--color-danger,#b91c1c)]"
            data-testid="login-error"
          >
            {props.errorMessage}
          </Text>
        ) : null}
      </Stack>
    </Card>
  )
}
