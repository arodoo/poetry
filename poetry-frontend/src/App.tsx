/*
 File: App.tsx
 Purpose: Root UI component demonstrating i18n usage with externalized
 literals (demo + layout domains). It wires the i18n provider and demonstrates
 routing and demo content for manual QA and developer previews. It is intended
 for development and manual QA only.
 All Rights Reserved. Arodi Emmanuel
*/
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useT } from './shared/i18n/useT'
import type { I18nKey } from './shared/i18n/generated/keys'

function App(): ReactElement {
  const t: (key: I18nKey, vars?: Record<string, unknown>) => string = useT()
  const [count, setCount]: [number, Dispatch<SetStateAction<number>>] =
    useState<number>(0)

  return (
    <>
      <div>
        {/* i18n-ignore: URL and rel attributes not user messages */}
        <a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
          <img
            src={viteLogo}
            className="logo"
            alt={t('ui.layout.logo.vite.alt')}
          />
        </a>
        {/* i18n-ignore: URL and rel attributes not user messages */}
        <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
          <img
            src={reactLogo}
            className="logo react"
            alt={t('ui.layout.logo.react.alt')}
          />
        </a>
      </div>
      <h1>{t('ui.demo.app.title')}</h1>
      <div className="card">
        <button
          onClick={(): void => {
            setCount((prev: number): number => prev + 1)
          }}
        >
          {t('ui.demo.counter.label', { count })}
        </button>
        <p>{t('ui.demo.hmr.hint')}</p>
      </div>
      <p className="read-the-docs">{t('ui.demo.readme.hint')}</p>
    </>
  )
}

export default App
