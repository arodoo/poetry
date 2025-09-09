/*
 File: App.tsx
 Purpose: Root UI component demonstrating i18n usage with externalized
 literals (demo + layout domains). It wires the i18n provider and demonstrates
 routing and demo content for manual QA and developer previews. It is intended
 for development and manual QA only.
 All Rights Reserved. Arodi Emmanuel
*/
import { type ReactElement } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
