/*
 * File: publicRoutes.ts
 * Purpose: Locale-aware routes for public landing pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'

export const publicRoutes: RouteObject[] = [
  {
    path: '/:locale',
    element: React.createElement(HomePage),
  },
]
