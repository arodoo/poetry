import { StrictMode } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement: HTMLElement | null = document.getElementById('root')

if (rootElement !== null) {
  const root: Root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
