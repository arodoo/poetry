/*
 File: index.ts
 Purpose: English locale aggregator exporting domain maps.
 All Rights Reserved. Arodi Emmanuel
*/
import { commonEn } from './common/common'
import { layoutEn } from './layout/layout'
import { demoEn } from './demo/demo'
import { routeEn } from './route/route'
import publicAuth from './public-auth.json'
import accountEn from '../../../../features/account/locales/en.json'
import dashboardEn from '../../../../features/dashboard/locales/en.json'
import profileEn from '../../../../features/profile/locales/en.json'

export const enCatalog: Record<string, string> = {
  ...commonEn,
  ...layoutEn,
  ...demoEn,
  ...routeEn,
  ...publicAuth,
  ...accountEn,
  ...dashboardEn,
  ...profileEn,
}
