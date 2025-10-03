/*
 File: route.ts
 Purpose: English route domain message keys (titles, slugs, breadcrumbs).
 All Rights Reserved. Arodi Emmanuel
*/
export const routeEn: Record<string, string> = {
  'ui.route.home.title': 'Home',
  'ui.route.dashboard.title': 'Dashboard',
  'ui.route.demo.title': 'Demo',
  'ui.route.home.slug': '', // root slug intentionally empty
  'ui.route.dashboard.slug': 'dashboard',
  'ui.route.demo.slug': 'demo',
  'ui.route.profile.title': 'Profile',
  'ui.route.profile.slug': 'profile',
  'ui.route.users.title': 'Users',
  'ui.route.users.slug': 'users',
  'ui.route.sellerCodes.title': 'Seller Codes',
  'ui.route.sellerCodes.slug': 'seller-codes',
  'ui.route.admin.tokens.title': 'Admin Tokens',
  'ui.route.admin.tokens.slug': 'admin/tokens',
  'ui.route.unauthorized.title': 'Unauthorized',
  'ui.route.unauthorized.slug': 'unauthorized',
  'ui.route.404.title': 'Page not found',
  'ui.route.404.message': 'The page you requested does not exist.',
  'ui.admin.tokens.title': 'Tokens Administration',
  'ui.admin.tokens.loading': 'Loading tokens…',
  'ui.admin.tokens.error': 'Failed to load tokens',
  'ui.admin.tokens.empty': 'No tokens returned',
  'ui.auth.unauthorized.title': 'Access denied',
  'ui.auth.unauthorized.message':
    'You do not have permission to view this page.',
  'ui.profile.password.title': 'Change password',
  'ui.profile.password.current': 'Current password',
  'ui.profile.password.new': 'New password',
  'ui.profile.password.confirm': 'Confirm new password',
  'ui.profile.password.submit': 'Update password',
  'ui.profile.password.show': 'Show password',
  'ui.profile.password.hide': 'Hide password',
  'ui.profile.password.error.mismatch': 'Passwords do not match',
  'ui.profile.password.error.current': 'Current password is invalid',
  'ui.profile.password.error.validation': 'Password does not meet requirements',
  'ui.profile.password.success': 'Password updated successfully',
  // breadcrumb labels reuse title keys
}
