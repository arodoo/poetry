/*
 * File: PublicLoginForm.tsx
 * Purpose: Present login form for public users.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement } from 'react'
import type { PublicLoginFormProps } from './PublicLoginForm.types'
import { Card } from '../../../ui/Card/Card'
import { Stack } from '../../../ui/Stack/Stack'
import { Heading } from '../../../ui/Heading/Heading'
import { Text } from '../../../ui/Text/Text'
import { Button } from '../../../ui/Button/Button'
import { PublicLoginField } from './PublicLoginField'

export function PublicLoginForm(props: PublicLoginFormProps): ReactElement {
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
          <PublicLoginField
            id="login-username"
            name="username"
            label={props.usernameLabel}
            autoComplete="username"
            value={props.username}
            onValueChange={props.onUsernameChange}
            error={props.usernameError}
          />
          <PublicLoginField
            id="login-password"
            name="password"
            type="password"
            label={props.passwordLabel}
            autoComplete="current-password"
            value={props.password}
            onValueChange={props.onPasswordChange}
            error={props.passwordError}
          />
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
