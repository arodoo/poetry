/* File: Button.tsx
 Purpose: Thin Button wrapper that delegates class building to Button.utils.
 It keeps the component surface minimal so the file complies with repo
 line/char limits and easier maintenance. The component renders either
 as a native button, an anchor tag, or a react-router Link depending on
 the props passed. This file only contains a small wrapper around the
 class-building utilities to keep behavior consistent across the app.
 All Rights Reserved. Arodi Emmanuel
*/
import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { buildClassName } from './Button.utils'
import type { ButtonProps } from './Button.types'

export function Button(props: ButtonProps): ReactElement {
  // Build domProps by copying and removing styling-only keys so they are not
  // forwarded to DOM elements. This prevents unused variable complaints from
  // the linter while keeping intent explicit.
  const temp: Record<string, unknown> = {
    ...(props as unknown as Record<string, unknown>),
  }
  delete temp['variant']
  delete temp['size']
  delete temp['textTone']
  delete temp['width']
  delete temp['className']
  const domProps: Record<string, unknown> = temp

  const builtClassName: string = buildClassName(props)

  if (typeof domProps['to'] === 'string') {
    return <Link className={builtClassName} to={domProps['to']} {...domProps} />
  }

  if (typeof domProps['href'] === 'string') {
    return (
      <a className={builtClassName} href={domProps['href']} {...domProps} />
    )
  }

  return <button className={builtClassName} {...domProps} />
}
