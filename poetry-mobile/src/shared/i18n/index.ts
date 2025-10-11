/*
 * File: index.ts
 * Purpose: i18n initialization with i18next and react-i18next.
 * Configures supported locales (en, es), fallback language, and
 * loads translation catalogs. Must be imported early in app boot
 * sequence before any UI components render.
 * All Rights Reserved. Arodi Emmanuel
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './catalog/en'
import es from './catalog/es'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
