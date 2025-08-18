/*
 File: main.tsx
 Purpose: Application entry point. Creates root
 and renders the App component. Lines are limited
 to 60 characters for readability. All Rights
 Reserved. Arodi Emmanuel
*/
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
    </StrictMode>
  )
}
