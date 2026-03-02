/*
 * File: en.ts
 * Purpose: English translations for auth feature. Exports
 * translations for login, profile, subscription tiers,
 * and backup consent screens for i18next integration.
 * All Rights Reserved. Arodi Emmanuel
 */

export default {
  login: {
    title: 'Welcome',
    subtitle: 'Sign in to continue',
    googleButton: 'Continue with Google',
    loading: 'Signing in...',
    errorGeneric: 'Sign in failed. Please try again.',
  },
  profile: {
    title: 'Profile',
    editName: 'Edit display name',
    loggedOut: 'Not signed in',
  },
  subscription: {
    free: 'Free',
    pro: 'Pro',
    currentTier: 'Current plan',
    upgrade: 'Upgrade to Pro',
  },
  backup: {
    title: 'Backup & Sync',
    consentGrant: 'Enable Google Drive backup',
    consentRevoke: 'Disable backup',
    consentGranted: 'Backup enabled',
    consentRevoked: 'Backup disabled',
    requiresPro: 'Upgrade to Pro to enable backup',
  },
}
