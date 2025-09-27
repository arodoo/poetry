/*
 File: index.ts
 Purpose: Spanish locale aggregator exporting domain maps.
 All Rights Reserved. Arodi Emmanuel
*/
import { commonEs } from './common/common'
import { layoutEs } from './layout/layout'
import { demoEs } from './demo/demo'
import { routeEs } from './route/route'
import publicAuth from './public-auth.json'
import accountEs from '../../../../features/account/locales/es.json'
import dashboardEs from '../../../../features/dashboard/locales/es.json'
import profileEs from '../../../../features/profile/locales/es.json'

export const esCatalog: Record<string, string> = {
  ...commonEs,
  ...layoutEs,
  ...demoEs,
  ...routeEs,
  ...publicAuth,
  ...accountEs,
  ...dashboardEs,
  ...profileEs,
}
