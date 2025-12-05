import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
// import fa from '@/locales/fa.json'; // Removed Persian import

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
      // fa: { translation: fa } // Removed Persian resource
    },
    fallbackLng: 'ar',
    lng: 'ar',          // will be overwritten by LanguageContext
    interpolation: { escapeValue: false }
  });

export default i18n;
