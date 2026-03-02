/*
 * File: es.ts
 * Purpose: Spanish translations for auth feature. Exports
 * translations for login, profile, subscription tiers,
 * and backup consent screens for i18next integration.
 * All Rights Reserved. Arodi Emmanuel
 */

export default {
  login: {
    title: 'Bienvenido',
    subtitle: 'Inicia sesión para continuar',
    googleButton: 'Continuar con Google',
    loading: 'Iniciando sesión...',
    errorGeneric:
      'Error al iniciar sesión. Intenta de nuevo.',
  },
  profile: {
    title: 'Perfil',
    editName: 'Editar nombre',
    loggedOut: 'Sin sesión iniciada',
  },
  subscription: {
    free: 'Gratuito',
    pro: 'Pro',
    currentTier: 'Plan actual',
    upgrade: 'Actualizar a Pro',
  },
  backup: {
    title: 'Respaldo y sincronización',
    consentGrant: 'Habilitar respaldo en Google Drive',
    consentRevoke: 'Deshabilitar respaldo',
    consentGranted: 'Respaldo habilitado',
    consentRevoked: 'Respaldo deshabilitado',
    requiresPro:
      'Actualiza a Pro para habilitar respaldo',
  },
}
