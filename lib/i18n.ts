import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation is missing
    debug: process.env.NODE_ENV === 'development', // Enable debugging in development only
    interpolation: {
      escapeValue: false, // React escapes output by default
    },
    react: {
      useSuspense: false, // Optional: Handle async loading better for SSR
    },
  });

export default i18n;
