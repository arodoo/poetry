/*
 File: index.ts
 Purpose: English locale aggregator exporting domain maps.
 All Rights Reserved. Arodi Emmanuel
*/
import { commonEn } from './common/common'
import { layoutEn } from './layout/layout'
import { demoEn } from './demo/demo'
import { routeEn } from './route/route'

export const enCatalog: Record<string, string> = {
  ...commonEn,
  ...layoutEn,
  ...demoEn,
  ...routeEn,
}
