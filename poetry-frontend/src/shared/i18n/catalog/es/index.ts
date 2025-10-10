/*
 File: index.ts
 Purpose: Spanish locale aggregator exporting domain maps.
 All Rights Reserved. Arodi Emmanuel
*/
import { commonEs } from './common/common'
import { layoutEs } from './layout/layout'
import { demoEs } from './demo/demo'
import { routeEs } from './route/route'
import { publicHomeEs } from './public-home/public-home'
import accountEs from '../../../../features/account/locales/es.json'
import dashboardEs from '../../../../features/dashboard/locales/es.json'
import publicLoginEs from '../../../../features/public-login/locales/es.json'
import profileEs from '../../../../features/profile/locales/es.json'
import usersEs from '../../../../features/users/locales/es.json'
import sellerCodesEs from '../../../../features/seller-codes/locales/es.json'
import subscriptionsEs from '../../../../features/subscriptions/locales/es.json'
import zonesEs from '../../../../features/zones/locales/es.json'
import membershipsEs from '../../../../features/memberships/locales/es.json'
import tokensEs from '../../../../features/tokens/locales/es.json'

export const esCatalog: Record<string, string> = {
  ...commonEs,
  ...layoutEs,
  ...demoEs,
  ...routeEs,
  ...publicHomeEs,
  ...accountEs,
  ...dashboardEs,
  ...publicLoginEs,
  ...profileEs,
  ...usersEs,
  ...sellerCodesEs,
  ...subscriptionsEs,
  ...zonesEs,
  ...membershipsEs,
  ...tokensEs,
}
