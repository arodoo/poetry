/*
 File: index.ts
 Purpose: English locale aggregator exporting domain maps.
 All Rights Reserved. Arodi Emmanuel
*/
import { commonEn } from './common/common'
import { layoutEn } from './layout/layout'
import { demoEn } from './demo/demo'
import { routeEn } from './route/route'
import { publicHomeEn } from './public-home/public-home'
import accountEn from '../../../../features/account/locales/en.json'
import dashboardEn from '../../../../features/dashboard/locales/en.json'
import publicLoginEn from '../../../../features/public-login/locales/en.json'
import profileEn from '../../../../features/profile/locales/en.json'
import usersEn from '../../../../features/users/locales/en.json'
import sellerCodesEn from '../../../../features/seller-codes/locales/en.json'
import subscriptionsEn from '../../../../features/subscriptions/locales/en.json'
import zonesEn from '../../../../features/zones/locales/en.json'
import membershipsEn from '../../../../features/memberships/locales/en.json'
import tokensEn from '../../../../features/tokens/locales/en.json'
import fingerprintEn from '../../../../features/fingerprint/locales/en.json'

export const enCatalog: Record<string, string> = {
  ...commonEn,
  ...layoutEn,
  ...demoEn,
  ...routeEn,
  ...publicHomeEn,
  ...accountEn,
  ...dashboardEn,
  ...publicLoginEn,
  ...profileEn,
  ...usersEn,
  ...sellerCodesEn,
  ...subscriptionsEn,
  ...zonesEn,
  ...membershipsEn,
  ...sellerCodesEn,
  ...subscriptionsEn,
  ...zonesEn,
  ...tokensEn,
  ...fingerprintEn,
}
