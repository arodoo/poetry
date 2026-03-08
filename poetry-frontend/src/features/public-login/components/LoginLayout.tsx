/*
 * File: LoginLayout.tsx
 * Purpose: Full-screen split layout for the login page. Provides a
 * decorative left panel for branding and a centered right panel for
 * the form, over a dance-themed dark gradient background.
 * All Rights Reserved. Arodi Emmanuel
 */
import type { ReactElement, ReactNode } from 'react'

interface Props {
  left: ReactNode
  right: ReactNode
}

const pageCls =
  'min-h-screen flex bg-gradient-to-br' +
  ' from-violet-950 via-purple-900 to-indigo-900'

const asideCls =
  'hidden lg:flex flex-col' + ' items-center justify-center w-1/2 gap-8 p-12'

const mainCls =
  'flex flex-col items-center' + ' justify-center w-full lg:w-1/2 p-6'

export function LoginLayout(props: Props): ReactElement {
  return (
    <div className={pageCls}>
      <aside className={asideCls}>{props.left}</aside>
      <main className={mainCls}>{props.right}</main>
    </div>
  )
}
