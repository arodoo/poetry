/*
 File: route.ts
 Purpose: English route domain message keys (titles, slugs, breadcrumbs).
 All Rights Reserved. Arodi Emmanuel
*/
export const routeEn: Record<string, string> = {
  'ui.route.home.title': 'Home',
  'ui.route.demo.title': 'Demo',
  'ui.route.home.slug': '', // root slug intentionally empty
  'ui.route.demo.slug': 'demo',
  'ui.route.admin.tokens.title': 'Admin Tokens',
  'ui.route.admin.tokens.slug': 'admin/tokens',
  'ui.route.unauthorized.title': 'Unauthorized',
  'ui.route.unauthorized.slug': 'unauthorized',
  'ui.public.home.intro': 'Welcome to Poetry — a modular demo app.',
  'ui.public.home.cta.login': 'Login',
  'ui.public.home.cta.register': 'Register',
  'ui.admin.tokens.title': 'Tokens Administration',
  'ui.admin.tokens.loading': 'Loading tokens…',
  'ui.admin.tokens.error': 'Failed to load tokens',
  'ui.admin.tokens.empty': 'No tokens returned',
  'ui.auth.unauthorized.title': 'Access denied',
  'ui.auth.unauthorized.message':
    'You do not have permission to view this page.',
  // breadcrumb labels reuse title keys
}
