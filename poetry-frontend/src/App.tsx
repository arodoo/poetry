/*
 File: App.tsx
 Purpose: Root UI for the frontend sample.
 Demonstrates basic state handling and links for
 the Vite + React template. Lines are wrapped to
 60 characters. All Rights Reserved. Arodi
 Emmanuel
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

function App(): ReactElement {
  const [count, setCount]: [number, Dispatch<SetStateAction<number>>] =
    useState<number>(0)

  return (
    <>
      <div>
        {/* i18n-ignore: rel attribute, non-user-facing */}
        <a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        {/* i18n-ignore: rel attribute, non-user-facing */}
        <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={(): void => {
            setCount((prev: number): number => prev + 1)
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
