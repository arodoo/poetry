/*
 * File: publicLoginRoutes.ts
 * Purpose: Route registration for the public login page. Exports a
 * RouteObject with the localized login path and mounts the LoginPage
 * element. This variant avoids JSX so tools that parse plain TS can
 * consume the route without requiring JSX parsing.
 * All Rights Reserved. Arodi Emmanuel
 */

import React from 'react'
import type { RouteObject } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'

export const publicLoginRoutes: RouteObject = {
  path: '/:locale/login',
  element: React.createElement(LoginPage),
}

export default publicLoginRoutes
