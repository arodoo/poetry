/*
 * File: usersRoutes.ts
 * Purpose: Locale-scoped route definitions for admin users pages.
 * All Rights Reserved. Arodi Emmanuel
 */
import React from 'react'
import { type RouteObject } from 'react-router-dom'
import UsersListPage from '../pages/UsersListPage'
import UsersCreatePage from '../pages/UsersCreatePage'
import UserDetailPage from '../pages/UserDetailPage'
import UserEditPage from '../pages/UserEditPage'
import UserRolesPage from '../pages/UserRolesPage'
import UserSecurityPage from '../pages/UserSecurityPage'
import UserDisablePage from '../pages/UserDisablePage'
import UserEnablePage from '../pages/UserEnablePage'

export const usersRoutes: RouteObject[] = [
  {
    path: '/:locale/users',
    element: React.createElement(UsersListPage),
  },
  {
    path: '/:locale/users/new',
    element: React.createElement(UsersCreatePage),
  },
  {
    path: '/:locale/users/:id',
    element: React.createElement(UserDetailPage),
  },
  {
    path: '/:locale/users/edit/:id',
    element: React.createElement(UserEditPage),
  },
  {
    path: '/:locale/users/:id/roles',
    element: React.createElement(UserRolesPage),
  },
  {
    path: '/:locale/users/:id/security',
    element: React.createElement(UserSecurityPage),
  },
  {
    path: '/:locale/users/:id/disable',
    element: React.createElement(UserDisablePage),
  },
  {
    path: '/:locale/users/:id/enable',
    element: React.createElement(UserEnablePage),
  },
]
