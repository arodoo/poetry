/*
 * File: exportsA.ts
 * Purpose: Split of SDK re-exports to keep `index.ts` compact.
 * All Rights Reserved. Arodi Emmanuel
 */
export {
  createAccountSdk,
  getAccountLocaleRaw,
  postAccountPassword,
  type AccountLocaleDto,
  type AccountPasswordChangeRequestDto,
} from './accountClient'

export {
  createDashboardSdk,
  getDashboardOverviewRaw,
  type DashboardOverviewDto,
} from './dashboardClient'

export {
  createProfileSdk,
  getProfileSummaryRaw,
  putProfileSummary,
  type ProfileSummaryDto,
  type ProfileSummaryUpdateDto,
} from './profileClient'

export {
  createPublicSdk,
  getPublicLandingRaw,
  type PublicLandingDto,
  type PublicLandingFeatureDto,
} from './publicClient'

export {
  createPublicForgotPasswordSdk,
  postPublicForgotPassword,
  type PublicForgotPasswordRequestDto,
  type PublicForgotPasswordResponseDto,
} from './publicForgotPasswordClient'

export {
  createPublicLoginSdk,
  postPublicLogin,
  type PublicLoginRequestDto,
  type PublicLoginResponseDto,
} from './publicLoginClient'
