/*
 File: DemoPage.tsx
 Purpose: Extracted demo UI used by `App.tsx` so the app root remains
 small and under line limits enforced by CI hooks. Contains the same
 demo content used for manual QA and preview.
 All Rights Reserved. Arodi Emmanuel
*/
import { useState, type ReactElement } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { useT } from '../shared/i18n/useT'

export function DemoPage(): ReactElement {
  const t: (key: string) => string = useT()
  const [count, setCount] = useState<number>(0)
  const viteAlt: string = t('ui.layout.logo.vite.alt')
  const reactAlt: string = t('ui.layout.logo.react.alt')
  const onInc: () => void = (): void => {
    setCount((p: number): number => p + 1)
  }

  return (
    <>
      <div>
        {/* i18n-ignore: URL and rel attributes not user messages */}
        <a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt={viteAlt} />
        </a>
        {/* i18n-ignore: URL and rel attributes not user messages */}
        <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt={reactAlt} />
        </a>
      </div>
      <h1>{t('ui.demo.app.title')}</h1>
      <div className="card">
        <button onClick={onInc}>{t('ui.demo.counter.label', { count })}</button>
        <p>{t('ui.demo.hmr.hint')}</p>
      </div>
      <p className={'read-the-docs'}>{t('ui.demo.readme.hint')}</p>
    </>
  )
}

export default DemoPage
