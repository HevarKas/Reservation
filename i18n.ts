import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { arabicTranslations } from '~/locales/ar';
import { englishTranslations } from '~/locales/en';
import { finnishTranslations } from '~/locales/fi';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: englishTranslations },
    ar: { translation: arabicTranslations },
    fi: { translation: finnishTranslations  },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
