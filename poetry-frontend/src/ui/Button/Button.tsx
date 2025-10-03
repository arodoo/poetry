/* File: Button.tsx
 Purpose: Thin Button wrapper that delegates class building to Button.utils.
 It keeps the component surface minimal so the file complies with repo
 line/char limits and easier maintenance. The component renders either
 as a native button, an anchor tag, or a react-router Link depending on
 the props passed. This file only contains a small wrapper around the
 class-building utilities to keep behavior consistent across the app.
 All Rights Reserved. Arodi Emmanuel
*/
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
} from 'react'
import { Link } from 'react-router-dom'
import { buildClassName } from './Button.utils'
import type { ButtonProps } from './Button.types'

export function Button(props: ButtonProps): ReactElement {
  const rest: Record<string, unknown> = props as unknown as Record<
    string,
    unknown
  >
  const className: string = buildClassName(props)
  if ('to' in rest && typeof rest['to'] === 'string') {
    const to: string = rest['to']
    const linkProps: Record<string, unknown> = { ...rest }
    delete linkProps['to']
    return <Link className={className} to={to} {...linkProps} />
  }
  if ('href' in rest && typeof rest['href'] === 'string') {
    const anchorProps: AnchorHTMLAttributes<HTMLAnchorElement> =
      rest as AnchorHTMLAttributes<HTMLAnchorElement>
    return <a className={className} {...anchorProps} />
  }
  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> =
    rest as ButtonHTMLAttributes<HTMLButtonElement>
  return <button className={className} {...buttonProps} />
}
